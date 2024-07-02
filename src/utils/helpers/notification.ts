import { notification } from "antd"

export const errorNotification = (message: string, description?: string) => {
  return notification.error({
    message: message,
    description: description,
    placement: "bottomRight",
  })
}

export const successNotification = (message: string, description?: string) => {
  return notification.success({
    message: message,
    description: description,
    placement: "bottomRight",
  })
}
