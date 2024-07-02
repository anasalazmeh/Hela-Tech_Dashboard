import React, { useEffect, useReducer } from "react";
import AuthContext, { internalState } from "./context";
import reducer from "./reducer";
// import { useHistory } from 'react-router-dom'
// import { httpclient } from '../../services/http-client'
import { execute } from "../../utils/api/api-execute";
// import EndPoints from "../../services/end-points"
import {
  errorNotification,
  successNotification,
} from "../../utils/helpers/notification";
// import eventManager, {
//   EVENT_ERORR,
//   EVENT_FORBIDDEN,
//   EVENT_SUCCESS,
//   EVENT_UNAOUTHORIZED,
// } from '../../utils/events'
import http from "../../api/axios";
import { ACCESS_TOKEN } from "../../utils/helpers/constants";
import { useNavigate } from "react-router-dom";
import { LOGIN_PAGE } from "../../pages/paths";
import { ILogin } from "../../models/user-login/reques";
import EndPoints from "../../services/end-points";
import eventManager from "../../utils/event";

interface IProps {
  children: React.ReactNode;
}
const AuthContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const navigate = useNavigate();
  /**
   * Events
   */
  useEffect(() => {
    // eventManager.on(EVENT_SUCCESS, (message?: string) => {
    //   successNotification(message ?? t("operationDoneSuccessfully"))
    // })
    // eventManager.on(EVENT_ERORR, (message) => {
    //   errorNotification(message)
    // })
    // eventManager.on(EVENT_UNAOUTHORIZED, () => {
    //   history.replace("/auth/login")
    // })
    // eventManager.on(EVENT_FORBIDDEN, () => {
    //   history.replace("/403")
    // })
  }, []);

  // useEffect(() => {
  //   if (state.isAuthenticated && !state.authUser) {
  //     me()
  //   }
  // }, [state.isAuthenticated])

  useEffect(() => {
    eventManager.on("unauthorized", () => {
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem(ACCESS_TOKEN);

      navigate("/auth/login", { replace: true });
    });
  }, []);

  // Me
  const me = async () => {
    await execute({
      callback: async () => {
        const { data } = await EndPoints.auth.me();
        console.log("data", data);

        dispatch({ type: "USER", payload: { user: data } });
        successNotification(
          "Logged in successfully.",
          `Welcome ${data?.name}, hope you are doing great!.`
        );
      },
      fallback: (error) => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem(ACCESS_TOKEN);
      },
      finallyCallback: () => {},
      throwException: false,
    });
  };

  // Login
  const login = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "login" } });

        const { data } = await http.post("/login", request, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        successNotification(
          "Logged in successfully.",
          `Welcome ${data?.user?.name ?? ""}, hope you are doing great!.`
        );

        localStorage.setItem(ACCESS_TOKEN, data.token);

        dispatch({
          type: "LOGIN",
          payload: { user: data?.user },
        });
      },
      fallback: (error: any) => {
        errorNotification(
          error.response?.data?.message ?? "Unsuccessful Operation"
        );
        dispatch({ type: "LOGOUT" });
      },
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "login" } });
      },
      throwException: false,
    });
  };

  // Logout
  const logout = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "logout" } });

        // await EndPoints.auth.logout(undefined);
        successNotification(
          "Logged out successfully.",
          "Goodbye, have a great day!."
        );

        dispatch({ type: "LOGOUT" });

        localStorage.removeItem(ACCESS_TOKEN);

        navigate(LOGIN_PAGE, { replace: true });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "logout" } });
      },
      throwException: false,
    });
  };

  // Logout
  const changePassword = async (data: any) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "change_password" } });

        await EndPoints.auth.changePassword(data);
        successNotification(
          "Changed Successfully successfully.",
          "Redirecting"
        );

        dispatch({ type: "LOGOUT" });
        localStorage.removeItem(ACCESS_TOKEN);
        navigate(LOGIN_PAGE, { replace: true });
      },
      fallback: (error) => {
        errorNotification("Unsuccessful Operation");
      },
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "change_password" } });
      },
      throwException: false,
    });
  };
  // Logout
  const updateProfile = async (data: any) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "update_profile" } });

        const { updateData } = await EndPoints.auth.updateProfile(data);

        dispatch({
          type: "LOGIN",
          payload: { user: updateData },
        });
        // dispatch({ type: "LOGOUT" })
        // localStorage.removeItem(ACCESS_TOKEN)
        // navigate(LOGIN_PAGE, { replace: true })
      },
      fallback: (error) => {
        throw error;
      },
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "update_profile" } });
      },
      throwException: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        actions: {
          login,
          logout,
          changePassword,
          updateProfile,
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
