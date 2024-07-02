import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";

import http from "../../api/axios";
import ConsultationsContext, { internalState } from "./context";

export interface IProps {
  children: React.ReactNode;
}
const ConsultationsContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/consultations");
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

        const { data } = await http.get(`/consultations/${id}`);
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




  return (
    <ConsultationsContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,
        },
      }}
    >
      {props.children}
    </ConsultationsContext.Provider>
  );
};

export default ConsultationsContextProvider;
