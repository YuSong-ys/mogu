<template>
  <div class="container">
    <div class="products">
      <div v-for="(proItem,index) in proList" :key="index" class="prolist">
        <div class="proListItem">
          <div v-if="proItem[0]" class="shop">
            <van-checkbox :value="proItem[0].isShopChecked" icon-size="16px" @click="updateShopChecked(proItem[0])" />
            <span>{{ proItem[0].name }}</span>
            <van-icon name="arrow" />
          </div>
          <div v-for="(item,i) in proItem" :key="i" class="productInfo">
            <van-checkbox :value="item.isChecked" icon-size="16px" @click="updataInfo(item)" />
            <van-swipe-cell>
              <van-card
                :price="(item.price * item.num).toFixed(2)"
                :desc="'颜色:' + item.style + ' 尺码:' + item.size"
                :title="item.title"
                class="goods-card"
                :thumb="item.img"
              >
                <template #num>
                  <van-icon name="minus" color="#000" @click="deNum(item)" />
                  <span style="font-size:16px;color:#000;background:#e5e5e5;margin:0 7px">{{ item.num }}</span>
                  <van-icon name="plus" color="#000" @click="addNum(item)" />
                </template>
              </van-card>
              <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deletePro(item)" />
              </template>
            </van-swipe-cell>
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar v-if="isShow" :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" @click="checkAll">
        全选
      </van-checkbox>
    </van-submit-bar>
    <van-cell v-else>
      <template #default>
        <van-button type="info" size="mini" @click="deleteAll">
          清理
        </van-button>
        <van-button type="danger" size="mini" @click="deleteSome">
          删除
        </van-button>
      </template>
      <template #title>
        <van-checkbox v-model="checked" class="checkbox" @click="checkAll">
          全选
        </van-checkbox>
      </template>
    </van-cell>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    isShow: Boolean
  },
  data () {
    return {
      checked: false,
      shopChecked: false
    }
  },
  computed: {
    ...mapGetters({
      proList: 'proList'
    }),
    totalPrice () {
      let total = 0
      for (const item of this.proList) {
        for (const v of item) {
          if (v.isChecked) {
            total += v.price * v.num * 100
          }
        }
      }
      return total
    }
  },
  watch: {
    proList: {
      handler (oldValue, newValue) {
        let flag = false
        for (const v of newValue) {
          for (const item of v) {
            if (!item.isChecked) {
              flag = false
              break
            } else {
              flag = true
            }
          }
        }
        this.checked = flag
      },
      deep: true
    }
  },
  activated () {
    if (!this.proList.length) { return }
    this.checked = this.proList.every(item => item.isChecked)
  },
  methods: {
    ...mapMutations({
      updataProduct: 'updataProduct'
    }),
    onSubmit () {
      this.$toast('该功能暂未开放')
    },
    // 商品增加
    addNum (item) {
      this.$store.commit('addProductNum', item)
    },
    // 商品减少
    deNum (item) {
      if (item.num > 1) {
        this.$store.commit('deProductNum', item)
      }
    },
    // 删除商品
    deletePro (item) {
      this.$store.commit('deleteProduct', item)
      if (!this.proList.length) {
        this.checked = false
        this.$emit('changeShow')
      }
    },
    // 批量删除商品
    deleteSome () {
      let flag = false
      for (let i = 0; i < this.proList.length; i++) {
        if (!this.proList[i].isChecked) {
          flag = true
        } else {
          flag = false
          break
        }
      }
      if (flag) {
        this.$toast('您还没有选择商品')
        return
      }
      if (this.proList.length) {
        this.$dialog.confirm({
          title: '删除',
          message: '删除选中商品'
        })
          .then(() => {
            this.$store.commit('deleteChooses')
            this.$toast('删除成功')
            this.$emit('changeShow')
            if (!this.proList.length) {
              this.checked = false
            }
          })
          .catch(() => {
            this.$toast('已取消')
          })
      } else {
        this.$toast('购物车没有商品')
      }
    },
    // 清空购物车
    deleteAll () {
      if (this.proList.length) {
        this.$dialog.confirm({
          title: '清空',
          message: '是否清空购物车'
        })
          .then(() => {
            this.checked = false
            this.$store.commit('deleteAll')
            this.$toast('购物车已清空')
            this.$emit('changeShow')
          })
          .catch(() => {
            this.$toast('已取消')
          })
      } else {
        this.$toast('购物车没有商品')
      }
    },
    // 全选
    checkAll () {
      this.$store.commit('updateAllChecked', this.checked)
    },
    // 单一商店商品全选联动
    updateShopChecked (payload) {
      this.$store.commit('updateShopChecked', payload)
    },
    // 全部商品单选联动全选
    updataInfo (item) {
      // console.log(item)
      this.$store.commit('updateChecked', item)
      this.checked = this.proList.every(item => item.isChecked)
    }
  }
}
</script>
<style lang="scss" scoped>
.shop {
    margin: 10px 0;
    display: flex;
    justify-content: flex-start;
    .van-checkbox {
        margin-left: 10px;
    }
    span {
        margin-left: 10px;
    }
}
 .goods-card {
    margin: 0;
    background-color: #e7e7e7;
  }

  .delete-button {
    height: 100%;
  }
.productInfo {
  margin-bottom: 10px;
    .van-checkbox {
        margin: 0 10px;
    }
    .van-swipe-cell {
        flex: 1;
        margin-right: 10px;
    }
    display: flex;
}
.van-submit-bar {
    bottom: 50px;
}
.products {
    margin-bottom: 100px;
}
.container {
    position: relative;
}
.van-cell {
    position: fixed;
    left: 0;
    bottom: 50px;
    .checkbox {
        height: 30px;
    }
}
</style>
