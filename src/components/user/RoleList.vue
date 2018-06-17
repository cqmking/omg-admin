<template>
  <div class="sub-content common-list role-list">

    <div class="btn-bar" style="text-align:left margin:10px 0">

      <el-row :gutter="20">
        <el-col :span="8" style="min-width: 320px">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="handleCreateRole">新增</el-button>
          <el-button v-show="selected.length == 1" type="warning" icon="el-icon-edit" size="medium" @click="handleUpdateRole(selected[0])">修改</el-button>
          <el-button v-show="selected.length > 0" type="danger" icon="el-icon-delete" size="medium" @click="handleBatchDeleteRole(selected)">删除</el-button>
        </el-col>
        <el-col :span="16" style="text-align:right" class="search-group">
          角色名称：
          <el-input size="medium" v-model="searchParams.name" clearable></el-input>
          角色编码：
          <el-input size="medium" v-model="searchParams.roleKey" clearable></el-input>
          <el-button @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="listData.content" border style="width: 100%" size="medium" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="roleId" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="角色名称" width="260" align="left"></el-table-column>
      <el-table-column prop="roleKey" label="角色编码" width="260" align="left"></el-table-column>
      <el-table-column prop="description" label="描述" min-width="260" align="left" show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="创建时间" min-width="200" align="center" :formatter="$common.formatDate"></el-table-column>
      <el-table-column fixed="right" label="操作" width="260" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleUpdateRole(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleUserAssign(scope.row)">分配用户</el-button>
          <el-button type="text" size="small" @click="handleDefinePermission(scope.row)">定义权限</el-button>
          <el-button type="text" style="color:#f56c6c" size="small" @click="handleDeleteRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="text-align:right padding: 20px 0 10px 0">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageNoChange" :current-page="params.pageNo" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.totalElements">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { roleService } from '@/service/roleService.js'

export default {
  data() {
    return {
      listData: {
        content: [],
        totalElements: 0
      },
      params: { pageNo: 1, pageSize: 10 },
      isSearch: false,
      selected: [],
      searchParams: {
        name: '',
        roleKey: ''
      }
    }
  },
  created() {
    let _self = this
    _self.loadRoleList(_self.params)
  },
  methods: {
    loadRoleList(params) {
      let _self = this

      if (_self.isSearch) {
        // 搜索
        let realParams = Object.assign({}, params, _self.searchParams)
        roleService.searchRole(realParams).then(function (response) {
          _self.listData = response.data
        })
      } else {
        // 全部
        roleService.getRoleList(params).then(function (response) {
          _self.listData = response.data
        })
      }
    },
    handleSelectionChange(val) {
      let _self = this
      _self.selected = val
    },
    handleUpdateRole(role) {
      let _self = this
      _self.$router.push({ name: 'roleEdit', params: { roleId: role.roleId } })
    },
    handleDefinePermission(role) {
      // 定义权限
      let _self = this
      _self.$router.push({ name: 'rolePermDefine', params: { roleId: role.roleId } })
    },
    handleUserAssign(role) {
      // 定义权限
      let _self = this
      _self.$router.push({ name: 'roleUserAssign', params: { roleId: role.roleId } })
    },
    handleCreateRole() {
      let _self = this
      _self.$router.push({ name: 'roleAdd' })
    },
    handleDeleteRole(Role) {
      let _self = this
      _self
        .$confirm('确认删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = { roleId: Role.roleId }
          roleService.deleteRoleById(params).then(function (response) {
            _self.$message({
              type: 'success',
              message: '删除成功!'
            })
            _self.loadRoleList(_self.params)
          })
        })
        .catch(() => { })
    },
    handleBatchDeleteRole(roleList) {
      let _self = this
      let roleIdArray = []

      roleList.forEach(function (role) {
        roleIdArray.push(role.roleId)
      })

      _self
        .$confirm('确认删除以下角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = { roleIds: roleIdArray }
          roleService.deleteRoleByIds(params).then(function (response) {
            _self.$message({
              type: 'success',
              message: '删除成功!'
            })
            _self.loadRoleList(_self.params)
          })
        })
        .catch(() => { })
    },
    handleSearch() {
      let _self = this
      // 每次搜索重置页码为1
      _self.params.pageNo = 1
      _self.isSearch = true
      _self.loadRoleList(_self.params)
    },

    handleSizeChange(val) {
      let _self = this
      _self.params.pageSize = val
      _self.loadRoleList(_self.params)
    },
    handleCurrentPageNoChange(val) {
      let _self = this
      _self.params.pageNo = val
      _self.loadRoleList(_self.params)
    }
  }
}
</script>

<style>
</style>
