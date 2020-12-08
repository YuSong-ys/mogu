<template>
  <div>
    category
    <main-tab-bar />
  </div>
</template>
<script>
import MainTabBar from '~/components/MainTabBar/index.vue'
export default {
  components: {
    MainTabBar
  },
  head () {
    return {
      title: '商品分类'
    }
  }
}
</script>
