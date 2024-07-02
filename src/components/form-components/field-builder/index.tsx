import {
  Checkbox,
  CheckboxOptionType,
  Col,
  DatePicker,
  Form,
  Input as AntdInput,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  TimePicker,
  Image as AntdImage,
  UploadFile,
  Rate,
} from "antd";
import Controller from "../../form-components/controller";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import Switch from "../../general/antd/switch";
import styles from "./styles.module.scss";
import { RcFile } from "antd/es/upload";
import { RegisterOptions, useForm, useFormContext } from "react-hook-form";
import { a2e } from "../../../utils/helpers/functions";
// import moment from 'moment'
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import FormItem from "../../general/form-item";
import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import AntdImgCrop from "antd-img-crop";

const { RangePicker } = DatePicker;
const { TextArea, Search } = AntdInput;

interface Rules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: { value: RegExp; message?: string };
}

type Field =
  | { type: "email" }
  | { type: "username" }
  | { type: "gsm" }
  | { type: "pin" }
  | { type: "text" }
  | { type: "hidden-type" }
  | { type: "hidden" }
  | {
      type: "select-type";
      options?: { label: string; value: any }[];
      loading?: boolean;
      allowSearch?: boolean;
    }
  | { type: "text-area"; rows?: number }
  | { type: "number" }
  | { type: "search" }
  | { type: "password" }
  | { type: "checkBox" }
  | { type: "switch" }
  | { type: "time-picker"; format?: string; dateTime?: boolean }
  | { type: "time-range-picker"; format?: string }
  | { type: "date-picker"; format?: string; dateTime?: boolean }
  | { type: "range-picker"; format?: string }
  | { type: "radio"; options?: CheckboxOptionType[] }
  | {
      type: "select";
      options?: { label: string; value: any }[];
      loading?: boolean;
      allowSearch?: boolean;
    }
  | {
      type: "multiSelect";
      options?: { label: string; value: any }[];
      loading?: boolean;
      allowSearch?: boolean;
    }
  | { type: "color-picker" }
  | { type: "file"; url?: string }
  | { type: "file-list" }
  | { type: "rating" };

interface Props {
  name: string;
  label?: string;
  labelCol?: number;
  input: Field;
  rules?: Rules;
  width?: "large" | "middle" | "small";
  disabled?: boolean;
}
const { Dragger } = Upload;

const prop: UploadProps = {
  accept: "image/png, image/jpeg , image/jpg",
  name: "file",
  multiple: true,
  action: "https://chamaa2.autozonegroup.com/public/api/v1/media",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const FieldBuilder: React.FC<Props> = (props) => {
  const { control } = useFormContext();
  const [width, setWidth] = useState<string>("");

  const [fileListLogo, setFileListLogo] = useState<UploadFile[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {
    switch (props.width) {
      case "large":
        setWidth("100%");
        break;
      case "middle":
        setWidth("50%");
        break;
      case "small":
        setWidth("25%");
        break;

      default:
        setWidth("50%");
        break;
    }
  }, []);

  const rules = (
    rules?: Rules
  ): Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  > => {
    return {
      required: rules?.required
        ? {
            value: rules.required,
            message: `Required field ${props.name}`,
          }
        : undefined,
      minLength: rules?.minLength
        ? {
            value: rules.minLength,
            message: `min length`,
            // message: t(`min_length ${props.rules?.minLength}`, {
            //   input: t(props.name),
            //   value: rules.minLength,
            // }),
          }
        : undefined,
      maxLength: rules?.maxLength
        ? {
            value: rules.maxLength,
            message: "max length",
          }
        : undefined,
      max: rules?.max
        ? {
            value: rules.max,
            message: "max value",
          }
        : undefined,
      min: rules?.min
        ? {
            value: rules.min,
            message: "min value",
          }
        : undefined,
      pattern: rules?.pattern
        ? {
            value: rules.pattern.value,
            message: rules.pattern.message ?? "Invalid pattern name",
          }
        : undefined,
    };
  };
  return (
    <FormItem
      label={props.input.type == "checkBox" ? "" : props.label}
      required={props.rules?.required}
    >
      <Controller
        name={props.name}
        control={control}
        rules={rules(props.rules)}
        render={({ field: { ...field } }) => {
          const input = props.input;
          switch (input.type) {
            case "text-area":
              return (
                <TextArea
                  {...field}
                  rows={input?.rows ?? 3}
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
            case "email":
              return (
                <Input
                  {...field}
                  prefix={<MailOutlined />}
                  placeholder={`Email`}
                  disabled={props?.disabled}
                />
              );
            case "username":
              return (
                <Input
                  {...field}
                  prefix={<UserOutlined />}
                  placeholder={`${"username"}`}
                  disabled={props?.disabled}
                />
              );
            case "gsm":
              return (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(a2e(e.currentTarget.value));
                  }}
                  prefix="+963"
                  placeholder={`gsm`}
                  style={{ direction: "ltr" }}
                  disabled={props?.disabled}
                />
              );
            case "pin":
              return (
                <AntdInput.Password
                  {...field}
                  onChange={(e) => {
                    field.onChange(a2e(e.currentTarget.value));
                  }}
                  size="middle"
                  className="shadow"
                  prefix={<LockOutlined />}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
            case "password":
              return (
                <AntdInput.Password
                  {...field}
                  size="middle"
                  className="shadow"
                  prefix={<LockOutlined />}
                  placeholder={props.label}
                />
              );
            case "search":
              return (
                <Search
                  {...field}
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
            case "number":
              return (
                <InputNumber
                  {...field}
                  style={{ width: "100%" }}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
            case "rating":
              return (
                <Rate
                  {...field}
                  style={{ width: "100%" }}
                  disabled={props?.disabled}
                />
              );
            case "hidden":
              return (
                <Input
                  {...field}
                  type="hidden"
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
            case "hidden-type":
              return (
                <div>
                  <Input
                    {...field}
                    allowClear={!props.rules?.required}
                    placeholder={props.label}
                    disabled={props?.disabled}
                  />
                </div>
              );
            case "switch":
              return (
                <Switch
                  {...field}
                  checked={field.value}
                  disabled={props?.disabled}
                />
              );
            case "time-picker":
              return (
                <TimePicker
                  {...field}
                  style={{ width: "100%" }}
                  allowClear={!props.rules?.required}
                  value={field.value ? dayjs(field.value, "h:mm A") : undefined}
                  onChange={(_, dateString) => {
                    field.onChange(dateString);
                  }}
                  use12Hours
                  format="h:mm A"
                  disabled={props?.disabled}
                />
              );
            case "time-range-picker":
              const timePickerValue: [any, any] = [null, null];

              if (field.value) {
                timePickerValue[0] = !isEmpty(field.value[0])
                  ? dayjs(field.value[0], input.format)
                  : null;

                timePickerValue[1] = !isEmpty(field.value[1])
                  ? dayjs(field.value[1], input.format)
                  : null;
              }
              return (
                <TimePicker.RangePicker
                  {...field}
                  style={{ width: "100%" }}
                  allowClear={!props.rules?.required}
                  value={timePickerValue}
                  onChange={(_, dateString) => {
                    field.onChange(dateString);
                  }}
                  format={input.format}
                  disabled={props?.disabled}
                />
              );

            case "date-picker":
              return (
                <DatePicker
                  {...field}
                  style={{ width: "100%" }}
                  className="shadow"
                  allowClear={!props.rules?.required}
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(date, dateString) => {
                    console.log(dateString);
                    if (input.dateTime) {
                      let date =
                        dayjs(dateString).format("YYYY-MM-DDTHH:mm:ss.SSS") +
                        "Z";
                      field.onChange(date);
                    } else {
                      field.onChange(dateString);
                    }
                  }}
                  format={input?.format}
                  disabled={props?.disabled}
                  // showTime
                />
              );
            case "range-picker":
              const rangePickerValue: [any, any] = [null, null];

              if (field.value) {
                rangePickerValue[0] = !isEmpty(field.value[0])
                  ? dayjs(field.value[0])
                  : null;

                rangePickerValue[1] = !isEmpty(field.value[1])
                  ? dayjs(field.value[1])
                  : null;
              }

              return (
                <RangePicker
                  {...field}
                  className="shadow"
                  style={{ width: "100%" }}
                  allowEmpty={[true, true]}
                  allowClear={!props.rules?.required}
                  value={rangePickerValue}
                  onChange={(dates, datesString) => {
                    field.onChange([datesString[0], datesString[1]]);
                  }}
                  format={input.format}
                  disabled={props?.disabled}
                />
              );
            case "radio":
              return (
                <Radio.Group {...field} optionType="default">
                  <Row gutter={[20, 20]} justify="center">
                    {input.options?.map((option, key) => (
                      <Col key={key}>
                        <Radio
                          key={key}
                          className={styles["radio-option"]}
                          {...option}
                        >
                          {option.label}
                        </Radio>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              );

            case "select":
              return (
                <Select
                  {...field}
                  className={`shadow ${styles.width}`}
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  options={input.options}
                  loading={input?.loading}
                  showSearch={input?.allowSearch}
                  optionLabelProp="label"
                  style={{ width: width }}
                  optionFilterProp="label"
                  disabled={props?.disabled}
                />
              );
            case "select-type":
              return (
                <Select
                  {...field}
                  className={`shadow ${styles.width}`}
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  options={input.options}
                  loading={input?.loading}
                  showSearch={input?.allowSearch}
                  optionLabelProp="label"
                  style={{ width: width }}
                  optionFilterProp="label"
                  disabled={props?.disabled}
                ></Select>
              );
            case "multiSelect":
              return (
                <Select
                  {...field}
                  className="shadow"
                  allowClear={!props.rules?.required}
                  mode="multiple"
                  placeholder={props.label}
                  options={input.options}
                  style={{ width: width }}
                  loading={input?.loading}
                  showSearch={input?.allowSearch}
                  optionLabelProp="label"
                  optionFilterProp="label"
                  disabled={props?.disabled}
                />
              );
            case "checkBox":
              return (
                <div>
                  {/* <label style={{ marginInlineEnd: '.8rem' }}> </label> */}
                  <Checkbox
                    {...field}
                    checked={field.value}
                    className="shadow"
                    defaultChecked={false}
                    style={{ width: "100%" }}
                    disabled={props?.disabled}
                  >
                    {`${props.label}`}
                  </Checkbox>
                </div>
              );
            case "file":
              return (
                <>
                  <Dragger
                    multiple={false}
                    fileList={fileListLogo}
                    beforeUpload={(file: any) => {
                      setFileListLogo([file]);
                      field.onChange(file);

                      /* update state here */
                      return false;
                    }}
                    onRemove={() => {
                      setFileListLogo([]);
                      field.onChange(undefined);
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
                  {input?.url && (
                    <div className={styles.oldImageContainer}>
                      <span className={styles.p0}>
                        <AntdImage
                          className={styles.imageIcon}
                          src={input?.url}
                          placeholder={true}
                        />
                      </span>
                    </div>
                  )}
                </>
              );

            case "file-list":
              return (
                <AntdImgCrop zoomSlider rotationSlider>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={(uploadFile, kkk) => {
                      // console.log("kk", uploadFile)
                      let files = fileList;

                      const reader = new FileReader();
                      reader.readAsDataURL(uploadFile);
                      reader.onload = () => {
                        files = [
                          ...files,
                          { file: uploadFile, url: reader.result } as any,
                        ];

                        field.onChange(files.map((file: any) => file.file));

                        setFileList(files);
                        // setFileList((prev: any) => [
                        //   ...prev,
                        //   { url: reader.result },
                        // ])
                      };

                      return false;
                    }}
                    onChange={({ fileList: newFileList }) => {
                      // console.log(newFileList)
                      // console.log("NewfileList", newFileList)
                      // setFileList(newFileList)
                      // field.onChange(newFileList.map((file) => file))
                    }}
                    onRemove={(f) => {
                      console.log("fff", f);
                      let files = [...fileList];

                      console.log("files", files);

                      let fileIndex = files.findIndex(
                        (file) => file.uid === f.uid
                      );

                      if (fileIndex !== -1) {
                        files.splice(fileIndex, 1);

                        field.onChange(files.map((file: any) => file.file));
                        setFileList(files);
                      }
                    }}
                    onPreview={onPreview}
                    customRequest={(options) => {
                      console.log("options", options);
                    }}
                  >
                    {fileList.length < 10 && "+ Upload"}
                  </Upload>
                </AntdImgCrop>
              );
            default:
              return (
                <Input
                  {...field}
                  hidden
                  allowClear={!props.rules?.required}
                  placeholder={props.label}
                  disabled={props?.disabled}
                />
              );
          }
        }}
      />
    </FormItem>
  );
};

export default FieldBuilder;
