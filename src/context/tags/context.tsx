import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type TagsLoading = "list" | "details" | "create" | "update" | "delete";

export interface IInternalState {
  loading: TagsLoading[];

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

    createTag: (request: any) => void;
    updateTag: (id: number, request: any) => void;
    deleteTag: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createTag: DEFAULT_FUNCTION,
    updateTag: DEFAULT_FUNCTION,
    deleteTag: DEFAULT_FUNCTION,
  },
};

const TagContext = createContext(externalState);

export default TagContext;
