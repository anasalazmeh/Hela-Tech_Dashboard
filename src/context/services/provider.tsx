import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import ServiceContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";

export interface IProps {
  children: React.ReactNode;
}
const ServiceContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/dashboard/services_section");

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

        const { data } = await http.get(
          `/dashboard/services_section/${id}/edit`
        );
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
    // dispatch({ type: 'SET_DETAILSS', payload: { details: data } })
  };

  const createService = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await http.post(
          `/dashboard/services_section/add`,
          getFormData({ ...request, S_type: "services" }),
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });
      },
      throwException: true,
    });
  };

  const updateService = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await http.post(
          `/dashboard/services_section/${id}/update`,
          getFormData({ ...request, S_type: "services" }),
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

  const deleteService = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await http.delete(`/dashboard/services_section/${id}/delete`);

        getData();
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });
      },
      throwException: true,
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createService,
          updateService,
          deleteService,
        },
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceContextProvider;
