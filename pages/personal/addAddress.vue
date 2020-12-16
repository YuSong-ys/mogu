<template>
  <div>
    <van-nav-bar :title="title">
      <template #left>
        <van-icon name="arrow-left" size="20" color="#000" @click="backAddress" />
      </template>
    </van-nav-bar>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      :show-delete="showDelete"
      show-set-default
      show-search-result
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from '~/assets/js/area'
export default {
  data () {
    return {
      areaList,
      showDelete: false,
      addressInfo: {},
      title: '新增地址'
    }
  },
  activated () {
    if (this.$route.query.id) {
      this.addressInfo = this.$route.query
      this.showDelete = true
      this.title = '编辑地址'
    }
  },
  methods: {
    onSave (content) {
      if (!this.showDelete) {
        const newAddress = {
          name: content.name,
          tel: content.tel,
          province: content.province,
          city: content.city,
          county: content.county,
          addressDetail: content.addressDetail,
          areaCode: content.areaCode,
          postalCode: content.postalCode,
          isDefault: content.isDefault
        }
        this.$store.commit('address/addAddress', newAddress)
      } else {
        this.$store.commit('address/editAddreee', content)
      }
      this.addressInfo = {}
      this.showDelete = false
      this.title = '新增地址'
      this.$router.push('/personal/address')
    },
    backAddress () {
      this.addressInfo = {}
      this.showDelete = false
      this.title = '新增地址'
      this.$router.go(-1)
    },
    onDelete (content) {
      this.$store.commit('address/deleteAddress', content)
      this.$toast('地址删除成功')
      this.addressInfo = {}
      this.showDelete = false
      this.title = '新增地址'
      this.$router.push('/personal/address')
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

</style>
