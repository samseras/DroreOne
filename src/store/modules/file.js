/*
文件
* */

import * as types from '../mutations-type'
import Vue from 'vue'
const file = {
    state: {
        createdState: '',
        crumbs: {},
        clickCrumbs: {},
        crumbsList: [],
        selectFileList: [],
        deleteFileState: ''
    },
    getters: {
        getCreatedState (state) {
            return state.createdState
        },
        getCrumbs (state) {
            return state.crumbs
        },
        getClickCrumbs (state) {
            return state.clickCrumbs
        },
        getCrumbsList (state) {
            return state.crumbsList
        },
        getSelectFileList (state) {
            return state.selectFileList
        },
        getDeleteFileState (state) {
            return state.deleteFileState
        }
    },
    setters: {},
    mutations: {
        [types.SET_CREATED_STATUS] (state, data) {
            state.createdState = data
        },
        [types.SET_CRUMBS] (state, data) {
            console.log(data, '这个是什么面包屑')
            state.crumbs = data
        },
        [types.CRUMBS_LIST] (state, data) { // 获取面包屑列表
            console.log(data, '这个是什么东西')
            state.crumbsList = data
        },
        [types.SET_CLICK_CRUMBS] (state, data) {
            console.log(data, '这个是点击的面包屑')
            Vue.set(state, 'clickCrumbs', data)
        },
        [types.SELECT_FILE_LIST] (state, data) {
            state.selectFileList = data
        },
        [types.DELET_FILE_LIST] (state, data) {
            state.deleteFileState = data
        }
    },
    actions: {
    }
}
export default file
