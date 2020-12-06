<template>
  <van-tabbar v-model="active" route z-index="1000" fixed active-color="red">
    <van-tabbar-item icon="home-o" to="/">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="orders-o" to="/category">
      分类
    </van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/personal">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: 'MainTabBar',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="sass" scoped>

</style>
