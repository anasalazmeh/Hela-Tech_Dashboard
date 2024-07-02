import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type AboutUsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: AboutUsLoading[];

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

    createAboutUs: (request: any) => void;
    updateAboutUs: (id: number, request: any) => void;
    deleteAboutUs: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createAboutUs: DEFAULT_FUNCTION,
    updateAboutUs: DEFAULT_FUNCTION,
    deleteAboutUs: DEFAULT_FUNCTION,
  },
};

const AboutUsContext = createContext(externalState);

export default AboutUsContext;
