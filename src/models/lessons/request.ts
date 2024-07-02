import { LessonType } from "./enum"

export interface ICreateLesson {
  name: string
  description: string
  number: number
  seasonID: number
  videoID: number
  photoID: number
  type: LessonType
}

export interface IUpdateLesson extends ICreateLesson {
  id: number
}
