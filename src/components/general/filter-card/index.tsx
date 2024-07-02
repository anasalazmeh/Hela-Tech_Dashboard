import React, { Fragment, useState } from "react"
import { Button, Collapse, Space } from "antd"
import {
  FilterOutlined,
  ClearOutlined,
  CaretRightOutlined,
} from "@ant-design/icons"
import SubmitBtn from "../../form-components/submit-btn"
import { useFormContext } from "react-hook-form"

import styles from "./style.module.scss"

const { Panel } = Collapse

interface IProps {
  onReset: () => void
  applyLoading: boolean
  resetLoading: boolean
  formId: string
  children: React.ReactNode
}

const FilterCard: React.FC<IProps> = ({
  children,
  onReset,
  applyLoading,
  resetLoading,
  formId,
}) => {
  const [showFilters, setShowFilters] = useState(false)

  // const { reset } = useFormContext()

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      className={styles.collapse}
      onChange={(key) => {
        setShowFilters(key.includes("1"))
      }}
    >
      <Panel
        key="1"
        header={"Filters"}
        extra={
          <Fragment>
            {showFilters && (
              <Space>
                <Button
                  danger
                  type="default"
                  loading={resetLoading}
                  icon={<ClearOutlined />}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    // reset()
                    onReset()
                  }}
                >
                  Reset
                </Button>
                <SubmitBtn
                  icon={<FilterOutlined />}
                  loading={applyLoading}
                  onClick={(e: any) => e.stopPropagation()}
                  form={formId}
                >
                  Apply
                </SubmitBtn>
              </Space>
            )}
          </Fragment>
        }
      >
        {children}
      </Panel>
    </Collapse>
  )
}

export default FilterCard
