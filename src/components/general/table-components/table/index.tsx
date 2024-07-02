import { Table as AntdTable, TableProps } from "antd"
import { Fragment } from "react"
import Pagination from "../pagination"

interface Props<RecordType extends object> extends TableProps<RecordType> {
  total?: number
  page?: number
  pageSize?: number
  onPaginationChange?: (page: number, pageSize: number) => void
  showPagination?: boolean
}

const Table = function <RecordType extends object>({
  onPaginationChange,
  ...props
}: Props<RecordType>) {
  return (
    <Fragment>
      <AntdTable
        className="shadow"
        scroll={{
          x: "200",
        }}
        pagination={false}
        {...props}
      />
      {props.showPagination && (
        <Pagination
          total={props.total}
          current={props.page}
          pageSize={props.pageSize}
          onChange={(page, pageSize) => {
            onPaginationChange && onPaginationChange(page, pageSize ?? 10)
          }}
        />
      )}
    </Fragment>
  )
}

export default Table
