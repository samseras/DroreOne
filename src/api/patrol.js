/*
 调度巡更路线api请求
* */
import axios from '@/http'
import {getUrl} from "./path";



const patrol = {
    getAllPatrol () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/inspection')
        })
    },
    getAllPatrolTrue () {
        return axios ({
            method: 'GET',
            url: getUrl('/schedule/inspection?isEnabled=true')
        })
    },
    getAllPatrolPeople (id) {
        return axios ({
            method: 'GET',
            url: getUrl('/securitystatus?id='+id)
        })
    },
    createdPatrol (item) {
        return axios ({
            method: 'POST',
            url: getUrl('/schedule/inspection'),
            data:item

        })
    },
    deletePatrol(item){
        return axios ({
            method: 'DELETE',
            url: getUrl('/schedule/inspection'),
            data:{
                ids:item
            }

        })
    },
    updataPatrol(info){
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/inspection'),
            data:info
        })
    },
    stareEndPlan (id) {
        return axios ({
            method: 'PUT',
            url: getUrl('/schedule/inspection/isenabled'),
            data:{
                ids:id
            }

        })
    },

    isBindInspectionByRoute  (par) {
        console.log(par, '这是传递的id')
            return axios ({
            method: 'GET',
            url: getUrl('/schedule/inspection?routeId='+par)
        })
    },
}

export default patrol
