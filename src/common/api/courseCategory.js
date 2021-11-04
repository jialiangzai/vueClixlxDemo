import http from './requests'

export function getFirstCategorys(){
    return http.$axios({
        url:'/api/course/category/getFirstCategorys',
        method:'GET',
    })
}

export function getSecondCategorys(categoryId){
    return http.$axios({
        url:'/api/course/category/getSecondCategorys',
        method:'GET',
        params:{categoryId}
    })
}