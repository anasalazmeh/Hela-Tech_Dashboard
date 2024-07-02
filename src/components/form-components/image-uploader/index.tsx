import React, { useState } from "react"
import { Progress, Spin, Upload } from "antd"
// import { useTranslation } from "react-i18next";
import { isImageTypeSupport } from "../../../utils/helpers/support-images"
import {
  errorNotification,
  successNotification,
} from "../../../utils/helpers/notification"
import { MediumFor } from "../../../models/medium/enum"
import { InboxOutlined } from "@ant-design/icons"
import { ACCESS_TOKEN } from "../../../utils/helpers/constants"
import { IMedium } from "../../../models/medium/response"
import axios from "axios"

const { Dragger } = Upload

interface IProps {
  imageFor: MediumFor
  onChange: (response: IMedium | null) => void
  type?: "DRAGGER" | "BUTTON"
  children?: React.ReactNode
  showPercentage?: boolean
}

const ImageUploader: React.FC<IProps> = ({
  imageFor,
  onChange,
  showPercentage,
  type,
  children,
}) => {
  // const { t } = useTranslation();

  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])

  const [percentage, setPercentage] = useState<number>()

  return (
    <>
      {type === "DRAGGER" ? (
        <>
          <Spin spinning={uploading}>
            <Dragger
              accept="*"
              name="medium"
              listType="text"
              multiple={false}
              onRemove={() => {
                setFileList([])
                onChange(null)
              }}
              beforeUpload={(file) => {
                setUploading(true)
                onChange(null)

                // Check File Type.
                // const isImageSupport = isImageTypeSupport(file.type)

                // if (!isImageSupport) {
                //   // errorNotification(t("you_can_only_upload_images"));
                //   errorNotification("Error")
                //   setUploading(false)
                //   return false
                // }

                // Compress Image
                setFileList([file])
                return file
              }}
              onChange={({ file }) => {
                if (showPercentage) {
                  setPercentage(file.percent)
                }

                if (file.status === "error") {
                  setUploading(false)
                  errorNotification("upload_failed")
                }
                if (file.status === "done") {
                  onChange(file?.response)
                  successNotification("upload_success")
                  setUploading(false)
                }
              }}
              fileList={[...fileList]}
              action={process.env.REACT_APP_UPLOAD_FILE_URL}
              headers={{
                Authorization: `Bearer ${
                  localStorage.getItem(ACCESS_TOKEN) ??
                  sessionStorage.getItem(ACCESS_TOKEN)
                }`,
              }}
              data={() => {
                return {
                  for: imageFor,
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">{"Select or Drag a File"}</p>
            </Dragger>
            {showPercentage && (
              <Progress percent={Math.trunc(percentage ?? 0)} />
            )}
          </Spin>
        </>
      ) : (
        <>
          <Upload
            showUploadList={false}
            accept="image/*"
            name="medium"
            listType="text"
            multiple={false}
            onRemove={() => {
              setFileList([])
              onChange(null)
            }}
            beforeUpload={(file) => {
              setUploading(true)
              onChange(null)

              // Check File Type.
              // const isImageSupport = isImageTypeSupport(file.type)

              // if (!isImageSupport) {
              //   errorNotification("Error")
              //   setUploading(false)
              //   return false
              // }

              // Compress Image
              setFileList([file])
              // return compressImage(file)
              return file
            }}
            onChange={({ file }) => {
              if (file.status === "error") {
                setUploading(false)
                errorNotification("upload_failed")
              }
              if (file.status === "done") {
                onChange(file?.response)
                successNotification("upload_success")
                setUploading(false)
              }
            }}
            fileList={[...fileList]}
            action={process.env.REACT_APP_UPLOAD_FILE_URL}
            headers={{
              Authorization: `Bearer ${
                localStorage.getItem(ACCESS_TOKEN) ??
                sessionStorage.getItem(ACCESS_TOKEN)
              }`,
            }}
            data={() => {
              return {
                // type: MediumType.Image,
                for: imageFor,
              }
            }}
          >
            {children}
          </Upload>
        </>
      )}
    </>
  )
}

export default ImageUploader
