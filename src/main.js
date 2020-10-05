import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'


var http = axios.create({
  baseURL: `https://kurin.albreis.com.br/api/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(async (config) => {
  config.headers['X-User-Token'] = sessionStorage.token
  return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(error);
});

Vue.prototype.axios = http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
