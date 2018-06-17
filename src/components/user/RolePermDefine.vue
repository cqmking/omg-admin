<template>
  <div class="sub-content common-list define-permission">
    <div style="margin:10px 0;">
      <span style="color: rgb(96, 98, 102);">当前角色：</span>
      <b>{{role.name}}</b>
    </div>
    <el-row :gutter="20" style="margin-top:10px;">
      <el-col :span="8">
        <!-- 树形菜单，资源 -->
        <el-tree :data="resourceTreeData" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"></el-tree>
      </el-col>
      <el-col :span="16">
        <!-- 权限列表 -->

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { roleService } from '@/service/roleService.js'

export default {
  data() {
    return {
      role: {},
      resourceTreeData: []
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
      let node1 = {
        id: 1,
        label: '一级 2',
        children: [
          {
            id: 3,
            label: '二级 2-1',
            children: [
              {
                id: 4,
                label: '三级 3-1-1'
              },
              {
                id: 5,
                label: '三级 3-1-2',
                disabled: true
              }
            ]
          }
        ]
      }
      let node2 = {
        id: 2,
        label: '二级 2-2',
        disabled: true,
        children: [
          {
            id: 6,
            label: '三级 3-2-1'
          },
          {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }
        ]
      }
      _self.resourceTreeData.push(node1)
      _self.resourceTreeData.push(node2)
    }
  }
}
</script>

<style>
.define-permission {
  text-align: left;
}
</style>
