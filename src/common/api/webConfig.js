import http from './requests';

export function webConfig(){
    return http.$axios({
        url: '/api/setting/get',
    })
}
