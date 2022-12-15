import axios from 'axios'

// 每次请求携带cookies信息
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

export function getDomainUrl() {
  return 'http://localhost:8080'
}


export function getCurrentUrl() {
  return 'http://localhost:8081'
}

// create an axios instance
const service = axios.create({
  // baseURL:'https://api.guisu.fun:6001/api/',
  baseURL: getDomainUrl() + '/api',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000, // request timeout
  //withCredentials: true
  async: true,
  crossDomain: true,

})
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (localStorage.getItem('userToken')) {
      config.headers.Token = localStorage.getItem('userToken');
    }
    // config.headers = {
    //     'Content-Type': 'application/json'
    // }
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)


service.interceptors.response.use(

  response => {
    console.log('response：', response)

    // if the custom code is not 200, it is judged as an error.
    if (response.status != 200) {
      //判断token是否失效
      if (response.status == 500) {
        //清除当前token信息
        store.commit('delLogin');
        //前往登录页

        return Promise.reject(new Error('您尚未登录' || 'Error'))
      }

      return Promise.reject(new Error('Error'))
    } else {
      return response
    }
  },
  error => {
    if (error.response.status == 500) {
      store.commit('delLogin');
      startLogin();
    }
    console.log(error) // for debug
    return Promise.reject(error)
  }

)

export default service
