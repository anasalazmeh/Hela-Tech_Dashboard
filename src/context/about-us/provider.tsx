import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import AboutUsContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";

export interface IProps {
  children: React.ReactNode;
}
const AboutUsContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/dashboard/who_we_are_section");

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
          `/dashboard/who_we_are_section/${id}/edit`
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

  const createAboutUs = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await http.post(
          `/dashboard/who_we_are_section`,
          getFormData({ ...request }),
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

  const updateAboutUs = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await http.post(
          `/dashboard/who_we_are_section/update/${id}`,
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

  const deleteAboutUs = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await http.delete(`/dashboard/who_we_are_section/${id}`);

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
    <AboutUsContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createAboutUs,
          updateAboutUs,
          deleteAboutUs,
        },
      }}
    >
      {props.children}
    </AboutUsContext.Provider>
  );
};

export default AboutUsContextProvider;
