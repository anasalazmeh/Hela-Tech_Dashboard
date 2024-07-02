import { useReducer } from "react";
import reducer from "./reducer";
import { execute } from "../../utils/api/api-execute";
import TeamMemberContext, { internalState } from "./context";

import http from "../../api/axios";
import { getFormData } from "../../utils/helpers/functions";

export interface IProps {
  children: React.ReactNode;
}
const TeamMemberContextProvider: React.FC<IProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, internalState);

  const getData = async () => {
    await execute({
      callback: async () => {
        dispatch({ type: "LOADING", payload: { loading: "list" } });

        const { data } = await http.get("/dashboard/team_section");

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

        const { data } = await http.get(`/dashboard/team_section/${id}/edit`);
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

  const createTeamMember = async (request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "create" },
        });

        console.log("sssddd", request);

        const formData = new FormData();

        Object.keys(request).forEach((key) => {
          if (Array.isArray(request[key])) {
            if (key === "tags") {
              request[key]?.forEach((item: any) => {
                formData.append("tags[tag_id][]", item);
              });
            } else {
              request[key]?.forEach((item: any) => {
                formData.append(key, item);
              });
            }
          } else {
            formData.append(key, request[key] ?? "");
          }
        });

        console.log("sss", formData);

        await http.post(`/dashboard/team_section`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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

  const updateTeamMember = async (id: number, request: any) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "update" },
        });

        console.log(request);

        await http.post(
          `/dashboard/team_section/update/${id}`,
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

  const deleteTeamMember = async (id: number) => {
    await execute({
      callback: async () => {
        dispatch({
          type: "LOADING",
          payload: { loading: "delete" },
        });

        await http.delete(`dashboard/team_section/${id}`);

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
    <TeamMemberContext.Provider
      value={{
        ...state,
        actions: {
          getData,
          getDetails,

          createTeamMember,
          updateTeamMember,
          deleteTeamMember,
        },
      }}
    >
      {props.children}
    </TeamMemberContext.Provider>
  );
};

export default TeamMemberContextProvider;
