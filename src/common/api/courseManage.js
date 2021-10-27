import http from './requests'

export function getNewCourse(params){
    return http.$axios({
        url:'api/course/mostNew',
        method:'POST',
        data:params
    })
}

export function getHotCourse(params){
    return http.$axios({
        url:'api/course/mostHeat',
        method:'POST',
        data:params
    })
}

//查询课程
export function queryCourse(params){
    return http.$axios({
        url:'api/course/search',
        method:'POST',
        data:params
    })
}

//课程详情
export function courseInfo(id){
    return http.$axios({
        url:'api/course/getDetail',
        method:'GET',
        data:{id}
    })
}