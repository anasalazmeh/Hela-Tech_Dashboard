import { Button, Space, Tag, Tooltip } from "antd";
import { useContext, useEffect } from "react";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import TestimonialContextProvider from "../../context/testimonial/provider";
import TestimonialContext from "../../context/testimonial/context";
import ProjectContextProvider from "../../context/projects/provider";
import ProjectContext from "../../context/projects/context";
import VideoContextProvider from "../../context/video/provider";
import VideoContext from "../../context/video/context";
import WelcomeContextProvider from "../../context/welcome/provider";
import WelcomeContext from "../../context/welcome/context";

const Welcome = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Language",
      dataIndex: "lang",
      key: "lang",
      align: "left",
      render: (_, record) => {
        return <>{record?.lang}</>;
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",

      render: (_, record) => {
        return <Tag>{record.status === 0 ? "Hide" : "Show"}</Tag>;
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
          <Tooltip title="Update">
            <Button
              loading={loading.includes("update")}
              shape="circle"
              type="primary"
              icon={<InfoOutlined />}
              onClick={async () => {
                actions.changeStatus(record.id);
              }}
            />
          </Tooltip>

          <EditBtn
            loading={loading.includes("update")}
            onClick={async () => {
              navigate(`update/${record?.id}`);
            }}
          />

          <ViewBtn
            loading={loading.includes("update")}
            onClick={async () => {
              navigate(`details/${record?.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(WelcomeContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Welcome"}
        subTitle={"Registered Welcome"}
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

const WelcomePage = () => {
  return (
    <WelcomeContextProvider>
      <Welcome />
    </WelcomeContextProvider>
  );
};

export default WelcomePage;
