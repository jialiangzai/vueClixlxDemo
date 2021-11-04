import http from './requests';

// /member/update

// 更新头像
export function updateUserInfo({token,...params}){
  return http.$axios({
    url: '/api/member/update',
    method: 'POST',
    data: {
      ...params
    },
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }
  })
}
