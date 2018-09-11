/*
用户信息模块
* */

import api from '@/api'
import * as types from '../mutations-type'

const user = {
    state: {
        user: '',
        userRoles: 'ADMIN',
        userDetailInfo: {}
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
            if (state.userDetailInfo) {
                let info = state.userDetailInfo
                if (info.id === '1') {
                    localStorage.setItem('role', JSON.stringify([1]))
                    return [1]
                } else {
                    let role = (info.role === undefined || info.role === null)? []: info.role.permissions
                    if (role === null || role.length === 0) {
                        localStorage.setItem('role', JSON.stringify([]))
                        return []
                    } else if (role.length > 0) {
                        let rolesId = role.map(item => {
                            return item.id
                        })
                        rolesId.forEach(item => {
                            if (item.length > 2) {
                                rolesId.push(item.substring(0,2))
                            }
                        })
                        rolesId = Array.from(new Set(rolesId))
                        localStorage.setItem('role', JSON.stringify(rolesId))
                        return rolesId
                    }
                }
            } else {
                return []
            }
        },
        getUserDetailMsg (state) {
            return state.userDetailInfo
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
        [types.SET_USER_DETAIL_INFO] (state, data) {
            state.userDetailInfo = data
        },
    },
    actions: {
        async login ({commit}, userInfo) {
            let data = await api.login.userLogin(userInfo)
        },
        async logout ({commit},data) {
            commit(types.SET_USER, '')
            localStorage.removeItem('token')
            localStorage.removeItem('role')
            return await api.login.userLogout(data)
        },
        clearToken ({commit}) {
            commit(types.SET_USER, '')
            localStorage.removeItem('token')
        },
        async getUserDetailInfo ({commit},username) {
            try {
                let data = await api.lib.getUserInfo(username)
                commit(types.SET_USER_DETAIL_INFO,data[0])
            } catch (err) {
                console.log(err)
            }
        }
    }
}

export default user
