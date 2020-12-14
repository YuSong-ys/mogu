<template>
  <div class="container">
    <van-nav-bar title="订单列表">
      <template #left>
        <van-icon name="arrow-left" color="#000" size="20" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      tabList: ['全部订单', '待付款', '待发货', '待收货', '待评价']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
