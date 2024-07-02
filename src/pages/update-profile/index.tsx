import { Button, Col, Divider, Row, Spin } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useContext, useState } from "react"
import PageHeader from "../../components/general/page-header"
import MainForm from "../../components/form-components/main-form"
import FieldBuilder from "../../components/form-components/field-builder"
import http from "../../api/axios"
import Controller from "../../components/form-components/controller"
import ImageUploader from "../../components/form-components/image-uploader"
import { MediumFor } from "../../models/medium/enum"
import FormItem from "../../components/general/form-item"
import styles from "./style.module.scss"
import AuthContext from "../../context/auth/context"
import { act } from "@testing-library/react"

const Form = () => {
  const navigate = useNavigate()

  // get details depends On id (getting from url)

  const { loading, actions, authUser } = useContext(AuthContext)

  const [photoUrl, setPhotoUrl] = useState(authUser?.photo?.url ?? "")

  return (
    <>
      <PageHeader
        title={"Update Profile"}
        subTitle={"Updating Profile"}
        extra={[
          <Button
            // loading={loading.includes("create") || loading.includes("update")}
            loading={loading.includes("update_profile")}
            form="profile-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
      />

      <MainForm
        formId="profile-form"
        title="Update profile"
        subTitle="updatig profile"
        dontNavigate
        onSubmit={async (data) => {
          await actions.updateProfile(data)
        }}
        defaultValues={{
          name: authUser?.name,
          email: authUser?.email,
          mobile: authUser?.mobile,
        }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Name"
              rules={{ required: true }}
              name="name"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Mobile"
              rules={{ required: true }}
              name="mobile"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Email"
              rules={{ required: true }}
              name="email"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={24}>
            <FormItem label="Profile Photo" required>
              <Controller
                name="photoID"
                rules={{
                  required: { value: true, message: "Field is required" },
                }}
                render={({ field }) => {
                  return (
                    <ImageUploader
                      {...field}
                      type="DRAGGER"
                      imageFor={MediumFor.USER_PROFILE}
                      onChange={(response) => {
                        field.onChange(response?.id)
                        setPhotoUrl("")
                      }}
                    />
                  )
                }}
              />
              <div
                style={{
                  position: "relative",
                  color: "gray",
                }}
              >
                {photoUrl}
              </div>
            </FormItem>
          </Col>
        </Row>
      </MainForm>
    </>
  )
}

const UpdateProfileForm = () => {
  return <Form />
}

export default UpdateProfileForm
