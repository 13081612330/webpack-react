import React, { lazy } from 'react'
import Layouts from '@/view/Layout'
import Home from '@/view/Home.jsx'
import Sider from '@/component/Sider/index'

// 首页
// const Home = lazy(  () => ('../view/Home'))
// 头部页
// const Header = React.lazy(  () => ('../view/Heder'))

export default [
    {
      path: '/order',
      component: Sider,
      title: '订单',
      exact: true,
      children: [
        {
          path: '/order/management',
          component: Home,
          title: '订单管理',
          children: []
        },
      ]
    }, {
      path: '/commodity',
      component: Home,
      title: '商品',
      children: [
        {
          path: '/commodity/management',
          component: Layouts,
          title: '商品管理',
          children: []
        },
      ]
    }, {
      path: '/distribution',
      component: Layouts,
      title: '配送',
      children: [
        {
          path: '/distribution/management',
          component: Home,
          title: '配送管理',
          children: []
        },
      ]
    },
]