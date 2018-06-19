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
    DeviceDetailInfo(id){  //卡片列表查询不可编辑的数据
        return axios ({
            method:'GET',
            url:'/iot/devices/attributes?id='+id,
        })
    },
    tenDevicePoliceInfo(id){  //最新十条数据
        return axios ({
            method:'POST',
            url:'/iot/events/query',
            data:{
                "pageCondition" : {
                    "orders": [
                        {
                            "enable": true,
                            "prop": "createTime"
                        }],
                    "pageno" : 1,
                    "pagesize" : 10
                },
                "ioTEventCondition" : {
                    "types" : [ "STATUS_CHANGED" ],
                    "deviceCondition":{
                        "deviceIds":[
                            id
                        ]
                    }
                }
            }
        })
    },
    DeviceMonitorInfo(val,id){  //设备状态监控数据
        console.log('看id',id,val);
        return axios ({
            method:'POST',
            url:'/iot/events/query',
            data:{
                "pageCondition" : {
                    "pageno" : val,
                    "pagesize" : 20
                },
                "ioTEventCondition" : {
                    "types" : [ "STATUS_CHANGED" ],
                    "deviceCondition":{
                        "deviceIds":[
                            id
                        ]
                    }
                },

            }
        })
    },
    DeviceAlermInfo(val,id,start,end){
        console.log('看报警事件:',id,val,start,end);
        if(!start){
            return axios ({
                method:'POST',
                url:'/iot/events/query',
                data:{
                    "pageCondition" : {
                        "pageno" : val,
                        "pagesize" : 20
                    },
                    "ioTEventCondition" : {
                        "types" : [ "STATUS_CHANGED" ],
                        "deviceCondition":{
                            "deviceIds":[
                                id
                            ]
                        }
                    },
                }
            })
        }else{
            return axios ({
                method:'POST',
                url:'/iot/events/query',
                data:{
                    "pageCondition" : {
                        "pageno" : val,
                        "pagesize" : 20
                    },
                    "ioTEventCondition" : {
                        "types" : [ "STATUS_CHANGED" ],
                        "deviceCondition":{
                            "deviceIds":[
                                id
                            ]
                        },
                         "start":start+'00:00:00',
                         "end":end+'00:00:00'

                    },

                }
            })
        }

    },
    DevicePickInfo(val,id){
        return axios ({
            method:'POST',
            url:'/iot/events/query',
            data:{
                "pageCondition" : {
                    "pageno" : val,
                    "pagesize" : 20
                },
                "ioTEventCondition" : {
                    "types" : [ "DATA_CHANGED" ],
                    "deviceCondition":{
                        "deviceIds":[
                            id
                        ]
                    }
                },

            }
        })
    },
    DataPickInfo(eventId){
        return axios ({
            method:'GET',
            url:'/iot/events/'+eventId+'/data',
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
