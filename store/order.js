export const state = () => ({
  orderList: [
    {
      title: '全部订单',
      list: [
        {
          image: 'http://s3.mogucdn.com/mlcdn/c45406/170915_0a93207ci28kelh617k4hh62l65lb_640x960.jpg',
          title: '2018春秋季新款字母短款套头长袖t恤卫衣女显瘦破洞乞丐毛边直筒牛仔裤女长裤时尚套装两件套',
          desc: '颜色：绿色 尺码：S',
          price: '84.29',
          num: 1
        },
        {
          image: 'http://s11.mogucdn.com/mlcdn/c45406/180828_1453j02208age06c38i43gk7bkfgd_640x854.jpg',
          title: '2018秋季新款三件套两件套韩版针织衫开衫毛衣外套宽松小清新格子衬衫显瘦牛仔裤子女时尚套装',
          desc: '颜色：绿色 尺码：S',
          price: '59.00',
          num: 2
        },
        {
          image: 'http://s11.mogucdn.com/mlcdn/c45406/181012_62jd904ghjc0hihh334c3f9fe6jhd_640x854.jpg',
          title: '冬季套装女新款韩版复古宽松中长款长袖加厚毛呢外套百搭打底针织衫毛衣显瘦黑色打底裤时尚三件套',
          desc: '颜色：咖啡色 尺码：M',
          price: '69.00',
          num: 1
        },
        {
          image: 'http://s3.mogucdn.com/mlcdn/c45406/181008_4dc1fj3a5gie3cj60001h35icj2jl_640x854.jpg',
          title: '秋季女套装新款宽松显瘦百搭气质短款长袖牛仔外套女韩版休闲背心裙子针织连衣裙女时尚套装两件套',
          desc: '颜色：黑色 尺码：XS',
          price: '47.60',
          num: 2
        },
        {
          image: 'http://s11.mogucdn.com/mlcdn/c45406/180819_19i9l0il453dg3cc4494ddj6c1lab_640x854.jpg',
          title: '秋季新款韩版宽松文艺范长袖高领针织衫女系带开叉毛衣女装百搭九分休闲裤子阔腿裤两件套时尚套装',
          desc: '颜色：白色 尺码：S',
          price: '98.58',
          num: 2
        }
      ]
    },
    {
      title: '待付款',
      list: []
    },
    {
      title: '待发货',
      list: [
        {
          image: 'http://s11.mogucdn.com/mlcdn/c45406/181012_62jd904ghjc0hihh334c3f9fe6jhd_640x854.jpg',
          title: '冬季套装女新款韩版复古宽松中长款长袖加厚毛呢外套百搭打底针织衫毛衣显瘦黑色打底裤时尚三件套',
          desc: '颜色：咖啡色 尺码：M',
          price: '69.00',
          num: 1
        }
      ]
    },
    {
      title: '待收货',
      list: [
        {
          image: 'http://s3.mogucdn.com/mlcdn/c45406/181008_4dc1fj3a5gie3cj60001h35icj2jl_640x854.jpg',
          title: '秋季女套装新款宽松显瘦百搭气质短款长袖牛仔外套女韩版休闲背心裙子针织连衣裙女时尚套装两件套',
          desc: '颜色：黑色 尺码：XS',
          price: '47.60',
          num: 2
        }
      ]
    },
    {
      title: '待评价',
      list: [
        {
          image: 'http://s11.mogucdn.com/mlcdn/c45406/180819_19i9l0il453dg3cc4494ddj6c1lab_640x854.jpg',
          title: '秋季新款韩版宽松文艺范长袖高领针织衫女系带开叉毛衣女装百搭九分休闲裤子阔腿裤两件套时尚套装',
          desc: '颜色：白色 尺码：S',
          price: '98.58',
          num: 2
        }
      ]
    }
  ]
})

export const mutations = {

}

export const getters = {
  orderList: state => state.orderList
}
