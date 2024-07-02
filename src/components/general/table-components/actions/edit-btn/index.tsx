import { Button, ButtonProps, Tooltip } from "antd"
import { EditOutlined } from "@ant-design/icons"

interface Props extends ButtonProps {}

const EditBtn: React.FC<Props> = (props) => {
  return (
    <Tooltip title={"Edit"}>
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        {...props}
      />
    </Tooltip>
  )
}

export default EditBtn
