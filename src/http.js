// import httpConfig from '@/constant/http-config'
import axios from 'axios'
// import store from './store'
// axios.defaults.timeout = httpConfig.TIMEOUT


// 此处为axios配置请求头，
axios.interceptors.request.use(
    config => {
        // 此处做请求拦截，如果有需要
        // config.headers = {}
        return config
    },
    err => {
        console.log(err)
        return Promise.reject(err)
    }
)
//响应拦截器即异常处理
axios.interceptors.response.use(
    response => {
        if ((response.status === 200 && response.request.status === 200) || (response.status === 201 && response.request.status === 201)) {//成功判断
              console.log(response, 'opoppopopopop')
            // if (response.data) {
                return response.data
            // } else {
            //     return response
            // }

        }
        if (response.status === 400 && response.request.status === 400){
             window.location.href = '/err'
            console.log(response, ',.,.,.,.,.,.,.,,..klkl')
        }
        return response
    },
    error => {//失败判断
        if (error.response.data.code === 401 ) {
             store.dispatch('logout').then(() => location.reload())
        }
        return Promise.reject(error.response.data)
    }
)


export default axios
