<template>

  <div id="layout" :class="{'sidebar-collapse':isCollapse}" class="layout">
    <el-container>
      <el-header style="height:50px; line-height:50px;">
        <a href="javascript:;" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini">
            <b>A</b>DM</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg">
            <b>Omg</b>Admin</span>
        </a>
        <nav class="navbar navbar-static-top">
          <a href="javascript:;" class="sidebar-toggle" data-toggle="push-menu" role="button" @click="collapse">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
          <div class="rigth-btns">
            <el-dropdown size="medium" trigger="click">
              <div class="pull-left image">
                <img src="../../assets/images/trump.jpg" class="img-circle" alt="User Image" style="margin-right:5px;">
                <span class="el-dropdown-link">
                  {{ currentUser.userInfo.userName }}
                </span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled>个人中心</el-dropdown-item>
                <el-dropdown-item disabled>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </nav>
      </el-header>
      <el-container>
        <el-aside>
          <div class="user-panel">
            <div class="pull-left image">
              <img src="../../assets/images/trump.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>{{ currentUser.userInfo.userName }}</p>
              <a href="#" style="font-size: 12px; color: #444;">
                <i class="fa fa-circle text-success"></i> 在线</a>
            </div>
          </div>
          <div class="nav">
            <div class="header">主菜单</div>
            <!-- 菜单 -->
            <Nav :isCollapse="isCollapse"></Nav>
          </div>

        </el-aside>
        <el-container>
          <el-main>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator="/" style="margin-bottom: 20px; text-align: left;">
              <template v-for="(item, index) in matchedItems" :data-path="item.path" :to="item.path">
                <el-breadcrumb-item :key="item.path" v-if="(matchedItems.length -1 ) != index" class="breadcrumb-link" :to="{ path: item.path }">{{item.meta.label}}</el-breadcrumb-item>
                <el-breadcrumb-item :key="item.path" v-else>{{item.meta.label}}</el-breadcrumb-item>
              </template>
            </el-breadcrumb>
            <router-view></router-view>
          </el-main>
          <el-footer style="height:50px;">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.breadcrumb-link {
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #303133;
}
</style>

<script>
import Nav from '@/components/common/Nav'
import { loginService } from '@/service/loginService.js'

export default {
  name: 'layout',

  created() {
    let _self = this
    _self.loadMatchedItems()
  },

  computed: {
    currentUser() {
      let self = this
      if (!self.$store.getters.user.userName) {
        self.$store.dispatch({
          type: 'setUser',
          user: { userName: '路飞', screenName: 'luffy', userId: 1001 }
        })
      }
      return self.$store.getters.user
    }
  },

  data: () => {
    return {
      isCollapse: false,
      matchedItems: []
    }
  },

  watch: {
    $route() {
      this.loadMatchedItems()
    }
  },

  methods: {
    loadMatchedItems() {
      let _self = this
      _self.matchedItems = _self.$route.matched
    },

    collapse() {
      this.isCollapse = !this.isCollapse
      return false
    },

    logout() {
      let _self = this
      loginService
        .logout()
        .then(function (response) {
          _self.$router.push({ path: '/login' })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  components: { Nav }
}
</script>

<style>
.sidebar-collapse .el-header .logo-mini {
  display: inline;
}

.sidebar-collapse .el-header .logo-lg {
  display: none;
}
.sidebar-collapse .el-header .logo {
  width: 50px;
  padding: 0 5px;
  font-size: 18px;
}

.sidebar-collapse .el-main,
.sidebar-collapse .el-header .navbar {
  margin-left: 50px !important;
  -webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-collapse .el-aside {
  width: 50px !important;
}

.sidebar-collapse .el-aside .header {
  display: none !important;
}

.sidebar-collapse .el-submenu ul,
.sidebar-collapse .el-submenu > div > .el-submenu__icon-arrow,
.sidebar-collapse .el-submenu > div > span,
.sidebar-collapse .el-menu-item > span {
  display: none !important;
}

.sidebar-collapse .el-submenu,
.sidebar-collapse .el-menu-item {
  padding: 0 15px !important;
}

.sidebar-collapse .el-submenu > div,
.sidebar-collapse .el-menu-item > div {
  padding: 0 15px !important;
  display: inline-block;
  box-sizing: border-box;
}

.sidebar-collapse .el-submenu > div {
  padding: 0px 0px !important;
}

.sidebar-collapse .el-menu--collapse {
  width: 50px !important;
}
</style>
