export interface ICreateUser {
  name: string
  mobile: string
  email: string
  roles: string[]
  photoID: number
  password: string
}

export interface IUpdateUser extends ICreateUser {
  id: number
}
