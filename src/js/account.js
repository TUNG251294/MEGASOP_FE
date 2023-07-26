import { defineComponent } from 'vue'
import { ref } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify, SessionStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'PageIndex',
  data: function () {
    return {
      modal: false,
      edit: 0,
      isActive: true,
      isDisable: false,
      isAdmin: true,
      form: {
        data: {},
        dataUpdate: {
          personalName: ref(''),
          nation: 'Việt Nam',
          mobile: ref(''),
          personalEmail: ref(''),
          companyName: ref(''),
          website: ref(''),
          industry: ref(''),
          industryId: 0,
          emailLogin: ref(''),
          orderNum: parseInt(),
          salemenNum: parseInt(),
          distributorNum: parseInt(),
          retailerNum: parseInt(),
          retailerLink: ref(''),
          consumerLink: ref(''),
          lang: ref(''),
          langId: ref('EN')
        },
      },
      languages: [],
      industries: [],
      //touched-company-information
      isTouchedPersonalName: false,
      isTouchedMobile: false,
      isTouchedPersonalEmail: false,
      isTouchedCompanyName: false,
      isTouchedWebsite: false,
      isTouchedIndustry: false,
      isTouchedEmailLogin: false,

      //check-error-info
      personalNameError: ref(''),
      mobileError: ref(''),
      personalEmailError: ref(''),
      companyNameInfError: ref(''),
      websiteError: ref(''),
      industryError: ref(''),
      emailLoginError: ref(''),
      orderNumError: ref(''),
      salemanError: ref(''),
      distributorError: ref(''),
      retailerError: ref('')
    }
  },
  computed: {
    careerNameI18n: function () {
      return this.$t(`industries[${this.form.dataUpdate.industryId}]`)
    },
    industriesI18n: function () {
      return this.industries.map(e => {
        return {
          id: e.id,
          name: this.$t(`industries[${e.id}]`)
        }
      })
    },
    industryI18n: function () {
      return this.$t(`industries[${this.form.dataUpdate.industryId}]`)
    },
    isValidPersonalName: function () {
      if (this.form.dataUpdate?.personalName?.trim().length == 0) {
        return false
      }
      let reg =
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪếễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_ ]{3,255}$/

      let result = reg.test(this.form.dataUpdate.personalName)
      return result
    },

    isValidMobile: function () {
      if (this.form.dataUpdate?.mobile?.trim().length == 0) {
        return false
      }
      var reg = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return reg.test(this.form.dataUpdate.mobile)
    },

    isValidPersonalEmail: function () {
      if (this.form.dataUpdate.personalEmail.trim().length == 0) {
        return false
      }
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.form.dataUpdate.personalEmail)
    },

    isValidCompanyName: function () {
      if (this.form.dataUpdate.companyName.trim().length == 0) {
        return false
      }
      // let reg = /^[^!`'#<>=@{}~\$\*\?\[\]\^\|]{5,}$/;
      let reg = /^[^]{5,}$/
      return reg.test(this.form.dataUpdate.companyName)
    },

    isValidWebsite: function () {
      // // return this.form.dataUpdate.website.trim().length > 0;
      // if (this.form.dataUpdate.website.trim().length == 0) {
      //   return false;
      // }
      let reg =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/g

      // let reg =
      //   /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
      return reg.test(this.form.dataUpdate.website)
    },

    isValidIndustry: function () {
      // return this.form.dataUpdate.industry.trim().length > 0;
      //
      return /^([1-9][0-9]*)$/.test(this.form.dataUpdate.industry)
    },

    isValidLoginEmail: function () {
      if (this.form.dataUpdate.emailLogin.trim().length == 0) {
        return false
      }
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.form.dataUpdate.emailLogin)
    },

    isValidOrders: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.dataUpdate.orderNum)
    },

    isValidSaleMan: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.dataUpdate.salemenNum)
    },

    isValidDistributors: function () {
      return /^[0 -9][0-9]{0,5}$/.test(this.form.dataUpdate.distributorNum)
    },

    isValidRetailers: function () {
      return /^[0-9][0-9]{0,5}$/.test(this.form.dataUpdate.retailerNum)
    },

    isValidToSend() {
      var self = this
      if (self.edit === 1) {
        return (
          this.isValidPersonalName &&
          this.isValidMobile &&
          this.isValidPersonalEmail
        )
      } else if (self.edit === 2) {
        return (
          this.isValidCompanyName &&
          // this.isValidWebsite &&
          // this.isValidIndustry &&
          this.isValidLoginEmail
        )
      }
      {
        return (
          this.isValidOrders &&
          this.isValidSaleMan &&
          this.isValidDistributors &&
          this.isValidRetailers
        )
      }
    },
    isValidatePersonalName() {
      return this.form.dataUpdate.personalName.length > 3 && this.form.dataUpdate.personalName.length <= 50 || this.$t('account.must_be_beetween_4_50_characters')
    }
  },
  mounted: async function () {
    this.isAdmin = LocalStorage.getItem('a_st_t') == null
    await this.getCompanyInformation()
  },
  created: function () {
    this.getIndustries()
    this.getLanguages()
  },
  methods: {
    requiredValue(val) {
      return !!val || this.$t('general.required_value')
    },

    //info
    validatePersonalNameError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedPersonalName = true
      }
      if (this.form.dataUpdate.personalName.trim().length < 3) {
        self.personalNameError = self.$t(
          'account.please_enter_at_least_3_characters'
        )
        return
      } else if (this.form.dataUpdate.personalName.trim().length > 50) {
        self.personalNameError = self.$t(
          'account.please_enter_no_more_than_50_characters'
        )
        return
      }
      if (!self.isValidPersonalName) {
        self.personalNameError = self.$t(
          'account.please_do_not_use_special_characters'
        )
        return
      }
      self.personalNameError = ''
    },

    validateMobileError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedMobile = true
      }

      // if (self.form.dataUpdate.mobile.trim().length == 0) {
      //   self.mobileError = "Số điện thoại không được để trống !";
      //   return;
      // }

      if (!self.isValidMobile) {
        self.mobileError = self.$t('account.please_enter_a_valid_phone_number')
        return
      }
      self.mobileError = ''
    },

    validatePersonalEmailError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedPersonalEmail = true
      }

      // if (self.form.dataUpdate.personalEmail.trim().length == 0) {
      //   self.personalEmailError = "Email không được để trống !";
      //   return;
      // }

      if (!self.isValidPersonalEmail) {
        self.personalEmailError = self.$t('account.please_enter_a_valid_email')
        return
      }
      self.personalEmailError = ''
    },

    validateCompanyNameError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedCompanyName = true
      }
      if (this.form.dataUpdate.companyName.trim().length < 5) {
        self.companyNameInfError = self.$t(
          'account.please_enter_at_least_5_characters'
        )
        return
      }

      // if (!self.isValidCompanyName) {
      //   self.companyNameInfError = "Tên công ty không đúng định dạng!";
      //   return;
      // }
      self.companyNameInfError = ''
    },

    validateCompanyLink: function () {
      var self = this

      if (this.form.dataUpdate.website.trim().length == 0) {
        self.websiteError = ''
        return
      }

      if (!self.isValidWebsite) {
        self.websiteError = self.$t(
          'account.please_enter_a_valid_website_address'
        )
        return
      }
      self.websiteError = ''
    },

    validateIndustryError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedIndustry = true
      }
      if (!self.isValidIndustry) {
        self.industryError = self.$t('account.please_select_a_career')
        return
      }
      self.industryError = ''
    },

    validateEmailLoginError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedEmailLogin = true
      }
      // if (self.form.dataUpdate.emailLogin.trim().length == 0) {
      //   self.emailLoginError = "Email không được để trống !";
      //   return;
      // }

      if (!self.isValidLoginEmail) {
        self.emailLoginError = self.$t('account.please_enter_a_valid_email')
        return
      }
      self.emailLoginError = ''
    },

    validateOrderNumError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedOrderNum = true
      }
      if (!self.isValidOrders) {
        self.orderNumError = self.$t(
          'account.please_enter_a_number_greater_than_1_and_less_than_9991000'
        )
        return
      }
      self.orderNumError = ''
    },

    validateSalemenNumError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedSalemanNum = true
      }
      if (!self.isValidSaleMan) {
        self.salemanError = self.$t(
          'account.please_enter_a_number_greater_than_1_and_less_than_9991000'
        )
        return
      }
      self.salemanError = ''
    },

    validateDistributorNumError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedDistributor = true
      }
      if (!self.isValidDistributors) {
        self.distributorError = self.$t(
          'account.please_enter_a_number_greater_than_1_and_less_than_9991000'
        )
        return
      }
      self.distributorError = ''
    },

    validateRetailerNumError: function (event) {
      var self = this
      if (event != null) {
        self.isTouchedRetailer = true
      }
      if (!self.isValidRetailers) {
        self.retailerError = self.$t(
          'account.please_enter_a_number_greater_than_1_and_less_than_9991000'
        )
        return
      }
      self.retailerError = ''
    },

    // detail
    onDetail: function (id) {
      var self = this
      self.edit = id
      self.modal = true
    },

    handleSubmit: function () {
      var self = this

      if (self.edit === 1) {
        let inputDataRepresent = {}
        inputDataRepresent['representative'] = self.form.dataUpdate.personalName
        inputDataRepresent['tel'] = self.form.dataUpdate.mobile
        inputDataRepresent['email'] = self.form.dataUpdate.personalEmail

        axiosInstance
          .put('/customer/representative', inputDataRepresent)
          .then(() => {
            Notify.create({
              message: self.$t(
                'account.successfully_updated_representative_information'
              ),
              type: 'positive',
              position: 'top-right'
            })
            self.modal = !self.modal
            self.getCompanyInformation()
          })
          .catch(() => {
            Notify.create({
              position: 'top-right',
              message: self.$t(
                'account.unable_to_save_representative_information'
              ),
              type: 'negative'
            })
          })
      } else if (self.edit === 2) {
        let inputInfoCompany = {}
        inputInfoCompany['lang'] = self.form.dataUpdate.langId
        inputInfoCompany['website'] = self.form.dataUpdate.website
        inputInfoCompany['email'] = self.form.dataUpdate.emailLogin
        inputInfoCompany['industry'] = self.form.dataUpdate.industryId
        inputInfoCompany['fullname'] = self.form.dataUpdate.companyName
        axiosInstance
          .put('/customer/companyInfo', inputInfoCompany)
          .then(() => {
            Notify.create({
              message: self.$t(
                'account.successfully_updated_company_information'
              ),
              type: 'positive',
              position: 'top-right'
            })
            self.modal = !self.modal
            self.getCompanyInformation()
          })
          .catch(() => {
            Notify.create({
              position: 'top-right',
              message: self.$t('account.unable_to_save_company_information'),
              type: 'negative'
            })
          })
      } else {
        let organization = {}
        organization['ordered_number'] = parseInt(self.form.dataUpdate.orderNum)
        organization['salesman_number'] = parseInt(self.form.dataUpdate.salemenNum)
        organization['distributor_number'] = parseInt(
          self.form.dataUpdate.distributorNum
        )
        organization['retailer_number'] = parseInt(self.form.dataUpdate.retailerNum)

        let inputData = {}
        inputData['organization'] = organization

        axiosInstance
          .put('/customer/organization', inputData)
          .then(() => {
            Notify.create({
              message: self.$t(
                'account.successfully_updated_organization_size_'
              ),
              type: 'positive',
              position: 'top-right'
            })
            self.modal = !self.modal
            self.getCompanyInformation()
          })
          .catch(() => {
            Notify.create({
              position: 'top-right',
              message: self.$t('account.unable_to_save_organization_size'),
              type: 'negative'
            })
          })
      }
    },

    getCompanyInformation: function () {
      var self = this

      axiosInstance.get('/me').then(response => {
        self.form.data = response.data.data.customer
        self.form.dataUpdate.lang = response.data.data.customer.lang || ''
        self.form.dataUpdate.langId = response.data.data.customer.lang || 'EN'
        self.form.dataUpdate.personalName = response.data.data.customer.representative
        self.form.dataUpdate.mobile = response.data.data.customer.representative_tel
        self.form.dataUpdate.personalEmail =
          response.data.data.customer.representative_email
        self.form.dataUpdate.companyName = response.data.data.customer.fullname
        self.form.dataUpdate.website = response.data.data.customer.website
        self.form.dataUpdate.industryId = response.data.data.customer.industry_id
        self.form.dataUpdate.emailLogin = response.data.data.customer.email
        self.form.dataUpdate.retailerLink = response.data.data.customer.retailer_url
        self.form.dataUpdate.consumerLink = response.data.data.customer.consumer_url

        let organization = response.data.data.customer.organization
        self.form.dataUpdate.orderNum = organization['ordered_number']
        self.form.dataUpdate.salemenNum = organization['salesman_number']
        self.form.dataUpdate.distributorNum = organization['distributor_number']
        self.form.dataUpdate.retailerNum = organization['retailer_number']

        self.getIndustry(self.form.data.industry_id)
        self.getLanguage(self?.form?.data?.lang)
      })
    },

    closeDialog: function () {
      var self = this
      self.modal = !self.modal
      self.getCompanyInformation(); //--> error when open dialog again

      self.personalNameError = '',
      self.mobileError = '',
      self.personalEmailError = '',
      self.companyNameInfError = '',
      self.websiteError = '',
      self.industryError = '',
      self.emailLoginError = '',
      self.orderNumError = '',
      self.salemanError = '',
      self.distributorError = '',
      self.retailerError = ''
      // window.location.reload()
    },

    getIndustry: function (id) {
      var self = this
      let industry_name = self.industries.filter(item => {
        return item.id === id
      })
      return (self.form.dataUpdate.industry = industry_name[0]?.name)
    },

    getIndustries: function (id) {
      var self = this
      axiosInstance.get('/industries').then(response => {
        self.industries = response.data.data.industries
      })
    },

    getLanguage: function (code) {
      var self = this
      let lang = self?.languages?.find(language => {
        return language?.code === code
      })
      self.form.dataUpdate.lang = self.form.data.lang = lang?.name
    },

    getLanguages: function () {
      var self = this
      axiosInstance.get('/langs').then(response => {
        self.languages = response.data.data.langs
      })
    },
  }
})
