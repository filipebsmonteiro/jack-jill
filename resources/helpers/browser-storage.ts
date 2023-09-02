export const SessionStorage = {
  get (key: string) {
    const value: string|null = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set (key: string, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove (key: string) {
    sessionStorage.removeItem(key)
  },
  deleteAll () {
    sessionStorage.clear()
  },
}
export const LocalStorage = {
  get (key: string) {
    const value: string|null = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set (key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove (key: string) {
    localStorage.removeItem(key)
  },
  deleteAll () {
    localStorage.clear()
  },
}
export const Cookie = {
  get (key: string) {
    const name = key + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        try {
          const value = JSON.parse(c.substring(name.length, c.length))
          return value
        } catch (error) {
          return c.substring(name.length, c.length)
        }
      }
    }
    return null
  },
  set (key: string, value: any, expiresDays: number = 1) {
    const d = new Date()
    d.setTime(d.getTime() + (expiresDays*24*60*60*1000))
    let expires = 'expires=' + d.toUTCString()
    document.cookie = key + '=' + value + ';' + expires + ';path=/' //+ ';SameSite=None;Secure'
  },
  // remove (key: string, path: string = '/', domain: string = '') {
  remove (key: string) {
    if(Cookie.get(key)) {
      document.cookie = key + '=' +
      ';path=/' +
      // ((path) ? ';path=' + path: '')+
      // ((domain) ? ';domain='+ domain: '') +
      ';expires=Thu, 01 Jan 1970 00:00:01 GMT'
    }
  },
}
