export interface ICreateStudent {
  name: string
  mobile: string
  email: string
  roles: string[]
  photoID: number
  password: string
}

export interface IUpdateStudent extends ICreateStudent {
  id: number
}

export interface IGetProgressCourseStudent {
  userID: number
}
