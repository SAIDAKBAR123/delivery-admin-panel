import request from '@/utils/axios'

const req = {
  postCourier: (data) => request({ method: 'post', url: '/courier/create', data }),
  putCourier: (data) => request({ method: 'put', url: '/courier/update', data }),
  getCategories: (data) => request({ method: 'get', url: '/courier/list', data }),
  getCourier: (id, data) => request({ method: 'get', url: `/courier/get/${id}`, data }),
  deleteCourier: (data) => request({ method: 'delete', url: '/courier/delete', data })
}
export default req
