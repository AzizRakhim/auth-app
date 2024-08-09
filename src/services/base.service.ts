export type BaseServiceOptions = {
  baseURL?: string;
  headers?: Record<string, string>;
};

export type FetchJsonOptions<TRequest = any> = {
  parseResponse?: boolean;
  query?: Record<string, string | number>;
  body?: TRequest;
} & Omit<RequestInit, "body">;

export type RequestConfig = Omit<FetchJsonOptions, "method" | "body">;

export class FetchError extends Error {
  status: number;
  response: Promise<any>;

  constructor(res: Response) {
    super(res.statusText);
    this.status = res.status;
    this.response = res.json();
  }
}
export class BaseService {
  private _baseURL: string;
  private _headers: Record<string, string>;
  constructor(options: BaseServiceOptions) {
    this._baseURL = options.baseURL || "";
    this._headers = options.headers || {};
  }

  _fetchJSON = async <TRequest>(
    endpoint: string,
    options: FetchJsonOptions<TRequest> = {}
  ) => {
    const query = Object.keys(options.query || {})
      .map(
        (k) =>
          encodeURIComponent(k) +
          "=" +
          encodeURIComponent((options.query || {})?.[k])
      )
      .join("&");

    const isFormData = options.body instanceof FormData;
    const _headers = { ...this._headers };

    if (isFormData) {
      delete _headers["Content-Type"];
    }

    const res = await fetch(
      this._baseURL + endpoint + (query ? `?${query}` : ""),
      {
        ...options,
        body: isFormData
          ? (options.body as FormData)
          : JSON.stringify(options.body),
        headers: _headers,
      }
    );

    if (!res.ok) throw new Error("Error with fetch");

    if (options.parseResponse !== false) return res.json();

    return res;
  };

  setBasicAuth = (token: string): BaseService => {
    this._headers.Authorization = `${token}`;
    return this;
  };

  setHeader = (key: string, value: string): BaseService => {
    this._headers[key] = value;
    return this;
  };

  get = <TResponse>(
    endpoint: string,
    options: RequestConfig = {}
  ): Promise<TResponse> =>
    this._fetchJSON(endpoint, {
      ...options,
      method: "GET",
    });

  post = <TRequest, TResponse>(
    endpoint: string,
    body?: TRequest,
    options: RequestConfig = {}
  ): Promise<TResponse> =>
    this._fetchJSON(endpoint, {
      ...options,
      body,
      method: "POST",
    });

  patch = <TRequest, TResponse>(
    endpoint: string,
    body?: TRequest,
    options: RequestConfig = {}
  ): Promise<TResponse> => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: "PATCH",
    });
  };

  put = <TRequest, TResponse>(
    endpoint: string,
    body?: TRequest,
    options: RequestConfig = {}
  ): Promise<TResponse> =>
    this._fetchJSON<TRequest>(endpoint, {
      ...options,
      body,
      method: "PUT",
    });

  delete = <TRequest, TResponse>(
    endpoint: string,
    body?: TRequest,
    options: RequestConfig = {}
  ): Promise<TResponse> => {
    const isFormData = body instanceof FormData;
    return this._fetchJSON(endpoint, {
      ...options,
      body: isFormData ? body : JSON.stringify(body),
      method: "DELETE",
    });
  };
}

export const api = new BaseService({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
