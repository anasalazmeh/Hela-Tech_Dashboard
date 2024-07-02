import { Operations, Orders } from "./enum"

export interface IBaseQuery {
  keyword?: string
  page?: number
  perPage?: number
  filters?: IStaticFilter[]
  orders?: ISort[]
  total?: number
  light?: boolean
}

export interface IStaticFilter {
  name: string
  operation: Operations | string
  value: number | string | number[] | null | undefined
}
export interface ISort {
  name: string
  direction: Orders
}
