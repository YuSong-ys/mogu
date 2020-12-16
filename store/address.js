export const state = () => ({
  // 当前选中地址的id
  chosenAddressId: '1',
  addressList: [
    {
      id: '1',
      address: '四川省成都市双流区中和街道节能大厦A座3501',
      addressDetail: '节能大厦A座3501',
      areaCode: '510116',
      city: '成都市',
      country: '',
      county: '双流区',
      isDefault: true,
      name: '禹敢敢',
      postalCode: '638600',
      province: '四川省',
      tel: '19999999999'
    },
    {
      id: '2',
      address: '四川省成都市双流区中和街道节能大厦A座3501',
      addressDetail: '节能大厦A座3501',
      areaCode: '510116',
      city: '成都市',
      country: '',
      county: '双流区',
      isDefault: false,
      name: '禹较瘦',
      postalCode: '638600',
      province: '四川省',
      tel: '15583998892'
    }
  ]
})

export const mutations = {
  // 添加地址
  addAddress (state, payload) {
    payload.id = state.addressList.length + 1
    payload.address = payload.province + payload.city + payload.county + payload.addressDetail
    if (payload.isDefault) {
      for (let i = 0; i < state.addressList.length; i++) {
        state.addressList[i].isDefault = false
      }
      state.addressList.unshift(payload)
      // state.chosenAddressId = payload.id
    } else {
      state.addressList.push(payload)
    }
  },

  // 修改地址
  editAddreee (state, payload) {
    const index = state.addressList.findIndex(item => item.id === payload.id)
    payload.address = payload.province + payload.city + payload.county + payload.addressDetail
    if (payload.isDefault) {
      for (let i = 0; i < state.addressList.length; i++) {
        state.addressList[i].isDefault = false
      }
      state.addressList.splice(index, 1)
      state.addressList.unshift(payload)
    } else {
      state.addressList.splice(index, 1, payload)
    }
  },

  // 修改默认地址
  changeDefault (state, payload) {
    const index = state.addressList.findIndex(item => item.id === payload.id)
    for (let i = 0; i < state.addressList.length; i++) {
      state.addressList[i].isDefault = false
    }
    state.addressList.splice(index, 1)
    payload.isDefault = true
    state.addressList.unshift(payload)
  },

  // 删除地址
  deleteAddress (state, payload) {
    state.addressList = state.addressList.filter(item => item.id !== payload.id)
  },

  // 修改选中地址
  chooseAddress (state, index) {
    const str = index + 1
    state.chosenAddressId = `${str}`
    // console.log(index)
  }
}

export const getters = {
  addressList: state => state.addressList,
  chosenAddressId: state => state.chosenAddressId
}
