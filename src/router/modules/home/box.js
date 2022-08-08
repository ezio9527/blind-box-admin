export default {
  path: '/box',
  meta: {
    title: '盲盒管理'
  },
  children: [
    {
      // 盲盒列表
      path: '/box/list',
      name: 'boxList',
      component: () => import('@views/box/ListView'),
      meta: {
        requireAuth: true,
        title: '盲盒列表',
        menuItem: true,
        icon: 'Box'
      }
    },
    {
      // 添加盲盒
      path: '/box/add',
      name: 'boxAdd',
      component: () => import('@views/box/AddView'),
      meta: {
        requireAuth: true,
        title: '添加盲盒'
      }
    },
    {
      // 盲盒详情
      path: '/box/details',
      name: 'detailsBox',
      component: () => import('@views/box/DetailsView'),
      props: route => ({ box: JSON.parse(route.params.data || '{}') }),
      meta: {
        requireAuth: true,
        title: '盲盒详情'
      }
    }
  ]
}
