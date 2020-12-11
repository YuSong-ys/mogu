<template>
  <div class="container">
    <van-nav-bar
      title="购物街"
    />
    <van-swipe class="my-swipe" :autoplay="3000" initial-swipe="3" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <van-image :src="item.image" :alt="item.title" :height="195" :width="375" />
        </a>
      </van-swipe-item>
    </van-swipe>

    <van-grid :border="false" :column-num="4">
      <van-grid-item v-for="(item,index) in recommend" :key="index">
        <a :href="item.link">
          <van-image :src="item.image" width="70" height="70">
            <template #default>
              <span style="color:#666;font-size:12px;margin-left:10px">{{ item.title }}</span>
            </template>
          </van-image>
        </a>
      </van-grid-item>
    </van-grid>
    <div class="feature">
      <a href="https://act.mogujie.com/zzlx67">
        <img src="../assets/img/home/recommend_bg.jpg" alt="" width="100%" style="margin-top:8px">
      </a>
    </div>
    <van-tabs v-model="active" sticky @click="tabClick">
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.tab" :name="item.name">
        <van-list
          v-model="loading"
          :finished="finished"
          loading-text="加载中..."
          finished-text="没有更多了"
          @load="onLoad"
        >
          <goods-list :goods="showGoods" />
        </van-list>
      </van-tab>
    </van-tabs>
    <back-top />
    <main-tab-bar />
  </div>
</template>

<script>
import { getHomeMultidata, getHomeGoods } from '~/api/home'
import MainTabBar from '~/components/MainTabBar/index.vue'
import GoodsList from '~/components/goods/GoodsList'
import BackTop from '~/components/backTop/BackTop.vue'
export default {
  components: {
    MainTabBar,
    GoodsList,
    BackTop
  },
  data () {
    return {
      active: 0,
      banner: [],
      recommend: [],
      tabList: [{ tab: '综合', name: 'pop' }, { tab: '新品', name: 'new' }, { tab: '精选', name: 'sell' }],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      loading: false,
      finished: false
    }
  },
  computed: {
    // 商品列表展示的数据，根据点击tabbar传过来的currentType值确定传递哪一部分的数据
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  created () {
    this.getList()
    this.getGoods('pop')
    this.getGoods('new')
    this.getGoods('sell')
  },
  methods: {
    // 点击切换tab
    tabClick (name) {
      this.currentType = name
    },
    getList () {
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getGoods (type) {
      const page = this.goods[type].page + 1
      this.loading = true
      getHomeGoods(type, page).then((res) => {
        if (page < 20) {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.loading = false
        } else {
          this.finished = true
        }
      })
    },
    onLoad () {
      this.getGoods(this.currentType)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background: #ccc;
}
</style>>
