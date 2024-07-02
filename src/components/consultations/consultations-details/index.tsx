import {
  Col,
  Descriptions as AntdDescriptions,
  Descriptions,
  Row,
  Spin,
  Image,
  Tag,
  Rate,
} from "antd";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";
import ConsultantsContextProvider from "../../../context/Consultants/provider";
import ConsultationsContext from "../../../context/consultations/context";
import ConsultationsContextProvider from "../../../context/consultations/provider";

interface Props {}

const ConsultationDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(ConsultationsContext);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      id && (await actions.getDetails(Number(id)));
    };
    getDetails();
  }, []);

  return (
    <>
      <PageHeader
        title={"Consultations Details"}
        subTitle={"Consultations specefic details"}
      />
      <div className={styles.container}>
        {loading.includes("details") ? (
          <div className={styles.spinner}>
            <div>
              <Spin />
            </div>
          </div>
        ) : (
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Descriptions size="middle" column={1} bordered>
                <AntdDescriptions.Item label={"Id"}>
                  {details?.id}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Name"}>
                  {details?.name}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Communicate method"}>
                  {details?.communicate_method}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Name consultant"}>
                  {details?.consultant.translations.name.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Email"}>
                  {details?.email}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Phone"}>
                  {details?.phone}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Company"}>
                  {details?.company}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Address"}>
                  {details?.address}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Consultation subject"}>
                  {details?.note}
                </AntdDescriptions.Item>

              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const ConsultationsDetailsPage = () => {
  return (
    <ConsultationsContextProvider>
      <ConsultationDetails />
    </ConsultationsContextProvider>
  );
};
export default ConsultationsDetailsPage;
