/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useRef } from "react"
import { ConfigProvider, Empty, theme } from "antd"
import AppContext, { AppData, internalState, Themes } from "./context"
import reducer from "./reducer"
import ScreenSize from "../../utils/ui/screen-size"

// import {
//   errorNotification,
//   successNotification,
// } from '../../utils/helpers/notification'
import { IconContext } from "react-icons"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import http from "../../api/axios"
import eventManager from "../../utils/event"
import { ACCESS_TOKEN } from "../../utils/helpers/constants"
// import eventManager, {
//   EVENT_ERORR,
//   EVENT_FORBIDDEN,
//   EVENT_SUCCESS,
//   EVENT_UNAOUTHORIZED,
// } from "../../utils/events";

interface IProps {
  children: React.ReactNode
}
const AppContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState)
  const effectCalled = useRef(false)

  /**
   * Events
   */
  const navigate = useNavigate()

  // useEffect(() => {
  //   let interval = setInterval(() => {
  //     getNotifications()
  //   }, 5000)
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  useEffect(() => {
    // if (!effectCalled.current) {
    //   effectCalled.current = true;
    //   eventManager.on(EVENT_SUCCESS, (message?: string) => {
    //     successNotification(message ?? t("operationDoneSuccessfully"));
    //   });
    //   eventManager.on(EVENT_ERORR, (message) => {
    //     errorNotification(message);
    //   });
    //   eventManager.on(EVENT_UNAOUTHORIZED, () => {
    //     navigate("/login", { replace: true });
    //   });
    //   eventManager.on(EVENT_FORBIDDEN, () => {
    //     navigate("/403", { replace: true });
    //   });
    // }
  }, [])

  /**
   * Media queries
   */
  const isLaptopOrDesktop = useMediaQuery({
    minWidth: 992,
  })
  const isMobileOrTablet = useMediaQuery({
    maxWidth: 992,
  })
  useEffect(() => {
    let screenSize: ScreenSize

    if (isLaptopOrDesktop) screenSize = "laptopOrDesktop"
    else screenSize = "mobileOrTablet"

    dispatch({
      type: "SET_SCREEN_SIZE",
      payload: { screenSize },
    })
  }, [isLaptopOrDesktop, isMobileOrTablet])

  // Get all Roles
  // const getRoles = async (params: GetAllRolesLightParams = {}) => {
  //   await execute({
  //     callback: async () => {
  //       dispatch({ type: 'LOADING', payload: { loading: 'roles' } })

  //       const { data } = await EndPoints.role.getAllRolesLight(params)

  //       dispatch({ type: 'SET_ROLES', payload: { roles: data } })
  //     },
  //     fallback: (error) => {},
  //     finallyCallback: () => {
  //       dispatch({ type: 'LOADING', payload: { loading: 'roles' } })
  //     },
  //     throwException: false,
  //   })
  // }

  // const getNotifications = async () => {
  //   try {
  //     const { data } = await http.get(
  //       "/services/app/NotificationsService/GetAll",
  //       { params: state.query }
  //     )
  //     dispatch({ type: "SET_LIST", payload: { list: data } })
  //   } catch (err) {}
  // }

  // Get all Permissions
  const getPermissions = async () => {
    // await execute({
    //   callback: async () => {
    //     dispatch({ type: 'LOADING', payload: { loading: 'permissions' } })
    //     const { data } = await EndPoints.role.getAllPermissions()
    //     dispatch({ type: 'SET_PERMISSIONS', payload: { permissions: data } })
    //   },
    //   fallback: (error) => {},
    //   finallyCallback: () => {
    //     dispatch({ type: 'LOADING', payload: { loading: 'permissions' } })
    //   },
    //   throwException: false,
    // })
  }
  const changeTheme = (theme: Themes) => {
    dispatch({ type: "SET_THEME", payload: { theme } })
  }

  // Update App data
  const updateAppData = (update: AppData[]) => {
    update.forEach((data) => {
      switch (data) {
        case "languages":
          // getLanguages()
          break
        case "roles":
          // getRoles()
          break
        case "permissions":
          getPermissions()
          break
        default:
          break
      }
    })
  }

  // const setQuery = (query: IRequestParams) => {
  //   dispatch({ type: "SET_QUERY", payload: { query } })
  // }

  return (
    <IconContext.Provider value={{ className: "react-icons-class" }}>
      <AppContext.Provider
        value={{
          ...state,
          actions: {},
        }}
      >
        {props.children}
      </AppContext.Provider>
    </IconContext.Provider>
  )
}

export default AppContextProvider
