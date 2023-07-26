import { LocalStorage } from 'quasar'
import { Constants } from 'src/boot/Constants'

export const setToken = (state, token) => {
  state.token = token
  state.isAuthenticated = true
  LocalStorage.set('ua_a_pt', JSON.stringify(token))
}

export const removeToken = state => {
  state.token = ''
  state.isAuthenticated = false
  LocalStorage.remove('ua_a_pt')
}

export const setMe = (state, me) => {
  state.me = me
  LocalStorage.set('ac_c_i', me)
}

export const setCustomer = (state, customer) => {
  state.customer = customer
}

export const setType = (state, type) => {
  state.isStaff = type == 'STAFF_OF_CUSTOMER' ? true : false
  state.isCustomer = type == 'STAFF_OF_CUSTOMER' ? false : true

  let token = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )

  if (type == 'STAFF_OF_CUSTOMER') {
    LocalStorage.set('a_st_t', token)
  } else {
    LocalStorage.remove('a_st_t')
  }
}

export const setId = (state, id) => {
  state.id = id
  LocalStorage.set('account_id', id)
}
