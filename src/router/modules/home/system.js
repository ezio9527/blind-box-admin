export default {
  path: '/system',
  meta: {
    title: '系统设置',
    subMenu: true,
    icon: 'Setting'
  },
  children: [
    {
      // 管理员
      path: '/system/administrator',
      meta: {
        title: '管理员'
      },
      children: [
        {
          // 管理员列表
          path: '/system/administrator/list',
          name: 'administratorList',
          component: () => import('@views/administrator/ListView'),
          meta: {
            requireAuth: true,
            title: '管理员列表',
            menuItem: true
          }
        },
        {
          // 添加管理员
          path: 'administrator/add',
          name: 'administratorAdd',
          component: () => import('@views/administrator/AddView'),
          meta: {
            requireAuth: true,
            title: '添加管理员'
          }
        },
        {
          // 编辑管理员
          path: 'administrator/edit',
          name: 'administratorEdit',
          component: () => import('@views/administrator/EditView'),
          props: route => ({ administrator: JSON.parse(route.params.data || '{}') }),
          meta: {
            requireAuth: true,
            title: '编辑管理员'
          }
        }
      ]
    },
    {
      // 联系方式
      path: '/system/contact',
      name: 'contact',
      component: () => import('@views/contact/IndexView'),
      meta: {
        requireAuth: true,
        title: '联系方式',
        menuItem: true
      }
    },
    {
      // 合作方式
      path: '/system/cooperation',
      meta: {
        title: '入驻项目方'
      },
      children: [
        {
          // 合作方式列表
          path: '/system/cooperation/list',
          name: 'cooperationList',
          component: () => import('@views/cooperation/ListView'),
          meta: {
            requireAuth: true,
            title: '入驻项目方列表',
            menuItem: true
          }
        },
        {
          // 添加合作方式
          path: '/system/cooperation/add',
          name: 'cooperationAdd',
          component: () => import('@views/cooperation/AddView'),
          meta: {
            requireAuth: true,
            title: '添加入驻项目方'
          }
        },
        {
          // 编辑合作方式
          path: '/system/cooperation/edit/:id',
          name: 'cooperationEdit',
          component: () => import('@views/cooperation/EditView'),
          props: true,
          meta: {
            requireAuth: true,
            title: '编辑入驻项目方'
          }
        }
      ]
    },
    {
      // Banner
      path: '/system/banner',
      meta: {
        title: '轮播图'
      },
      children: [
        {
          // Banner列表
          path: '/system/banner/list',
          name: 'bannerList',
          component: () => import('@views/banner/ListView'),
          props: true,
          meta: {
            requireAuth: true,
            title: '轮播图列表',
            menuItem: true
          }
        },
        {
          // 添加Banner
          path: '/system/banner/add',
          name: 'bannerAdd',
          component: () => import('@views/banner/AddView'),
          meta: {
            requireAuth: true,
            title: '添加轮播图'
          }
        },
        {
          // 编辑Banner
          path: '/system/banner/edit',
          name: 'bannerEdit',
          component: () => import('@views/banner/EditView'),
          props: route => ({ banner: JSON.parse(route.params.data || '{}') }),
          meta: {
            requireAuth: true,
            title: '编辑轮播图'
          }
        }
      ]
    },
    {
      // 通知公告
      path: '/system/notice',
      meta: {
        title: '通知公告'
      },
      children: [
        {
          // 通知列表
          path: '/system/notice/list',
          name: 'noticeList',
          component: () => import('@views/notice/ListView'),
          props: true,
          meta: {
            requireAuth: true,
            title: '通知公告列表',
            menuItem: true
          }
        },
        {
          // 添加通知
          path: '/system/notice/add',
          name: 'noticeAdd',
          component: () => import('@views/notice/AddView'),
          meta: {
            requireAuth: true,
            title: '添加通知公告'
          }
        },
        {
          // 编辑notice
          path: '/system/notice/edit/:id',
          name: 'noticeEdit',
          component: () => import('@views/notice/EditView'),
          props: true,
          meta: {
            requireAuth: true,
            title: '编辑通知公告'
          }
        }
      ]
    }
  ]
}
