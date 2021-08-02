<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
      a: 1
    }
  },
  beforeCreate() {
    console.log('beforeCreate');
    console.log(this.$el);
    console.log(this.$data);
  },
  created() {
    console.log('created');
    console.log(this.$el);
    console.log(this.$data);
  },
  beforeMount() {
    console.log('beforeMount');
    console.log(this.$el);
    console.log(this.$data);
  },
  mounted() {
    console.log('mounted');
    console.log(this.$el);
    console.log(this.$data);
  }
})
</script>
