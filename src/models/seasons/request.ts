export interface ICreateSeason {
  name: string
  description: string
  photoID: number
  courseID: number
}

export interface IUpdateSeason extends ICreateSeason {
  id: number
}
