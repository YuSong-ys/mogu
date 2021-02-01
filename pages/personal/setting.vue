<template>
  <div class="container">
    <van-nav-bar
      title="设置"
    >
      <template #left>
        <van-icon name="arrow-left" color="#333" size="20" @click="backPersonal" />
        <van-icon name="wap-home-o" color="#333" size="20" style="margin-left:10px;" @click="$router.push('/')" />
      </template>
    </van-nav-bar>
    <div class="topBar">
      <div class="userImg">
        <van-image
          round
          style="margin:10px 10px 0 5px"
          width="4rem"
          height="4rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="userInfo">
        <span class="userName">禹敢敢</span>
        <span class="userTel">155****8892</span>
      </div>
    </div>
    <div class="address">
      <van-cell title="地址管理" is-link to="/personal/address" />
    </div>
    <div class="others">
      <van-cell-group>
        <van-cell title="平台政策" is-link />
        <van-cell title="关于我们" is-link />
        <van-cell title="联系我们" is-link />
      </van-cell-group>
    </div>
    <div class="loginOut" @click="logout">
      退出登录
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backPersonal () {
      this.$router.push('/personal')
    },
    logout () {
      this.$toast('退出登录')
    }
  },
  head () {
    return {
      title: '设置'
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    padding: 5px;
    height: 100vh;
    background: #f7f8fa;
    .topBar {
        display: flex;
        justify-content: flex-start;
        background: #fff;
        margin-top: 10px;
        .userInfo {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            .userName,.userTel {
                display: inline-block;
                height: 1em;
                line-height: 1em;
                vertical-align: top;
                margin-top: 10px;
            }
            .userName {
                margin-top: 20px;
            }
        }
    }
    .address {
        margin: 10px 0;
    }
    .loginOut {
        height: 50px;
        width: 100%;
        line-height: 50px;
        margin-top: 10px;
        background: #fff;
        text-align: center;
        color: #f00;
    }
}
</style>
