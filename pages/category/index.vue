<template>
  <div>
    <van-nav-bar
      title="商品分类"
    />
    <div class="category">
      <div class="categoryLeft">
        <div
          v-for="(item,index) in categoryList"
          :key="index"
          class="categoryItem"
          :class="{'itemActive':index === activeKey}"
          @click="changeCategory(item,index)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>
      <div class="categoryRight">
        <div v-for="(item,index) in subcategory" :key="index" class="subItem">
          <a :href="item.link">
            <van-image :src="item.image" width="60" height="60">
              <span>{{ item.title }}</span>
            </van-image>
          </a>
        </div>
      </div>
    </div>
    <main-tab-bar />
  </div>
</template>
<script>
import { getCategory, getSubcategory } from '~/api/category'
import MainTabBar from '~/components/MainTabBar/index.vue'
export default {
  components: {
    MainTabBar
  },
  data () {
    return {
      activeKey: 0,
      categoryList: [],
      subcategory: [],
      maitKey: ''
    }
  },
  created () {
    getCategory().then((res) => {
      this.categoryList = res.data.category.list
      this.maitKey = res.data.category.list[0].maitKey
      this.miniWallkey = res.data.category.list[0].miniWallkey
      getSubcategory(this.maitKey).then((res) => {
        this.subcategory = res.data.list
      })
    })
  },
  methods: {
    getSubcategorys () {
      getSubcategory(this.maitKey).then((res) => {
        this.subcategory = res.data.list
      })
    },
    changeCategory (item, index) {
      this.activeKey = index
      this.maitKey = item.maitKey
      this.miniWallkey = item.miniWallkey
      this.getSubcategorys()
    }
  },
  head () {
    return {
      title: '商品分类'
    }
  }
}
</script>
<style lang="scss" scoped>
  .category {
    display: flex;
    .categoryLeft {
      width: 20%;
      height: inherit;
      background: #f7f8fa;
      .categoryItem {
        height: 50px;
        width: 100%;
        line-height: 50px;
        text-align: center;
        background: #f7f8fa;
        border-left: 2px solid #f7f8fa;
      }
      .itemActive {
        background: #fff;
        border-left: 2px solid #f00;
      }
    }
    .categoryRight {
      display: flex;
      justify-content: space-evenly;
      align-content: flex-start;
      flex-wrap: wrap;;
      width: 80%;
      .subItem {
        height: 80px;
        width: 80px;
        text-align: center;
        font-size: 14px;
        margin: 10px 0;
      }
    }
  }
</style>
