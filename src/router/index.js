import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import Login from '@/components/pages/Login'

import Layout from '@/components/common/Layout'
import Abstract from '@/components/common/Abstract'

import Dashboard from '@/components/workspace/Dashboard'
import SysInfo from '@/components/workspace/SysInfo'

import ArticleList from '@/components/contents/ArticleList'

import UserList from '@/components/user/UserList'
import UserEdit from '@/components/user/UserEdit'

import RoleList from '@/components/user/RoleList'
import RoleEdit from '@/components/user/RoleEdit'
import RolePermDefine from '@/components/user/RolePermDefine'
import RoleUserAssign from '@/components/user/RoleUserAssign'

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
    },
    {
      path: '/contents',
      redirect: { name: 'articles' },
      component: Layout,
      name: 'contents',
      iconClass: 'fa-book',
      meta: { label: '内容管理' },
      children: [
        {
          meta: { label: '文章管理' },
          path: '/contents/articles',
          component: ArticleList,
          name: 'articles'
        },
        {
          meta: { label: '模板管理' },
          path: '/contents/templates'
        },
        {
          meta: { label: '结构管理' },
          path: '/contents/structure'
        }
      ]
    },
    {
      path: '/system',
      redirect: { name: 'userList' },
      component: Layout,
      name: 'system',
      iconClass: 'fa-cog',
      meta: { label: '用户管理' },
      children: [
        {
          path: '/system/userManage',
          name: 'userManage',
          component: Abstract,
          redirect: { name: 'userList' },
          meta: { label: '成员管理' },
          isLastItem: true,
          children: [
            {
              path: '/system/userManage/userList',
              name: 'userList',
              component: UserList,
              hidden: true,
              meta: { label: '用户列表' }
            },
            {
              path: '/system/userManage/userAdd',
              name: 'userAdd',
              component: UserEdit,
              hidden: true,
              meta: { label: '添加用户' }
            },
            {
              path: '/system/userManage/userEdit',
              name: 'userEdit',
              component: UserEdit,
              hidden: true,
              meta: { label: '修改用户' }
            }
          ]
        },
        {
          path: '/system/roleManage',
          name: 'roleManage',
          component: Abstract,
          redirect: { name: 'roleList' },
          meta: { label: '角色管理' },
          isLastItem: true,
          children: [
            {
              path: '/system/roleManage/roleList',
              name: 'roleList',
              component: RoleList,
              hidden: true,
              meta: { label: '角色列表' }
            },
            {
              path: '/system/roleManage/roleAdd',
              name: 'roleAdd',
              component: RoleEdit,
              hidden: true,
              meta: { label: '添加角色' }
            },
            {
              path: '/system/roleManage/roleEdit',
              name: 'roleEdit',
              component: RoleEdit,
              hidden: true,
              meta: { label: '修改角色' }
            },
            {
              path: '/system/roleManage/rolePermDefine',
              name: 'rolePermDefine',
              component: RolePermDefine,
              hidden: true,
              meta: { label: '权限定义' }
            },
            {
              path: '/system/roleUserAssign',
              name: 'roleUserAssign',
              component: RoleUserAssign,
              hidden: true,
              meta: { label: '分配用户' }
            }
          ]
        }
      ]
    }
  ]
})
