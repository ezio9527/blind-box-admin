import { createStore } from 'vuex'
import user from './modules/user'
import imageBaseUrl from './modules/imageBaseUrl'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
    imageBaseUrl
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
