export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_MAXIMUM_PAGE_SIZE = -1
export const INITIAL_PAGE = 1

export const ACCESS_TOKEN = "access_token"
export const LANGUAGE_CODE = "i18nextLng"

export const DATE_FORMATE = "DD-MM-YYYY, LT"

export const DEFAULT_FUNCTION = () => null
export const DEFAULT_QUERY = {
  page: INITIAL_PAGE,
  perPage: DEFAULT_PAGE_SIZE,
}

export const DEFAULT_MAP_CENTER = {
  lat: 25.2048,
  lng: 55.2708,
}

export const languages = [
  {
    code: "ar",
    name: "العربية",
    isMain: true,
  },
  {
    code: "en",
    name: "English",
    isMain: true,
  },
  {
    code: "fr",
    name: "Français",
    isMain: true,
  },
]
