
import * as types from '../mutations-type'
import api from '@/api'
const iot = {
    state: {
        curPage:9,
        nowNum:1
    },
    getters: {
        getCurPage (state) {
            console.log(state.curPage, '这是从vuex里边拿到的')
            return state.curPage+1
        }
    },
    setters: {},
    mutations: {
        [types.CURPAGE] (state, data) {
            state.curPage = data
        },
    },
    actions: {
        getActionTest ({commit}) {   //非异步仅测试
            let res=100;
            commit(types.CURPAGE, res)
        },
    }
}
export default iot
