/*
用户信息模块
* */

import api from '@/api'
import * as types from '../mutations-type'

const user = {
    state: {
        user: '',
        userRoles: ''

    },
    getters: {
        getUserInfo (state) {
            if (state.user === '') {
                return localStorage.getItem('userName')
            } else{
                return state.user
            }
        },
        getUserRole (state) {
            return state.userRoles
        }
    },
    setters: {},
    mutations: {
        [types.SET_USER] (state, data) {
            state.user = data
        },
        [types.SET_USER_ROLES] (state, data) {
            state.userRoles = data
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
        },
        async getUserRoles ({commit},userName) {
             console.log(900000000000000000000000)
            try {
                let data = await api.login.getUserRoles(userName)
                console.log(data[0], '这个是vuexAction')
                commit(types.SET_USER_ROLES, data[0])
                return data[0]
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default user
