import http from './requests'

//记录播放历史
export function recordHistory(data){
    return http.$axios({
        url:'api/course/history/recordHistory',
        method:'POST',
        data,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}

//最后一次记录
export function getLastHistoryByChapterId(params){
    return http.$axios({
        url:'api/course/history/getLastHistoryByChapterId',
        method:'GET',
        params,
        headers: {
            'Authorization': sessionStorage.getItem('token')
        }
    })
}