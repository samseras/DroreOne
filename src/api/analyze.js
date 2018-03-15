/*
分析模块api请求
* */
import axios from '@/http'



const analyze = {
    getControlData (params) {
        return axios ({
            method: 'POST',
            url: '/analysis/service/v1/scenario4dashboard',
            params
        })

    }
}

export default analyze
