import { api } from "@services";
import { IUser } from "@users/types";
import type { BaseService, RequestConfig } from "@services";

export class UserService {
  constructor(public api: BaseService) {}

  getUsers = (config?: RequestConfig) =>
    this.api.get<IUser[]>("/users", config);

  deleteUser = (id: number) => this.api.delete<unknown, IUser>(`/users/${id}`);
}

export const userService = new UserService(api);
