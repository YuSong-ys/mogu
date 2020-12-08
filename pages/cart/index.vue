<template>
  <div class="container">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-nav-bar title="购物车">
        <template #right>
          <span @click="onClickRight">{{ isShow ? '管理' : "完成" }}</span>
        </template>
      </van-nav-bar>
      <cart-product :is-show="isShow" @changeShow="changeShow" />
    </van-pull-refresh>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from '~/components/MainTabBar/index.vue'
import cartProduct from '~/components/cartProduct/cartProduct.vue'
export default {
  components: {
    MainTabBar,
    cartProduct
  },
  data () {
    return {
      active: 0,
      isLoading: false,
      checked: false,
      isShow: true
    }
  },
  methods: {
    // 子组件删除或清空购物车后改回管理
    changeShow () {
      this.isShow = true
    },
    onRefresh () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    onClickRight () {
      this.isShow = !this.isShow
    }
  },
  head () {
    return {
      title: '购物车'
    }
  }
}
</script>

<style lang="scss" scoped>
  .van-submit-bar {
    bottom: 50px;
  }
</style>>
