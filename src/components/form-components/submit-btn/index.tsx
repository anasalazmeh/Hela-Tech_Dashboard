import { Button, ButtonProps } from "antd"

interface Props extends ButtonProps {
  children: React.ReactNode
}

const SubmitBtn: React.FC<Props> = (props) => {
  return (
    <Button type="primary" htmlType="submit" loading={props.loading} {...props}>
      {props.children}
    </Button>
  )
}

export default SubmitBtn
