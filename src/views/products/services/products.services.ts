import { api } from "@services";
import { IProduct, IProductForm } from "@products/types/products.types";
import type { BaseService, RequestConfig } from "@services";

export class ProductService {
  constructor(public api: BaseService) {}

  getProducts = (config?: RequestConfig) =>
    this.api.get<IProduct[]>("/products", config);

  deleteProduct = (id: number) =>
    this.api.delete<unknown, IProduct>(`/products/${id}`);

  addProduct = (data: IProductForm, config?: RequestConfig) =>
    this.api.post<IProductForm, IProduct>("/products", data, config);

  getProductById = (id: string) => this.api.get<IProduct>(`/products/${id}`);

  updateProduct = (id: string, data: IProductForm) =>
    this.api.put<IProductForm, IProduct>(`/products/${id}`, data);
}

export const productService = new ProductService(api);
