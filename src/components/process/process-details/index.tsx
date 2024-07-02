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
import ProcessContextProvider from "../../../context/process/provider";
import ProcessContext from "../../../context/process/context";
interface Props {}

const ProcessDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(ProcessContext);
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
        title={"Process Details"}
        subTitle={"Process specefic details"}
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
                  label={"Color Image"}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    height={"250px"}
                    src={`${process.env.REACT_APP_BASE_IMAGE_URL}${details?.color_image}`}
                    alt=""
                  />
                </AntdDescriptions.Item>
                <AntdDescriptions.Item
                  style={{ textAlign: "center" }}
                  label={"Black Image"}
                >
                  <Image
                    style={{ objectFit: "cover" }}
                    height={"250px"}
                    src={`${process.env.REACT_APP_BASE_IMAGE_URL}${details?.black_image}`}
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

const ProcessDetailsPage = () => {
  return (
    <ProcessContextProvider>
      <ProcessDetails />
    </ProcessContextProvider>
  );
};
export default ProcessDetailsPage;
