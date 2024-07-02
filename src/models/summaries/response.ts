export interface ISummary {
  id: number
  name: string
  description: string
  photo: {
    id: number
    duration: number
    url: string
  }
}

export interface ISummaryDetails {
  id: number
  description: string
  name: string
  file: {
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
