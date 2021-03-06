// import api from '@/api'
import * as types from '../mutations-type'
import api from '@/api'

const job = {
    state: {
      jobType: [],
        basicIcon: 'list',
        hardWareIcon: 'list'
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
        async getJobType ({commit}) {
            try {
                let res = await api.person.getJob()
                console.log(res, '8888888888888888888888888888888888888')
                commit(types.JOB_TYPE, res)
                return res
            } catch (err) {
            }
        },
    }
}

export default job

