import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type TeamMembersLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: TeamMembersLoading[];

  list?: any[];
  // query: IAnnoucementQuery;

  details?: any;
}

export const internalState: IInternalState = {
  loading: [],
  // query: DEFAULT_QUERY,
};

export interface IExternalState extends IInternalState {
  actions: {
    getData: () => void;
    getDetails: (id: number) => void;

    createTeamMember: (request: any) => void;
    updateTeamMember: (id: number, request: any) => void;
    deleteTeamMember: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createTeamMember: DEFAULT_FUNCTION,
    updateTeamMember: DEFAULT_FUNCTION,
    deleteTeamMember: DEFAULT_FUNCTION,
  },
};

const TeamMemberContext = createContext(externalState);

export default TeamMemberContext;
