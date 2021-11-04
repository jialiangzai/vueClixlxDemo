import http from './requests';

// 查询收藏商品
export function getByMemberId(params) {
  return http.$axios({
    url: '/api/message/getByMemberId',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

// 添加收藏
// /message/get

export function getMess({id,token}){
  return http.$axios({
    url: '/api/message/get?id='+id,
    method: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }
  })
}

// 删除收藏
export function deleteMess({ids,token}){
  return http.$axios({
    url: '/api/message/delete',
    method: 'POST',
    data: ids,
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }
  })
}

// 标记已读
export function makeRead({ids,token}){
  return http.$axios({
    url: '/api/message/makeRead',
    method: 'POST',
    data: ids,
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }
  })
}
