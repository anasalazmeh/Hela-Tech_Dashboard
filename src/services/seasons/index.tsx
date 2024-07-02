import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { ISeasonsQuery } from "../../models/seasons/query"
import { ICreateSeason, IUpdateSeason } from "../../models/seasons/request"

class SeasonsService {
  getAllSeasons = (
    query: ISeasonsQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/seasons", { params: query })

  getSeason = (id: number): Promise<any> => http.get(`/seasons/${id}`)

  getAllSeasonsLight = (): Promise<any> => http.get(`/seasons?Minimal=1`)

  createSeason = (data: ICreateSeason): Promise<any> =>
    http.post("/seasons", data)

  updateSeason = (data: IUpdateSeason, id: number): Promise<any> =>
    http.put(`/seasons/${id}`, data)

  deleteSeason = (id: number): Promise<any> => http.delete(`/seasons/${id}`)
}

export default SeasonsService
