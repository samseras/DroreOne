// import api from '@/api'
import * as types from '../mutations-type'
import Vue from 'vue'

const map = {
    state: {
        location: [],//点
        regionLocation: [],//片区
        roatLocation: [],// 路网
        isSaveRegionLocation: false,
        isSaveRoatLocation: false,
        locationId: '',
        searchInfo: {},
        isShowSearch: false,
        treeData:[],
        checked:false

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
        getSearchInfo (state) {
            return state.searchInfo
        },
        getSearchState(state) {
            return state.isShowSearch
        },
        getTreeState(state) {
            return state.treeData
        },
        getTreeHide(state) {
            return state.checked
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
        [types.SHOW_SEARCH] (state, data) {
            state.isShowSearch = data
            console.log(state.isShowSearch,'1231123123')
        },
        [types.SHOW_TREE] (state, data) {
            if (data.children) {
                state.treeData = [data]
            } else {
                state.treeData = data
            }

            console.log(state.treeData,'commit')
        },
        [types.HIDE_TREE] (state, data) {
            state.checked = data
            console.log(state.checked,'qweqweqweqw')
        },
    },
    actions: {
    }
}

export default map
