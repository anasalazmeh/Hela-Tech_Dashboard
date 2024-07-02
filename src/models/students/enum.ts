export enum UserStatus {
  NOT_VERIFIED = 1,
  VERIFIED = 2,
  BLOCKED = 3,
}

export const getUserActiveColor = (status?: UserStatus) => {
  switch (status) {
    case UserStatus.VERIFIED:
      return "green"
    case UserStatus.BLOCKED:
      return "red"
    case UserStatus.NOT_VERIFIED:
      return "red"

    default:
      return "red"
  }
}

export const getUserActiveName = (status?: UserStatus) => {
  switch (status) {
    case UserStatus.VERIFIED:
      return "Verified"
    case UserStatus.NOT_VERIFIED:
      return "Not Verified"
    case UserStatus.BLOCKED:
      return "Blocked"
    default:
      return "-"
  }
}
