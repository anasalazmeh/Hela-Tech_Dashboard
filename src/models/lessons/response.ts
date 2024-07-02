import { ISeason } from "../seasons/response"
import { LessonType } from "./enum"

export interface ILesson {
  id: number
  name: string
  description: string
  number: number
  views: number
  type: LessonType
  userCount: number
  video: {
    id: number
    duration: number
    url: string
  }
  photo: {
    id: number
    duration: number
    url: string
  }
}

export interface ILessonDetails extends ILesson {
  id: number
  name: string
  description: string
  number: number
  views: number
  type: LessonType
  isPaid: boolean
  url: string
  season: ISeason
  userCount: number
  video: {
    id: number
    duration: number
    url: string
  }
  photo: {
    id: number
    duration: number
    url: string
  }
}

export interface ILessonLight {
  id: number
  name: string
}
