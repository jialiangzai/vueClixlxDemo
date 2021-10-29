import http from './requests'


//记录播放历史
export function recordHistory(params){
    return http.$axios({
        url:'api/course/history/recordHistory',
        method:'POST',
        data:params,
        header:{
            'Content-Type':'application/json'
        }
    })
}