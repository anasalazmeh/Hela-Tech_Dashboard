import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { ICreateUser, IUpdateUser } from "../../models/users/request"

import { IUserQuery } from "../../models/users/query"

class UsersService {
  getAllUsers = (
    query: IUserQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/users", { params: query })

  getAllUsersLight = (query: IUserQuery): Promise<any> =>
    http.get(`/users?Minimal=1`, { params: query })

  getUser = (id: number): Promise<any> => http.get(`/users/${id}`)

  createUser = (data: ICreateUser): Promise<any> => http.post("/users", data)

  updateUser = (data: IUpdateUser, id: number): Promise<any> =>
    http.put(`/users/${id}`, data)

  deleteUser = (id: number): Promise<any> => http.delete(`/users/${id}`)
}

export default UsersService
