<template>
  <div class="navbar-container">
    <template
      v-for="item in navList"
    >
      <router-link :key="item.key" :to="item.path">{{item.name}}</router-link>
    </template>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    navList: {
      type: Array,
      required: true
    }
  }
}
</script>