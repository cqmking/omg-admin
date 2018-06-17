<template>
  <div class="sub-content">
    <el-form class="user-form" ref="userForm" :rules="rules" :model="userForm" size="medium" label-width="80px" style="text-align:left; margin-top: 20px;">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户账号" prop="screenName">
            <el-input v-model="userForm.screenName" :disabled="userForm.userId > 0"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱地址" prop="email">
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input v-model="userForm.password" placeholder="留空不修改"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="rePassword">
            <el-input v-model="userForm.rePassword" placeholder="留空不修改"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位" prop="jobTitle">
            <el-input v-model="userForm.jobTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="生日" prop="birthday">
            <el-date-picker type="date" placeholder="选择日期" v-model="userForm.birthday" value-format="timestamp" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.sex">
              <el-radio label="1">{{$common.data.sex["1"]}}</el-radio>
              <el-radio label="2">{{$common.data.sex["2"]}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="住址" prop="address">
            <el-input v-model="userForm.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="电话" prop="phone">
            <el-input v-model="userForm.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="个人描述" prop="description">
            <el-input type="textarea" v-model="userForm.description" class="description-txt-area"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="saveHandler('userForm')">保存</el-button>
        <el-button @click="backHandler">返回</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { userService } from '@/service/userService.js'

export default {
  created() {
    let _self = this
    if (_self.$route.params.userId) {
      _self.userForm.userId = _self.$route.params.userId
    }
    // console.log('UserID参数：' + _self.userForm.userId)
    if (_self.userForm.userId > 0) {
      _self.loadUser()
    }
  },
  data() {
    let _self = this
    var validateRePassword = (rule, value, callback) => {
      if (_self.userForm.password === value) {
        callback()
        return
      }

      callback(new Error('两次输入密码不一致!'))
    }
    return {
      userForm: {
        userId: 0,
        screenName: '',
        userName: '',
        email: '',
        jobTitle: '',
        birthday: '',
        description: '',
        address: '',
        sex: '1',
        phone: '',
        password: '',
        rePassword: ''
      },
      rules: {
        screenName: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符之间',
            trigger: 'blur'
          }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符之间',
            trigger: 'blur'
          }
        ],
        birthday: [
          {
            type: 'integer',
            required: true,
            message: '请选择生日',
            trigger: 'change'
          }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址' },
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            min: 3,
            max: 30,
            message: '长度在 3 到 30 个字符之间',
            trigger: 'blur'
          }
        ],
        jobTitle: [
          { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        address: [
          { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
        ],
        description: [
          { max: 500, message: '长度不能超过 500 个字符', trigger: 'blur' }
        ],
        phone: [
          {
            required: false,
            pattern: /^[0-9]*$/,
            message: '电话号码必须为数字',
            trigger: 'blur'
          },
          { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        password: [
          { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        rePassword: [{ validator: validateRePassword, trigger: 'blur' }]
      }
    }
  },
  methods: {
    loadUser() {
      let _self = this
      let params = { userId: _self.userForm.userId }
      userService.getUserById(params).then(function (response) {
        _self.userForm = response.data
        _self.userForm.password = ''
        _self.userForm.rePassword = ''
      })
    },

    saveHandler(userForm) {
      let _self = this

      _self.$refs[userForm].validate(valid => {
        if (valid) {
          // 提交保存
          userService.saveUser(_self.userForm).then(function (response) {
            _self.$message({
              message: '用户信息保存成功！',
              type: 'success'
            })
            _self.$router.push({ name: 'userList' })
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },

    backHandler() {
      let _self = this
      _self.$router.push({ name: 'userList' })
    }
  }
}
</script>

<style>
.user-form .el-col {
  padding-right: 50px !important;
}

.user-form .description-txt-area textarea {
  min-height: 80px !important;
}
</style>
