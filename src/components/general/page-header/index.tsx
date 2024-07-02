import React from "react"
import { Breadcrumb, Divider } from "antd"
import { Link, useLocation } from "react-router-dom"
import { PageHeader as AntdPageHeader } from "@ant-design/pro-layout"
import { HomeOutlined } from "@ant-design/icons"
import { isEmpty } from "lodash"
import styles from "./style.module.scss"
interface IProps {
  children?: React.ReactNode
  title?: any
  subTitle?: any
  extra?: React.ReactNode
  onBack?: () => void
}

const PageHeader: React.FC<IProps> = (props) => {
  return (
    <>
      <AntdPageHeader
        ghost={false}
        extra={props?.extra}
        className={styles.header}
        title={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>{props.title}</div>
            <div
              style={{ fontSize: "12px", marginTop: "-10px", color: "#95a5a6" }}
            >
              {props.subTitle}
            </div>
          </div>
        }
        breadcrumb={<PathsBreadcrumb />}
      />
      <Divider style={{ marginTop: "0" }} />
    </>
  )
}

export default PageHeader

const PathsBreadcrumb: React.FC = () => {
  const location = useLocation()
  // Get Keys To Open SubMenu
  const paths = location.pathname.split("/")

  return (
    <Breadcrumb>
      {[
        {
          path: "",
          breadcrumbName: <HomeOutlined />,
        },
        ...paths
          ?.filter((p) => !isEmpty(p))
          ?.map((path, _) => {
            return {
              breadcrumbName: path,
              path: path,
            }
          }),
      ].map((val, index, array) => (
        <Breadcrumb.Item key={index}>
          {array.length - 1 !== index ? (
            <Link to={`/${val.path}`} key={index}>
              {val.breadcrumbName}
            </Link>
          ) : (
            val.breadcrumbName
          )}
          {array.length === 1 && <span style={{ fontSize: "12px" }}>Home</span>}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}
