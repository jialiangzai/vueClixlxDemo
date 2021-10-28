import http from './requests'

export function myCourses(params){ 
  return http.$axios({
    url: '/course/myCourses',
    method: 'POST',
    data: params,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}