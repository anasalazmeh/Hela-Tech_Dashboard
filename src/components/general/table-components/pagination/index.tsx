import { Pagination as AntdPagination, PaginationProps } from "antd"
import classNames from "classnames"

import styles from "./styles.module.scss"

interface Props extends PaginationProps {}

const Pagination: React.FC<Props> = (props) => {
  return (
    <AntdPagination
      className={classNames("shadow", styles.pagination)}
      showTotal={(total, range) => {
        return `Shows ${
          range[0] && range[1] ? `${range[0]}-${range[1]} of` : ""
        } ${total} Items`
      }}
      // hideOnSinglePage
      defaultPageSize={10}
      showQuickJumper
      showSizeChanger
      responsive
      {...props}
      pageSize={props.pageSize ?? 10}
    />
  )
}

export default Pagination
