// /*票务分析数据可视化*/
// import axios from '@/http'
// import {getUrl} from "./path";
//
// const passFlowAnalysis = {
//     realPassFlow () {
//         return axios({
//             method: 'GET',
//             url: '/iot/cache/PassFlow_Current_Data',
//         })
//     }
// }
//
// export default passFlowAnalysis
/*票务分析数据可视化*/
import axios from '@/http'
import {getUrl} from "./path";

const passFlowAnalysis = {
    heatFlow (){
        return axios({
            method:'GET',
            url:'/iot/cache/PassFlow_Detail_Log'
        })
    },
    realPassFlow () {     //实时客流
        return axios({
            method: 'POST',
            url:'/iot/passflow/queryrealtimepassflow'

        })
    },
    grandPassFlow (params) {   //累计客流
        return axios({
            method: 'POST',
            url:`/iot/passflow/querytotalpassflow`,
            data:params
            // url: `/iot/xianghu/passflow/querylinkrelativeratio?timeRange=$(params)`,
        })
    },
    todayPassFlow () {   // 当日各时段客流
        return axios({
            method: 'POST',
            url: `/iot/passflow/querycurrentdaypassflowtrend`,
        })
    },
    tripPassFlow (params) {        //景区环比客流
        return axios({
            method: 'POST',
            url: `/iot/passflow/querylinkrelativeratio`,
            data:params
        })
    },
    totalPassFlow (params) {    //总客流
        return axios({
            method: 'POST',
            url: `/iot/passflow/querytotalpassflowtrend`,

            // url: `/iot/passflow/querytotalpassflowtrend?timeRange=${params}`,

            // url: `/iot/xianghu/passflow/querytotalpassflowtrend?timeRange=${params}`,
            data:params
        })
    },
    areaNumber (){
        return axios ({
            method:'get',
            url:`/iot/cache/PassFlow_Current_Data`
        })
    },
    Inoutcar (params){
        return axios({
            method:'POST',
            url:`/iot/carpark/querycarparkcapacity`,
            data:params
        })
    },
    parkNumber(){
        return axios({
            method:'POST',
            url:'/iot/carpark/querycurrentcarparkcapacity',
            data:{}
        })
    }
}

export default passFlowAnalysis
