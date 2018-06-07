import axios from '@/http'
import {getUrl} from './path'

const iotHome = {
    getIotMenu () {
        return axios ({
            method: 'GET',
            url:'/iot/deviceinfos'
        })
    },
    getDeviceTypeInfo(model){
        return axios ({
            method: 'GET',
            url:'/iot/devicemodels?type='+model
        })
    },
    editDeviceTypeInfo(val){
        console.log('2222222222222');
        console.log(val);
        /*return axios({
            method:'POST',
            url:''
        })*/
    },
    editDeviceListInfo(val){
        console.log('3333333333');
        console.log(val);
        /*return axios({
            method:'POST',
            url:''
        })*/
    },
    getDeviceListInfo(category){
        return axios ({
            method:'POST',
            url:'/iot/devices/query',
            data:{
                deviceTypes:[category]
            }
        })
    },
    setDeviceStatusInfo(id){
        return axios({
            method:'POST',
            url:'/iot/devices/action',
            data:{
                "condition" : {
                    "deviceIds" : [ id]
                },
            }
        })
    }
}
export default iotHome
