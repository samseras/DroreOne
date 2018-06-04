/*
用户信息模块
* */

import api from '@/api'
import * as types from '../mutations-type'

const user = {
    state: {
        user: '',

    },
    getters: {
        getUserInfo (state) {
            return state.user
        }
    },
    setters: {},
    mutations: {
        [types.SET_USER] (state, data) {
            state.user = data
        },
    },
    actions: {
        async login ({commit}, userInfo) {
            let data = await api.login.userLogin(userInfo)
        },
        async logout ({commit},data) {
            commit(types.SET_USER, '')
            localStorage.removeItem('token')
            return await api.login.userLogout(data)
        }
    }
}

export default user
