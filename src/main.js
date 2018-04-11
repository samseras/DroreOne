// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/font.css'
import echarts from 'echarts'
import VueDND from 'awe-dnd'
import '@/filter'
import VueI18n from 'vue-i18n'


Vue.use(VueI18n);
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.use(VueDND)
Vue.config.productionTip = false
const i18n = new VueI18n({
    locale: 'CN',    // 语言标识
    messages: {
        'CN': require('./assets/common/lang/cn'),   // 中文语言包
        'EN': require('./assets/common/lang/en')    // 英文语言包
    },
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    components: { App },
    template: '<App/>'

})
