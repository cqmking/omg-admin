<template>

  <div id="layout" :class="{'sidebar-collapse':isCollapse}" class="layout">
    <el-container>
      <el-header style="height:50px; line-height:50px;">
        <a href="../../index2.html" class="logo">
          <!-- mini logo for sidebar mini 50x50 pixels -->
          <span class="logo-mini"><b>A</b>DM</span>
          <!-- logo for regular state and mobile devices -->
          <span class="logo-lg"><b>Omg</b>Admin</span>
        </a>
        <nav class="navbar navbar-static-top">
          <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button" @click="collapse">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
          <div class="rigth-btns">
            <el-dropdown size="medium" trigger="click">
              <div class="pull-left image">
                <img src="../assets/images/trump.jpg" class="img-circle" alt="User Image" style="margin-right:5px;">
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
              <img src="../assets/images/trump.jpg" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>{{ currentUser.userInfo.userName }}</p>
              <a href="#" style="font-size: 12px; color: #444;"><i class="fa fa-circle text-success"></i> 在线</a>
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
            
            <div class="el-breadcrumb" style="margin-bottom: 20px; text-align: left;">
              <template v-for="(item, index) in matchedItems" :data-path="item.path"  :to="item.path">
                <router-link v-if="(matchedItems.length -1 ) != index" class="breadcrumb-link" :to="{ path: item.path }">{{item.meta.label}}</router-link>
                <span v-if="(matchedItems.length -1 ) != index" style="margin: 0 9px; font-weight: 700; color: #c0c4cc;">/</span>
                <span v-else style="    font-weight: 400; color: #606266; cursor: text;">{{item.meta.label}}</span>
                <!-- <a @click="gotoPage(item)">{{item.meta.label}}</a> -->
              </template>
            </div>

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
import Nav from "./common/Nav";
import { loginService } from "~/service/loginService.js";
import { userService } from "~/service/userService.js";

export default {
  name: "layout",

  created() {
    let _self = this;
    _self.loadMatchedItems();
  },

  computed: {
    currentUser() {
      let self = this;
      if (!self.$store.getters.user.userName) {
        userService
          .getLoginUser()
          .then(function(response) {
            self.$store.dispatch({
              type: "setUser",
              user: response.data
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      return self.$store.getters.user;
    }
  },

  data: () => {
    return {
      isCollapse: false,
      matchedItems: []
    };
  },

  watch: {
    $route() {
      this.loadMatchedItems();
    }
  },

  methods: {
    loadMatchedItems() {
      let _self = this;
      _self.matchedItems = _self.$route.matched;
    },

    collapse() {
      this.isCollapse = !this.isCollapse;
      return false;
    },

    logout() {
      let _self = this;
      loginService
        .logout()
        .then(function(response) {
          _self.$router.push({ path: "/login" });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: { Nav }
};
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

.layout {
  height: 100%;
  background-color: #e9eef3;
}

.el-header .logo-mini {
  display: none;
}

.el-header .rigth-btns {
  float: right;
}

.el-header .rigth-btns .el-dropdown {
  color: #fff;
  cursor: pointer;
  padding: 0 5px;
  margin-right: 15px;
}

.el-header .rigth-btns .el-dropdown:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #f6f6f6;
}

.el-aside .el-menu {
  border-right: 0px;
  background-color: transparent;
}
.el-aside .nav .fa {
  font-size: 18px;
}

.el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.el-menu-item.is-active {
  color: #1890ff;
}

.el-aside .header {
  color: #848484;
  background: #f9fafc;
  -webkit-transition: border-left-color 0.3s ease;
  -o-transition: border-left-color 0.3s ease;
  transition: border-left-color 0.3s ease;
  overflow: hidden;
  text-overflow: clip;
  padding: 10px 25px 10px 15px;
}

.el-aside .user-panel {
  position: relative;
  width: 100%;
  padding: 10px;
  overflow: hidden;
  white-space: nowrap;
}

.el-aside .user-panel .pull-left {
  float: left !important;
}

.user-panel > .image > img {
  width: 100%;
  max-width: 45px;
  height: auto;
  display: inline-block;
}

.el-header .navbar .image > img {
  width: 100%;
  max-width: 25px;
  height: auto;
  display: inline-block;
}

.img-circle {
  border-radius: 50%;
}

.user-panel > .info {
  padding: 5px 5px 5px 15px;
  line-height: 1;
  position: absolute;
  left: 55px;
  color: #444;
}

.user-panel > .info > p {
  font-weight: 600;
  margin-bottom: 9px;
  margin: 0 0 10px;
}

.user-panel .text-success {
  color: #3c763d;
}

.user-panel .fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  z-index: 820;
  padding: 0 0;
}

.el-header {
  background-color: #3c8dbc;
}

.el-aside {
  width: 230px !important;
  color: #333;
  border-right: 1px solid #d2d6de;
  background-color: #f9fafc;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  min-height: 100%;
  width: 230px;
  z-index: 810;
  -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

.el-main {
  color: #333;
  text-align: center;
  margin-left: 230px;
  min-height: 350px;
  -webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.theme-blue .el-header a.logo {
  background-color: #3c8dbc;
  color: #fff;
  border-bottom: 0 solid transparent;
}

.el-header a.logo {
  transition: width 0.3s ease-in-out;
  display: block;
  float: left;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  width: 230px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 0 15px;
  font-weight: 300;
  overflow: hidden;
}

.el-header .navbar {
  -webkit-transition: margin-left 0.3s ease-in-out;
  -o-transition: margin-left 0.3s ease-in-out;
  transition: margin-left 0.3s ease-in-out;
  margin-bottom: 0;
  margin-left: 230px;
  border: none;
  min-height: 50px;
  border-radius: 0;
}

.theme-blue .el-header .logo:hover {
  background-color: #3b8ab8;
}

.theme-blue .el-header .sidebar-toggle:hover {
  background-color: #367fa9;
}
.theme-blue .el-header .sidebar-toggle:hover {
  color: #f6f6f6;
  background: rgba(0, 0, 0, 0.1);
}
.theme-blue .el-header .sidebar-toggle {
  color: #fff;
}

.el-header .sidebar-toggle {
  float: left;
  background-color: transparent;
  background-image: none;
  padding: 0px 15px;
  font-family: fontAwesome;
}

.theme-blue .el-footer {
  border-top-color: #d2d6de;
}
.el-footer {
  display: none;
  background: #fff;
  padding: 15px;
  color: #444;
  border-top: 1px solid #d2d6de;

  -webkit-transition: -webkit-transform 0.3s ease-in-out,
    margin 0.3s ease-in-out;
  -moz-transition: -moz-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  -o-transition: -o-transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  margin-left: 230px;
  z-index: 820;
}
</style>
