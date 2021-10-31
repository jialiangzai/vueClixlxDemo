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
export function getcourseInfo(courseId){
    return http.$axios({
        url:'api/course/getDetail',
        method:'GET',
        params:{courseId}
    })
}

//播放课程
export function playCourse(courseId,chapterId){
    return http.$axios({
        url:'api/player/play',
        method:'GET',
        params:{courseId,chapterId},
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

//下载资料
export function downloadAttachment(courseId,attachmentId){
    return http.$axios({
        url:'api/course/downloadAttachment',
        method:'GET',
        params:{courseId,attachmentId},
        responseType: "blob",
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

//检查是否有权限
export function checkAuth(courseId){
    return http.$axios({
        url:'api/course/checkAuth',
        method:'GET',
        params:{courseId},
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}


//获取学习时长
export function updateStudyHour(data,token){
    return http.$axios({
        url:'api/member/updateStudyHour',
        method:'POST',
        data,
        headers: {
            'Authorization': sessionStorage.getItem('token'),
            'token':token
        }
    })
}