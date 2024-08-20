import { api } from "@services";
import { ICart } from "@carts/types";
import type { BaseService, RequestConfig } from "@services";

export class CartService {
  constructor(public api: BaseService) {}

  getCarts = (config?: RequestConfig) =>
    this.api.get<ICart[]>("/carts", config);

  deleteCart = (id: number) => this.api.delete<unknown, ICart>(`/carts/${id}`);

  getCartById = (id: string) => this.api.get<ICart>(`/carts/${id}`);

  addCart = (data: ICart, config?: RequestConfig) =>
    this.api.post<ICart, ICart>("/carts", data, config);

  updateCart = (id: string, data: ICart) =>
    this.api.put<ICart, ICart>(`/carts/${id}`, data);
}

export const cartService = new CartService(api);
