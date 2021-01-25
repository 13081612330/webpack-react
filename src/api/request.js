import axios from 'axios'
 
// 超时时间
axios.defaults.timeout = 30000
// http请求拦截器
axios.interceptors.request.use(config => {
    Object.assign(
      config,
      {
        headers: {
            'content-type': 'application/json;charset=UTF-8'
          }
      },
    )
  return config
}, error => {
  return Promise.reject(error)
})
let erorrMap = {
  'CMN00000': '成功',
  'CMN00001': '输入参数为空',
  'CMN00002': '输入参数校验失败'
}
// http响应拦截器
axios.interceptors.response.use(res => {
  let status = res.data.status
  if (status === '100') {
      return res.data
  } else {
    return res.data
  }
}, async (error) => {
  if (error.request) {
    if (error.request.status === 0) {
    //   debugger
      //超时
    }
  } else if (error.response) {
    if (error.response.status === 400) {
 
    } else if (error.response.status === 404) {
      //未找到资源
    } else if (error.response.status === 401) {
      //'请先登录'
    } else if (error.response.status === 500) {
      //'服务器异常'
    }
  }
  return Promise.reject(error)
})
 
let request = (config) => {
  /*let token = window.localStorage.getItem('token')
  axios.defaults.headers.common['token'] = token || ''*/
  return axios.request(
    Object.assign({
        method: 'post',
        data: {},
        params: {}
      },
      config
    )
  )
}
 
export default request