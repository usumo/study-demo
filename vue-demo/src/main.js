import Vue from 'vue'
import App from './App.vue'

import router from '@/routes';
import permission from '@/directive/permission' // 权限指令

Vue.use(permission)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')