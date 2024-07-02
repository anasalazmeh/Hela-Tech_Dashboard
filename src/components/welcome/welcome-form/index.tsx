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
import WelcomeContextProvider from "../../../context/welcome/provider";
import WelcomeContext from "../../../context/welcome/context";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(WelcomeContext);

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
        title={details ? "Update welcome" : "Create welcome"}
        subTitle={details ? "Updating the welcome " : "Adding a new welcome"}
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
        title="Create service"
        subTitle="Adding a new service"
        onSubmit={async (data) => {
          details && (await actions.updateWelcome(details?.id, data));
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

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Order"
              rules={{ required: true, min: 1 }}
              name="order"
              input={{ type: "number" }}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Status"
              rules={{ required: true }}
              name="status"
              width="large"
              input={{
                type: "select",
                options: [
                  { label: "Show", value: 1 },
                  { label: "Hide", value: 0 },
                ],
              }}
            />
          </Col>

          <Col xs={24} lg={24}>
            {/* Image */}
            <FieldBuilder
              label="Image"
              name="image"
              rules={{ required: details ? false : true }}
              input={{
                type: "file",
                url:
                  details &&
                  `${process.env.REACT_APP_BASE_IMAGE_URL}${details?.image}`,
              }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const WelcomeForm = () => {
  return (
    <WelcomeContextProvider>
      <Form />
    </WelcomeContextProvider>
  );
};

export default WelcomeForm;
