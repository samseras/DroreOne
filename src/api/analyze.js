/*
分析模块api请求
* */
import axios from '@/http'



const analyze = {
    getControlData (params) {
        return axios ({
            method: 'GET',
            url: '/dsp/service/v1/dashboard/scenarioMaps/1',
            params
        })

    }
}

export default analyze
