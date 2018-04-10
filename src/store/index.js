import vue from 'vue'
import vuex from 'vuex'
import analyze from './modules/analyze'

vue.use(vuex)
export default new vuex.Store({
    modules:{
        analyze
    }
})
