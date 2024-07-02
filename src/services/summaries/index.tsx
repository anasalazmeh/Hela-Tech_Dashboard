import { AxiosRequestConfig } from "axios"
import http from "../../api/axios"
import { ISummaryQuery } from "../../models/summaries/query"
import { ICreateSummary, IUpdateSummary } from "../../models/summaries/request"

class SummariesService {
  getAllSummaries = (
    query: ISummaryQuery,
    params?: AxiosRequestConfig
  ): Promise<any> => http.get("/summaries", { params: query })

  getSummary = (id: number): Promise<any> => http.get(`/summaries/${id}`)

  getAllSummariesLight = (): Promise<any> => http.get(`/summaries?Minimal=1`)

  createSummary = (data: ICreateSummary): Promise<any> =>
    http.post("/summaries", data)

  updateSummary = (data: IUpdateSummary, id: number): Promise<any> =>
    http.put(`/summaries/${id}`, data)

  deleteSummary = (id: number): Promise<any> => http.delete(`/summaries/${id}`)
}

export default SummariesService
