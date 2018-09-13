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
        controleLight:[],
        controenvironment:[],
        controwifi:[],
        controbroad:[],
        controcamera:[],
        controled:[],
        controtransport:[],
        controlSecurityPerson:[],
        facilitypark:[],
        facilitytoilet:[],
        facilityshop:[],
        facilitybuild:[],
        facilityscenic:[],
        facilitytrash:[],
        facilityplant:[],
        facilityindicator:[],
        facilityroad:[],
        transportType:'0',
        treeShow:[],
    },
    getters: {
        getTransportType(state){
            return state.transportType
        },
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
        getcontroleLight(state) {
            return state.controleLight
        },
        getcontroleEnvironment(state) {
            return state.controenvironment
        },
        getcontroleWifi(state) {
            return state.controwifi
        },
        getcontroBroad(state) {
            return state.controbroad
        },
        getcontroTransport(state){
            return state.controtransport
        },
        getcontroCamera(state) {
            return state.controcamera
        },
        getcontroLed(state) {
            return state.controled
        },
        getfacilityPark(state) {
            return state.facilitypark
        },
        getfacilityToilet(state) {
            return state.facilitytoilet
        },
        getfacilityShop(state) {
            return state.facilityshop
        },
        getfacilityBuild(state) {
            return state.facilitybuild
        },
        getfacilityScenic(state) {
            return state.facilityscenic
        },
        getfacilityTrash(state) {
            return state.facilitytrash
        },
        getfacilityPlant(state) {
            return state.facilityplant
        },
        getfacilityIndicator(state) {
            return state.facilityindicator
        },
        getfacilityRoad(state) {
            return state.facilityroad
        },
        getfacilityStation(state){
            return state.facilityStation
        },
        getcontroTransport(state){
            return state.controtransport
        },
        getTransportType(state){
            return state.transportType
        },
        getcontrolSecurityPerson(state){
           return state.controlSecurityPerson
        },
        getTreeShow(state){
            return state.treeShow
        },
    },
    setters: {},

    mutations: {
        [types.TRANSPORT_TYPE](state,data){
          state.transportType = data
        },
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
            // console.log(state.locationId,'1231123123')
        },
        [types.SEARCH_INFO] (state, data) {
            state.searchInfo = data
            // console.log(state.searchInfo,'1231123123')
        },
        [types.SHOW_SEARCH] (state, data) {
            state.isShowSearch = data
            // console.log(state.isShowSearch,'1231123123')
        },
        [types.SHOW_TREE] (state, data) {
            if (!data.length) {
                state.treeData = [data]
            } else {
                state.treeData = data
            }
        },
        [types.TREE_SHOW] (state, data) {
            state.treeShow = data
        },
        [types.CONTROLER_LIGHT] (state, data) {
            state.controleLight = data
            // console.log(state.controleLight,'commit')
        },
        [types.CONTROLER_ENVIRONMENT] (state, data) {
            state.controenvironment = data
            // console.log(state.controenvironment,'commit')
        },
        [types.CONTROLER_WIFI] (state, data) {
            state.controwifi = data
            // console.log(state.controwifi,'commit')
        },
        [types.CONTROLER_BROAD] (state, data) {
            state.controbroad = data
            // console.log(state.controwifi,'commit')
        },
        [types.CONTROLER_CAMERA] (state, data) {
            state.controcamera = data
            // console.log(state.controwifi,'commit')
        },
        [types.CONTROLER_LED] (state, data) {
            state.controled = data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_PARK] (state, data) {
            state.facilitypark = data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_TOILET] (state, data) {
            state.facilitytoilet = data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_SHOP] (state, data) {
            state.facilityshop = data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_BUILD] (state, data) {
            state.facilitybuild = data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_SCENIC] (state, data) {
            state.facilityscenic= data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_TRASH] (state, data) {
            state.facilitytrash= data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_PLANT] (state, data) {
            state.facilityplant= data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_INDICATOR] (state, data) {
            state.facilityindicator= data
            // console.log(state.controwifi,'commit')
        },
        [types.FACILITY_ROAD] (state, data) {
            state.facilityroad= data
            // console.log(state.facilityroad,'commit')
        },
        [types.CONTROLER_TRANSPORT] (state, data) {
            state.controtransport = data
        },
        [types.CONTROLER_SECURITY_PERSON](state,data){
            state.controlSecurityPerson = data
        },
        [types.TRANSPORT_TYPE](state,data){
            state.transportType = data
        },
        [types.FACILITY_STATION] (state, data) {
            state.getfacilityStation= data
        }
    },
    actions: {
    }
}

export default map
