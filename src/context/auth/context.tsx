import { createContext } from "react";
// import { ILoginRequest } from '../../models/auth/request'
import { ACCESS_TOKEN, DEFAULT_FUNCTION } from "../../utils/helpers/constants";
// import Permission from '../../utils/rbac/permissions'
import { IUserLogin } from "../../models/user-login/response";
import { ILogin } from "../../models/user-login/reques";

export type AuthLoading =
  | "login"
  | "logout"
  | "change_password"
  | "roles"
  | "update_profile";

export interface IInternalState {
  loading: AuthLoading[];

  isAuthenticated?: boolean;
  authUser?: IUserLogin;
  //   userPermissions: Permission[]
}

export const internalState: IInternalState = {
  loading: [],
  isAuthenticated: !localStorage.getItem(ACCESS_TOKEN) ? false : true,
  //   userPermissions: [],
};

export interface IExternalState extends IInternalState {
  actions: {
    login: (request: any) => void;
    logout: () => void;
    changePassword: (data: any) => void;
    updateProfile: (data: any) => void;
  };
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {
    login: DEFAULT_FUNCTION,
    logout: DEFAULT_FUNCTION,
    changePassword: DEFAULT_FUNCTION,
    updateProfile: DEFAULT_FUNCTION,
  },
};

const AuthContext = createContext(externalState);

export default AuthContext;
