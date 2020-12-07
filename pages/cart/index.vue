<template>
  <div class="container">
    cart
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from '~/components/MainTabBar/index.vue'
export default {
  components: {
    MainTabBar
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>>
