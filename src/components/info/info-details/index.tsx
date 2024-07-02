import {
  Col,
  Descriptions as AntdDescriptions,
  Descriptions,
  Row,
  Spin,
  Image,
  Tag,
} from "antd";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";
import InfoContext from "../../../context/info/context";
import InfoContextProvider from "../../../context/info/provider";
interface Props {}

const InfoDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(InfoContext);
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
        title={"Info item Details"}
        subTitle={"Info item specefic details"}
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

                <AntdDescriptions.Item label={"Email"}>
                  {details?.email}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"location"}>
                  {details?.location}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Phone Number"}>
                  {details?.phonenumber}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Language"}>
                  <Tag>{details?.lang.toUpperCase()}</Tag>
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const InfoDetailsPage = () => {
  return (
    <InfoContextProvider>
      <InfoDetails />
    </InfoContextProvider>
  );
};
export default InfoDetailsPage;
