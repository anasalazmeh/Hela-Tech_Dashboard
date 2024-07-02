import ApiError from './api-error'

export const execute = async <T>(parametrs: {
  callback: () => Promise<T>
  fallback?: (error: ApiError) => void
  finallyCallback?: () => void
  throwException?: boolean
}): Promise<T | undefined> => {
  try {
    return await parametrs.callback()
  } catch (error: any) {
    parametrs.fallback && parametrs.fallback(error)
    if (parametrs.throwException) {
      throw error
    }
  } finally {
    parametrs.finallyCallback && parametrs.finallyCallback()
  }
}
