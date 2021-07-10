<template>
  <div class="app-container">
    <h1>VUE小技巧整理</h1>
    <NavBar :navList="navList" />
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: 'BasicLayout',
  components: {
    NavBar
  },
  data() {
    return {
      navList: [
        {
          key: 'home',
          path: '/',
          name: '首页'
        },
        {
          key: 'permission',
          path: '/permission',
          name: '权限指令'
        }
      ]
    }
  }
}
</script>
<style>
.app-container {
  width: 1000px;
  margin: 0 auto;
}
</style>