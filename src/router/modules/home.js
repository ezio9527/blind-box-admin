import HomeView from '@views/home/IndexView'

export default {
  // 首页
  path: '/home',
  name: 'home',
  component: HomeView,
  meta: {
    requireAuth: true
  }
}
