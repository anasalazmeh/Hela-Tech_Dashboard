import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type InfoLoading = "list" | "details" | "create" | "update" | "delete";

export interface IInternalState {
  loading: InfoLoading[];

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

    updateInfo: (id: number, request: any) => void;
    deleteInfo: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    updateInfo: DEFAULT_FUNCTION,
    deleteInfo: DEFAULT_FUNCTION,
  },
};

const InfoContext = createContext(externalState);

export default InfoContext;
