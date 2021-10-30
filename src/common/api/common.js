import http from './requests';

// 上传单个文件

// uploadFile
export function uploadFileWithBlob(params){
  return http.$axios({
    url: 'api/upload/uploadFileWithBlob',
    method: 'POST',
    data: params
  })
}

export function uploadFile(params){
  return http.$axios({
    url: 'api/upload/uploadFile',
    method: 'POST',
    data: params
  })
}