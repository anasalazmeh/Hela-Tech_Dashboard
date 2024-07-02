import { Layout } from "antd"
import React, { ReactFragment } from "react"
import { Outlet } from "react-router-dom"
import LayoutContent from "../layout-conent"
import NavBar from "../navbar"
import SideBar from "../sidebar"

const BaseLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <Layout>
        <SideBar />
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </Layout>
    </>
  )
}

export default BaseLayout
