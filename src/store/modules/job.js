// import api from '@/api'
import * as types from '../mutations-type'
import api from '@/api'

const job = {
    state: {
      jobType: [],
        basicIcon: 'card',
        hardWareIcon: 'card'
    },
    getters: {
        getJobTypeList (state) {
            console.log(state.jobType, '这是从vuex里边拿到的')
            return state.jobType
        },
        getBasicIcon (state) {
            return state.basicIcon
        },
        getHardWareIcon (state) {
            return state.hardWareIcon
        }
    },
    setters: {},

    mutations: {
        [types.JOB_TYPE] (state, data) {
          state.jobType = data
        },
        [types.DEL_JOB_TYPR] (state, data) {
          state.jobType = state.jobType.filter(item => {
              return item.id !== data
          })
        },
        [types.SHOWBASICICON] (state, data) {
            state.basicIcon = data
        },
        [types.SHOWHARDWAREICON] (state, data) {
            state.hardWareIcon = data
        },
    },
    actions: {
    }
}

export default job
