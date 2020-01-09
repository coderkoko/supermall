<template>
  <div id="app">
    <!-- keep-alive 防止路由跳转后销毁该路由 -->
    <!-- exclude 把Detail组件排除在外 Detail为组件中的name -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
