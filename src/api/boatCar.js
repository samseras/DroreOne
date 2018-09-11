/*
这是车船接口api
* */
import axios from '@/http'
import {getUrl} from './path'



const boat = {
    getAllExport(){
      return axios({
          method:'GET',
          url:getUrl('/vehicle/export')
      })
    },
    getSingleEeport(params){
        return axios({
            method:'POST',
            url:getUrl('/vehicle/export'),
            data:{
                ids:params
            }
        })
    },


    getAllBoat () {
        return axios ({
            method: 'GET',
            url: getUrl('/vehicle')
        })
    },
    getAllVehicle(id) {
        return axios ({
            method: 'GET',
            url: getUrl('/vehicle?type='+id)
        })
    },

    getAllVehicleGps(){
        return axios ({
            method: 'GET',
            url: getUrl('/vehicle?withgps=true&withdriver=true')
        })
    },
    getAllVehicleGpsById(id){
        return axios ({
            method: 'GET',
            url: getUrl('/vehicle?withgps=true&withdriver=true&id='+id)
        })
    },

    getHistoryRoute(param){
        return axios ({
            method: 'POST',
            url: getUrl('/gps/history'),
            data:JSON.stringify(param)
        })
    },

    updateBoat  (params) {
        return axios ({
            method: 'PUT',
            url: getUrl('/vehicle'),
            data: params
        })
    },
    createBoat  (params) {
        return axios ({
            method: 'POST',
            url: getUrl('/vehicle'),
            data: params
        })
    },
    deleteBoat  (par) {
        console.log(par, '这是传递的id')
        return axios ({
            method: 'DELETE',
            url: getUrl('/vehicle'),
            data:{
                ids: par
            }
        })
    }
}

export default boat
