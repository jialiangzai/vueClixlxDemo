
import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const service = axios.create()

service.interceptors.request.use(req=>{
    //console.log(req)
    return req
},error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    // console.log(res)
    const code = res.data.meta.code
    // 获取错误信息
    if (code === '50002') {
      MessageBox.confirm('登录状态已过期，请重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('isLogin')
        window.location.href = '/home'

      }).catch(() => {});
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
