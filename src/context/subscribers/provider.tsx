import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import SubscriberContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";

export interface IProps {
  children: React.ReactNode;
}
const SubscriberContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/dashboard/subscriptions");

        dispatch({ type: "SET_LIST", payload: { list: data.data } });
      },
      fallback: (error) => {},
      finallyCallback: () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });
      },
      throwException: false,
    });
  };

  const getDetails = async (id: number) => {};

  const setDetails = async (data?: any) => {
    // dispatch({ type: 'SET_DETAILSS', payload: { details: data } })
  };

  const deleteSubscriber = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await http.delete(`/dashboard/subscriptions/delete/${id}`);

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
    <SubscriberContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          deleteSubscriber,
        },
      }}
    >
      {props.children}
    </SubscriberContext.Provider>
  );
};

export default SubscriberContextProvider;
