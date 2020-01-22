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
// import VueAuthenticate from 'vue-authenticate'
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import CircularCountDownTimer from "vue-circular-count-down-timer";
// configure language
locale.use(lang);

// import store from './store'
import Axios from 'axios'
// import { base_url } from '../config';

Vue.prototype.$http = Axios;
const token = localStorage.getItem('usertoken')
if (token) {
  Axios.defaults.headers.common['Authorization'] = token
} else Axios.defaults.headers.common['Authorization'] = localStorage.getItem('refreshtoken')

// Vue.use(VueAuthenticate, {
//   tokenName: 'access_token',
//   baseUrl: base_url
//   // storageType: 'cookieStorage'
// })

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuetify)
Vue.use(CircularCountDownTimer);
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios)
Vue.use(ArgonDashboard)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')