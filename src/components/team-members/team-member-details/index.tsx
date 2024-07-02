import {
  Col,
  Descriptions as AntdDescriptions,
  Descriptions,
  Row,
  Spin,
  Image,
  Tag,
  Select,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";
import TeamMemberContext from "../../../context/team_members/context";
import TeamMemberContextProvider from "../../../context/team_members/provider";
import http from "../../../api/axios";
interface Props {}

const TeamMemberDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(TeamMemberContext);
  const { id } = useParams();

  useEffect(() => {
    const getDetails = async () => {
      id && (await actions.getDetails(Number(id)));
    };
    getDetails();
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
        title={"Team Member Details"}
        subTitle={"Team Member specefic details"}
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
                    src={`${process.env.REACT_APP_BASE_IMAGE_URL}${details?.team_mamber?.image}`}
                    alt=""
                  />
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Full Name"}>
                  {details?.team_mamber?.Fullname}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Order"}>
                  {details?.team_mamber?.order}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"Job Title"}>
                  {details?.team_mamber?.Job_title}
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Tags"}>
                  <Select
                    mode="multiple"
                    defaultValue={details?.tags ? [...details?.tags] : []}
                    disabled
                    options={tags?.map((tag) => {
                      return {
                        label: tag.tag,
                        value: tag.id,
                      };
                    })}
                  />
                </AntdDescriptions.Item>
                <AntdDescriptions.Item label={"Language"}>
                  <Tag>{details?.team_mamber?.lang.toUpperCase()}</Tag>
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const TeamMemberDetailsPage = () => {
  return (
    <TeamMemberContextProvider>
      <TeamMemberDetails />
    </TeamMemberContextProvider>
  );
};
export default TeamMemberDetailsPage;
