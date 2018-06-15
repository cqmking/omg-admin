import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import Login from '@/components/pages/Login'

import Layout from '@/components/common/Layout'

import Dashboard from '@/components/workspace/Dashboard'
import SysInfo from '@/components/workspace/SysInfo'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { label: '用户登录' },
      hidden: true
    },
    {
      path: '/workspace',
      redirect: { name: 'dashboard' },
      component: Layout,
      name: 'workspace',
      iconClass: 'fa-tachometer',
      meta: { label: '工作台' },
      children: [
        {
          path: '/workspace/dashboard',
          component: Dashboard,
          name: 'dashboard',
          meta: { label: '管理首页' }
        },
        {
          path: '/workspace/sysinfo',
          component: SysInfo,
          name: 'sysinfo',
          meta: { label: '系统信息' }
        }
      ]
    }
  ]
})
