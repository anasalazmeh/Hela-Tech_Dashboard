import { MediumFor } from "./enum"

export interface IMediumCreate {
  medium: File
  for: MediumFor
  type: any
}
