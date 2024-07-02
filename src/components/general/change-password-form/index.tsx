import React, { useContext } from "react"
import { Controller, useForm, useFormContext } from "react-hook-form"

import { Input } from "antd"
import { ErrorMessage } from "@hookform/error-message"

import styles from "./style.module.scss"
import FormItem from "../../general/form-item"

const ChangePasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext()
  const onSubmit = async (data: any) => {}
  return (
    <>
      {/* Old Password */}
      <FormItem label={"Old Password"}>
        <Controller
          render={({ field }) => {
            return <Input type="password" {...field} />
          }}
          name="oldPassword"
          control={control}
          rules={{
            required: `Field is Required`,
            minLength: {
              value: 6,
              message: "Invalid Password",
            },
          }}
        />
        <ErrorMessage
          errors={errors}
          name="oldPassword"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>
      {/* </FormItem> */}

      {/* New Password */}
      <FormItem label={"New Password"}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return <Input type="password" {...field} />
          }}
          rules={{
            required: `Field is Required`,
            minLength: {
              value: 6,
              message: "Invalid Password",
            },
            maxLength: {
              value: 32,
              message: "Invalid Password",
            },
          }}
        />

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>

      {/* Confirm New Password */}
      <FormItem label={"Confirm New Password"}>
        <Controller
          render={({ field }) => {
            return <Input type="password" {...field} />
          }}
          name="confirmPassword"
          control={control}
          rules={{
            required: `Field is Required`,
            minLength: {
              value: 6,
              message: "Invalid Password",
            },
            maxLength: {
              value: 32,
              message: "Invalid Password",
            },
            validate: (value) => {
              return value === getValues("password") || `Password Missmatched`
            },
          }}
        />

        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>
    </>
  )
}

export default ChangePasswordForm
