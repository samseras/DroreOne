/*
*基础设施设备类型
* */

import * as types from '../mutations-type'
import Vue from 'vue'
import api from '@/api'

const menu = {
    state: {
        facilityType: [],
        deviceType: [],
        fileType: []
    },
    getters: {
        getFacilitTypeMenu (state) {
            return state.facilityType
        },
        getDeviceTypeMenu (state) {
            return state.deviceType
        },
        getFileTypeMenu (state) {
            return state.fileType
        }
    },
    setters: {},

    mutations: {
        [types.SET_FACILITY_TYPE] (state, data) {
            Vue.set(state,'facilityType',data)
        },
        [types.SET_DEVICE_TYPE] (state, data) {
            Vue.set(state,'deviceType', data)
        },
        [types.SET_FILE_TYPE] (state, data) {
            Vue.set(state,'fileType', data)
        },
    },
    actions: {
        async getFacilityType ({commit}) {
            try {
                let res = await api.lib.getAllFacilityType()
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
        async getFileType ({commit}) {
            try {
                let res = await api.file.getFileType()
                commit(types.SET_FILE_TYPE, res)
                return res
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default menu

