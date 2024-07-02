import { Button, Col, Divider, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import Controller from "../../form-components/controller";
import ImageUploader from "../../form-components/image-uploader";
import { MediumFor } from "../../../models/medium/enum";
import FormItem from "../../general/form-item";
import EndPoints from "../../../services/end-points";
import ProcessContextProvider from "../../../context/process/provider";
import ProcessContext from "../../../context/process/context";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(ProcessContext);

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      await actions.getDetails(Number(id));
    };

    if (id) {
      getDetails();
    }
  }, []);

  let types = [1, 2];

  const [imageUrl, setImageUrl] = useState<string>();

  return (
    <>
      <PageHeader
        title={details ? "Update process" : "Create process"}
        subTitle={details ? "Updating the process " : "Adding a new process"}
        extra={[
          <Button
            key={0}
            loading={loading.includes("create") || loading.includes("update")}
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>,
          <Divider key={1} type="vertical" />,
          <Button
            loading={loading.includes("create") || loading.includes("update")}
            form="service-form"
            key={2}
            htmlType="submit"
            type="primary"
          >
            Save
          </Button>,
        ]}
      />

      <MainForm
        formId="service-form"
        title="Create process"
        subTitle="Adding a new process"
        onSubmit={async (data) => {
          details
            ? await actions.updateProcess(details?.id, data)
            : await actions.createProcess(data);
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Title"
              rules={{ required: true }}
              name="title"
              input={{ type: "text" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Language"
              rules={{ required: true }}
              name="lang"
              width="large"
              input={{
                type: "select",
                options: [
                  { label: "Arabic", value: "ar" },
                  { label: "English", value: "en" },
                  { label: "Turkish", value: "tr" },
                ],
              }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Paragraph"
              rules={{ required: true }}
              name="paragraph"
              input={{ type: "text-area" }}
            />
          </Col>

          <Col xs={24} lg={24}>
            {/* Image */}
            <FieldBuilder
              label="Color Image"
              name="color_image"
              rules={{ required: details ? false : true }}
              input={{
                type: "file",
                url:
                  details &&
                  `${process.env.REACT_APP_BASE_IMAGE_URL}${details?.color_image}`,
              }}
            />
          </Col>

          <Col xs={24} lg={24}>
            {/* Image */}
            <FieldBuilder
              label="Black Image"
              name="black_image"
              rules={{ required: details ? false : true }}
              input={{
                type: "file",
                url:
                  details &&
                  `${process.env.REACT_APP_BASE_IMAGE_URL}${details?.black_image}`,
              }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const ProcessForm = () => {
  return (
    <ProcessContextProvider>
      <Form />
    </ProcessContextProvider>
  );
};

export default ProcessForm;
