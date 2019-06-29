import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        menu,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})