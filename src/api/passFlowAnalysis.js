/*票务分析数据可视化*/
import axios from '@/http'
import {getUrl} from "./path";

const passFlowAnalysis = {
    realPassFlow () {
        return axios({
            method: 'GET',
            url: '/iot/cache/PassFlow_Current_Data',
        })
    },
    heatFlow (){
        return axios({
            method:'GET',
            url:'/iot/cache/PassFlow_Detail_Log'
        })
    }
}

export default passFlowAnalysis
