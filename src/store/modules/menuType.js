/*
*基础设施设备类型
* */

import * as types from '../mutations-type'
import Vue from 'vue'
import api from '@/api'

const menu = {
    state: {
        facilityType: [],
        deviceType: []
    },
    getters: {
        getFacilitTypeMenu (state) {
            return state.facilityType
        },
        getDeviceTypeMenu (state) {
            return state.deviceType
        }
    },
    setters: {},

    mutations: {
        [types.SET_FACILITY_TYPE] (state, data) {
            // state.facilityType = data
            Vue.set(state,'facilityType',data)
            console.log( state.facilityType, 'vuex')
        },
        [types.SET_DEVICE_TYPE] (state, data) {
            // state.deviceType = data
            Vue.set(state,'deviceType', data)
            console.log(state.deviceType, 'veux-deviceTypes')
        },
    },
    actions: {
        async getFacilityType ({commit}) {
            try {
                let res = await api.lib.getAllFacilityType()
                console.log(res, '8888888888888888888888888888888888888')
                commit(types.SET_FACILITY_TYPE, res)
                return res
            } catch (err) {
            }
        },
        async getDeviceType ({commit}) {
            try {
                let res = await api.lib.getAllDeviceType()
                commit(types.SET_DEVICE_TYPE, res)
                return res
            } catch (err) {
            }
        },
    }
}

export default menu

