<template>
  <div class="container">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <!-- tabBar -->
      <van-nav-bar fixed :title="goodsInfo.title">
        <template #left>
          <van-icon name="arrow-left" color="#000" size="18px" @click="back" />
        </template>
        <template #right>
          <van-icon name="ellipsis" color="#000" size="25px" @click="showShare=true" />
        </template>
      </van-nav-bar>
      <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in topImages" :key="index">
          <van-image :src="item" height="300px" fit="none" />
        </van-swipe-item>
      </van-swipe>
      <!-- 商品基本信息 -->
      <div class="goodInfo">
        <div class="goodsTitle van-multi-ellipsis--l2">
          {{ goodsInfo.title }}
        </div>
        <div class="price">
          <span class="newPrice">{{ goodsInfo.newPrice }}</span>
          <span class="oldPrice">{{ goodsInfo.oldPrice }}</span>
          <span v-if="goodsInfo.discount" class="discount" :style="{ 'background-color': goodsInfo.discountBgColor }">
            {{ goodsInfo.discount }}
          </span>
        </div>
        <div class="columns">
          <span v-for="(item,index) in goodsInfo.columns" :key="index">
            {{ item }}
          </span>
        </div>
        <van-divider />
        <div class="services">
          <span v-for="(item,index) in goodsInfo.services" :key="index">
            <van-icon :name="item.icon" />
            {{ item.name }}
          </span>
        </div>
      </div>
      <!-- 店铺信息 -->
      <div class="shopInfo">
        <div class="shopImg">
          <van-image :src="shopInfo.logo" round width="45px" height="45px" />
          <span>{{ shopInfo.name }}</span>
        </div>
        <div class="shopCenter">
          <div class="shopLeft">
            <div class="sells">
              <div class="count">
                {{ (shopInfo.sells / 10000).toFixed(2) }} 万
              </div>
              <div class="txt">
                总销量
              </div>
            </div>
            <div class="goodsCount">
              <div class="count">
                {{ shopInfo.goodsCount }}
              </div>
              <div class="txt">
                全部宝贝
              </div>
            </div>
          </div>
          <div class="shopRight">
            <div v-for="(item,index) in shopInfo.score" :key="index" class="scoreItem">
              {{ item.name }}
              <span style="display:inline-block;width:30px;text-align:center">{{ item.score }}</span>
              <span :class="item.isBetter ? 'high' : 'low'">{{ item.isBetter ? '高':'低' }}</span>
            </div>
          </div>
        </div>
        <div class="shopEnter">
          <span>进店逛逛</span>
        </div>
      </div>
      <van-divider />
      <!-- 用户评论 -->
      <div v-if="hasCommentInfo" class="userComment">
        <van-cell-group>
          <van-cell title="用户评价" value="更多" is-link />
        </van-cell-group>
        <div class="userInfo">
          <van-image :src="commentInfo.user.avatar" round width="45px" height="45px" />
          <span>{{ commentInfo.user.uname }}</span>
        </div>
        <div class="infoDetail">
          {{ commentInfo.content }}
        </div>
        <div class="infoOther">
          <span class="infoDate">
            {{ commentInfo.created | showData }}
          </span>
          <span class="infoStyle">
            {{ commentInfo.style }}
          </span>
        </div>
        <van-divider />
      </div>
      <!-- 商品详情信息 -->
      <div class="detailInfo">
        <div class="desc">
          <div class="start" />
          <div class="descContent">
            {{ detailInfo.desc }}
          </div>
          <div class="end" />
        </div>
        <div class="infoKey">
          穿着效果
        </div>
        <div v-if="detailInfo.detailImage" class="detailImg">
          <van-image v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" />
        </div>
      </div>
      <!-- 商品尺码 -->
      <div class="param-info">
        <table v-for="(table, index) in paramInfo.sizes" :key="index" class="info-size">
          <tr v-for="(tr, indey) in table" :key="indey">
            <td v-for="(td, indez) in tr" :key="indez">
              {{ td }}
            </td>
          </tr>
        </table>

        <table class="info-param">
          <tr v-for="(info, index) in paramInfo.infos" :key="index">
            <td class="info-param-key">
              {{ info.key }}
            </td>
            <td class="param-value">
              {{ info.value }}
            </td>
          </tr>
        </table>

        <div v-if="paramInfo.image" class="info-img">
          <img :src="paramInfo.image" alt="">
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-list :goods="recommends" />
    </van-pull-refresh>
    <back-top />
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="$store.state.proList.length" />
      <van-goods-action-icon icon="star-o" text="收藏" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addTocart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import { getDetail, GoodsInfo, Shop, GoodsParam, getRecommend } from '~/api/detail'
import GoodsList from '~/components/goods/GoodsList'
import BackTop from '~/components/backTop/BackTop.vue'
import { formatDate } from '~/common/util'
export default {
  filters: {
    showData (value) {
      // 1、将时间戳转成data对象
      const data = new Date(value * 1000)
      // 2、格式化data
      return formatDate(data, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  components: {
    GoodsList,
    BackTop
  },
  data () {
    return {
      id: null,
      tabBarTitle: ['商品', '参数', '评论', '推荐'],
      currentTitle: 0,
      topImages: [],
      goodsInfo: {},
      shopInfo: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: { user: {} },
      recommends: [],
      isLoading: false,
      hasCommentInfo: true,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      proList: 'proList'
    })
  },
  created () {
    this.id = this.$route.params.id
    getDetail(this.id).then((res) => {
      const data = res.result
      // 抽离顶部轮播图数据
      this.topImages = data.itemInfo.topImages || []
      // 抽离商品数据
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // 店铺数据
      this.shopInfo = new Shop(data.shopInfo)
      // 详情数据
      this.detailInfo = data.detailInfo || {}
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 保存评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      } else {
        this.hasCommentInfo = false
      }
    })
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
  },
  methods: {
    addTocart () {
      const flag = this.proList.every(item => item.id !== this.id)
      const productInfo = {
        ...this.goodsInfo,
        ...this.shopInfo,
        id: this.id,
        img: this.topImages[0],
        num: 1,
        isChecked: true,
        price: this.goodsInfo.newPrice.replace(/¥/g, '').split('~')[0]

      }
      if (flag) {
        this.$store.commit('addProduct', productInfo)
        this.$toast('添加购物车成功')
      } else {
        this.$store.commit('addProductNum', productInfo)
        this.$toast('商品数量+1')
      }
    },
    ...mapMutations({
      addProduct: 'addProduct'
    }),
    onRefresh () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    onSelect (option) {
      this.$toast(option.name)
      this.showShare = false
    },
    back () {
      this.$router.go(-1)
    },
    clickTitle (index) {
      this.currentTitle = index
    }
  },
  head () {
    return {
      title: this.goodsInfo.title
    }
  }
}
</script>
<style lang="scss" scoped>
  .container {
    margin: 0 5px;
  }
  .van-pull-refresh {
    margin-bottom: 50px;
  }
  .active {
    color: var(--color-high-text);
  }
  .goodInfo {
    margin-top: 10px;
    .goodsTitle {
      font-size: 16px;
      color: #000;
    }
    .price {
      margin-top: 10px;
      .newPrice {
        font-size: 24px;
        color: var(--color-high-text);
      }
      .oldPrice {
        font-size: 13px;
        text-decoration: line-through;
      }
    }
    .discount {
        font-size: 12px;
        padding: 2px 5px;
        color: #fff;
        border-radius: 8px;
        margin-left: 5px;
        position: relative;
        top: -8px;
      }
    .columns {
      margin-top: 20px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        color: #999;
      }
    }
    .services {
      color: #333;
      font-size: 13px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
  .shopInfo {
    margin-top: 30px;
    .shopImg {
      line-height: 45px;
      display: flex;
      align-items: center;
      .van-image {
        border: 1px solid #ccc;
      }
      span {
        margin-left: 10px;
        vertical-align: center;
      }
    }
    .shopCenter {
      height: 75px;
      margin-top: 10px;
      display: flex;
      align-items: center;
      .shopLeft {
        width: 50%;
        color: #333;
        display: flex;
        justify-content: space-evenly;
        border-right: 1px solid #ccc;
        .sells,.goodsCount {
          text-align: center;
          .count {
          width: 100%;
          font-size: 18px;
          }
          .txt {
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
      .shopRight {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .scoreItem {
          margin-top: 7px;
          font-size: 13px;
          .high {
            background: red;
            color: #fff;
          }
          .low {
            background: green;
            color: #fff;
          }
        }
      }
    }
    .shopEnter {
      margin: 10px auto;
      text-align: center;
      width: 150px;
      height: 30px;
      font-size: 14px;
      background: #f2f5f8;
      border-radius: 20px;
      line-height: 30px;
    }
  }
  .detailInfo {
    .desc {
      .start {
        width: 100px;
        height: 1px;
        background: #ccc;
        &:before {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background: #000;
          position: relative;
          top: -4px;
        }
      }
      .descContent {
        margin: 15px 0;
        font-size: 14px;
      }
      .end {
        width: 100px;
        height: 1px;
        float: right;
        background: #ccc;
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 4px;
          height: 4px;
          background: #000;
          position: absolute;
          top: -4px;
          right: 0;
        }
      }
    }
    .infoKey {
      margin: 20px 0;
    }
  }
  .param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
    table {
      width: 100%;
      border-collapse: collapse;
      tr {
        height: 42px;
        td {
          border-bottom: 1px solid rgba(100, 100, 100, 0.1);
        }
      }
    }
    .info-param-key {
      /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
      width: 95px;
    }

    .info-param {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    .param-value {
      color: #eb4868;
    }

    .info-img img {
      width: 100%;
    }
  }
  .userComment {
    .userInfo {
      margin-top: 10px;
      line-height: 45px;
      display: flex;
      align-items: center;
      .van-image {
        border: 1px solid #ccc;
      }
      span {
        margin-left: 10px;
        vertical-align: center;
      }
    }
    .infoDetail {
      margin: 12px 0;
      font-size: 14px;
      color: #777;
    }
    .infoOther {
      font-size: 12px;
      color: #999;
    }
  }
</style>
