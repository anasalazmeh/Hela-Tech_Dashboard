import { Button, Col, Divider, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import { useEffect, useContext, useState } from "react";
import TeamMemberContextProvider from "../../../context/team_members/provider";
import TeamMemberContext from "../../../context/team_members/context";
import http from "../../../api/axios";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(TeamMemberContext);

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      await actions.getDetails(Number(id));
    };

    if (id) {
      getDetails();
    }
  }, []);

  const [tags, setTags] = useState<any[]>([]);
  const [tagsLoading, setTagsLoading] = useState(false);

  useEffect(() => {
    const getTags = async () => {
      try {
        setTagsLoading(true);
        const { data } = await http.get("/dashboard/tags_section");
        setTags(data.data);
      } catch (err) {
      } finally {
        setTagsLoading(false);
      }
    };
    getTags();
  }, []);

  return (
    <>
      <PageHeader
        title={details ? "Update team member" : "Create team member"}
        subTitle={
          details ? "Updating the team member " : "Adding a new team member"
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
        title="Create service"
        subTitle="Adding a new service"
        onSubmit={async (data) => {
          details
            ? await actions.updateTeamMember(details?.id, data)
            : await actions.createTeamMember(data);
        }}
        defaultValues={{ ...details }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Full Name"
              rules={{ required: true }}
              name="Fullname"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Job Title"
              rules={{ required: true }}
              name="Job_title"
              input={{ type: "text" }}
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
              label="Tags"
              rules={{ required: true }}
              name="tags"
              width="large"
              input={{
                type: "multiSelect",
                loading: tagsLoading,
                options: tags.map((tag) => {
                  return {
                    label: tag.tag,
                    value: tag.id,
                  };
                }),
              }}
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

const TeamMemberForm = () => {
  return (
    <TeamMemberContextProvider>
      <Form />
    </TeamMemberContextProvider>
  );
};

export default TeamMemberForm;
