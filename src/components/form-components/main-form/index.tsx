import { Form as AntdForm } from "antd"
import React, { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { execute } from "../../../utils/api/api-execute"
import {
  errorNotification,
  successNotification,
} from "../../../utils/helpers/notification"
import PageHeader from "../../general/page-header"

import styles from "./style.module.scss"

interface IProps<T> {
  children?: React.ReactNode
  title: string | React.ReactNode
  subTitle: string
  formId: string
  onSubmit: (data: any) => void
  defaultValues?: T
  dontNavigate?: boolean
}

function MainForm<T>(props: IProps<T>) {
  const { children, title, defaultValues, subTitle, formId } = props

  const [submittingForm, setSubmittingForm] = useState(false)

  const methods = useForm<any>({
    defaultValues: { ...defaultValues },
  })

  const navigate = useNavigate()
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (props.defaultValues && !submittingForm) {
      methods.reset({ ...methods.getValues(), ...(defaultValues as any) })
    }
  }, [defaultValues])

  const onSubmit = async (data: any) => {
    await execute({
      callback: async () => {
        await props.onSubmit(data)
        successNotification("Operation done successfully")
        if (!props.dontNavigate) {
          navigate(-1)
        }
      },
      fallback: (error: any) => {
        console.log("error", error)

        errorNotification(
          error.response?.data.message ?? "Unsucessfull Operation"
        )
      },
      finallyCallback: () => {},
      throwException: false,
    })
  }

  return (
    <FormProvider {...methods}>
      <AntdForm
        id={formId}
        className={styles.container}
        onSubmitCapture={() => {
          setSubmittingForm(true)
        }}
        onFinish={methods.handleSubmit(onSubmit)}
      >
        <div className={styles.children}>{children}</div>
      </AntdForm>
    </FormProvider>
  )
}

export default MainForm
