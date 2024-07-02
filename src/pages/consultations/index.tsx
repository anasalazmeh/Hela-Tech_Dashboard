import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/general/page-header";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import Table from "../../components/general/table-components/table";
import ConsultantsContext from "../../context/Consultants/context";
import ConsultantsContextProvider from "../../context/Consultants/provider";
import ConsultationsContext from "../../context/consultations/context";
import ConsultationsContextProvider from "../../context/consultations/provider";

const Consultation = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      align: "left",
      render: (_, record) => {
        return <>{record?.id}</>;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: (a, b) => {
        return a?.name?.localeCompare(b?.name);
      },
      render: (_, record) => {
        return <>{record?.name}</>;
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (_, record) => {
        return <>{record?.email}</>;
      },
    },
    {
      title: "Phonet",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      render: (_, record) => {
        return <>{record?.phone}</>;
      },
    },
    {
      title: "Communicate method",
      dataIndex: "communicate_method",
      key: "communicate_method",
      align: "center",
      render: (_, record) => {
        return <>{record?.communicate_method}</>;
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      sorter: (a, b) => {
        return a?.created_at?.localeCompare(b?.created_at);
      },
      render: (_, record) => {
        return <>{record?.created_at}</>;
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
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(ConsultationsContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Consultants"}
        subTitle={"All registered consultants"}
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

const ConsultationsPage = () => {
  return (
    <ConsultationsContextProvider>
      <Consultation />
    </ConsultationsContextProvider>
  );
};

export default ConsultationsPage;
