import IBaseListingResponse from "../../utils/api/base-listing-response";
import { toggleLoading } from "../../utils/helpers/functions";
import { ServicesLoading, IInternalState } from "./context";
import { IAnnoucementQuery } from "../../models/annoucements/query";
import {
  IAnnoucement,
  IAnnoucementDetails,
} from "../../models/annoucements/response";

type Action =
  | {
      type: "LOADING";
      payload: { loading: ServicesLoading | ServicesLoading[] };
    }
  | { type: "SET_LIST"; payload: { list: any } }
  | { type: "SET_DETAILSS"; payload: { details?: any } };

const reducer = (state: IInternalState, action: Action): IInternalState => {
  switch (action.type) {
    case "LOADING": {
      return {
        ...state,
        loading: toggleLoading(state.loading, action.payload.loading),
      };
    }
    case "SET_LIST": {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    case "SET_DETAILSS": {
      return {
        ...state,
        details: action.payload.details,
      };
    }
  }
};

export default reducer;
