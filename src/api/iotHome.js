import axios from '@/http'
import {getUrl} from './path'

const iotHome = {
    getIotMenu () {
        return axios ({
            method: 'GET',
            //url: getUrl('/plant')
            //url:'/info/device/model?type=4'
            url:'/iot/deviceinfos'
        })
    },
    getDeviceTypeInfo(model){
        return axios ({
            method: 'GET',
            //url:'/iot/devices/type/'+model+'/models'
            url:'/iot/devicemodels?type='+model
        })
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
