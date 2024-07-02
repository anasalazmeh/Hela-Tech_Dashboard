import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type AboutUsDetailsLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: AboutUsDetailsLoading[];

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

    createAboutUsDetails: (request: any) => void;
    updateAboutUsDetails: (id: number, request: any) => void;
    deleteAboutUsDetails: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createAboutUsDetails: DEFAULT_FUNCTION,
    updateAboutUsDetails: DEFAULT_FUNCTION,
    deleteAboutUsDetails: DEFAULT_FUNCTION,
  },
};

const AboutUsDetailsContext = createContext(externalState);

export default AboutUsDetailsContext;
