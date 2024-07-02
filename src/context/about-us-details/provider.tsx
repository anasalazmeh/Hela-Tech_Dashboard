import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import AboutUsContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";
import AboutUsDetailsContext from "./context";

export interface IProps {
  children: React.ReactNode;
}
const AboutUsDetailsContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get(
          "/dashboard/who_we_are_section/details/main"
        );

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
          `/dashboard/who_we_are_section/details/${id}/edit`
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

  const createAboutUsDetails = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log(request);

        await http.post(
          `/dashboard/who_we_are_section/details`,
          getFormData({ ...request, S_type: "sub_about" }),
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

  const updateAboutUsDetails = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await http.post(
          `/dashboard/who_we_are_section/details/update/${id}`,
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

  const deleteAboutUsDetails = async (id: number) => {
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
    <AboutUsDetailsContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createAboutUsDetails,
          updateAboutUsDetails,
          deleteAboutUsDetails,
        },
      }}
    >
      {props.children}
    </AboutUsDetailsContext.Provider>
  );
};

export default AboutUsDetailsContextProvider;
