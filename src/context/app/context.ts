import { Theme } from "@ant-design/cssinjs"
import { createContext } from "react"

import ScreenSize from "../../utils/ui/screen-size"
import { DEFAULT_FUNCTION, DEFAULT_QUERY } from "../../utils/helpers/constants"

export type AppLoading = "languages" | "roles" | "permissions"

export type AppData = "languages" | "roles" | "permissions"

export type Themes = "dark" | "light"
export interface IInternalState {
  loading: AppLoading[]
  screenSize: ScreenSize

  // roles?: RoleLightResponse[]
  // permissions?: PermissionResponse[]
}

export const internalState: IInternalState = {
  loading: [],
  screenSize: "laptopOrDesktop",
}

export interface IExternalState extends IInternalState {
  actions: {}
}

export const externalState: IExternalState = {
  ...internalState,
  actions: {},
}

const AppContext = createContext(externalState)

export default AppContext
