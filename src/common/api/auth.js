import http from './requests';

// 手机 加 密码登陆
export function loginByJson (params){
  return http.$axios({
    url: '/api/u/loginByJson',
    method: 'POST',
    data: params
  })
}

// 手机验证码登陆
export function loginByMobile(params){
  return http.$axios({
    url: '/api/u/loginByMobile',
    method: 'POST',
    data: params
  })
}

// 退出登陆
export function logout() {
  return http.$axios({
    url: '/api/u/logout',
    method: 'GET'
  })
}

// 修改密码
export function modifyPassword({token,...params}){
  return http.$axios({
    url: '/api/member/modifyPassword',
    method: 'POST',
    data: {
      ...params
    },
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token':token
    }
  })
}

// 手机号验证码注册
export function register(params){
  return http.$axios({
    url: '/api/member/register',
    method: 'POST',
    data: params
  })
}

// 找回密码
export function findPassword(params){
  return http.$axios({
    url: '/api/member/findPassword',
    method: 'POST',
    data: params
  })
}

// 重置密码

export function resetPassword(params) {
  return http.$axios({
    url: '/api/member/resetPassword',
    method: 'POST',
    data: params
  })
}

// 获取个人信息
export function getInfo({token}) {
  return http.$axios({
    url: '/api/member/getInfo?token='+token,
    method: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

// 获取购物车数据

export function getShopCarCounter(){
  return http.$axios({
    url: '/api/shopcar/getShopCarCounter',
    method: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

// updatePortrait
// 修改头像
export function updatePortrait(params){
  return http.$axios({
    url: '/api/member/updatePortrait',
    method: 'POST',
    data: params,
    headers: {
      'Content-Type':'multipart/form-data;',
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

// 获取 token /token/createToken

export function createToken(){
  return http.$axios({
    url: '/api/token/createToken',
    method: 'POST'
  })
}

// 修改手机号

export function modifyMobile({token,...params}){
  return http.$axios({
    url: '/api/member/modifyMobile',
    method: 'POST',
    data: {
      ...params
    },
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token':token
    }
  })
}


// 修改用户名

export function modifyUsername({token,...params}){
  return http.$axios({
    url: '/api/member/modifyUsername',
    method: 'POST',
    data:{
      ...params
    },
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token':token
    }
  })
}
