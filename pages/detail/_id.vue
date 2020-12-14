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
          <van-icon name="arrow-left" color="#333" size="20" @click="$router.go(-1)" />
          <van-icon name="wap-home-o" color="#333" size="20" style="margin-left:5px;" @click="$router.push('/')" />
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
                <span>总销量</span>
              </div>
            </div>
            <div class="goodsCount">
              <div class="count">
                {{ shopInfo.goodsCount }}
              </div>
              <div class="txt">
                <span>全部宝贝</span>
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
          <span>穿着效果</span>
        </div>
        <div v-if="detailInfo.detailImage" class="detailImg">
          <van-image v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" />
        </div>
      </div>
      <!-- 商品尺码 -->
      <div class="param-info">
        <table v-for="(table, index) in paramInfo.sizes" :key="index" class="info-size">
          <tbody>
            <tr v-for="(tr, indey) in table" :key="indey">
              <td v-for="(td, indez) in tr" :key="indez">
                {{ td }}
              </td>
            </tr>
          </tbody>
        </table>

        <table class="info-param">
          <tbody>
            <tr v-for="(info, index) in paramInfo.infos" :key="index">
              <td class="info-param-key">
                {{ info.key }}
              </td>
              <td class="param-value">
                {{ info.value }}
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="paramInfo.image" class="info-img">
          <img :src="paramInfo.image" alt="">
        </div>
      </div>
      <!-- 商品推荐 -->
      <goods-list :goods="recommends" />
    </van-pull-refresh>
    <back-top />
    <van-popup v-model="showSku" round position="bottom" :style="{ height: 'auto' }">
      <van-row type="flex" style="margin-top:20px">
        <van-col span="7" offset="1">
          <van-image width="90" height="90" :src="proImg" />
        </van-col>
        <van-col span="14" style="margin-top:20px">
          <div class="price">
            <span>￥</span><span style="font-size:24px;color:#f00;">{{ price / 100 }}</span>
          </div>
          <div class="stock">
            <span>库存 {{ stock }}</span>
          </div>
          <div class="chooses">
            <span>已选择 {{ chooseColor + ' ' + chooseSize }}</span>
          </div>
        </van-col>
      </van-row>
      <van-divider />
      <div class="colorTitle">
        <span>颜色:</span>
      </div>
      <div v-if="ShoppingCartInfo.props" class="colors">
        <div
          v-for="(item,index) in ShoppingCartInfo.props[0].list"
          :key="index"
          class="colorItem"
          :class="{'active': index === currentColor}"
          @click="changeColor(index,item)"
        >
          {{ item.name }}
        </div>
      </div>
      <van-divider />
      <div class="colorTitle">
        <span>尺码:</span>
      </div>
      <div v-if="ShoppingCartInfo.props" class="colors">
        <div
          v-for="(item,index) in ShoppingCartInfo.props[1].list"
          :key="index"
          class="colorItem"
          :class="{'active': index === currentSize}"
          @click="changeSize(index,item)"
        >
          {{ item.name }}
        </div>
      </div>
      <van-divider />
      <div class="buyNum">
        <div class="buyTitle">
          <span>购买数量</span>
        </div>
        <span style="color:#ee0a24;font-size:14px">每人限购5件</span>
        <van-stepper v-model="buyNum" integer style="margin-right:20px" max="5" />
      </div>
      <div class="van-sku-actions">
        <button class="van-button van-button--warning van-button--large" @click="addToCart">
          <div class="van-button__content">
            <span class="van-button__text">加入购物车</span>
          </div>
        </button><button class="van-button van-button--danger van-button--large" @click="buyNow">
          <div class="van-button__content">
            <span class="van-button__text">立即购买</span>
          </div>
        </button>
      </div>
    </van-popup>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" :badge="$store.state.proList.length" />
      <van-goods-action-icon
        :icon="isCollected ? 'star' : 'star-o'"
        :text="isCollected ? '已收藏' : '收藏'"
        :color="isCollected ? '#ff5000' : '#000'"
        @click="collectProduction"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="showSku = true" />
      <van-goods-action-button type="danger" text="立即购买" @click="showSku = true" />
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
      ShoppingCartInfo: {},
      isLoading: false,
      hasCommentInfo: true,
      showShare: false,
      showSku: false,
      proImg: '',
      price: 0,
      stock: 0,
      sizeId: 0,
      styleId: 0,
      currentColor: 0,
      currentSize: 0,
      chooseColor: '',
      chooseSize: '',
      buyNum: 1,
      isCollected: false,
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
      // 保存购物车信息
      this.ShoppingCartInfo = data.skuInfo
      this.xdSkuId = this.ShoppingCartInfo.skus[0].xdSkuId
      this.chooseColor = this.ShoppingCartInfo.props[0].list[0].name
      this.chooseSize = this.ShoppingCartInfo.props[1].list[0].name
      this.styleId = this.ShoppingCartInfo.props[0].list[0].styleId
      this.sizeId = this.ShoppingCartInfo.props[1].list[0].sizeId
      this.stock = this.ShoppingCartInfo.skus[0].stock
      this.price = this.ShoppingCartInfo.skus[0].nowprice
      this.proImg = this.ShoppingCartInfo.skus[0].img
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
    changeColor (index, item) {
      this.currentColor = index
      this.chooseColor = item.name
      this.styleId = item.styleId
      const result = this.ShoppingCartInfo.skus.find(item => item.styleId === this.styleId && item.sizeId === this.sizeId)
      this.proImg = result.img
      this.stock = result.stock
      this.price = result.nowprice
      this.xdSkuId = result.xdSkuId
    },
    changeSize (index, item) {
      this.currentSize = index
      this.chooseSize = item.name
      this.sizeId = item.sizeId
      const result = this.ShoppingCartInfo.skus.find(item => item.styleId === this.styleId && item.sizeId === this.sizeId)
      this.proImg = result.img
      this.stock = result.stock
      this.price = result.nowprice
      this.xdSkuId = result.xdSkuId
    },
    collectProduction () {
      const collectProduct = {
        id: this.xdSkuId,
        iid: this.id,
        imgUrl: this.proImg,
        price: this.price
      }
      this.isCollected = !this.isCollected
      if (!this.isCollected) {
        this.$toast('取消收藏')
        this.$store.commit('collection/deCollectProduct', collectProduct)
      } else {
        this.$store.commit('collection/addCollectProduct', collectProduct)
        this.$toast('收藏成功!')
      }
    },
    addToCart () {
      // 处理库存不足的情况
      if (!this.stock) {
        this.$toast('当前商品被抢光了,看看其他规格吧')
        return
      }
      const flag = this.proList.every((item) => {
        return item.every(v => v.id !== this.xdSkuId)
      })
      const productInfo = {
        id: this.xdSkuId,
        iid: this.id,
        shopId: this.shopInfo.shopId,
        logo: this.shopInfo.logo,
        title: this.goodsInfo.title,
        name: this.shopInfo.name,
        img: this.proImg,
        num: this.buyNum,
        style: this.chooseColor,
        size: this.chooseSize,
        isChecked: true,
        isShopChecked: true,
        price: this.price / 100

      }
      if (flag) {
        this.$store.commit('addProduct', productInfo)
        this.$toast('添加购物车成功')
        this.showSku = false
        this.buyNum = 1
      } else {
        // 处理限购件数
        for (const v of this.proList) {
          for (const item of v) {
            if (item.id === productInfo.id && (item.num + productInfo.num) > 5) {
              this.$toast('每人限购5件!')
              this.showSku = false
              this.buyNum = 1
              return
            }
          }
        }
        this.$store.commit('addProductNum', productInfo)
        this.$toast('商品数量+' + this.buyNum)
        this.showSku = false
        this.buyNum = 1
      }
    },
    buyNow () {
      const orderInfo = [[{
        iid: this.id,
        logo: this.shopInfo.logo,
        title: this.goodsInfo.title,
        name: this.shopInfo.name,
        img: this.proImg,
        num: this.buyNum,
        style: this.chooseColor,
        size: this.chooseSize,
        price: this.price / 100
      }]]
      if (this.stock) {
        this.showSku = false
        this.$router.push({ name: 'order', query: orderInfo })
      } else {
        this.$toast('当前商品被抢光了,看看其他规格吧')
      }
    },
    ...mapMutations({
      addProduct: 'addProduct'
    }),
    onRefresh () {
      this.isLoading = true
      location.reload(() => {
        this.isLoading = false
      })
    },
    onSelect (option) {
      this.$toast(option.name)
      this.showShare = false
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
  .colorTitle,.buyNum {
    margin-top: 10px;
    margin-left: 20px;
  }
  .colors {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .colorItem {
      font-size: 15px;
      margin-top: 10px;
      margin-left: 20px;
      border-radius: 5px;
      background: #f5f5f5;
      padding: 2px 7px;
    }
    .active {
    opacity: 0.9;
    background: rgb(248, 219, 224);
    color: #ee0a24;
  }
  }
  .buyNum {
    display: flex;
    justify-content: space-between;
    line-height: 28px;
  }
  .van-popup {
    .stock,.chooses {
      font-size: 14px;
      margin-top: 5px;
    }
  }
</style>
