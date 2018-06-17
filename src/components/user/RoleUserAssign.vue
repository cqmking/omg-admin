<template>
  <div class="sub-content common-list assign-role-user">

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="已分配" name="first">
        <el-table :data="assignedUsers.content" border style="width: 100%;" size="medium" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" width="80" align="center"></el-table-column>
          <el-table-column prop="screenName" label="用户帐号" width="210" align="left"></el-table-column>
          <el-table-column prop="userName" label="用户名称" width="210" align="left"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="210" align="left"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="left" :formatter="formatSex"></el-table-column>
          <el-table-column prop="address" label="地址" align="left" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button title="从当前角色移除该用户" type="text" size="small" style="color:#f56c6c;" @click="handleRemoveUserFromRole([scope.row])">移除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="text-align:right; padding: 20px 0 10px 0;">
          <el-row :gutter="20">
            <el-col :span="4" style="text-align:left;">
              <el-button type="danger" v-show="selected.length > 0" icon="el-icon-remove-outline" size="medium" @click="handleRemoveUserFromRole(selected)">移除</el-button>
              <span>&nbsp;</span>
            </el-col>
            <el-col :span="20" style="text-align:right;">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="params.pageNo" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="assignedUsers.totalElements">
              </el-pagination>
            </el-col>
          </el-row>
        </div>

      </el-tab-pane>
      <el-tab-pane label="未分配" name="second">
        <el-table :data="unassignUsers.content" border style="width: 100%;" size="medium" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="userId" label="用户ID" width="80" align="center"></el-table-column>
          <el-table-column prop="screenName" label="用户帐号" width="210" align="left"></el-table-column>
          <el-table-column prop="userName" label="用户名称" width="210" align="left"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="210" align="left"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="left" :formatter="formatSex"></el-table-column>
          <el-table-column prop="address" label="地址" align="left" min-width="150" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button title="分配该用户到当前角色" type="text" size="small" @click="handleAssignUserToRole([scope.row])">分配</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block" style="text-align:right; padding: 20px 0 10px 0;">
          <el-row :gutter="20">
            <el-col :span="4" style="text-align:left;">
              <el-button type="primary" v-show="selected.length > 0" icon="el-icon-circle-plus-outline" size="medium" @click="handleAssignUserToRole(selected)">分配</el-button>
              <span>&nbsp;</span>
            </el-col>
            <el-col :span="20" style="text-align:right;">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageChange" :current-page="params.pageNo" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="unassignUsers.totalElements">
              </el-pagination>
            </el-col>
          </el-row>
        </div>

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import { userService } from '@/service/userService.js'
import { roleService } from '@/service/roleService.js'

export default {
  data() {
    return {
      activeName: 'first',
      currentName: 'first',
      roleId: 0,
      assignedUsers: [],
      unassignUsers: [],
      params: { pageNo: 1, pageSize: 10 },
      selected: []
    }
  },

  created() {
    let _self = this
    if (_self.$route.params.roleId) {
      _self.roleId = _self.$route.params.roleId
    }

    _self.loadAssignedUsers()
    // console.log('Param roleId is ' + _self.roleId)
  },
  methods: {
    formatSex(row, column, cellValue, index) {
      if (!cellValue || cellValue === '') {
        return '-'
      }
      return this.$common.data.sex[cellValue]
    },
    handleClick(tab, event) {
      // 切换时，还原为第一页
      let _self = this
      _self.params.pageNo = 1
      if (_self.currentName === tab.name) {
        return
      } else {
        _self.currentName = tab.name
        _self.selected = []
      }

      if (tab.name === 'first') {
        _self.loadAssignedUsers()
      } else {
        _self.loadUnassignUsers()
      }
    },
    loadUnassignUsers() {
      let _self = this
      let localParams = { roleId: _self.roleId }
      let realParams = Object.assign({}, localParams, _self.params)

      userService
        .getUnassignedUsersByRoleId(realParams)
        .then(function (response) {
          _self.unassignUsers = response.data
          // console.log(_self.unassignUsers)
        })
    },
    loadAssignedUsers() {
      let _self = this
      let localParams = { roleId: _self.roleId }
      let realParams = Object.assign({}, localParams, _self.params)

      userService.getAssignedUsersByRoleId(realParams).then(function (response) {
        _self.assignedUsers = response.data
      })
    },
    /**
     * 分配用户到当前角色
     */
    handleAssignUserToRole(userList) {
      let _self = this
      let userIdArray = []

      userList.forEach(function (user) {
        userIdArray.push(user.userId)
      })

      let realData = { roleId: _self.roleId, userIds: userIdArray }
      userService.assignUsersToRole(realData).then(function (response) {
        _self.params.pageNo = 1
        _self.loadUnassignUsers()
        _self.$message({
          type: 'success',
          message: '分配成功!'
        })
      })
    },
    /**
     * 从当前角色移除用户
     */
    handleRemoveUserFromRole(userList) {
      let _self = this
      let userIdArray = []

      userList.forEach(function (user) {
        userIdArray.push(user.userId)
      })

      let realData = { roleId: _self.roleId, userIds: userIdArray }
      roleService.removeUsersFromRole(realData).then(function (response) {
        _self.params.pageNo = 1
        _self.loadAssignedUsers()
        _self.$message({
          type: 'success',
          message: '移除成功!'
        })
      })
    },

    handleSelectionChange(val) {
      let _self = this
      _self.selected = val
    },
    handleSizeChange(val) {
      let _self = this
      _self.params.pageSize = val

      if (_self.currentName === 'first') {
        _self.loadAssignedUsers()
      } else {
        _self.loadUnassignUsers()
      }
    },
    handleCurrentPageChange(val) {
      let _self = this
      _self.params.pageNo = val

      if (_self.currentName === 'first') {
        _self.loadAssignedUsers()
      } else {
        _self.loadUnassignUsers()
      }
    }
  }
}

</script>

<style>
</style>
