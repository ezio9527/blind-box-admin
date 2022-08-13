import HomeView from '@/views/home/IndexView'
import user from './user'
import box from './box'
// import transfer from './transfer'
import system from './system'

export default {
  // 首页
  path: '/',
  name: 'home',
  component: HomeView,
  meta: {
    title: '首页',
    requireAuth: true
  },
  children: [
    user,
    box,
    // transfer,
    system
  ]
}
