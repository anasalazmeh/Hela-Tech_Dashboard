import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import ProjectContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";
import WelcomeContext from "./context";

export interface IProps {
  children: React.ReactNode;
}
const WelcomeContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/dashboard/welcome_section");

        dispatch({ type: "SET_LIST", payload: { list: data.data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });
      },
      throwException: false,
    });
  };

  const getDetails = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });

        const { data } = await http.get(`/dashboard/welcome_section/${id}`);
        dispatch({ type: "SET_DETAILSS", payload: { details: data.data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "details" } });
      },
      throwException: false,
    });
  };

  const setDetails = async (data?: any) => {
    dispatch({ type: "SET_DETAILSS", payload: { details: data } });
  };

  const changeStatus = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        await http.post(`/dashboard/welcome_section/change_status/${id}`);
        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });
      },
      throwException: true,
    });
  };

  const updateWelcome = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        await http.post(
          `/dashboard/welcome_section/update/${id}`,
          getFormData({ ...request }),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });
      },
      throwException: true,
    });
  };

  return (
    <WelcomeContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,
          setDetails,
          updateWelcome,

          changeStatus,
        },
      }}
    >
      {props.children}
    </WelcomeContext.Provider>
  );
};

export default WelcomeContextProvider;
