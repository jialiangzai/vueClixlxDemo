import http from './requests'

export function queryCourseTag(params){
    return http.$axios({
        url:'api/course/tags/list',
        method:'POST',
        data:params,
        header:{
            'Content-Type':'application/json'
        }
    })
}