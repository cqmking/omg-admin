<template>
  <!-- 增加ref字段，直接访问子组件方法。同时注册select事件，当菜单点击时触发 -->
  <el-menu router unique-opened ref="navbar" :default-active="onRoutes" @select="selectMenu" :collapse="isCollapse">
    <nav-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n"></nav-item>
  </el-menu>
</template>

<script>

import NavItem from './NavItem'

export default {
  props: ['isCollapse'],
  data: function () {
    // 从路由中得到导航，layout下的子元素作为导航
    let _routes = this.$router.options.routes
    // let _navRoutes = [];
    // for (let i = 0; i < _routes.length; i++) {
    //   if (_routes[i].path == "/layout") {
    //     _navRoutes = _routes[i].children;
    //   }
    // }

    return {
      navList: _routes
    }
  },
  computed: {
    onRoutes() {
      // Todo
      return this.$route.path
    }
  },
  methods: {
    selectMenu(index, indexPath) {
      // let openMenu = this.$refs.navbar.openedMenus.concat([]);
      // openMenu = openMenu.reverse();
      // openMenu.forEach(ele => {
      //   this.$refs.navbar.closeMenu(ele);
      // });
    }
  },
  components: { NavItem }
}
</script>

<style>
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
  padding: 0 45px;
  min-width: 200px;
}
</style>
