// import api from '@/api'
import * as types from '../mutations-type'

const map = {
    state: {
        location: [],//点
        regionLocation: [],//片区
        roatLocation: [],// 路网
    },
    getters: {
        getLocation (state) {
            return state.location
        },
        getRegionLocation (state) {
            return state.regionLocation
        },
        getRoatLocation (state) {
            return state.roatLocation
        },
    },
    setters: {},

    mutations: {
        [types.MAP_LOCATION] (state, data) {
            state.location = data
            console.log(state.location, '909090909090909090909')
        },
        [types.MAP_REGION_LOCATION] (state, data) {
            state.regionLocation = data
        },
        [types.MAP_ROAT_LOCATION] (state, data) {
            state.roatLocation = data
        },
    },
    actions: {
    }
}

export default map
