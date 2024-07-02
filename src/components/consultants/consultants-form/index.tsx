import { Button, Col, Divider, Row } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FieldBuilder from "../../form-components/field-builder";
import MainForm from "../../form-components/main-form";
import PageHeader from "../../general/page-header";
import ConsultantsContext from "../../../context/Consultants/context";
import ConsultantsContextProvider from "../../../context/Consultants/provider";

const Form = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, details, actions } = useContext(ConsultantsContext);

  // get details depends On id (getting from url)
  useEffect(() => {
    const getDetails = async () => {
      await actions.getDetails(Number(id));
    };

    if (id) {
      getDetails();
    }
  }, []);
  
  console.log(details)
  return (
    <>
      <PageHeader
        title={details ? "Update consultant" : "Create consultant"}
        subTitle={details ? "Updating the consultant " : "Adding a new consultant"}
        extra={[
          <Button
            key={0}
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
        title="Create consultant"
        subTitle="Adding a new consultant"
        onSubmit={async (data) => {
          details
            ? await actions.updateConsultants(details?.id, data)
            : await actions.createConsultants(data);
        }}

        defaultValues={{
          name_en:details?.translations.name.en,
          name_ar:details?.translations.name.ar,
          description_en:details?.translations.description.en,
          description_ar:details?.translations.description.ar,
          specialization_en:details?.translations.specialization.en,
          specialization_ar:details?.translations.specialization.ar,
          image:details?.image
         }}
      >
        <Row gutter={[16, 8]}>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Name English"
              rules={{ required: true }}
              name="name_en"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Name Arabi"
              rules={{ required: true }}
              name="name_ar"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Description English"
              rules={{ required: true }}
              name="description_en"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Description Arabi"
              rules={{ required: true }}
              name="description_ar"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Specialization English"
              rules={{ required: true }}
              name="specialization_en"
              input={{ type: "text" }}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FieldBuilder
              label="Specialization Arabi"
              rules={{ required: true }}
              name="specialization_ar"
              input={{ type: "text" }}
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
                  `${details?.image}`,
              }}
            />
          </Col>
        </Row>
      </MainForm>
    </>
  );
};

const ConsultationForm = () => {
  return (
    <ConsultantsContextProvider>
      <Form />
    </ConsultantsContextProvider>
  );
};

export default ConsultationForm;
