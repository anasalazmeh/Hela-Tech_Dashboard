export interface ICreateCourse {
  description: string
  name: string
  photoID: number
}

export interface IUpdateCourse extends ICreateCourse {
  id: number
}
