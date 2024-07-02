import { SyncOutlined } from "@ant-design/icons"
import { Button, ButtonProps } from "antd"

interface Props extends ButtonProps {
  children: React.ReactNode
}

const RefreshBtn: React.FC<Props> = (props) => {
  return (
    <Button icon={<SyncOutlined />} ghost type="primary" {...props}>
      {props.children}
    </Button>
  )
}

export default RefreshBtn
