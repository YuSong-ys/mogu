<template>
  <div class="container">
    <van-nav-bar title="订单列表">
      <template #left>
        <van-icon name="arrow-left" color="#000" size="20" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable sticky color="#ff627b">
      <van-tab v-for="(item,index) in orderList" :key="index" :title="item.title">
        <van-card
          v-for="(subItem,i) in item.list"
          :key="i"
          :num="subItem.num"
          :price="subItem.price"
          :desc="subItem.desc"
          :title="subItem.title"
          :thumb="subItem.image"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters({
      orderList: 'order/orderList'
    })
  },
  activated () {
    if (this.$route.params) {
      this.active = this.$route.params.active
    }
  },
  head () {
    return {
      title: '订单列表'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
