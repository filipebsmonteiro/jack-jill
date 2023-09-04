export const deepMerge = (target: Record<string, any>, ...sources: any): object => {
  if (!sources.length) return target
  const source = sources.shift()

  if (target instanceof Object && source instanceof Object) {
    for (const key in source) {
      if (source[key] instanceof Object) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return deepMerge(target, ...sources)
}

export const decodeJwt = (token: string): Record<string, any> => {
  try {
    const base64Url = token.split('.')[0]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  } catch (e) {
    return {}
  }
}

export const parseUnprocessableErrors = (error: Record<string, any>): Record<string, any> => {
  let errors = {}
  if (
    error.response?.status === 422 &&
    error.response?.data?.errors
  ) {
    error.response.data.errors.forEach((error) => errors[error.field] = [error.message])
  }
  return errors
}
