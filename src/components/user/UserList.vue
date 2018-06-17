<template>
  <div class="sub-content common-list user-list">

    <div class="btn-bar" style="text-align:left; margin:10px 0;">

      <el-row :gutter="20">
        <el-col :span="8" style="min-width: 320px;">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="handleCreateUser">新增</el-button>
          <el-button v-show="selected.length == 1" type="warning" icon="el-icon-edit" size="medium" @click="handUpdateUser(selected[0].userId)">修改</el-button>
          <el-button v-show="selected.length > 0" type="danger" icon="el-icon-delete" size="medium" @click="handleBatchDeleteUser(selected)">删除</el-button>
        </el-col>
        <el-col :span="16" style="text-align:right;" class="search-group">
          用户账号：
          <el-input size="medium" v-model="searchParams.screenName" clearable></el-input>
          用户名称：
          <el-input size="medium" v-model="searchParams.userName" clearable></el-input>
          邮箱：
          <el-input size="medium" v-model="searchParams.email" clearable></el-input>
          <el-button @click="handleSearch">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="listData.content" border style="width: 100%" size="medium" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="userId" label="ID" width="80" align="center"></el-table-column>
      <el-table-column prop="screenName" label="账号" width="120" align="left"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="120" align="left"></el-table-column>
      <el-table-column prop="sex" label="性别" width="80" align="center" :formatter="formatSex"></el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="200" align="left" show-overflow-tooltip></el-table-column>
      <el-table-column prop="jobTitle" label="职位" width="100" align="center"></el-table-column>
      <el-table-column prop="address" label="地址" align="left" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lastLoginDate" label="上次登录时间" width="160" align="center" :formatter="$common.formatDate"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="160" align="center" :formatter="$common.formatDate"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleViewUser(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="handUpdateUser(scope.row.userId)">编辑</el-button>
          <el-button type="text" style="color:#f56c6c;" size="small" @click="handleDeleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="text-align:right; padding: 20px 0 10px 0;">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentPageNoChange" :current-page="params.pageNo" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="params.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listData.totalElements">
      </el-pagination>
    </div>

    <el-dialog title="用户详情" :visible.sync="showUserDetail" style="text-align:left;">
      <div class="custom-table" style="padding: 0;">
        <el-row :gutter="20">
          <el-col :span="3">用户ID：</el-col>
          <el-col :span="8">{{showUser.userId}}</el-col>
          <el-col :span="3">用户账号</el-col>
          <el-col :span="8">{{showUser.screenName}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">用户名称：</el-col>
          <el-col :span="8">{{showUser.userName}}</el-col>
          <el-col :span="3">邮箱地址</el-col>
          <el-col :span="8">{{showUser.email}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">职位：</el-col>
          <el-col :span="8">{{showUser.jobTitle}}</el-col>
          <el-col :span="3">生日</el-col>
          <el-col :span="8">{{$common.formatDateEx(showUser.birthday)}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">性别：</el-col>
          <el-col :span="8">{{$common.data.sex[showUser.sex]}}</el-col>
          <el-col :span="3">电话</el-col>
          <el-col :span="8">{{showUser.phone}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">住址：</el-col>
          <el-col :span="21">{{showUser.address}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">描述：</el-col>
          <el-col :span="21">{{showUser.description}}</el-col>
        </el-row>
      </div>
      <div style="margin:20px 0 10px 0; text-align:right;">
        <el-button size="medium " @click="showUserDetail=!showUserDetail">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { userService } from '@/service/userService.js'

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
      showUserDetail: false,
      showUser: {},
      searchParams: {
        screenName: '',
        userName: '',
        email: ''
      }
    }
  },
  created() {
    let _self = this
    _self.loadUserList(_self.params)
  },
  methods: {
    formatSex(row, column, cellValue, index) {
      if (!cellValue || cellValue === '') {
        return '-'
      }
      return this.$common.data.sex[cellValue]
    },
    loadUserList(params) {
      let _self = this

      if (_self.isSearch) {
        // 搜索
        let realParams = Object.assign({}, params, _self.searchParams)
        userService.searchUser(realParams).then(function (response) {
          _self.listData = response.data
        })
      } else {
        // 所有
        userService.getUserList(params).then(function (response) {
          _self.listData = response.data
        })
      }
    },
    handleSizeChange(val) {
      let _self = this
      _self.params.pageSize = val
      _self.loadUserList(_self.params)
    },
    handleCurrentPageNoChange(val) {
      let _self = this
      _self.params.pageNo = val
      _self.loadUserList(_self.params)
    },

    handleSelectionChange(val) {
      let _self = this
      _self.selected = val
    },

    handleCreateUser() {
      let _self = this
      _self.$router.push({ name: 'userAdd' })
    },

    handleViewUser(user) {
      let _self = this
      _self.showUserDetail = true
      _self.showUser = user
    },

    handUpdateUser(userId) {
      let _self = this
      // router.push({ name: 'userEdit', params: { userId }}) // -> /userEdit/123
      // console.log('userId:'+userId);
      _self.$router.push({ name: 'userEdit', params: { userId } })
    },

    handleDeleteUser(user) {
      let _self = this
      _self
        .$confirm('确认删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = { userId: user.userId }
          userService.deleteUserById(params).then(function (response) {
            _self.$message({
              type: 'success',
              message: '删除成功!'
            })
            _self.loadUserList(_self.params)
          })
        })
        .catch(() => { })
    },

    handleBatchDeleteUser(userList) {
      let _self = this
      let userIdArray = []

      userList.forEach(function (user) {
        userIdArray.push(user.userId)
      })

      _self
        .$confirm('确认删除以下用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          let params = { userIds: userIdArray }
          userService.deleteUserByIds(params).then(function (response) {
            _self.$message({
              type: 'success',
              message: '删除成功!'
            })
            _self.loadUserList(_self.params)
          })
        })
        .catch(() => { })
    },

    handleSearch() {
      let _self = this
      // 每次搜索重置页码为1
      _self.params.pageNo = 1
      _self.isSearch = true
      _self.loadUserList(_self.params)
    }
  }
}
</script>

<style>
.custom-table {
  border-bottom: 1px solid #ebeef5;
}

.custom-table .el-row {
  border: 1px solid #ebeef5;
  border-width: 1px 1px 0 0;
  margin: 0 !important;
}

.custom-table .el-row .el-col {
  border-left: 1px solid #ebeef5;
  padding: 8px 10px;
  min-height: 35px;
}

.custom-table .el-row .el-col:nth-child(odd) {
  text-align: right;
  color: #888;
}

.custom-table .el-row .el-col:nth-child(even) {
  text-align: left;
}
</style>
