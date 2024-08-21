import { api } from "@services";
import { IUser } from "@users/types";
import type { BaseService, RequestConfig } from "@services";
import { ICart } from "@carts/types";

export class UserService {
  constructor(public api: BaseService) {}

  getUsers = (config?: RequestConfig) =>
    this.api.get<IUser[]>("/users", config);

  getUserCarts = (id: string) => this.api.get<ICart[]>(`/carts/user/${id}`);

  deleteUser = (id: number) => this.api.delete<unknown, IUser>(`/users/${id}`);

  getUserById = (id: string) => this.api.get<IUser>(`/users/${id}`);

  addUser = (data: IUser, config?: RequestConfig) =>
    this.api.post<IUser, IUser>("/users", data, config);

  updateUser = (id: string, data: IUser) =>
    this.api.put<IUser, IUser>(`/users/${id}`, data);
}

export const userService = new UserService(api);
