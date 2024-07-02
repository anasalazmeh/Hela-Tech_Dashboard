import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { IStudentQuery } from "../../models/students/query"
import {
  ICreateStudent,
  IGetProgressCourseStudent,
  IUpdateStudent,
} from "../../models/students/request"

class StudentsService {
  getAllStudents = (
    query: IStudentQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/users", { params: query })

  getStudent = (id: number): Promise<any> => http.get(`/users/${id}`)

  createStudent = (data: ICreateStudent): Promise<any> =>
    http.post("/users", data)

  updateStudent = (data: IUpdateStudent, id: number): Promise<any> =>
    http.put(`/users/${id}`, data)

  getProgressCourse = (
    data: IGetProgressCourseStudent,
    courseid: number
  ): Promise<any> =>
    http.post(`/courses/progress-special-user/${courseid}`, data)

  deleteStudent = (id: number): Promise<any> => http.delete(`/users/${id}`)
}

export default StudentsService
