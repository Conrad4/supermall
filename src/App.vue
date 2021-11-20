<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
    <main-tab-bar/>

  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'

export default {
  name: "App",
  components: {
    MainTabBar
  },
  
};
</script>

<style>
</style>
