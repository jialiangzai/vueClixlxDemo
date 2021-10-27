import http from './requests';

// 手机 加 密码登陆
export function loginByJson (params){
  return http.$axios({
    url: 'api/u/loginByJson',
    method: 'POST',
    data: params
  })
}

// 手机验证码登陆
export function loginByMobile(params){
  return http.$axios({
    url: 'api/u/loginByMobile',
    method: 'POST',
    data: params
  })
}

// 退出登陆
export function logout() {
  return http.$axios({
    url: 'api/u/logout',
    method: 'GET'
  })
}

// 修改密码
export function modifyPassword(params){
  return http.$axios({
    url: 'api/member/modifyPassword',
    method: 'POST',
    data: params
  })
}

// 手机号验证码注册
export function register(params){
  return http.$axios({
    url: 'api/member/register',
    method: 'POST',
    data: params
  })
}

// 找回密码
export function findPassword(params){
  return http.$axios({
    url: 'api/member/findPassword',
    method: 'POST',
    data: params
  })
}

// 重置密码

export function resetPassword(params) {
  return http.$axios({
    url: 'api/member/resetPassword',
    method: 'POST',
    data: params
  })
}