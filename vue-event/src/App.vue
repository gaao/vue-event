<template>
  <div>
    <!-- <el-button type="">一级</el-button> -->
    <!-- 一级路由规则对象组件挂载点 -->
    <router-view></router-view>
  </div>
</template>
<script>
// import { getUserInfoAPI } from '@/api'
export default {
  created() {
    // const { data: res } = await getUserInfoAPI()
    // console.log(res, '111')
    // this.$store.dispatch('getUserInfoAction')
  }
}
</script>
<style lang="less" scoped>

</style>
