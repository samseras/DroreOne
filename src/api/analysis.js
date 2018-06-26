/*
分析模块api请求
* */
import axios from '@/http'



const analysis = {
    getDashboradList () {
        return axios ({
            method: 'GET',
            url: '/analysis/service/v1/dashboard/all'
        })
    },
    updateDashborad(params,id){
        return axios ({
            method: 'PUT',
            url: `/analysis/service/v1/dashboard/${id}`,
            data: params
        })
    },
    getStreamDataById (id) {
        return axios ({
            method: 'GET',
            url: `/analysis/service/v1/dashboardScenarioMap/byDashboardId/${id}`
        })
    },
    getChartDashboardName (id) {
        return axios ({
            method: 'GET',
            url: `/analysis/service/v1/scenario/${id}/chart4dashboard`
        })
    },
    getScenarioMapData (id) {
        return axios ({
            method: 'GET',
            url: `/analysis/service/v1/scenario/${id}/result4dashboard`
        })
    },

}

export default analysis
