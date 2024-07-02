import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type ProjectsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: ProjectsLoading[];

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

    createProject: (request: any) => void;
    updateProject: (id: number, request: any) => void;
    deleteProject: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createProject: DEFAULT_FUNCTION,
    updateProject: DEFAULT_FUNCTION,
    deleteProject: DEFAULT_FUNCTION,
  },
};

const ProjectContext = createContext(externalState);

export default ProjectContext;
