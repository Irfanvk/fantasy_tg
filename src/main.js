import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;
const token = localStorage.getItem('usertoken')
if (token) {
  Axios.defaults.headers.common['Authorization'] = token
}
console.log(Axios)

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
