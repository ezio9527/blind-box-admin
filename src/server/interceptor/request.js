// 添加请求拦截器
const axios = require('axios')
axios.interceptors.request.use(function (config) {
  console.log('asdf')
  config.url = 'baseUrl' + config.url
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
