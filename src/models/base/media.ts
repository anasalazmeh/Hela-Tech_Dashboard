export interface IMedia {
  readonly id: number
  creationTime: string
  creatorUserId: number
  lastModificationTime: string
  lastModifierUserId: number
  isDeleted: boolean
  deleterUserId: number
  deletionTime: string
  imageUrl: string
  name: string
}
