<template>
  <div id="app" class="theme-blue">
    <transition name="fade" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style>
  @import "./assets/css/style.css"; /*引入公共样式*/
</style>
