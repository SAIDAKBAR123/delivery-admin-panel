import API, { execute } from './Api'

export default {
  createCompany: (data) => execute(API().post('companies', data)),
  createCompany2: (id, data) => execute(API().post(`/api/services/${id}/companies`, data))
}
