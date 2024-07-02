export enum LessonType {
  FREE = 1,
  PAID = 2,
}

export const getLessonType = (status?: LessonType) => {
  switch (status) {
    case LessonType.FREE:
      return "Free"
    case LessonType.PAID:
      return "Paid"
    default:
      return "-"
  }
}
