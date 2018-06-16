<template>
  <!-- 如果当前item中有子节点 -->
  <el-submenu v-if="item.children && item.children.length && item.hidden!=true && item.isLastItem!=true" :index="navIndex">
    <!-- 创建菜单分组 -->
    <template slot="title">
      <i :class="'fa ' + item.iconClass" aria-hidden="true"></i>
      <span slot="title">{{ item.meta.label }}</span>
    </template>
    <!-- 递归调用自身，直到subItem不含有子节点 -->
    <nav-item v-for="(subItem,i) in item.children" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem"></nav-item>
  </el-submenu>

  <!-- 如果当前item不含有子节点 -->
  <el-menu-item v-else-if="item.hidden!=true" :index="item.path">
    <i :class="'fa ' + item.iconClass" aria-hidden="true"></i>
    <span slot="title">{{ item.meta.label }}</span>
  </el-menu-item>
</template>

<script>

export default {
  // 递归组件必须有name
  name: 'NavItem',
  props: ['item', 'navIndex']
}

</script>
