import http from './requests';

export function myCourses(params){
  return http.$axios({
    url: 'api/course/myCourses',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}