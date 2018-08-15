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
        deleteFileState: '',
        uploadFileSuccess: '',
        moveFileSuccess: '',
        fixFile: {},
        fileListLength: {},
        filePageNum: {},
        searchContent: {},
        checkFileRow: {}
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
        },
        getUploadSuccessFile (state) {
            return state.uploadFileSuccess
        },
        getMoveSuccessFile (state) {
            return state.moveFileSuccess
        },
        getFixFile (state) {
            return state.fixFile
        },
        getFileListLength (state) {
            return state.fileListLength
        },
        getFilePageNum (state) {
            return state.filePageNum
        },
        getSearchContent (state) {
            return state.searchContent
        },
        getCheckFileRow (state) {
            console.log()
            return state.checkFileRow
        }
    },
    setters: {},
    mutations: {
        [types.SET_CREATED_STATUS] (state, data) {
            state.createdState = data
        },
        [types.SET_CRUMBS] (state, data) {
            state.crumbs = data
        },
        [types.CRUMBS_LIST] (state, data) { // 获取面包屑列表
            state.crumbsList = data
        },
        [types.SET_CLICK_CRUMBS] (state, data) {
            Vue.set(state, 'clickCrumbs', data)
        },
        [types.SELECT_FILE_LIST] (state, data) {
            state.selectFileList = data
        },
        [types.DELET_FILE_LIST] (state, data) {
            state.deleteFileState = data
        },
        [types.UPLOAD_FILE_SUCCESS] (state, data) {
            state.uploadFileSuccess = data
        },
        [types.MOVE_FILE_SUCCESS] (state, data) {
            state.moveFileSuccess = data
        },
        [types.SET_FIX_FILE] (state, data) {
            state.fixFile = data
        },
        [types.SET_FILE_LIST_LENGTH] (state, data) {
            state.fileListLength = data
        },
        [types.GET_FILE_PAGE_NUMBER] (state, data) {
            state.filePageNum = data
        },
        [types.SEARCH_FILE_LIST] (state, data) {
            state.searchContent = data
        },
        [types.CHECK_FILE_ROW] (state, data) {
            Vue.set(state, 'checkFileRow', {})
            Vue.set(state, 'checkFileRow', data)
        }
    },
    actions: {
    }
}
export default file
