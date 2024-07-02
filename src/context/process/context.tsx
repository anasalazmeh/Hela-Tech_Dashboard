import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type ServicesLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: ServicesLoading[];

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

    createProcess: (request: any) => void;
    updateProcess: (id: number, request: any) => void;
    deleteProcess: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createProcess: DEFAULT_FUNCTION,
    updateProcess: DEFAULT_FUNCTION,
    deleteProcess: DEFAULT_FUNCTION,
  },
};

const ProcessContext = createContext(externalState);

export default ProcessContext;
