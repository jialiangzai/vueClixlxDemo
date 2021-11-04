import http from './requests';

export function getImageByCode(imageCode){
  return http.$axios({
    url: '/api/images/getImageByCode',
    method: 'GET',
    params: imageCode,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}