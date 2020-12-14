<template>
  <div class="container">
    <van-nav-bar title="确认订单" fixed>
      <template #left>
        <van-icon name="arrow-left" color="#000" size="20" @click="chancelOrder" />
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="address">
        <div class="addressIcon">
          <van-icon name="location" color="#f00" size="26" />
        </div>
        <div class="addressInfo">
          <div class="userInfo">
            <span>测试昵称</span>
            <span style="font-size:14px;color:#999">155****8892</span>
          </div>
          <div class="addressDetail">
            四川省成都市双流区成都国际节能大厦3501
          </div>
        </div>
        <van-icon name="arrow" style="line-height:80px;margin-left:20px;" color="#999" />
      </div>
      <div v-for="(orderItem,index) in orderInfo" :key="index" class="goods">
        <div v-if="orderItem[0]" class="shopInfo">
          <van-image width="20" height="20" round :src="orderItem[0].logo" />
          <span class="shopname">{{ orderItem[0].name }}</span>
          <van-icon name="arrow" style="margin-top:2px;" />
        </div>
        <div v-for="(item,i) in orderItem" :key="i" class="goodsInfo">
          <img :src="item.img">
          <div class="goodsDetail">
            <div class="goodsname van-multi-ellipsis--l2">
              {{ item.title }}
            </div>
            <div class="goodssku van-multi-ellipsis--l2">
              规格: {{ item.style }} 尺码:{{ item.size }}
            </div>
          </div>
          <div class="goodsprice">
            ￥<span>{{ item.price }}</span>
            <div class="num">
              x{{ item.num }}
            </div>
          </div>
        </div>
        <div class="others">
          <van-cell title="商品总件数" :value="productNum(orderItem) + '件'" />
          <van-cell-group>
            <van-field v-model="value" label="订单备注" placeholder="选填,请先和商家协商一致" />
          </van-cell-group>
          <van-cell title="应付合计" :value="'￥' + orderPrice(orderItem)" />
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      tip-icon="info-o"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 订单备注
      value: '',
      orderInfo: []
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      for (let i = 0; i < this.orderInfo.length; i++) {
        for (const v of this.orderInfo[i]) {
          total += v.num * v.price * 100
        }
      }
      return total
    },
    orderPrice () {
      return (item) => {
        let total = 0
        for (const v of item) {
          total += v.num * v.price
        }
        return total.toFixed(2)
      }
    },
    productNum () {
      return (item) => {
        let sum = 0
        for (const v of item) {
          sum += v.num
        }
        return sum
      }
    }
  },
  created () {
    this.orderInfo = this.$route.query
  },
  activated () {
    this.orderInfo = this.$route.query
  },
  methods: {
    chancelOrder () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #f5f5f5;
  margin-bottom: 50px;
  padding: 5px 0;
  .content {
    margin: 50px 7px 0 7px;
    .address {
      height: 80px;
      margin: 7px 0;
      background: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: flex-start;
      .addressIcon {
        margin-right: 5px;
        .van-icon {
          line-height: 80px;
          margin-left: 10px;
        }
      }
      .addressInfo {
        margin-top: 15px;
        width: 75%;
        .addressDetail {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
    .goods {
      background: #fff;
      border-radius: 5px;
      margin-bottom: 10px;
      padding: 15px 10px 0 10px;
      .shopInfo {
        display: flex;
        justify-content: flex-start;
        .shopname{
          height: 20px;
          margin-left: 10px;
          line-height: 20px;
        }
      }
      .goodsInfo {
        display: flex;
        justify-content: flex-start;
        margin-top: 10px;
        font-size: 14px;
         img {
            margin: 0 10px;
            width: 80px;
            height: 80px;
            border-radius: 5px;
          }
        .goodsDetail {
          width: 55%;
          .goodsname {
            height: 32px;
          }
          .goodssku {
            margin-top: 10px;
            padding: 3px;
            background: #f5f5f5;
            border-radius: 5px;
            color: #bbb;
          }
        }
        .goodsprice {
          margin-left: 10px;
          .num {
            color: #bbb;
            margin-left: 15px;
          }
        }
      }
      .others {
        margin: 10px 0;
      }
    }
  }
}
</style>
