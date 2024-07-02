export interface IAnnoucement {
  id: number
  title: string
  content: string
}

export interface IAnnoucementDetails {
  id: number
  title: string
  content: string
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
