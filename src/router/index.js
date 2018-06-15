import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

import Login from '@/components/pages/Login'
// import HelloWorld from '@/components/HelloWorld'

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
    }
  ]
})
