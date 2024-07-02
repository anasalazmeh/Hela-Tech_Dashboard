import { Button, Col, Divider, Row } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectContext from "../../../context/projects/context";
import ProjectContextProvider from "../../../context/projects/provider";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(ProjectContext);

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      await actions.getDetails(Number(id));
    };

    if (id) {
      getDetails();
    }
  }, []);

  return (
    <>
      <PageHeader
        title={details ? "Update project" : "Create project"}
        subTitle={details ? "Updating the project " : "Adding a new project"}
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
        title="Create project"
        subTitle="Adding a new project"
        onSubmit={async (data) => {
          details
            ? await actions.updateProject(details?.id, data)
            : await actions.createProject(data);
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
          <Col xs={24} lg={24}>
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

const ProjectsForm = () => {
  return (
    <ProjectContextProvider>
      <Form />
    </ProjectContextProvider>
  );
};

export default ProjectsForm;
