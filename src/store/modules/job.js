// import api from '@/api'
import * as types from '../mutations-type'
import api from '@/api'

const map = {
    state: {
      jobType: []
    },
    getters: {
        getJobTypeList (state) {
            console.log(state.jobType, '这是从vuex里边拿到的')
            return state.jobType
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
    },
    actions: {
        async getJobType ({commit}) {
            try {
                let res = await api.person.getJob()
                commit(types.JOB_TYPE, res)
                return res
            } catch (err) {
                console.log('errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            }
        },
    }
}

export default map
