import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type VideoLoading = "list" | "details" | "create" | "update" | "delete";

export interface IInternalState {
  loading: VideoLoading[];

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

    updateVideo: (id: number, request: any) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,
    setDetails: DEFAULT_FUNCTION,

    updateVideo: DEFAULT_FUNCTION,
  },
};

const VideoContext = createContext(externalState);

export default VideoContext;
