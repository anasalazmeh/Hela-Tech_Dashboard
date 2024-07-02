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
import ProcessContext from "../../context/process/context";
import ProcessContextProvider from "../../context/process/provider";

const Processes = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "left",
      sorter: (a, b) => {
        return a?.title?.localeCompare(b?.title);
      },
      render: (_, record) => {
        return <>{record?.title}</>;
      },
    },
    {
      title: "Language",
      dataIndex: "lang",
      align: "center",
      key: "lang",
      sorter: (a: any, b: any) => {
        return a?.lang?.localeCompare(b?.lang);
      },
      render: (rec) => {
        return <Tag>{rec.toUpperCase()}</Tag>;
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
          <ViewBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              navigate(`details/${record?.id}`);
            }}
          />
          <EditBtn
            loading={loading.includes("delete")}
            onClick={async () => {
              navigate(`update/${record?.id}`);
            }}
          />

          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteProcess(record?.id);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(ProcessContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Processes"}
        subTitle={"All registered Processes"}
        extra={[
          <Button
            type="primary"
            key={2}
            onClick={() => {
              navigate(`/process/create`);
            }}
            icon={<PlusOutlined />}
          >
            Add
          </Button>,

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

const ProcessesPage = () => {
  return (
    <ProcessContextProvider>
      <Processes />
    </ProcessContextProvider>
  );
};

export default ProcessesPage;
