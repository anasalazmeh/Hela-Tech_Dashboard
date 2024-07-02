import { Button, ButtonProps, Popconfirm, Tooltip } from "antd"
import { DeleteOutlined, QuestionCircleTwoTone } from "@ant-design/icons"

import { StrictMode } from "react"
import { TooltipPlacement } from "antd/es/tooltip"

interface Props extends ButtonProps {
  onConfirm: () => void
  placement?: TooltipPlacement
}

const DeleteBtn: React.FC<Props> = ({ onConfirm, ...props }) => {
  return (
    <Popconfirm
      title={"Confirm Delete"}
      placement={props.placement}
      okButtonProps={{ danger: true, loading: props.loading }}
      icon={<QuestionCircleTwoTone twoToneColor="red" />}
      onConfirm={onConfirm}
    >
      <Tooltip title={"Delete"}>
        <Button
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          {...props}
        />
      </Tooltip>
    </Popconfirm>
  )
}

export default DeleteBtn
