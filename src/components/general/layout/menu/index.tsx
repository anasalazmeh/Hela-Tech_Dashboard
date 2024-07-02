import { useEffect, useState } from "react"
import { Menu } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { routes } from "../../../../utils/routes"

const MenuSide = () => {
  // To Route
  const navigate = useNavigate()

  let location = useLocation()

  let singlePathFirst = location.pathname.split("/")
  singlePathFirst.splice(2, 2)

  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/"
      : singlePathFirst.join("/")
  )

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        let singlePath = location.pathname.split("/")
        singlePath.splice(2, 2)
        setCurrent(singlePath.join("/"))
      }
    }
  }, [location, current])

  return (
    <Menu
      mode="inline"
      style={{ background: "rgb(33, 37, 41)" }}
      theme="dark"
      defaultSelectedKeys={[current]}
      selectedKeys={[current]}
      items={routes.map((route) => {
        if (!route?.hasSubMenus) {
          return {
            key: route?.path,
            label: route.labelKey,
            icon: route.icon,
            onClick: () => {
              navigate(route.path)
            },
          }
        } else {
          return {
            key: route.path,
            label: route.labelKey,
            icon: route.icon,
            children: route.subMenus?.map((subRoute) => {
              return {
                key: subRoute.path,
                label: subRoute.labelKey,
                icon: subRoute.icon,
                onClick: () => {
                  navigate(subRoute.path)
                },
              }
            }),
          }
        }
      })}
    />
  )
}
export default MenuSide
