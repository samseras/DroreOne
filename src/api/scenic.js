/*
景点配置模块api
* */
import axios from '@/http'



const scenic = {
    getAllScenic () {
        return axios ({
            method: 'GET',
            url: '/drore/cms/scenicspot/getAll'
        })

    },
    updateScenic (params) {
        return axios ({
            method: 'PUT',
            url: '/drore/cms/scenicspot/update',
            params
        })
    },
    createScenic (params) {
        return axios ({
            method: 'POST',
            url: '/drore/cms/scenicspot/create',
            params
        })
    },
    deleteScenic (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/drore/cms/scenicspot/delete',
            data:{
                id: par.id
            }
        })
    }
}

export default scenic
