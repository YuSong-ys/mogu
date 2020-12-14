<template>
  <div class="container">
    <div style="margin-bottom:50px">
      <div class="userInfo">
        <van-image
          round
          style="margin:10px 10px 0 5px"
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="userName">测试昵称</span>
        <div class="setting" @click="goToSetting">
          <van-icon name="setting" size="24" />
        </div>
      </div>
      <div class="orderInfo">
        <van-cell title="我的订单" value="全部订单" size="large" is-link to="order/list" />
        <van-grid>
          <van-grid-item icon="pending-payment" text="待付款" />
          <van-grid-item icon="send-gift-o" text="待发货" />
          <van-grid-item icon="logistics" text="待收货" />
          <van-grid-item icon="other-pay" text="评价" />
        </van-grid>
      </div>
      <div class="connectionInfo">
        <van-cell title="我的推广" value="查看更多" size="large" is-link />
        <div class="connection">
          <div
            v-for="(item,index) in connectionList"
            :key="index"
            class="subItem"
          >
            <div class="itemValue">
              {{ item.value }}
            </div>
            <div class="itemTitle">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="collection">
        <van-cell title="我的收藏" size="large" />
        <div v-if="collectionList.length" class="collectionItem">
          <div v-for="(item,index) in collectionList" :key="index" class="subItem" @click="goToProduct(item.iid)">
            <img :src="item.imgUrl">
            <span class="itemPrice">￥<span style="font-size:16px;">{{ item.price / 100 }}</span></span>
          </div>
        </div>
        <van-empty v-else description="暂未收藏商品" />
      </div>
      <main-tab-bar />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MainTabBar from '~/components/MainTabBar/index.vue'
export default {
  components: {
    MainTabBar
  },
  data () {
    return {
      connectionList: [{ title: '全部人脉', value: 0 }, { title: '推广收益(元)', value: '0.00' }, { title: '收益订单(笔)', value: 0 }]
    }
  },
  computed: {
    ...mapGetters({
      collectionList: 'collection/collectionList'
    })
  },
  methods: {
    goToSetting () {
      this.$router.push({ name: 'personal-setting' })
    },
    // 跳转回商品详情页
    goToProduct (iid) {
      this.$router.push({ name: 'detail-id', params: { id: iid } })
    }
  },
  head () {
    return {
      title: '个人信息'
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    padding: 5px;
    height: 100vh;
    background: #f7f8fa;
    .userInfo {
      background: #fff;
      margin-bottom: 10px;
      .userName {
        display: inline-block;
        height: 4em;
        line-height: 4em;
        vertical-align: top;
        margin-top: 10px;
      }
      .setting {
        float: right;
        height: 4em;
        line-height: 4em;
        margin-right: 10px;
      }
    }
    .orderInfo {
      box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
    }
    .connectionInfo {
      margin-top: 10px;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
      .connection {
        display: flex;
        justify-content: space-evenly;
        background: #fff;
        .subItem {
          display: flex;
          flex-direction: column;
          align-items: center;
          .itemValue {
            margin-top: 20px;
          }
          .itemTitle {
            margin: 15px 0 20px 0;
            font-size: 14px;
          }
        }
      }
    }
    .collection {
      margin-top: 10px;
      background: #fff;
      box-shadow: 0px 2px 5px rgba(0,0,0,0.1);
      .collectionItem {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-top: 5px;
        .subItem {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 70px;
          margin: 0 10px 10px;
          background: #f7f8fa;
          color:#ee0a24;
          font-size:12px;
          img {
            width: 70px;
            height: 70px;
            border-radius: 5px;
          }
          .itemPrice {
            margin: 5px 10px 5px 0;
          }
        }
      }
    }
  }

</style>
