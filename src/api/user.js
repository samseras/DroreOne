/**
 *  this is user center model!
 * */
import axios from '@/http'
import {getUrl} from './path'

const user = {
    getUserRoleInfo () {
        return axios({
            method: 'GET',
            url: getUrl(`/uc/role`)
        })
    },
    deleteUserRoleInfo (id) {
        return axios({
            method: 'DELETE',
            url: getUrl(`/uc/role`),
            data: {
                ids: id
            }
        })
    },
    createdUserRoleInfo (pramas) {
        return axios({
            method: 'POST',
            url: getUrl(`/uc/role`),
            data: pramas
        })
    },
    updataUserRoleInfo (pramas) {
        return axios({
            method: 'PUT',
            url: getUrl(`/uc/role`),
            data: pramas
        })
    },
    getUserPermission () {  // 树状结构
        return axios({
            method: 'GET',
            url: getUrl(`/uc/permission`)
        })
    },
    getUserDepartment () {
        return axios({
            method: 'GET',
            url: getUrl(`/uc/department`)
        })
    },
    deleteUserDepartment (id) {
        return axios({
            method: 'DELETE',
            url: getUrl(`/uc/department`),
            data: {
                ids: id
            }
        })
    },
    createdUserDepartment (pramas) {
        return axios({
            method: 'POST',
            url: getUrl(`/uc/department`),
            data: pramas
        })
    },
    updataUserDepartment (pramas) {
        return axios({
            method: 'PUT',
            url: getUrl(`/uc/department`),
            data: pramas
        })
    },
    getUserJobInfo () {
        return axios({
            method: 'GET',
            url: getUrl(`/uc/job`)
        })
    },
    deleteUserJobInfo (id) {
        return axios({
            method: 'DELETE',
            url: getUrl(`/uc/job`),
            data: {
                ids: id
            }
        })
    },
    createdUserJobInfo (pramas) {
        return axios({
            method: 'POST',
            url: getUrl(`/uc/job`),
            data: pramas
        })
    },
    updataUserJobInfo (pramas) {
        return axios({
            method: 'PUT',
            url: getUrl(`/uc/job`),
            data: pramas
        })
    },
    getUserInfo () {
        return axios({
            method: 'GET',
            url: getUrl(`/uc/user`)
        })
    },
    getUserGPSInfo () {
        return axios({
            method: 'GET',
            url: getUrl(`/uc/user?withgps=true`)
        })
    },
    deleteUserInfo (id) {
        return axios({
            method: 'DELETE',
            url: getUrl(`/uc/user`),
            data: {
                ids: id
            }
        })
    },
    createdUserInfo (pramas) {
        return axios({
            method: 'POST',
            url: getUrl(`/uc/user`),
            data: pramas
        })
    },
    updataUserInfo (pramas) {
        return axios({
            method: 'PUT',
            url: getUrl(`/uc/user`),
            data: pramas
        })
    },
}

export default user
