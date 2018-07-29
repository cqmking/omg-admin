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
        <template v-if="resourceActionList.length !== 0">
          <div class="btn-bar" style="text-align:left; margin:10px 0;">
            <el-row :gutter="20">
              <el-col :span="7" style="min-width: 320px;">
                <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="updateResourcePermissions">更新</el-button>
              </el-col>
            </el-row>
          </div>
          <!-- 权限列表 -->
          <el-table ref="resourceActionTable" :data="resourceActionList" border style="width: 100%;" size="medium" @selection-change="tableSelectionChangeHandler">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="label" label="操作" align="left"></el-table-column>
          </el-table>
          <div class="btn-bar" style="text-align:left; margin:10px 0;">
            <el-row :gutter="20">
              <el-col :span="7" style="min-width: 320px;">
                <el-button type="primary" icon="el-icon-circle-plus-outline" size="medium" @click="updateResourcePermissions">更新</el-button>
              </el-col>
            </el-row>
          </div>
        </template>
        <div v-if="resourceActionList.length === 0">
          <span>请选择资源</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import { roleService } from '@/service/roleService.js'
import { resourceService } from '@/service/resourceService.js'
import { resourcePermissionService } from '@/service/resourcePermissionService.js'

export default {
  data() {
    return {
      role: {},
      selected: [],
      currentNodeData: {},
      resourceTreeData: [],
      resourceActionList: [],
      resourcePermission: {}
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
      _self.currentNodeData = nodeData

      if (_self.currentNodeData.type) {
        let params = { resourceName: _self.currentNodeData.resourceName, type: _self.currentNodeData.type }
        resourceService.getResourceActions(params).then(function (response) {
          _self.resourceActionList = response.data
        })

        let scope = _self.currentNodeData.type === 'system' ? 1 : 2

        let resPermissionParam = {
          resourceName: _self.currentNodeData.resourceName,
          primaryKey: 0,
          scope: scope,
          roleId: _self.role.roleId
        }

        resourcePermissionService.getResourcePermission(resPermissionParam).then(function (response) {
          _self.resourcePermission = response.data
          console.log(_self.resourcePermission)
          for (let i = 0; i < _self.resourceActionList.length; i++) {
            let row = _self.resourceActionList[i]

            if ((row.value & _self.resourcePermission.actionIds) !== 0) {
              _self.$refs.resourceActionTable.toggleRowSelection(row)
              // console.log(row.value + ' ||| ' + _self.resourcePermission.actionIds)
            }
          }
        })
      }
    },

    tableSelectionChangeHandler(val) {
      let _self = this
      _self.selected = val
    },

    updateResourcePermissions() {
      let _self = this

      let scope = _self.currentNodeData.type === 'system' ? 1 : 2
      let actionIds = 0

      for (let i = 0; i < _self.selected.length; i++) {
        let nodeData = _self.selected[i]
        actionIds = actionIds | nodeData.value
      }

      let resPermissionParam = {
        resourceName: _self.currentNodeData.resourceName,
        primaryKey: 0,
        scope: scope,
        roleId: _self.role.roleId,
        actionIds: actionIds
      }

      resourcePermissionService.updateResourcePermission(resPermissionParam).then(function (response) {
        _self.resourcePermission = response.data
        console.log(_self.resourcePermission)
      })
    }
  }
}
</script>

<style>
.define-permission {
  text-align: left;
  padding-bottom: 25px;
}
</style>
