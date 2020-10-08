import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { eventBus } from './eventBus.js'

var http = axios.create({
  baseURL: `https://kurin.albreis.com.br/api/`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(async (config) => {
  config.headers['X-User-Token'] = sessionStorage.token
  eventBus.$emit('request')
  return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(error);
});

http.interceptors.response.use(async (config) => {
  eventBus.$emit('response')
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
