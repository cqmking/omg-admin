<template>
  <div class="sub-content">
    <el-table :data="sysInfo" border style="width: 100%" :show-header="false" size="medium">
      <el-table-column prop="key" label="名称" width="280"></el-table-column>
      <el-table-column prop="value" label="值" align="left"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { commonService } from '@/service/commonService.js'

export default {
  data() {
    return {
      sysInfo: []
    }
  },

  created() {
    this.initData()
  },

  methods: {
    initData() {
      let self = this
      commonService.getServerInfo().then(function (response) {
        var object = response.data
        let arrayData = []
        arrayData.push({
          key: '操作系统名称',
          value: object.osName
        })
        arrayData.push({
          key: '操作系统构架',
          value: object.osArch
        })
        arrayData.push({
          key: '操作系统版本',
          value: object.osVersion
        })
        arrayData.push({
          key: 'java虚拟机',
          value: object.jvmName
        })
        arrayData.push({
          key: 'java虚拟机版本',
          value: object.jreVersion
        })
        arrayData.push({
          key: 'java运行环境',
          value: object.jreName
        })
        arrayData.push({
          key: '用户的主目录',
          value: object.userHome
        })
        arrayData.push({
          key: '当前工作目录',
          value: object.userDir
        })
        arrayData.push({
          key: '用户临时文件目录',
          value: object.tempDir
        })
        arrayData.push({
          key: '最大内存',
          value: object.maxMemory + ' MB'
        })
        arrayData.push({
          key: '已用内存',
          value: object.totalMemory + ' MB'
        })
        arrayData.push({
          key: '空闲内存',
          value: object.freeMemory + ' MB'
        })
        self.sysInfo = arrayData
      })
    }
  }
}
</script>

<style>
</style>
