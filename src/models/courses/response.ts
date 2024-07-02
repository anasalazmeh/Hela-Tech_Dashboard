export interface ICourse {
  id: number
  name: string
  description: string
  seasonsCount: number
  totalDuration: number
  photo: {
    id: number
    duration: number
    url: string
  }
}

export interface ICourseLight {
  id: number
  name: string
  photo: {
    id: number
    duration: string
    url: string
  }
}

export interface ICourseDetails extends ICourse {
  seasons: any[]
  lessonCount: number
  userCount: number
}
