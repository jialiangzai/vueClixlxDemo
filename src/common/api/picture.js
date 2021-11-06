import request from './requests';
import {Decrypt} from '@/utils/aes'
export function getImageByCode(imageCode){
  return request({
    url: '/api/images/getImageByCode',
    method: 'GET',
    params: imageCode,
    headers: {
      'Authorization': Decrypt(localStorage.getItem('token'))
    }
  })
}