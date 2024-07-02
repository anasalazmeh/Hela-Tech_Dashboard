export interface IUserLogin {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly mobile: string
  photo: any
  roles: { id: number; name: string }[]
  readonly surname: string
  status: number
  readonly userName: string
  readonly emailAddress: string
  course: any[]
  lessons: any[]
}
