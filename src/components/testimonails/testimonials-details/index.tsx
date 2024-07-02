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
import TestimonialContext from "../../../context/testimonial/context";
import TestimonialContextProvider from "../../../context/testimonial/provider";
interface Props {}

const TestimonialDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(TestimonialContext);
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
        title={"Testimonial Details"}
        subTitle={"Testimonial specefic details"}
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

                <AntdDescriptions.Item label={"Full Name"}>
                  {details?.Fullname}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Description"}>
                  {details?.Description}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Order"}>
                  {details?.order}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Rating"}>
                  <Rate disabled value={details?.stars_rating} />
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Status"}>
                  <Tag>{details?.status === 0 ? "Hide" : "Show"}</Tag>
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

const TestimonialsDetailsPage = () => {
  return (
    <TestimonialContextProvider>
      <TestimonialDetails />
    </TestimonialContextProvider>
  );
};
export default TestimonialsDetailsPage;
