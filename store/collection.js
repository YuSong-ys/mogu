export const state = () => ({
  collectionList: []
})

export const mutations = {
  // 添加收藏
  addCollectProduct (state, payload) {
    state.collectionList.push(payload)
  },

  // 取消收藏
  deCollectProduct (state, payload) {
    state.collectionList = state.collectionList.filter(item => item.id !== payload.id)
  }
}

export const getters = {
  collectionList: state => state.collectionList
}
