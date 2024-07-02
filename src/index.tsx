import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ConfigProvider, Spin } from "antd";
import AppContextProvider from "./context/app/provider";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth/provider";

const LazyComponent = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  colorLink: "#34C87C",
                  colorLinkHover: "#34C87C",
                },
              },
              token: {
                colorPrimary: "#34C87C",
                colorTextSecondary: "#34C87C",

                fontFamily: "Cairo",
              },
            }}
          >
            <Suspense
              fallback={
                <div className="spinner-container">
                  <Spin size="default" />
                </div>
              }
            >
              <LazyComponent />
            </Suspense>
          </ConfigProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
