import http from './requests';

// 查询购物车商品
export function getShopCarList(){
  return http.$axios({
    url: 'api/shopcar/getShopCarList',
    method: 'GET'
  })
}

// 添加商品到购物车
export function addShopCar(params){
  return http.$axios({
    url: 'api/shopcar/addShopCar',
    method: 'POST',
    data: params
  })
}

// 修改购物车数量
export function updateShopCar(params){
  return http.$axios({
    url: 'api/shopcar/updateShopCar',
    method: 'POST',
    data: params
  })
}

// 删除购物车数据

export function deleteShopCar({id}){
  return http.$axios({
    url: 'api/shopcar/deleteShopCar?id='+id,
    method: 'GET',
  })
}