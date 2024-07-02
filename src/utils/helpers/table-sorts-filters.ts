///
// Handle Sorts and Filters in Antd Table

import { isArray } from "lodash"
import { ISort, IStaticFilter } from "../../models/base/base-query"
import { FilterValue, SorterResult } from "antd/es/table/interface"
import { Operations, Orders } from "../../models/base/enum"

///
export const tableOnChange = (
  tableFilters: Record<string, FilterValue | null>,
  tabelSorters: SorterResult<any> | SorterResult<any>[],
  tableFiltersProps: Object,
  setSorts: (sorters: ISort[]) => void,
  setStaticFilters: (filters: IStaticFilter[]) => void
) => {
  // Sorts
  if (!isArray(tabelSorters)) tabelSorters = [tabelSorters]
  let sorters: ISort[] = []
  tabelSorters?.map((sort, _) => {
    let sortOrder = sort?.order === "ascend" ? Orders.ascend : Orders.descend

    sorters.push({
      name: `${sort.field}`,
      direction: sortOrder,
    })
  })
  setSorts(sorters)

  // Filters
  let filters: IStaticFilter[] = []
  Object.values(tableFilters).map((value, index) => {
    let key = `${Object.keys(tableFilters)[index]}`

    // Todo: Fix operation
    // let operation = tableFiltersProps[key]?.operation
    let operation = Operations.EQ
    filters.push({
      name: key,
      operation: operation,
      value: value?.map((v) => +v as number),
    })
  })
  setStaticFilters(filters)
}
