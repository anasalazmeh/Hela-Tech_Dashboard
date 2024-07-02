import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type WelcomeLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: WelcomeLoading[];

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
    setDetails: (data: any) => void;
    updateWelcome: (id: number, request: any) => void;

    changeStatus: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,
    setDetails: DEFAULT_FUNCTION,
    updateWelcome: DEFAULT_FUNCTION,

    changeStatus: DEFAULT_FUNCTION,
  },
};

const WelcomeContext = createContext(externalState);

export default WelcomeContext;
