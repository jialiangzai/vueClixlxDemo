import http from './requests'

export function createToken(){ 
  return http.$axios({
    url: 'api/token/createToken',
    method: 'POST',
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}