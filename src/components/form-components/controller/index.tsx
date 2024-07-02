import { Fragment } from "react"
import {
  useFormContext,
  Controller as FormController,
  ControllerProps,
} from "react-hook-form"
import Error from "../error-message"

interface Props extends ControllerProps {}

const Controller: React.FC<Props> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <Fragment>
      <FormController {...props} control={control} />
      <Error errors={errors} name={props.name} />
    </Fragment>
  )
}

export default Controller
