// import api from '@/api'
import * as types from '../mutations-type'

const analyze = {
    state: {
        refresh: ''
    },
    getters: {
        getRefresh (state) {
            return state.refresh
        },
    },
    setters: {},
    mutations: {
        [types.REFRESH_DATA_TYPE] (state, data) {
            state.refresh = data
            console.log(state.refresh, '909090909090909090909')
        },
    },
    actions: {
    }
}

export default analyze
