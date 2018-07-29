<template>
  <div class="sub-content common-list define-permission">
    <div style="margin:10px 0;">
      <span style="color: rgb(96, 98, 102);">当前角色：</span>
      <b>{{role.name}}</b>
    </div>
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="6">
        <!-- 树形菜单，资源 -->
        <el-tree :data="resourceTreeData" node-key="id" @node-click="nodeClickHandler"></el-tree>
      </el-col>
      <el-col :span="18">
        <div class="btn-bar" style="text-align:left; margin:10px 0;">
          <el-row :gutter="20">
            <el-col :span="7" style="min-width: 320px;">
              <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="updateResourcePermissions">更新</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 权限列表 -->
        <el-table :data="resourceActionList" border style="width: 100%;" size="medium" @selection-change="tableSelectionChangeHandler">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="label" label="操作" align="left"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { roleService } from '@/service/roleService.js'
import { resourceService } from '@/service/resourceService.js'

export default {
  data() {
    return {
      role: {},
      resourceTreeData: [],
      resourceActionList: []
    }
  },
  created() {
    let _self = this
    if (_self.$route.params.roleId) {
      _self.role.roleId = _self.$route.params.roleId
    }
    if (_self.role.roleId > 0) {
      _self.loadRole()
      _self.loadResourceTree()
    }
  },
  methods: {
    loadRole() {
      let _self = this
      let params = { roleId: _self.role.roleId }
      roleService.getRoleById(params).then(function (response) {
        _self.role = response.data
      })
    },
    loadResourceTree() {
      let _self = this

      resourceService.getResourceTree().then(function (response) {
        _self.resourceTreeData = response.data
      })
    },

    nodeClickHandler(nodeData, node, nodeConponent) {
      let _self = this
      if (nodeData.type) {
        let params = { resourceName: nodeData.resourceName, type: nodeData.type }
        resourceService.getResourceActions(params).then(function (response) {
          _self.resourceActionList = response.data
        })
      }
    },

    tableSelectionChangeHandler() {
      // let _self = this
    },

    updateResourcePermissions() {

    }
  }
}
</script>

<style>
.define-permission {
  text-align: left;
}
</style>
