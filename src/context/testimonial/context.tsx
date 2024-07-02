import { createContext } from "react";
import { DEFAULT_FUNCTION } from "../../utils/helpers/constants";

export type TestimonialLoading =
  | "list"
  | "details"
  | "create"
  | "update"
  | "delete";

export interface IInternalState {
  loading: TestimonialLoading[];

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

    createTestimonial: (request: any) => void;
    updateTestimonial: (id: number, request: any) => void;
    deleteTestimonial: (id: number) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    getData: DEFAULT_FUNCTION,
    getDetails: DEFAULT_FUNCTION,

    createTestimonial: DEFAULT_FUNCTION,
    updateTestimonial: DEFAULT_FUNCTION,
    deleteTestimonial: DEFAULT_FUNCTION,
  },
};

const TestimonialContext = createContext(externalState);

export default TestimonialContext;
