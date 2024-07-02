import { FieldErrors } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import styles from "./styles.module.scss"
interface Props {
  errors: FieldErrors
  name: string
}

const Error: React.FC<Props> = (props) => {
  return (
    <ErrorMessage
      errors={props.errors}
      name={props.name}
      render={({ message }) => <p className={styles.alert}>{message}</p>}
    />
  )
}

export default Error
