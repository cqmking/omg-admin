<template>
  <div class="sub-content">
    <el-form class="role-form" ref="roleForm" :rules="rules" :model="roleForm" size="medium" label-width="80px" style="text-align:left margin-top: 20px">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色名称" prop="name" label-width="120px">
            <el-input v-model="roleForm.name" style="max-width:300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色编码" prop="roleKey" label-width="120px">
            <el-input v-model="roleForm.roleKey" style="max-width:300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="描述" prop="description" label-width="120px">
            <el-input type="textarea" v-model="roleForm.description" style="max-width:750px" class="description-txt-area"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="saveHandler('roleForm')">保存</el-button>
        <el-button @click="backHandler">返回</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>
import { roleService } from '@/service/roleService.js'

export default {
  data() {
    return {
      roleForm: {
        roleId: 0,
        name: '',
        roleKey: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符之间',
            trigger: 'blur'
          }
        ],
        roleKey: [
          { required: true, message: '请输入角色编码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '长度在 3 到 15 个字符之间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    let _self = this
    if (_self.$route.params.roleId) {
      _self.roleForm.roleId = _self.$route.params.roleId
    }

    if (_self.roleForm.roleId > 0) {
      _self.loadRole()
    }
  },
  methods: {
    loadRole() {
      let _self = this
      let params = { roleId: _self.roleForm.roleId }
      roleService.getRoleById(params).then(function (response) {
        _self.roleForm = response.data
      })
    },
    saveHandler(roleForm) {
      let _self = this

      _self.$refs[roleForm].validate(valid => {
        if (valid) {
          // 提交保存
          roleService.saveRole(_self.roleForm).then(function (response) {
            _self.$message({
              message: '角色信息保存成功！',
              type: 'success'
            })
            _self.$router.push({ name: 'roleList' })
          })
        } else {
          // console.log('error submit!!')
          return false
        }
      })
    },
    backHandler() {
      let _self = this
      _self.$router.push({ name: 'roleList' })
    }
  }
}
</script>

<style>
</style>
