import { request } from './index'
export function getCategory () {
  return request({
    url: '/category'
  }).catch(err => err)
}

export function getSubcategory (maitKey) {
  return request({
    url: `/subcategory?maitKey=${maitKey}`
  }).catch(err => err)
}

export function getCategoryDetail (miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  }).catch(err => err)
}
