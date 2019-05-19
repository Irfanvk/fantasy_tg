import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'

 
Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
