import { Layout } from "antd"
import "./style.css"

interface IProps {
  children: React.ReactNode
}

const LayoutContent: React.FC<IProps> = ({ children }) => {
  return <Layout.Content className="content">{children}</Layout.Content>
}

export default LayoutContent
