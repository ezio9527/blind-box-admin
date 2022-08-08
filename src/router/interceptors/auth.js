// 登录验证拦截器
const before = (to, form, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
}
export default before
