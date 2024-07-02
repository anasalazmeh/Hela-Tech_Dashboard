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
import AboutUsDetailsContextProvider from "../../../context/about-us-details/provider";
import AboutUsDetailsContext from "../../../context/about-us-details/context";
interface Props {}

const AboutUsDetailsInfo: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(AboutUsDetailsContext);
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
        title={"About Us Details Main"}
        subTitle={"About Us Details Main specefic details"}
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

                <AntdDescriptions.Item label={"Order"}>
                  {details?.order}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Status"}>
                  <Tag>{details?.status === 0 ? "Hide" : "Show"}</Tag>
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

const AboutUIsDetailsIfnoMainPage = () => {
  return (
    <AboutUsDetailsContextProvider>
      <AboutUsDetailsInfo />
    </AboutUsDetailsContextProvider>
  );
};
export default AboutUIsDetailsIfnoMainPage;
