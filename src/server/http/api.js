const http = require('axios')

// 登入
export function login (data) {
  return http.post('/admin/login', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// 登出
export function logout () {
  return http.post('/admin/loginOut')
}
// 上传图片
export function uploadImg (data) {
  return http.post('/file/upload', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// 上传图url
export function getBaseUrl () {
  return http.get('/file/getBaseUrl')
}
// 用户
export function findUserAll (data) {
  return http.get('/wallet/findAll', { params: data })
}
export function findUserIncome (data) {
  return http.get('/wallet/findMyIncome', { params: data })
}
export function findTeamIncome (data) {
  return http.get('/wallet/findTeamIncome', { params: data })
}
// 管理员
export function findAdminAll (data) {
  return http.get('/admin/list', { params: data })
}
export function addAdmin (data) {
  return http.post('/admin/add', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export function editAdmin (data) {
  return http.post('/admin/edit', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export function delAdmin (data) {
  return http.post('/admin/del', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// 联系方式
export function findContact () {
  return http.get('/tele/list')
}
export function editContact (data) {
  return http.post('/tele/edit', data, { headers: { 'Content-Type': 'application/json' } })
}
// 合作方式
export function findCooperationAll () {
  return http.get('/friend/list')
}
export function findCooperationById (params) {
  return http.get('/friend/info', { params })
}
export function addCooperation (data) {
  return http.post('/friend/add', data, { headers: { 'Content-Type': 'application/json' } })
}
export function editCooperation (data) {
  return http.post('/friend/edit', data, { headers: { 'Content-Type': 'application/json' } })
}
export function delCooperation (data) {
  return http.post('/friend/del', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// Banner
export function findBannerAll () {
  return http.get('/banner/list')
}
export function addBanner (data) {
  return http.post('/banner/add', data, { headers: { 'Content-Type': 'application/json' } })
}
export function editBanner (data) {
  return http.post('/banner/edit', data, { headers: { 'Content-Type': 'application/json' } })
}
export function delBanner (data) {
  return http.get('/banner/del', { params: data })
}
// 通知公告
export function findNoticeAll () {
  return http.get('/notice/list')
}
export function findNoticeById (params) {
  return http.get('/notice/info', { params })
}
export function addNotice (data) {
  return http.post('/notice/add', data, { headers: { 'Content-Type': 'application/json' } })
}
export function editNotice (data) {
  return http.post('/notice/edit', data, { headers: { 'Content-Type': 'application/json' } })
}
export function delNotice (data) {
  return http.post('/notice/del', data, { headers: { 'Content-Type': 'multipart/form-data' } })
}
// 盲盒
export function findBoxAll () {
  return http.get('/box/list')
}
export function addBox (data) {
  return http.post('/box/add', data, { headers: { 'Content-Type': 'application/json' } })
}
export function delBox (data) {
  return http.get('/box/del/' + data)
}
