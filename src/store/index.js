import vue from 'vue'
import vuex from 'vuex'
import analyze from './modules/analyze'
import map from './modules/map'

vue.use(vuex)
export default new vuex.Store({
    modules:{
        analyze,
        map
    }
})
