export const state = () => ({
  proList: []
})

export const mutations = {
  // 添加商品
  addProduct (state, obj) {
    state.proList.push(obj)
  },
  // 增加商品数量
  addProductNum (state, payload) {
    const oldProduct = state.proList.find(item => item.id === payload.id)
    oldProduct.num++
  },
  // 减少商品数量
  deProductNum (state, payload) {
    const oldProduct = state.proList.find(item => item.id === payload.id)
    oldProduct.num--
  },
  // 删除商品
  deleteProduct (state, payload) {
    const index = state.proList.findIndex(item => item.id === payload.id)
    state.proList.splice(index, 1)
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
    // 1、查找到当前要修改的商品
    const oldProduct = state.proList.find(item => item.id === payload.id)
    // 2、改变checked值
    oldProduct.isChecked = !payload.isChecked
  },
  /**
   * 更新全部商品中Checked的值
   */
  updateAllChecked (state, payload) {
    for (let i = 0; i < state.proList.length; i++) {
      state.proList[i].isChecked = payload
    }
  }
}
export const getters = {
  proList: state => state.proList
}
