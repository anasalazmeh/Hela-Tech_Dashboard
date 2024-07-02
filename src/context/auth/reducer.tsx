import { IInternalState, AuthLoading } from "./context"
import { toggleLoading } from "../../utils/helpers/functions"
import { IUserLogin } from "../../models/user-login/response"

type Action =
  | { type: "LOADING"; payload: { loading: AuthLoading | AuthLoading[] } }
  | { type: "IS_AUTHENTICATED"; payload: { isAuthenticated: boolean } }
  | { type: "LOGOUT" }
  | { type: "LOGIN"; payload: { user?: IUserLogin } }
  | { type: "LOGIN"; payload: { user?: IUserLogin } }
  | { type: "USER"; payload: { user?: IUserLogin } }

const reducer = (state: IInternalState, action: Action): IInternalState => {
  switch (action.type) {
    case "IS_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload.isAuthenticated }
    case "LOADING":
      return {
        ...state,
        loading: toggleLoading(state.loading, action.payload.loading),
      }
    case "LOGOUT":
      return {
        ...state,
        authUser: undefined,
        isAuthenticated: false,
      }
    case "LOGIN":
      // Todo: Get Permission from response.
      // if (action.payload.user?.is_admin === 'true') {
      //   permissions?.push('can-view-applications', 'can-view-users')
      // }
      return {
        ...state,
        authUser: action.payload.user,
        isAuthenticated: true,
      }

    case "USER": {
      return {
        ...state,
        authUser: action.payload.user,
      }
    }
    default:
      return state
  }
}

export default reducer
