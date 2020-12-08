<template>
  <div>
    personal
    {{ proList }}
    <van-button @click="pushPro">
      添加
    </van-button>
    <main-tab-bar />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import MainTabBar from '~/components/MainTabBar/index.vue'
export default {
  components: {
    MainTabBar
  },
  computed: {
    ...mapGetters({
      proList: 'proList'
    }),
    pro () {
      return this.$store.state.proList
    }

  },
  methods: {
    pushPro () {
      // this.$store.commit('increment')
      this.$store.commit('addProduct', { age: 18 })
    },
    ...mapMutations({
      addProduct: 'addProduct'
    })
  },
  head () {
    return {
      title: '个人信息'
    }
  }
}
</script>
