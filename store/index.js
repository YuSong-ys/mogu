export const state = () => ({
  proList: [],
  isCheckedAll: true
})

// 控制全选的方法抽离
const checkedAll = function (state) {
  let checked = false
  for (const v of state.proList) {
    if (!v[0].isShopChecked) {
      checked = false
      break
    } else {
      checked = true
    }
  }
  state.isCheckedAll = checked
}

export const mutations = {
  // 添加商品
  addProduct (state, obj) {
    // 没有商品，直接添加新数组
    if (!state.proList.length) {
      state.proList.push([obj])
      checkedAll(state)
      return
    }
    let hasAim = false
    let sameProduct = []
    // 有商品就遍历
    for (let i = 0; i < state.proList.length; i++) {
      hasAim = state.proList[i].find(item => item.shopId === obj.shopId)
      if (hasAim) {
        sameProduct = state.proList[i]
        // 找到了就跳出循环，效率更高
        break
      }
    }
    if (hasAim) {
      sameProduct.push(obj)
    } else {
      state.proList.push([obj])
    }
    // 控制全选
    checkedAll(state)
  },

  // 增加商品数量
  addProductNum (state, payload) {
    let sameProduct = []
    for (let i = 0; i < state.proList.length; i++) {
      sameProduct = state.proList[i].find(item => item.id === payload.id)
      if (sameProduct) {
        break
      }
    }
    if ((sameProduct.num + payload.num) <= 5) {
      sameProduct.num += payload.num
    }
  },

  // 减少商品数量
  deProductNum (state, payload) {
    let sameProduct = []
    for (let i = 0; i < state.proList.length; i++) {
      sameProduct = state.proList[i].find(item => item.id === payload.id)
      if (sameProduct) {
        break
      }
    }
    sameProduct.num--
  },

  // 删除单个商品
  deleteProduct (state, payload) {
    let hasAim = false
    let checkShopAll = false
    let sameProduct = []
    let index = 0
    for (let i = 0; i < state.proList.length; i++) {
      hasAim = state.proList[i].find(item => item.id === payload.id)
      if (hasAim) {
        sameProduct = state.proList[i]
        index = sameProduct.findIndex(item => item.id === payload.id)
        break
      }
    }
    sameProduct.splice(index, 1)
    // 删除之后需要判断当前店铺商品是否为0，为0需要删除当前数组
    for (let i = 0; i < state.proList.length; i++) {
      if (state.proList[i].length === 0) {
        state.proList.splice(i, 1)
        i -= 1
      }
    }
    // 改变点击的按钮对应的店铺
    for (const v of sameProduct) {
      if (!v.isChecked) {
        checkShopAll = false
        break
      } else {
        checkShopAll = true
      }
    }
    if (sameProduct[0]) {
      sameProduct[0].isShopChecked = checkShopAll
    }
    // 控制全选
    checkedAll(state)
  },

  // 删除选中商品
  deleteChooses (state) {
    for (let i = 0; i < state.proList.length; i++) {
      state.proList[i] = state.proList[i].filter(item => !item.isChecked)
    }
    // 删除之后需要判断当前店铺商品是否为0，为0需要删除当前数组
    for (let i = 0; i < state.proList.length; i++) {
      if (state.proList[i].length === 0) {
        state.proList.splice(i, 1)
        i -= 1
      }
    }
  },

  // 删除所有商品
  deleteAll (state) {
    state.proList = []
    state.isCheckedAll = false
  },

  /**
   * 更新商品中Checked的值
   */
  updateChecked (state, payload) {
    let hasAim = false
    let checkShopAll = false
    let sameProduct = []
    let index = 0
    // 改变点击的
    for (let i = 0; i < state.proList.length; i++) {
      hasAim = state.proList[i].find(item => item.id === payload.id)
      if (hasAim) {
        sameProduct = state.proList[i]
        index = sameProduct.findIndex(item => item.id === payload.id)
      }
    }
    sameProduct[index].isChecked = !payload.isChecked
    // 改变点击的按钮对应的店铺
    for (const v of sameProduct) {
      if (!v.isChecked) {
        checkShopAll = false
        break
      } else {
        checkShopAll = true
      }
    }
    sameProduct[0].isShopChecked = checkShopAll
    // 控制全选
    checkedAll(state)
  },

  /**
   *  单一商店商品全选联动
   */
  updateShopChecked (state, payload) {
    for (const v of state.proList) {
      if (v[0].name === payload.name) {
        v.map((item) => {
          item.isChecked = !payload.isShopChecked
        })
        v[0].isShopChecked = !payload.isShopChecked
      }
    }
    // 控制全选
    checkedAll(state)
  },

  /**
   * 更新全部商品中Checked的值
   */
  updateAllChecked (state) {
    // 改变全选
    state.isCheckedAll = !state.isCheckedAll
    // 统一更改店铺和商品
    for (let i = 0; i < state.proList.length; i++) {
      state.proList[i].map((item) => {
        item.isChecked = state.isCheckedAll
        item.isShopChecked = state.isCheckedAll
      })
    }
  }
}
export const getters = {
  proList: state => state.proList,
  isCheckedAll: state => state.isCheckedAll
}
