import http from './requests';

// 发送注册或登录验证码
export function sendRegisterOrLoginCaptcha ({mobile}){
  return http.$axios({
    url: 'api/sms/sendRegisterOrLoginCaptcha?mobile='+mobile,
    method: 'GET'
  })
}

export function sendFindPasswordCaptcha({mobile}) {
  return http.$axios({
    url: 'api/sms/sendFindPasswordCaptcha?modile='+mobile,
    method: 'GET'
  })
}

