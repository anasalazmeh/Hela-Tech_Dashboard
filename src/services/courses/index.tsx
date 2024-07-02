import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { ICourseQuery } from "../../models/courses/query"
import { ICreateCourse, IUpdateCourse } from "../../models/courses/request"

class CoursesService {
  getAllCourses = (
    query: ICourseQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/courses", { params: query })

  getCourse = (id: number): Promise<any> => http.get(`/courses/${id}`)

  getAllCoursesLight = (): Promise<any> => http.get(`/courses?Minimal=1`)

  createCourse = (data: ICreateCourse): Promise<any> =>
    http.post("/courses", data)

  updateCourse = (data: IUpdateCourse, id: number): Promise<any> =>
    http.put(`/courses/${id}`, data)

  deleteCourse = (id: number): Promise<any> => http.delete(`/courses/${id}`)
}

export default CoursesService
