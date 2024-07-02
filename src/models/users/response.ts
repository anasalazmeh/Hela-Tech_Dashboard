import { UserStatus } from "./enum"

export interface IUser {
  readonly id: number
  name: string
  mobile: string
  email: string
  status: UserStatus
}
