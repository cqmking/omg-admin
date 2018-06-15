<template>

  <div class="login-box">
    <div class="login-logo">
      <a href="javascript:;"><b>Omg</b>Admin</a>
    </div>

    <div class="login-box-body">
      <p class="login-box-msg">密码登录</p>

      <el-form ref="form" :model="form" label-width="0px" size="small">
          <el-form-item>
            <el-input v-model="form.screenName" placeholder="账号" suffix-icon="fa fa-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="密码" type="password" suffix-icon="fa fa-key"></el-input>
          </el-form-item>

          <el-form-item style="text-align:right;">
            <el-button style="width:100%; border-radius:0;" type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <a href="#" style="margin-right: 10px;">忘记密码</a>
            <a href="#">免费注册</a>
          </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>

// import { Message } from 'element-ui'
// import { loginService } from "~/service/loginService.js";

export default {
  data () {
    return {
      form: {
        screenName: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      // let self = this
      // loginService
      //   .loginByScreenName({
      //     screenName: this.form.screenName,
      //     password: this.form.password
      //   })
      //   .then(function(response) {
      //     if (response.status != 200) {
      //       //登录认证失败
      //       Message.error({
      //         message: response.data.message
      //       });
      //     } else {
      //       self.$store.dispatch({
      //         type: "setUser",
      //         user: response.data
      //       });
      //       //登录成功
      //       self.$router.push({ path: "/workspace" });
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      console.log('submit!')
    }
  }
}
</script>

<style>
#app {
  background: #d2d6de;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.login-box .el-input__inner,
.login-box .el-button--small {
  border-radius: 0;
  font-size: 14px;
}

.login-box {
  width: 360px;
  margin: 0 auto;
  padding: 7% 0 2% 0;
}

.login-logo  {
  font-size: 35px;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 300;
}

.login-logo a {
  color: #444;
}

.login-box-body {
  background: #fff;
  padding: 20px;
  border-top: 0;
  color: #666;
}

.login-box-msg {
  margin: 0;
  text-align: center;
  padding: 0 20px 20px 20px;
}

.login-box-body a {
  color: #9b9ea0;
}

</style>
