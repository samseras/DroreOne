// import api from '@/api'
import * as types from '../mutations-type'

const map = {
    state: {
        location: [],//点
        regionLocation: [],//片区
        roatLocation: [],// 路网
        isSaveRegionLocation: false,
        isSaveRoatLocation: false,
        locationId: '',
        searchInfo: {}
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
        getRegionLocationState (state) {
            return state.isSaveRegionLocation
        },
        getRoatLocationState (state) {
            return state.isSaveRoatLocation
        },
        getLocationId (state) {
            return state.locationId
        },
        getSearchInfo () {
            console.log(state.searchInfo,"123123")
            return state.searchInfo
        }
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
        [types.REGION_LOCATION_STATE] (state, data) {
            state.isSaveRegionLocation = data
        },
        [types.ROAT_LOCATION_STATE] (state, data) {
            state.isSaveRoatLocation = data
        },
        [types.LOCATION_ID] (state, data) {
            state.locationId = data
            console.log(state.locationId,'1231123123')
        },
        [types.SEARCH_INFO] (state, data) {
            state.searchInfo = data
            console.log(state.searchInfo,'1231123123')
        },
    },
    actions: {
    }
}

export default map
