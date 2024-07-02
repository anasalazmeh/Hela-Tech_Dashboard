import { Button, Space, Tag } from "antd";
import { useContext, useEffect, useState } from "react";
import { ColumnProps } from "antd/lib/table";
import PageHeader from "../../components/general/page-header";
import Table from "../../components/general/table-components/table";
import DeleteBtn from "../../components/general/table-components/actions/delete-btn";
import EditBtn from "../../components/general/table-components/actions/edit-btn";
import ViewBtn from "../../components/general/table-components/actions/view-btn";
import { useNavigate } from "react-router-dom";

import SubscriberContextProvider from "../../context/subscribers/provider";
import SubscriberContext from "../../context/subscribers/context";
import axios from "axios";
import http from "../../api/axios";

const Subscribers = () => {
  const columns: ColumnProps<any>[] = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "left",
      sorter: (a, b) => {
        return a?.email?.localeCompare(b?.email);
      },
      render: (_, record) => {
        return <>{record?.email}</>;
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
          <DeleteBtn
            onConfirm={async () => {
              await actions.deleteSubscriber(record?.id);
            }}
            loading={loading.includes("delete")}
          />
        </Space>
      ),
    },
  ];

  const { actions, list, loading } = useContext(SubscriberContext);

  useEffect(() => {
    actions.getData();
  }, []);

  const navigate = useNavigate();

  const [exportLoading, setExportLoading] = useState(false);
  const fetchFile = async () => {
    try {
      setExportLoading(true);
      const response = await http.get("/subscriptions/export", {
        responseType: "blob",
      });
      const outputFilename = `${Date.now()}.xlsx`;
      const url = window.URL.createObjectURL(new Blob([response?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", outputFilename);
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up and remove the link
    } catch (error) {
      console.error(error);
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title={"Subscribers"}
        subTitle={"All registered subscribers"}
        extra={[
          <Button
            loading={loading.includes("list")}
            key={3}
            onClick={() => actions.getData()}
          >
            Refresh
          </Button>,
          <Button
            type="primary"
            loading={loading.includes("list") || exportLoading}
            key={4}
            onClick={() => {
              fetchFile();
            }}
          >
            Export
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

const SubscribersPage = () => {
  return (
    <SubscriberContextProvider>
      <Subscribers />
    </SubscriberContextProvider>
  );
};

export default SubscribersPage;
