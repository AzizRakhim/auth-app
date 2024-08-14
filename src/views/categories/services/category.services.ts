import { api } from "@services";
import { IProduct } from "@products/types/products.types";
import type { BaseService, RequestConfig } from "@services";

export class CategoryService {
  constructor(public api: BaseService) {}

  getCategories = (config?: RequestConfig) =>
    this.api.get<string[]>("/products/categories", config);

  getSingleCategory = (category: string) =>
    this.api.get<IProduct[]>(`/products/category/${category}`);
}

export const categoriesService = new CategoryService(api);
