<template>
  <div class="container">
    <van-nav-bar title="我的收获地址">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" @click="backSeeting" />
      </template>
    </van-nav-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      default-tag-text="默认"
      @add="onAdd"
      @select="chooseAddress"
      @edit="onEdit"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      list: [],
      chosenAddressId: '1',
      title: '地址列表'
    }
  },
  computed: {
    ...mapGetters({
      addressList: 'address/addressList'
    //   chosenAddressId: 'address/chosenAddressId'
    })
  },
  methods: {
    backSeeting () {
      if (this.$route.query.isOrder) {
        this.$router.go(-1)
      } else {
        this.$router.push('/personal/setting')
      }
    },
    onAdd () {
      this.$router.push('/personal/addAddress')
    },
    chooseAddress (item) {
      if (this.$route.query.isOrder) {
        this.$router.push({ name: 'order', query: item })
      }
    },
    onEdit (item, index) {
      this.$router.push({ name: 'personal-addAddress', query: item })
    }
  },
  head () {
    return {
      title: this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.van-address-list__bottom {
    bottom: 15px;
}
</style>
