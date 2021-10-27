import http from './requests'

export function getFirstCategorys(){
    return http.$axios({
        url:'api/course/category/getFirstCategorys',
        method:'GET',
        data
    })
}

export function getSecondCategorys(categoryId){
    return http.$axios({
        url:'api/course/category/getSecondCategorys',
        method:'GET',
        data:{categoryId}
    })
}