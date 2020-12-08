<template>
  <div class="container">
    <div class="products">
      <div v-for="(item,index) in proList" :key="index" class="prolist">
        <div class="shop">
          <van-checkbox :value="item.isChecked" icon-size="16px" @click="updataInfo(item)" />
          <span>{{ item.name }}</span>
          <van-icon name="arrow" />
        </div>
        <div class="productInfo">
          <van-checkbox :value="item.isChecked" icon-size="16px" @click="updataInfo(item)" />
          <van-swipe-cell>
            <van-card
              :price="(item.price * item.num).toFixed(2)"
              :desc="item.desc"
              :title="item.title"
              class="goods-card"
              :thumb="item.img"
            >
              <template #num>
                <!-- <van-stepper v-model="value" integer button-size="18px" @change="updataNum(item)" /> -->
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
      checked: true
    }
  },
  computed: {
    ...mapGetters({
      proList: 'proList'
    }),
    totalPrice () {
      let total = 0
      for (const key in this.proList) {
        // eslint-disable-next-line no-prototype-builtins
        if (this.proList.hasOwnProperty(key)) {
          if (this.proList[key].isChecked) {
            total += this.proList[key].price * this.proList[key].num * 100
          }
        }
      }
      return total
    }
  },
  methods: {
    ...mapMutations({
      updataProduct: 'updataProduct'
    }),
    onSubmit () {
      this.$toast('该功能暂未开放')
    },
    addNum (item) {
      this.$store.commit('addProductNum', item)
    },
    deNum (item) {
      if (item.num > 1) {
        this.$store.commit('deProductNum', item)
      }
    },
    deletePro (item) {
      this.$store.commit('deleteProduct', item)
    },
    deleteSome () {
      if (this.proList.length) {
        this.$dialog.confirm({
          title: '删除',
          message: '删除选中商品'
        })
          .then(() => {
            this.$store.commit('deleteChooses')
            this.$toast('删除成功')
            if (!this.proList.length) {
              this.checked = false
            }
          })
          .catch(() => {
            this.$toast('已取消')
          })
      }
    },
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
          })
          .catch(() => {
            this.$toast('已取消')
          })
      }
    },
    checkAll () {
      this.$store.commit('updateAllChecked', this.checked)
    },
    updataInfo (item) {
      this.$store.commit('updateChecked', item)
      this.checked = this.proList.every(item => item.isChecked)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  beforeUpdated () {
    if (this.proList.length) {
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
    margin-bottom: 50px;
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
