<template>
  <div>
    permission
    <div v-permission="'1'">
      <button>按钮1，在权限里面</button>
    </div>
    <div v-permission="'10'">
      <button>按钮10，不在权限里面</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'promision'
}
</script>