import api from '@/api'
import * as types from '../mutations-type'

const shop = {
    state: {
        businesstype: []
    },
    getters: {
        getBusinessType (state) {
            return state.businesstype
        },
    },
    setters: {},
    mutations: {
        [types.BUSINESS_TYPE] (state, data) {
            state.businesstype = data
        },
    },
    actions: {
        async getBusinessTypeList ({commit}) {
            try {
                let res = await api.shop.getBusinesstype()
                console.log(res, '这是请求回来的')
                commit(types.BUSINESS_TYPE, res)
            } catch (err) {
                console.log('errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            }
        },
    }
}

export default file
