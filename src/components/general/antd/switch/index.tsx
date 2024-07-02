import { Switch as AntdSwitch, SwitchProps as AntdSwitchProps } from 'antd'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'

export interface SwitchProps extends AntdSwitchProps {}

const Switch: React.FC<SwitchProps> = (props) => {
  return (
    <AntdSwitch
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      {...props}
    />
  )
}

export default Switch
