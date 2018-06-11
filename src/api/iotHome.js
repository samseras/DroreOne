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
    getEditInfo(){

        /*return axios ({
            method: 'GET',
            url:''
        })*/
    },
    editDeviceTypeInfo(val){
        console.log('2222222222222');
        console.log(val);
        /*return axios({
            method:'POST',
            url:''
        })*/
    },
    editDeviceCardInfo(val){
        console.log('3333333333',val);
        return axios ({
            method:'POST',
            url:'/iot/devices/properties',
            data:{
                condition:val

            }
        })
    },
    getDeviceListInfo(category,curpage,pagesize){
        console.log(category,curpage,pagesize);
        return axios ({
            method:'POST',
            url:'/iot/devices/query',
            data:{
                "pageCondition" : {
                    "pageno" : curpage,
                    "pagesize" : pagesize
                },
                "ioTDeviceCondition" : {
                    "deviceTypes" : [ category ]
                }
                /*deviceTypes:[category],*/
            }
        })
    },
    getDeviceEditInfo(id){   //卡片列表查询可编辑的数据
        return axios ({
            method:'GET',

            url:'/iot/devices/properties?id='+id

        })
    },
    DevicePoliceInfo(){
        return axios ({
            method:'POST',
            url:'/iot/events/query',
            data:{
                "pageCondition" : {
                    "pageno" : 1,
                    "pagesize" : 10
                },
                "ioTEventCondition" : {
                    "types" : [ "ALARM" ]
                }
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
