import { Navigate } from "react-router-dom"

import React, { ReactNode, useContext } from "react"
import AuthContext from "../context/auth/context"
// import AuthContext from "../context/auth/context";
// import { ACCESS_TOKEN } from "../utils/costants";
// import { httpclient } from "../services/http-client";

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext)
  return isAuthenticated === true ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to={"/auth/login"} replace />
  )
}
export default RequireAuth
