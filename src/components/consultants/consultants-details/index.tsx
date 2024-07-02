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
import ConsultantsContext from "../../../context/Consultants/context";
import ConsultantsContextProvider from "../../../context/Consultants/provider";

interface Props {}

const ConsultationsDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(ConsultantsContext);
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
        title={"Consultant Details"}
        subTitle={"Consultant specefic details"}
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
                <AntdDescriptions.Item label={"Id"} labelStyle={{width:"200px"}}>
                  {details?.id}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item
                  style={{ textAlign: "center" }}
                  label={"Image"}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    height={"250px"}
                    src={`${details?.image}`}
                    alt="image"
                  />
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Name English"}>
                  {details?.translations.name.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Name Arabi"}>
                  {details?.translations.name.ar}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Description English"}  >
                  {details?.translations.description.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Description Arabi"}>
                  {details?.translations.description.ar}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Specialization English"}>
                  {details?.translations.specialization.en}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Specialization Arabi"}>
                  {details?.translations.specialization.ar}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Created at"}>
                  {details?.created_at}
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
    <ConsultantsContextProvider>
      <ConsultationsDetails />
    </ConsultantsContextProvider>
  );
};
export default ConsultationsDetailsPage;
