const COOKIE_PREFIX = 'cookie/'
// const LOCAL_STORAGE_PREFIX = process.env.NODE_ENV + '/local/'
const SESSION_STORAGE_PREFIX = process.env.NODE_ENV + '/session/'

export default {
  // routes: {
  //   login: {
  //     name: 'auth.login'
  //   },
  // },

  storage: {
    cookie: {
      TOKEN: `${COOKIE_PREFIX}auth_token`,
      // EXPIRATION: `${LOCAL_STORAGE_PREFIX}auth_expiration`,
      // USER: `${LOCAL_STORAGE_PREFIX}user`,
    },
    session: {
      USER: `${SESSION_STORAGE_PREFIX}user`,
    },

    local: {
      // FINANCE: {
      //   BALANCES: `${LOCAL_STORAGE_PREFIX}finance_balances`,
      //   PATRIMONY: `${LOCAL_STORAGE_PREFIX}finance_patrimony`,
      // }
    },
  },

}
