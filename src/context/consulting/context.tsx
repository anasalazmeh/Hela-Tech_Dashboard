import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type ConsultingLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: ConsultingLoading[];

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

    createConsulting: (request: any) => void;
    updateConsulting: (id: number, request: any) => void;
    deleteConsulting: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createConsulting: DEFAULT_FUNCTION,
    updateConsulting: DEFAULT_FUNCTION,
    deleteConsulting: DEFAULT_FUNCTION,
  },
};

const ConsultingContext = createContext(externalState);

export default ConsultingContext;
