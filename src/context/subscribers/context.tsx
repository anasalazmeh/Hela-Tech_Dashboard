import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type SubscribersLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: SubscribersLoading[];

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

    deleteSubscriber: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    deleteSubscriber: DEFAULT_FUNCTION,
  },
};

const SubscriberContext = createContext(externalState);

export default SubscriberContext;
