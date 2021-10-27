import http from './requests';

// 查询收藏商品
export function getFavoriteList(params) {
  return http.$axios({
    url: 'api/favorite/getFavoriteList',
    method: 'POST',
    data: params
  })
}

// 添加收藏
export function addFavorite({courseId}){
  return http.$axios({
    url: 'api/favorite/addFavorite',
    method: 'POST',
    data: {
      courseId
    }
  })
}

// 删除收藏
export function deleteFavorite({id}){
  return http.$axios({
    url: 'api/favorite/deleteFavorite?id='+id,
    method: 'GET'
  })
}