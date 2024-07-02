import { Layout } from "antd"
import styles from "./styles.module.scss"

const { Content } = Layout
interface Props {
  children: React.ReactNode
}

const ErrorLayout: React.FC<Props> = (props) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content className={styles["error-content"]}>{props.children}</Content>
    </Layout>
  )
}

export default ErrorLayout
