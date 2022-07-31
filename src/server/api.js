const http = require('axios')

// 登录
export function login (data) {
  return http.post('/login', data)
}
// 登出
export function logout (data) {
  return http.post('/logout', data)
}
// 查询
export function qry (data) {
  return http.get('/qry', { params: data })
}
