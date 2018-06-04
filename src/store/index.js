import vue from 'vue'
import vuex from 'vuex'
import analyze from './modules/analyze'
import map from './modules/map'
import job from './modules/job'
import user from './modules/user'

vue.use(vuex)
export default new vuex.Store({
    modules:{
        analyze,
        map,
        job,
        user
    }
})
