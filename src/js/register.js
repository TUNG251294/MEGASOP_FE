import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { Notify } from 'quasar'
import images from 'src/assets'

export default defineComponent({
  name: 'Đăng ký',
  data() {
    return {
      images,
      step: 1,
      form: {
        lang: 'en',
        company: {
          companyName: '',
          companyLink: '',
          industry: 0,
          email: '',
          password: '',
          confirmPassword: '',
          noOrders: '',
          noSalesmen: '',
          noDistributors: '',
          noRetailers: ''
        },
        personal: {
          fullname: '',
          country: 'Việt Nam',
          mobile: '',
          email: ''
        }
      },
      accept: false,
      showPassword: false,
      showConfirmPassword: false,
      industries: [],
      errorCompanyLink: '',
      errorCompanyName: '',
      errorConfirmPassword: '',
      errorCompanyEmail: '',
      errorNoDistributors: '',
      errorNoOrders: '',
      errorNoSalesmen: '',
      errorNoRetailers: '',
      errorPassword: '',
      errorPersonalEmail: '',
      errorFullname: '',
      errorMobile: '',
      errorIndustry: ''
    }
  },

  computed: {
    industriesI18n: function () {
      return this.industries.map(e => {
        return {
          ...e,
          name: this.$t(`industries[${e.id}]`)
        }
      })
    },
    isValidCompanyName: function () {
      if (this.form.company.companyName.trim().length == 0) {
        return false
      }

      let reg = /^[^]{5,}$/
      return reg.test(this.form.company.companyName)
    },
    isValidWebsite: function () {
      if (this.form.company.companyLink.trim().length == 0) {
        return true
      }

      let reg =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g
      return reg.test(this.form.company.companyLink)
    },
    isValidComfirmPassword: function () {
      return this.form.company.confirmPassword == this.form.company.password
    },
    isValidPassword: function () {
      if (this.form.company.password.trim().length == 0) {
        return false
      }

      let reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
      return reg.test(this.form.company.password)
    },
    isValidCompanyEmail: function () {
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.form.company.email)
    },
    isValidNoDistributors: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.company.noDistributors)
    },
    isValidNoOrders: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.company.noOrders)
    },
    isValidNoRetailers: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.company.noRetailers)
    },
    isValidNoSalesmen: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.company.noSalesmen)
    },
    isValidPersonalEmail: function () {
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.form.personal.email)
    },
    isValidPersonalFullname: function () {
      if (this.form.personal.fullname.trim().length == 0) {
        return false
      }
      let reg =
        /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_ ]{3,50}$/
      return reg.test(this.form.personal.fullname)
    },
    isValidPersonalMobile: function () {
      if (this.form.personal.mobile.trim().length == 0) {
        return false
      }

      var regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return regex.test(this.form.personal.mobile)
    },

    isValidIndustry: function () {
      // return this.form.company.industry.trim().length > 0;
      return /^([1-9][0-9]*)$/.test(this.form.company.industry)
    },

    isValidToContinue: function () {
      return (
        this.isValidPersonalEmail &&
        this.isValidPersonalFullname &&
        this.isValidPersonalMobile &&
        this.accept
      )
    },

    isValidToSend: function () {
      return (
        this.isValidCompanyName &&
        this.isValidWebsite &&
        this.isValidIndustry &&
        this.isValidCompanyEmail &&
        this.isValidNoDistributors &&
        this.isValidNoOrders &&
        this.isValidNoRetailers &&
        this.isValidNoSalesmen
      )
    }
  },
  mounted: function () {
    this.getIndustry()
    this.form.lang = this?.$route?.query?.lang || 'en'
  },
  methods: {
    goToLogin: function () {
      this.$router.push('/')
    },
    next: function () {
      this.step = 2
    },
    previous: function () {
      this.step = 1
    },
    showPass: function () {
      this.showPassword = !this.showPassword
    },
    showConfirmPass: function () {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    getIndustry: function () {
      var self = this
      axiosInstance.get('/industries').then(response => {
        self.industries = response.data.data.industries
      })
    },
    validateCompanyLink: function () {
      var self = this

      if (this.form.company.companyLink.trim().length == 0) {
        self.errorCompanyLink = ''
        return
      }

      if (!self.isValidWebsite) {
        self.errorCompanyLink = self.$t(
          'register.please_enter_a_valid_website_address'
        )
        return
      }
      self.errorCompanyLink = ''
    },
    validateCompanyName: function () {
      var self = this
      if (self.form.company.companyName.trim().length < 5) {
        self.errorCompanyName = self.$t(
          'register.please_enter_at_least_5_characters'
        )
        return
      }

      self.errorCompanyName = ''
    },
    validateEmail: function (type) {
      var self = this
      if (type == 'c') {
        if (!self.isValidCompanyEmail) {
          self.errorCompanyEmail = self.$t(
            'register.please_enter_a_valid_email'
          )
          return
        }
        self.errorCompanyEmail = ''
      } else {
        if (!self.isValidPersonalEmail) {
          self.errorPersonalEmail = self.$t(
            'register.please_enter_a_valid_email'
          )
          return
        }
        self.errorPersonalEmail = ''
      }
    },
    validateNo: function (type) {
      var self = this
      switch (type) {
        case 'o':
          if (self.form.company.noOrders.trim().length == 0) {
            self.errorNoOrders = ''
            return
          } else if (
            !self.isValidNoOrders &&
            self.form.company.noOrders !== 0
          ) {
            self.errorNoOrders = self.$t(
              'register.please_enter_a_number_greater_than_1_and_less_than_9991000'
            )
            return
          }
          self.errorNoOrders = ''
          break
        case 's':
          if (self.form.company.noSalesmen.trim().length == 0) {
            self.errorNoSalesmen = ''
            return
          } else if (
            !self.isValidNoSalesmen &&
            self.form.company.noSalesmen !== 0
          ) {
            self.errorNoSalesmen = self.$t(
              'register.please_enter_a_number_greater_than_1_and_less_than_9991000'
            )
            return
          }
          self.errorNoSalesmen = ''
          break
        case 'd':
          if (self.form.company.noDistributors.trim().length == 0) {
            self.errorNoDistributors = ''
            return
          } else if (
            !self.isValidNoDistributors &&
            self.form.company.noDistributors !== 0
          ) {
            self.errorNoDistributors = self.$t(
              'register.please_enter_a_number_greater_than_1_and_less_than_9991000'
            )
            return
          }
          self.errorNoDistributors = ''
          break
        default:
          if (self.form.company.noRetailers.trim().length == 0) {
            self.errorNoRetailers = ''
            return
          } else if (
            !self.isValidNoRetailers &&
            self.form.company.noRetailers !== 0
          ) {
            self.errorNoRetailers = self.$t(
              'register.please_enter_a_number_greater_than_1_and_less_than_9991000'
            )
            return
          }
          self.errorNoRetailers = ''
          break
      }
    },
    validateFullname: function () {
      var self = this

      if (this.form.personal.fullname.trim().length < 3) {
        self.errorFullname = self.$t(
          'register.please_enter_at_least_3_characters'
        )
        return
      } else if (this.form.personal.fullname.trim().length > 50) {
        self.errorFullname = self.$t(
          'register.please_enter_no_more_than_50_characters'
        )
        return
      }

      if (!self.isValidPersonalFullname) {
        self.errorFullname = self.$t(
          'register.please_do_not_use_special_characters'
        )
        return
      }
      self.errorFullname = ''
    },
    validateMobile: function () {
      var self = this

      if (!self.isValidPersonalMobile) {
        self.errorMobile = self.$t('register.please_enter_a_valid_phone_number')
        return
      }
      self.errorMobile = ''
    },

    validateIndustry: function () {
      var self = this

      if (!self.isValidIndustry) {
        self.errorIndustry = self.$t('register.please_select_a_career')
        return
      }
      self.errorIndustry = ''
    },

    submit: function () {
      var self = this
      let inputData = {}
      inputData['lang'] = self.form.lang
      inputData['website'] = self.form.company.companyLink
      inputData['fullname'] = self.form.company.companyName
      inputData['email'] = self.form.company.email
      inputData['industry'] = self.form.company.industry

      inputData['representative'] = self.form.personal.fullname
      inputData['representative_mobile'] = self.form.personal.mobile
      inputData['represent_email'] = self.form.personal.email

      inputData['organizational_scale'] = {}
      inputData['organizational_scale']['no_of_distributors'] = parseInt(
        self.form.company.noDistributors
      )
      inputData['organizational_scale']['no_of_orders'] = parseInt(
        self.form.company.noOrders
      )
      inputData['organizational_scale']['no_of_retailers'] = parseInt(
        self.form.company.noRetailers
      )
      inputData['organizational_scale']['no_of_salesmen'] = parseInt(
        self.form.company.noSalesmen
      )
      axiosInstance
        .post('/customers/register', inputData)
        .then(() => {
          self.$router.push('/thank-you')
        })
        .catch(error => {
          let errRes = Object.entries({
            ...error.response.data.errors[0].message
          })
          let messageErr = errRes.reduce((msg, [key, desc]) => {
            return (msg += desc).replace(
              /has been existed/g,
              self.$t('register.registered')
            )
          }, '')
          Notify.create({
            position: 'top-right',
            message: `${messageErr}`,
            type: 'negative'
          })
        })
    }
  }
})
