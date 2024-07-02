import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { ILessonQuery } from "../../models/lessons/query"
import { ICreateLesson, IUpdateLesson } from "../../models/lessons/request"

class LessonsService {
  getAllLessons = (
    query: ILessonQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/lessons", { params: query })

  getLesson = (id: number): Promise<any> => http.get(`/lessons/${id}`)

  getAllLessonsLight = (): Promise<any> => http.get(`/lessons?Minimal=1`)

  createLesson = (data: ICreateLesson): Promise<any> =>
    http.post("/lessons", data)

  updateLesson = (data: IUpdateLesson, id: number): Promise<any> =>
    http.put(`/lessons/${id}`, data)

  deleteLesson = (id: number): Promise<any> => http.delete(`/lessons/${id}`)
}

export default LessonsService
