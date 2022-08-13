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
        title: '一键转账',
        menuItem: true,
        icon: 'List'
      }
    },
    {
      // 转账记录
      path: '/transfer/record',
      name: 'transferRecord',
      component: () => import('@views/transfer/RecordView'),
      props: true,
      meta: {
        requireAuth: true,
        title: '转账记录'
      }
    }
  ]
}
