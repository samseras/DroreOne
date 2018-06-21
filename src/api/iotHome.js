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
    editDeviceCardInfo(val){  //卡片列表编辑提交
        console.log('3333333333',val);
        return axios ({
            method:'POST',
            url:'/iot/devices/properties',
            data:{
                condition:val
            }
        })
    },
    postDeviceQualificationInfo(id){  //设备认证编辑
        return axios ({
            method:'POST',
            url:'/iot/devices/properties',
            data:{
                "deviceIds":[id]
            }
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
    DeviceAlermInfo(val,id,start,end){   //事件告警
        console.log('看告警事件:',id,val,start,end);
        //let starts=start
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
                        "types" : [ "ALARM" ],
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
                        "types" : [ "ALARM" ],
                        "deviceCondition":{
                            "deviceIds":[
                                id
                            ]
                        },
                         "start":start+' 00:00:00',
                         "end":end+' 00:00:00'

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
    },
    getSystemLogInfo(startTime,endTime,startItem,pageSize){
       /* let start1='2017-6-12 00:00:00';
        let end1='2018-8-12 00:00:00';
        let istart=1;
        let icount=40;*/
        return axios ({
            method:'GET',
            url:'/v1/log/iot?timeStart='+startTime+'&timeEnd='+endTime+'&items-start='+startItem+'&items-count='+pageSize

        })
    }
}
export default iotHome
