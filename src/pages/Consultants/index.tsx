import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tag } from "antd";
import { ColumnProps } from "antd/lib/table";
import { useContext, useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/general/page-header";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import Table from "../../components/general/table-components/table";
import ConsultantsContext from "../../context/Consultants/context";
import ConsultantsContextProvider from "../../context/Consultants/provider";


const Consultants = () => {
  const [isloading,setLoading] =useState(0)
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
        return a?.translations.name.en?.localeCompare(b?.translations.name.en);
      },
      render: (_, record) => {
        return <>{record?.translations.name.en}</>;
      },
    },

    {
      title: "Specialization",
      dataIndex: "specialization",
      key: "specialization",
      align: "center",
      render: (_, record) => {
        return <>{record?.translations.specialization.en}</>;
      },
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
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
            loading={loading.includes("details")}
            onClick={async () => {
              navigate(`details/${record?.id}`);
            }}
          />
          <EditBtn
            loading={loading.includes("update")}
            onClick={async () => {
              navigate(`update/${record?.id}`);
            }}
          />

          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteConsultants(record?.id);
            }}
            onClick={()=>setLoading(record?.id)}
            loading={isloading == record?.id && loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(ConsultantsContext);

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
            type="primary"
            key={2}
            onClick={() => {
              navigate(`/consultants/create`);
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

const ConsultantsPage = () => {
  return (
    <ConsultantsContextProvider>
      <Consultants />
    </ConsultantsContextProvider>
  );
};

export default ConsultantsPage;
