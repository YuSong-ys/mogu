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
      title: '地址列表',
      fromWhere: ''
    }
  },
  computed: {
    ...mapGetters({
      addressList: 'address/addressList'
    })
  },

  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // 之所以要存personal-setting是因为从order进入后formWhere不会发生改变，再从setting进入还是走的order的逻辑
      if (from.name === 'order' || from.name === 'personal-setting') {
        vm.formWhere = from.name
      }
    })
  },

  methods: {
    backSeeting () {
      if (this.formWhere === 'order') {
        const address = this.$store.state.address.addressList.find(item => item.id === this.chosenAddressId)
        this.$router.push({ name: 'order', query: address })
      } else {
        this.$router.push('/personal/setting')
      }
    },
    onAdd () {
      this.$router.push('/personal/addAddress')
    },
    chooseAddress (item) {
      if (this.formWhere === 'order') {
        this.$router.push({ name: 'order', query: item })
      } else {
        this.$store.commit('address/changeDefault', item)
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
