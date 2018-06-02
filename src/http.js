// import httpConfig from '@/constant/http-config'
import axios from 'axios'
import router from './router'
// axios.defaults.timeout = httpConfig.TIMEOUT


// 此处为axios配置请求头，
axios.interceptors.request.use(
    config => {
        // 此处做请求拦截，如果有需要
        // config.headers = {}
        if (config.url.startsWith('/v1') || config.url.startsWith('/info')|| config.url.startsWith('/analysis')) {
            config.headers = {
                // 'request-token': JSON.parse(localStorage.getItem('token') || ''),
                // 'reply-nonce': JSON.parse(localStorage.getItem('nonce') || ''),
                'Authorization': JSON.parse(localStorage.getItem('token'))
            }
        }
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
              console.log(response.headers, 'opoppopopopop')
            // if (response.data) {
                return response.data
            // } else {
            //     return response
            // }

        }
        if (response.status === 400 && response.request.status === 400){
             // window.location.href = '/err'
            console.log(response, ',.,.,.,.,.,.,.,,..klkl')
        }
        return response
    },
    error => {//失败判断
        console.log(error.response, '这是失败的回掉函数')
        // if (error.response.data.code === 401 ) {
        //      // store.dispatch('logout').then(() => location.reload())
        //     console.log(error, '这是登录失败')
        // }
        if (error.response) {
            switch (error.response.status){
                case 401:
                    console.log('用户认证失败，重新登陆')
                    router.replace({
                        path: '/login'
                    })
            }
        }
        return Promise.reject(error.response.data)
    }
)


export default axios
