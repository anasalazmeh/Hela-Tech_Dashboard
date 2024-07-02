import { toggleLoading } from "../../utils/helpers/functions";
import { ConsultantsLoading, IInternalState } from "./context";

type Action =
  | {
      type: "LOADING";
      payload: { loading: ConsultantsLoading | ConsultantsLoading[] };
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
