import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"
import ErrorLayout from "../../components/general/layout/error-layout"

interface Props {}

const Error404: React.FC<Props> = (props) => {
  const navigate = useNavigate()

  return (
    <ErrorLayout>
      <Result
        status="404"
        title="404"
        subTitle={"Page not found"}
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/")
            }}
          >
            Back to home page
          </Button>
        }
      />
    </ErrorLayout>
  )
}

export default Error404
