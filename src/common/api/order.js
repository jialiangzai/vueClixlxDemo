import http from './requests';

// /order/getByMemberId
// 查询订单
export function getByMemberId(params){
  return http.$axios({
    url: '/api/order/getByMemberId',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}