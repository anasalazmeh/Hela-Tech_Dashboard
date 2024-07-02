import { Fragment } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import BaseLayout from "./components/general/layout/base-layout";
import Error404 from "./pages/404";
import Login from "./pages/login";
import RequireAuth from "./router/RequireAuth";
import { routes } from "./utils/routes";
// import NotificationsPage from "./pages/notifications"
import UpdateProfileForm from "./pages/update-profile";
function App() {
  const protectedLayout = (
    <RequireAuth>
      <BaseLayout />
    </RequireAuth>
  );

  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/" element={protectedLayout}>
        <Route path="/notifications" element={<></>} />
        <Route path="/profile" element={<UpdateProfileForm />} />
        {routes.map((route, index) => {
          if (route.hasSubMenus === true) {
            return route.subMenus?.map((menu, index) => {
              if (menu.crudRoutes) {
                return (
                  <Route key={index} path={menu.path} element={<Outlet />}>
                    {menu?.crudRoutes?.map((crudRoute, indexRpute) => {
                      return (
                        <Fragment key={index}>
                          <Route key={index} index element={menu.component} />
                          <Route
                            key={index}
                            path={`${crudRoute.path}`}
                            element={crudRoute.component}
                          />
                        </Fragment>
                      );
                    })}
                  </Route>
                );
              } else {
                return (
                  <Route
                    key={index}
                    path={menu.path}
                    element={menu.component}
                  />
                );
              }
            });
          } else {
            if (route.crudRoutes) {
              return (
                <Route key={index} path={route.path} element={<Outlet />}>
                  {route?.crudRoutes?.map((crudRoute, indexRpute) => {
                    return (
                      <Fragment key={index}>
                        <Route key={index} index element={route.component} />
                        <Route
                          key={indexRpute}
                          path={`${crudRoute.path}`}
                          element={crudRoute.component}
                        />
                      </Fragment>
                    );
                  })}
                </Route>
              );
            } else {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              );
            }
          }
        })}
      </Route>
      <Route
        path="*"
        element={
          <>
            <Error404 />
          </>
        }
      />
    </Routes>
  );
}
export default App;
