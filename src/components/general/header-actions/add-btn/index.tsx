import { PlusOutlined } from "@ant-design/icons"
import { Button, ButtonProps } from "antd"

interface Props extends ButtonProps {
  title?: string
  onClick?: () => void
}

const AddBtn: React.FC<Props> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      icon={<PlusOutlined />}
      type="primary"
      title={"add"}
      {...props}
    >
      {props?.title ?? "add"}
    </Button>
  )
}

export default AddBtn
