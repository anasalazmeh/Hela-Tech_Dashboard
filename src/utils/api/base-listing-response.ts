export default interface IBaseListingResponse<T> {
  data: T[]
  total: number
  currentPage: number
  lastPage: number
}
