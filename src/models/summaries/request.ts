export interface ICreateSummary {
  name: string
  description: string
  fileID: number
  photoID: number
}

export interface IUpdateSummary extends ICreateSummary {
  id: number
}
