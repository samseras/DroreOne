// import api from '@/api'
import * as types from '../mutations-type'

const analyze = {
    state: {
        refresh: '',
        companyname:'卓锐科技股份有限公司',
        dashboradname:'',
    },

    getters: {
        getRefresh (state) {
            return state.refresh
        },
        getCompanyName(state){
            return state.companyname
        }
    },
    setters: {},
    mutations: {
        [types.REFRESH_DATA_TYPE] (state, data) {
            state.refresh = data*1000
            console.log(state.refresh, '刷新频率')
        },
        [types.COMPANY_DATA_NAME](state,data){
            state.companyname = data
        }
    },
    actions: {
    }
}

export default analyze
