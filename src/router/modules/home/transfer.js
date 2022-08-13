export default {
  path: '/transfer',
  meta: {
    title: '批量转账'
  },
  children: [
    {
      // 转账列表
      path: '/transfer/list',
      name: 'transferList',
      component: () => import('@views/transfer/ListView'),
      meta: {
        requireAuth: true,
        title: '批量转账',
        menuItem: true,
        icon: 'Box'
      }
    }
  ]
}
