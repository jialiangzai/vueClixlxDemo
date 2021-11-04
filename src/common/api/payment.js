import http from './requests';

// /order/getByMemberId
// 查询订单
export function settlement(params){
  return http.$axios({
    url: '/api/order/settlement',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

//微信结算
export function wxpay(params){
    return http.$axios({
      url: '/api/pay/wxpay/createOrder',
      method: 'POST',
      data: params,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
  }


  //支付宝结算
export function zfbpay(params){
    return http.$axios({
      url: '/api/pay/alipay/createOrder',
      method: 'POST',
      data: params,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
}


//支付宝
export function queryOrderWithAli(orderNumber){
    return http.$axios({
      url: '/api/pay/alipay/queryOrder',
      method: 'GET',
      params: orderNumber,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
}

export function queryOrderWithWX(orderNumber){
    return http.$axios({
      url: '/api/pay/wxpay/queryOrder',
      method: 'GET',
      params: orderNumber,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      }
    })
}
  