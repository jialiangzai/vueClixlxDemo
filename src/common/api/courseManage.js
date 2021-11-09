import request from './requests'
import {Decrypt} from '@/utils/aes'
export function getNewCourse(params){
    return request({
        url:'/api/course/mostNew',
        method:'POST',
        data:params
    })
}

export function getHotCourse(params){
    return request({
        url:'/api/course/mostHeat',
        method:'POST',
        data:params
    })
}

//查询课程
export function queryCourse(params){
    return request({
        url:'/api/course/search',
        method:'POST',
        data:params
    })
}

//课程详情
export function getcourseInfo(courseId){
    return request({
        url:'/api/course/getDetail',
        method:'GET',
        params:{courseId}
    })
}

//播放课程
export function playCourse(courseId,chapterId){
    return request({
        url:'/api/player/play',
        method:'GET',
        params:{courseId,chapterId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//下载资料
export function downloadAttachment(courseId,attachmentId){
    return request({
        url:'/api/course/downloadAttachment',
        method:'GET',
        params:{courseId,attachmentId},
        responseType: "blob",
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//检查是否有权限
export function checkAuth(courseId){
    return request({
        url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}

//检查是否有权限
export function checkAuthWithChapterId(courseId,chapterId){
    return request({
        url:'/api/course/checkAuth',
        method:'GET',
        params:{courseId,chapterId},
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token'))
        }
    })
}


//获取学习时长
export function updateStudyHour(data,token){
    return request({
        url:'/api/member/updateStudyHour',
        method:'POST',
        data,
        headers: {
            'Authorization': Decrypt(localStorage.getItem('token')),
            'token':token
        }
    })
}