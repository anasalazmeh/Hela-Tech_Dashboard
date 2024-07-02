import React, { useContext, useEffect, useState } from "react";
import { Drawer, Button, Image, Popover, Avatar, Badge } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";
import MenuSide from "../menu";
import AppContext from "../../../../context/app/context";
import ProfileCard from "../../../auth/profile-card";
import { FiBell } from "react-icons/fi";
import AuthContext from "../../../../context/auth/context";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { screenSize } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (screenSize === "laptopOrDesktop" || screenSize === "mobileOrTablet") {
      setVisible(false);
    }
  }, [screenSize]);

  // User Popover
  const [userPopoverVisible, setUserPopoverVisible] = useState(false);

  // Auth context
  const { authUser: user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Button
        className="menu"
        type="primary"
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
          }}
        >
          <span className="bell-icon-tablet">
            <FiBell
              color="white"
              size="20"
              onClick={() => {
                navigate("/notifications");
              }}
            />
          </span>

          <Popover
            trigger="click"
            open={userPopoverVisible}
            onOpenChange={setUserPopoverVisible}
            placement="bottomRight"
            content={
              <ProfileCard toogleUserPopoverVisible={setUserPopoverVisible} />
            }
          >
            <div className={"avatarContainer"}>
              <Avatar
                size="large"
                src={user?.photo?.url ?? "/images/user.jpg"}
              />

              <div className={"username"}>
                <div dir="rtl">{`${user?.name ?? "Administrator"}`}</div>
                <small dir="rtl" style={{ opacity: "0.5" }}>
                  {`${user?.email ?? "email"}`}
                </small>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Image
              preview={false}
              src={`/images/logo.png`}
              width={60}
              alt={"logo"}
              style={{ marginBottom: "1rem" }}
            />
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                position: "relative",
                bottom: "8px",
                left: "5px",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Hela
              </span>
              <span
                style={{
                  color: "white",
                  opacity: "0.5",
                  fontSize: "0.895rem",
                  fontWeight: "400",
                }}
              >
                Admin Panel
              </span>
            </div>
          </div>
        }
        headerStyle={{
          backgroundColor: "rgb(33, 37, 41)",
          color: "white",
          placeItems: "flex-end",
        }}
        closable={false}
        placement="left"
        className="drawer"
        width={"17.5rem"}
        bodyStyle={{ padding: 0, backgroundColor: "rgb(33, 37, 41)" }}
        onClose={() => setVisible(false)}
        open={visible}
        footerStyle={{
          backgroundColor: "rgb(33, 37, 41)",
          color: "white",
        }}
        footer={
          <>
            <h5
              style={{
                opacity: "0.8",
              }}
            >
              Hela Admin Panel
            </h5>
            <h5 style={{ opacity: "0.7" }}>© Copyright 2023</h5>
          </>
        }
      >
        <MenuSide />
      </Drawer>
    </nav>
  );
};
export default NavBar;
