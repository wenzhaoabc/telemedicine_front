import './utils/polyfills' // 注意要在createApp 的前面
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';

import App from './App.vue'
import router from './router'
import axios from "axios"
// 引入Arco design
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

axios.defaults.baseURL = "http://localhost:8080"
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(pinia)
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')


// axios.get("/api/login/user?mobilePhone=359751980392517&password=wang123456")
//     .then((res) => {
//         console.log(res.data)
//     }).catch((e) => {
//         console.log(e);
//     })