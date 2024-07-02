// import { RoleLightResponse } from './../../api/data-contracts'
import ScreenSize from "../../utils/ui/screen-size"
import { IInternalState, AppLoading, Themes } from "./context"
// import toggleLoading from "../../utils/helpers/xor";
// import { PermissionResponse } from '../../api/data-contracts'

type Action =
  | { type: "SET_SCREEN_SIZE"; payload: { screenSize: ScreenSize } }
  | { type: "SET_LOCALE"; payload: { locale: any } }
  | { type: "SET_THEME"; payload: { theme: Themes } }
  | { type: "LOADING"; payload: { loading: AppLoading[] | AppLoading } }

// | { type: 'SET_ROLES'; payload: { roles: RoleLightResponse[] } }
// | { type: 'SET_PERMISSIONS'; payload: { permissions: PermissionResponse[] } }

const reducer = (state: IInternalState, action: Action): IInternalState => {
  switch (action.type) {
    case "SET_SCREEN_SIZE":
      return { ...state, screenSize: action.payload.screenSize }

    case "LOADING":
      return {
        ...state,
        // loading: toggleLoading(state.loading, action.payload.loading),
      }

    // case 'SET_PERMISSIONS':
    //   return { ...state, permissions: action.payload.permissions }
    default:
      return state
  }
}

export default reducer
