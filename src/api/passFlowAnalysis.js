/*票务分析数据可视化*/
import axios from '@/http'
import {getUrl} from "./path";

const passFlowAnalysis = {
    realPassFlow () {
        return axios({
            method: 'GET',
            url: '/iot/cache/PassFlow_Current_Data',
        })
    }
}

export default passFlowAnalysis
