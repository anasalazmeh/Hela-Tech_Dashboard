import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { IAnnoucementQuery } from "../../models/annoucements/query"
import {
  ICreateAnnouncement,
  IUpdateAnnoucement,
} from "../../models/annoucements/request"

class AnnoucementsService {
  getAllAnnoucements = (
    query: IAnnoucementQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/announcements", { params: query })

  getAnnoucement = (id: number): Promise<any> =>
    http.get(`/announcements/${id}`)

  getAllAnnoucementsLight = (): Promise<any> =>
    http.get(`/announcements?Minimal=1`)

  createAnnoucement = (data: ICreateAnnouncement): Promise<any> =>
    http.post("/announcements", data)

  updateAnnoucement = (data: IUpdateAnnoucement, id: number): Promise<any> =>
    http.put(`/announcements/${id}`, data)

  deleteAnnoucement = (id: number): Promise<any> =>
    http.delete(`/announcements/${id}`)
}

export default AnnoucementsService
