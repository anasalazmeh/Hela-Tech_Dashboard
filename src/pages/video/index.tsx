import { Button, Space, Tag } from "antd";
import { useContext, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TestimonialContextProvider from "../../context/testimonial/provider";
import TestimonialContext from "../../context/testimonial/context";
import ProjectContextProvider from "../../context/projects/provider";
import ProjectContext from "../../context/projects/context";
import VideoContextProvider from "../../context/video/provider";
import VideoContext from "../../context/video/context";

const Projects = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Url",
      dataIndex: "url",
      key: "title",
      align: "left",
      render: (_, record) => {
        return <>{record?.title}</>;
      },
    },

    {
      title: "Actions",
      dataIndex: "",
      width: 200,
      align: "center",
      key: "x",
      render: (_: any, record) => (
        <Space>
          <EditBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              actions.setDetails(record);
              navigate(`update/${record?.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(VideoContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Video"}
        subTitle={"Registered video"}
        extra={[
          <Button
            loading={loading.includes("list")}
            key={3}
            onClick={() => actions.getData()}
          >
            Refresh
          </Button>,
        ]}
      />
      {/* <FilterCard
        onReset={() => {}}
        applyLoading={false}
        resetLoading={false}
        formId="sad"
      >
        <></>
      </FilterCard> */}

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 0.125rem 0.25rem rgba(28, 43, 54, 0.075)",
        }}
      >
        <Table<any>
          rowKey="id"
          showPagination={false}
          size="small"
          columns={columns}
          dataSource={list ?? []}
          loading={loading.includes("list")}
          total={list?.length}
        />
      </div>
    </>
  );
};

const VideoPage = () => {
  return (
    <VideoContextProvider>
      <Projects />
    </VideoContextProvider>
  );
};

export default VideoPage;
