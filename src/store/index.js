import { createStore } from 'vuex'
import imageBaseUrl from './modules/imageBaseUrl'
import wallet from './modules/wallet'

// const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    imageBaseUrl,
    wallet
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
