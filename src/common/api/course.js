import http from './requests';

export function myCourses(imageCode){
  return http.$axios({
    url: '/api/course/myCourses',
    method: 'POST',
    data: imageCode,
    headers: {
      'Authorization': sessionStorage.getItem('token')
    }
  })
}