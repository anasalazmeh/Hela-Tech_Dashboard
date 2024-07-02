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
import TagContext from "../../context/tags/context";
import TagContextProvider from "../../context/tags/provider";

const Tags = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      align: "center",
      sorter: (a, b) => {
        return a?.tag?.localeCompare(b?.tag);
      },
      render: (_, record) => {
        return <Tag>{record?.tag}</Tag>;
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
              await actions.deleteTag(record?.id);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(TagContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={"Tags"}
        subTitle={"All registered tags"}
        extra={[
          <Button
            type="primary"
            key={2}
            onClick={() => {
              navigate(`/tags/create`);
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

const TagsPage = () => {
  return (
    <TagContextProvider>
      <Tags />
    </TagContextProvider>
  );
};

export default TagsPage;
