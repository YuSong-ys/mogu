<template>
  <div class="tabbar">
    <van-tabbar v-model="active" route z-index="1000" fixed active-color="red">
      <van-tabbar-item icon="home-o" to="/">
        首页
      </van-tabbar-item>
      <van-tabbar-item icon="orders-o" to="/category">
        分类
      </van-tabbar-item><van-tabbar-item icon="cart-o" :badge="proListLength" to="/cart">
        购物车
      </van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/personal">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainTabBar',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters({
      proListLength: 'proListLength'
    })
  }
}
</script>
<style lang="scss" scoped>
.tabbar {
  margin-top:52px;
}
</style>
