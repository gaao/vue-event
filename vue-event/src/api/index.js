import request from '@/utils/request'

// export const registerAPI = () => {
//   return request({
//     url: '/api/reg',
//     method: 'POST',
//     data: {
//       username: 'gxg123456',
//       password: '11111111',
//       repassword: '11111111'
//     }
//   })
// }
export const registerAPI = ({ username, password, repassword }) => {
  return request({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password,
      repassword
    }
  })
}
