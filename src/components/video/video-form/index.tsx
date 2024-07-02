import { Button, Col, Divider, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useContext } from "react";
import VideoContext from "../../../context/video/context";
import VideoContextProvider from "../../../context/video/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(VideoContext);

  return (
    <>
      <PageHeader
        title={details ? "Update testimonial" : "Create testimonial"}
        subTitle={
          details ? "Updating the testimonial " : "Adding a new testimonial"
        }
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
        title="Create testimonial"
        subTitle="Adding a new testimonial"
        onSubmit={async (data) => {
          details && (await actions.updateVideo(details?.id, data));
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="URL"
              rules={{ required: true }}
              name="url"
              input={{ type: "text" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const VideoForm = () => {
  return (
    <VideoContextProvider>
      <Form />
    </VideoContextProvider>
  );
};

export default VideoForm;
