import request from '@/utils/axios'

const req = {
  postMerchantBranch: (data) => request({ method: 'post', url: '/merchant-branch/create', data }),
  putMerchantBranch: (data) => request({ method: 'put', url: '/merchant-branch/update', data }),
  getMerchantBranches: (data) => request({ method: 'get', url: '/merchant-branch/list', data }),
  getMerchantBranch: (id, data) => request({ method: 'get', url: `/merchant-branch/get/${id}`, data }),
  deleteMerchantBranch: (data) => request({ method: 'delete', url: '/merchant-branch/delete', data })
}
export default req
