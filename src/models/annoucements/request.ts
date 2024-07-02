export interface ICreateAnnouncement {
  title: string
  content: string
  fileID: number
  photoID: number
}

export interface IUpdateAnnoucement extends ICreateAnnouncement {
  id: number
}
