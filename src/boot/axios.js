import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { LocalStorage, Notify } from 'quasar'

const axiosInstance = axios.create({ baseURL: process.env.API })

axiosInstance.interceptors.request.use(
  function (config) {
    const token = LocalStorage.getItem('ua_a_pt')

    if (token) {
      config.headers.Authorization = `Bearer ${token.replace(/['"]+/g, '')}`
    }

    return config
  },

  function (error) {
    // LoadingBar.stop();
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    // LoadingBar.stop();
    return response
  },

  function (error) {
    if (error.response) {
      if (error.response.status == 403) {
        LocalStorage.clear()
        window.location = '/'
      } else if (error.response.data && error.response.data.message) {
        Notify.create({
          message: error.response.data.message,
          type: 'negative'
        })
      }
    } else if (error.message.indexOf('timeout') > -1) {
      Notify.create({
        message: 'Network timeout',
        type: 'negative'
      })
    } else if (error.message) {
      Notify.create({
        message: error.message,
        type: 'negative'
      })
    } else {
      Notify.create({
        message: 'http request error',
        type: 'negative'
      })
    }

    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = axiosInstance
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { axios, axiosInstance }
