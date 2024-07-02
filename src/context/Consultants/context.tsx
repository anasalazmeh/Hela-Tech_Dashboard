import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type ConsultantsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: ConsultantsLoading[];

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

    createConsultants: (request: any) => void;
    updateConsultants: (id: number, request: any) => void;
    deleteConsultants: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createConsultants: DEFAULT_FUNCTION,
    updateConsultants: DEFAULT_FUNCTION,
    deleteConsultants: DEFAULT_FUNCTION,
  },
};

const ConsultantsContext = createContext(externalState);

export default ConsultantsContext;
