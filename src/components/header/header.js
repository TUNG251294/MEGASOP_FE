import { axiosInstance } from 'src/boot/axios'
import { LocalStorage } from 'quasar'
import Breadcrumb from 'components/breadcrumb/index'
import Notifications from 'components/notifications/Notifications'

export default {
  name: 'fixed header',
  components: {
    Breadcrumb,
    Notifications
  },
  props: [],
  data () {
    return {
      languages: [],
      langId: 'EN',
      id: null,
      fullname: '',
      location: '',
      avatar: '',
    }
  },
  computed: {
    locationI18n: function () {
      let location = LocalStorage.getItem('a_st_t')
      return location != undefined
        ? this.$t('header.employee')
        : this.$t('header.manager')
    }
  },
  mounted () {
    this.getLanguages()
    this.getNameAndLocation()
    this.getPersonalLanguage(this.id)
  },
  methods: {
    getNameAndLocation: function () {
      var self = this
      let location = LocalStorage.getItem('a_st_t')
      // self.location =
      //   location != undefined
      //     ? this.$t('header.employee')
      //     : this.$t('header.manager')
      let me = LocalStorage.getItem('ac_c_i')
      let accountId = LocalStorage.getItem('account_id')
      self.id = accountId || null
      self.fullname = me != undefined ? me.fullname : me?.shortname
      self.avatar = location != undefined ? me.avatar : me?.picture
    },
    getPersonalLanguage: function (id) {
      var self = this
      axiosInstance.get(`/accounts/${id}/language`).then(response => {
        self.langId = response?.data?.data?.lang || 'EN'
        this.$i18n.locale = self.langId === 'VN' ? 'vi' : 'en'
        document.title = `${this.$t('head.brand')} | ${this.$t('head.title')}`
      })
    },
    getLanguages: function () {
      var self = this
      axiosInstance.get('/langs').then(response => {
        self.languages = response?.data?.data?.langs || []
      })
    },
    changeLanguage: function (code) {
      let self = this
      if (code !== self?.langId) {
        self.langId = code
        this.$i18n.locale = self?.langId === 'VN' ? 'vi' : 'en'
        document.title = `${this.$t('head.brand')} | ${this.$t('head.title')}`
        axiosInstance.put(`/accounts/${self?.id}/language`, {
          lang: self?.langId
        })
      }
    },
    loadErrorImage: function () {
      var self = this
      self.avatar = 'icons/favicon-96x96.png'
    },
    goToInfomation: function () {
      this.$router.push('/account-info')
    },
    logout: function () {
      var self = this
      axiosInstance.get('/logout').then(() => {
        LocalStorage.clear()
        this.$store.dispatch('warehouseImportTicketItems/resetWarehouse')
        self.$router.push('/')
      })
    },
  }
}


