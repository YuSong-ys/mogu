export const state = () => ({
  proList: []
})

export const mutations = {
  // 添加商品
  addProduct (state, obj) {
    if (!state.proList.length) {
      state.proList.push([obj])
      return
    }
    let flag = false
    let sameProduct = []
    for (let i = 0; i < state.proList.length; i++) {
      flag = state.proList[i].find(item => item.name === obj.name)
      if (flag) {
        sameProduct = state.proList[i]
      }
    }
    if (flag) {
      sameProduct.push(obj)
    } else {
      state.proList.push([obj])
    }
  },
  // 增加商品数量
  addProductNum (state, payload) {
    let sameProduct = []
    for (let i = 0; i < state.proList.length; i++) {
      sameProduct = state.proList[i].find(item => item.id === payload.id)
    }
    sameProduct.num++
  },
  // 减少商品数量
  deProductNum (state, payload) {
    let sameProduct = []
    for (let i = 0; i < state.proList.length; i++) {
      sameProduct = state.proList[i].find(item => item.id === payload.id)
    }
    sameProduct.num--
  },
  // 删除商品
  deleteProduct (state, payload) {
    let flag = false
    let sameProduct = []
    let index = 0
    for (let i = 0; i < state.proList.length; i++) {
      flag = state.proList[i].find(item => item.id === payload.id)
      if (flag) {
        sameProduct = state.proList[i]
        index = sameProduct.findIndex(item => item.id === payload.id)
      }
    }
    sameProduct.splice(index, 1)
  },
  // 删除选中商品
  deleteChooses (state) {
    state.proList = state.proList.filter(item => !item.isChecked)
  },
  // 删除所有商品
  deleteAll (state) {
    state.proList = []
  },
  /**
   * 更新商品中Checked的值
   */
  updateChecked (state, payload) {
    let aimProduct = false
    let checkAll = false
    let sameProduct = []
    let index = 0
    for (let i = 0; i < state.proList.length; i++) {
      aimProduct = state.proList[i].find(item => item.id === payload.id)
      if (aimProduct) {
        sameProduct = state.proList[i]
        index = sameProduct.findIndex(item => item.id === payload.id)
      }
    }
    sameProduct[index].isChecked = !payload.isChecked
    for (const v of sameProduct) {
      if (!v.isChecked) {
        checkAll = false
        break
      } else {
        checkAll = true
      }
    }
    sameProduct[0].isShopChecked = checkAll
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
  },
  /**
   * 更新全部商品中Checked的值
   */
  updateAllChecked (state, payload) {
    for (let i = 0; i < state.proList.length; i++) {
      state.proList[i].map((item) => {
        item.isChecked = payload
        item.isShopChecked = payload
      })
    }
  }
}
export const getters = {
  proList: state => state.proList
}
