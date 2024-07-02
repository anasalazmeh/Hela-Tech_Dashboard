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
import TagContext from "../../../context/tags/context";
import TagContextProvider from "../../../context/tags/provider";

interface Props {}

const TagDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(TagContext);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      id && (await actions.getDetails(Number(id)));
    };
    getDetails();
  }, []);

  return (
    <>
      <PageHeader title={"Tag Details"} subTitle={"Tag specefic details"} />
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

                <AntdDescriptions.Item label={"Tag"}>
                  <Tag>{details?.tag}</Tag>
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const TagDetailsPage = () => {
  return (
    <TagContextProvider>
      <TagDetails />
    </TagContextProvider>
  );
};
export default TagDetailsPage;
