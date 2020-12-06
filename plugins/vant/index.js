import Vue from 'vue'
import vant from 'vant'
// import VueLazyload from 'vue-lazyload'

export default () => {
  Vue.use(vant)
  // Vue.use(VueLazyload, {
  //   preLoad: 1.3,
  //   error: require('~/assets/images/img_error.png'),
  //   // loading: require('~/assets/images/gif_loading.gif'),
  //   attempt: 1
  // })
}
