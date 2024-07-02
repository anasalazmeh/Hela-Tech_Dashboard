import { Avatar, Button, Col, Divider, Image, Row, Space, Tag } from "antd";
import FilterCard from "../../components/general/filter-card";
import { useContext, useState, useEffect } from "react";
import RefreshBtn from "../../components/general/header-actions/refresh-btn";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ISort, IStaticFilter } from "../../models/base/base-query";
import { tableOnChange } from "../../utils/helpers/table-sorts-filters";
import { IAnnoucement } from "../../models/annoucements/response";
import ServiceContext from "../../context/services/context";
import ServiceContextProvider from "../../context/services/provider";

const Annoucement = () => {
  const columns: ColumnProps<IAnnoucement>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "left",
      sorter: {
        multiple: 1,
      },
      render: (_, record) => {
        return <>{record?.title}</>;
      },
    },
    {
      title: "Content",
      dataIndex: "content",
      align: "center",
      key: "content",
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
              // await actions.deleteAnnoucement(record?.id);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(ServiceContext);

  useEffect(() => {
    actions.getData();
  }, []);

  // Filters && Sorts
  let tableFiltersProps = {};
  const [sorts, setSorts] = useState<ISort[]>([]);
  // const [, setStaticFilters] = useState<IStaticFilter[]>(query?.filters ?? []);
  const [loadingPage, setLoading] = useState(true);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Annoucements"}
        subTitle={"All registered annoucements"}
        extra={[
          <Button
            type="primary"
            key={2}
            onClick={() => {
              navigate(`/annoucements/create`);
            }}
            icon={<PlusOutlined />}
          >
            Add
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
          showPagination={true}
          size="small"
          columns={columns}
          loading={loading.includes("list")}
          // pageSize={query.perPage}
          // page={query.page}
        />
      </div>
    </>
  );
};

const AnnoucementsPage = () => {
  return (
    <ServiceContextProvider>
      <Annoucement />
    </ServiceContextProvider>
  );
};

export default AnnoucementsPage;
