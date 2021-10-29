import http from './requests';

// 查询收藏
export function getFavoriteList({pageSize,pageNum,token}) {
  return http.$axios({
    url: 'api/favorite/getByMemberId',
    method: 'POST',
    data: {pageNum,pageSize},
    headers: {
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }

  })
}
// 添加收藏 
export function addFavorite({ courseId }) {
  return http.$axios({
    url: 'api/favorite/addFavorite',
    method: 'POST',
    data: {
      courseId,
    },
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}

export function deleteFavorite({ id,token }) {
  return http.$axios({
    url: 'api/favorite/deleteFavorite?id=' + id,
    method: 'GET',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
      'token': token
    }
  })
}
