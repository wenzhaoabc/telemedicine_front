import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入Arco design
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import axios from 'axios'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)

app.mount('#app')

// axios.get("/api/api/login/user?mobilePhone=12345678910&password=123456")
//     .then((res) => {
//         console.log(res.data)
//     }).catch((e) => {
//         console.log(e);
//     })
