
import * as types from '../mutations-type'
import api from '@/api'
const iot = {
    state: {
        curPage:1
    },
    getters: {
        getCurPage (state) {
            console.log(state.curPage, '这是从vuex里边拿到的')
            return state.curPage
        }
    },
    setters: {},
    mutations: {
        [types.CURPAGE] (state, data) {
            state.curPage = data
        },
    },
    actions: {
    }
}
export default iot
