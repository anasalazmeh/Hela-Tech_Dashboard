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
import ServiceContext from "../../../context/services/context";
import ServiceContextProvider from "../../../context/services/provider";
interface Props {}

const SerciceDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(ServiceContext);
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
        title={"Annoucement Details"}
        subTitle={"Annoucement specefic details"}
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

                <AntdDescriptions.Item
                  style={{ textAlign: "center" }}
                  label={"Image"}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    height={"250px"}
                    src={`${process.env.REACT_APP_BASE_IMAGE_URL}${details?.image}`}
                    alt=""
                  />
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Title"}>
                  {details?.title}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Paragraph"}>
                  {details?.paragraph}
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

const ServiceDetailsPage = () => {
  return (
    <ServiceContextProvider>
      <SerciceDetails />
    </ServiceContextProvider>
  );
};
export default ServiceDetailsPage;
