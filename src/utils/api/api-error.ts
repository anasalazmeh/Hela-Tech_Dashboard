import { AxiosError } from 'axios'
import ApiErrorType from './api-error-type'

export type ErrorData = {
  errors: string[]
}
export default interface ApiError<T = ErrorData> extends AxiosError<T> {
  errorType: ApiErrorType
}
