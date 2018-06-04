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
    }
}
export default iotHome
