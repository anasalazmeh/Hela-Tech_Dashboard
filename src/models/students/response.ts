import { UserStatus } from "./enum"

export interface IStudent {
  readonly id: number
  name: string
  mobile: string
  email: string
  status: UserStatus
}
