import { api } from "@services";
import { IProduct } from "@products/types/products.types";
import type { BaseService, RequestConfig } from "@services";

export class ProductService {
  constructor(public api: BaseService) {}

  getProducts = (config?: RequestConfig) =>
    this.api.get<IProduct[]>("/products", config);
}

export const productService = new ProductService(api);