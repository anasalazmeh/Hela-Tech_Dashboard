export interface ISeason {
  id: number
  name: string
  description: string
  totalDuration: number
  lessons: any[]
  photo: {
    id: number
    duration: number
    url: string
  }
  lessonsCount: number
}

export interface ISeasonLight {
  id: number
  name: string
  lessonsCount: number
  photo: {
    id: number
    duration: number
    url: string
  }
}

export interface ISeasonDetails {
  id: number
  name: string
  description: string
  lessonsCount: number
  lessons: any[]
  photo: {
    id: number
    duration: number
    url: string
  }
}
