<template>
  <div class="drift-aside">
    <div v-show="isShow" class="item" @click="gotoTop()">
      <img src="~assets/img/common/top.png" alt="">
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      height: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollFn)
    this.height = document.body.clientHeight
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollFn)
  },
  methods: {
    scrollFn () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > this.height) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    gotoTop () {
      window.scrollTo({
        top: 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.drift-aside{
  position: fixed;
  right: 20px;
  bottom: 70px;
  width: 50px;
  height: 50px;
  img{
    width: 50px;
    height: 50px;
  }
}
</style>
