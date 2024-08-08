import { api } from "@services";
import type { BaseService, RequestConfig } from "@services";
import { LoginResponse, SignInFieldType } from "@auth/types/auth.types";

export class AuthService {
  constructor(public api: BaseService) {}

  login = (data: SignInFieldType, config?: RequestConfig) =>
    this.api.post<SignInFieldType, LoginResponse>("/auth/login", data, config);
}

export const authService = new AuthService(api);
