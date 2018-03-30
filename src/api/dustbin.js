/*
这是垃圾桶接口api
* */
import axios from '@/http'



const dustbin = {
    getAllDustbin () {
        return axios ({
            method: 'GET',
            url: '/droreone/dustbin'
        })

    },
    updateDustbin  (params) {
        return axios ({
            method: 'PUT',
            url: '/droreone/dustbin',
            params
        })
    },
    createDustbin  (params) {
        return axios ({
            method: 'POST',
            url: '/droreone/dustbin',
            params
        })
    },
    deleteDustbin  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: '/droreone/dustbin',
            data:{
                id: par.id
            }
        })
    }
}

export default dustbin
