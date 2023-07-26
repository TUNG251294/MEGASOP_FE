import { axiosInstance } from 'src/boot/axios'

export const doLogin = async ({ commit }, payload) => {
  await axiosInstance.post('/login', payload).then(response => {
    let token = response.data.data.token
    let staff = response.data.data.staff
    let customer = response.data.data.customer
    let accountType = response.data.data.accountType
    let accountId = response.data.data.accountId
    commit('setToken', token)
    commit('setMe', accountType == 'CUSTOMER' ? customer : staff)
    commit('setCustomer', customer)
    commit('setType', accountType)
    commit('setId', accountId)
  })
}

export const doRegister = async ({ commit }, payload) => {
  await axiosInstance
    .post('')
    .then(response => {})
    .catch(error => {})
}

export const signOut = ({ commit }) => {
  commit('removeToken')
}
