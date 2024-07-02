import { MediumFor } from "./enum"
// List Model
export interface IMedium {
  id: number
  url: string
  type: any
  for: MediumFor
}
