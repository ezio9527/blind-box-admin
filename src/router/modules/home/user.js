export default {
  path: '/user',
  meta: {
    title: '用户管理'
  },
  children: [
    {
      // 用户列表
      path: '/user/list',
      name: 'userList',
      component: () => import('@views/user/ListView'),
      meta: {
        requireAuth: true,
        title: '用户列表',
        menuItem: true,
        icon: 'User'
      }
    },
    {
      // 用户详情
      path: '/user/details',
      name: 'userDetails',
      component: () => import('@views/user/DetailsView'),
      meta: {
        requireAuth: true,
        title: '用户详情',
        menuItem: true,
        icon: 'User'
      }
    }
  ]
}
