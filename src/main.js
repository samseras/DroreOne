// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Drore from 'vue'
import App from './App'
import router from './router'


Drore.config.productionTip = false

/* eslint-disable no-new */
new Drore({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
 
})
