// 权限指令

export default {
  // inserted → 元素插入的时候
  inserted(el, binding) {
    const permissionList = ['1', '2', '3'];
    // 获取到 v-permission的值
    const { value: permission } = binding

    if (permission) {
      const hasPermission = permissionList.includes(permission)
      console.log(hasPermission);

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need permission! Like v-permission="'1'"`)
    }
  }
}