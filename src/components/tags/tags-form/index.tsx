import { Button, Col, Divider, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext } from "react";
import TagContextProvider from "../../../context/tags/provider";
import TagContext from "../../../context/tags/context";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(TagContext);

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
        title={details ? "Update tag" : "Create tag"}
        subTitle={details ? "Updating the tag " : "Adding a new tag"}
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
        title="Create tag"
        subTitle="Adding a new tag"
        onSubmit={async (data) => {
          details
            ? await actions.updateTag(details?.id, data)
            : await actions.createTag(data);
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Tag"
              rules={{ required: true }}
              name="tag"
              input={{ type: "text" }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const TagForm = () => {
  return (
    <TagContextProvider>
      <Form />
    </TagContextProvider>
  );
};

export default TagForm;
