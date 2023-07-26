import { defineComponent } from 'vue'
import { date, exportFile, LocalStorage, useQuasar, Notify } from 'quasar'
import { axiosInstance } from 'boot/axios'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Danh sách đại lý',
  data() {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),

      rows: [],
      initRetailers: [],
      selected: [],
      searchText: '',
      modal: false,
      showColumns: false,
      visibleColumns: [
        'name',
        'retailerCode',
        'createdDate',
        'mobile',
        'cityId',
        'numberOfOrderSellin',
        'totalCostOrderSellin',
        'numberOfOrderSellout',
        'totalCostOrderSellout',
        'status'
      ],
      cities: [],
      cityId: 0,
      form: {
        fullName: '',
        birthday: date.formatDate(Date.now(), 'DD/MM/YYYY'),
        name: '',
        idCard: '',
        email: '',
        mobile: '',
        address: '',
        cities: [],
        cityId: '',
        districts: [],
        districtId: '',
        wards: [],
        wardId: '',
        avatar: ''
      },
      cityChange: false,
      progress: false,
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'name',
        descending: false
      },
      isSearch: false,
      status: -1,
      summary: {},
      isFilter: false,
      isGet: false,
      is_focusInputSearch:false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'name',
          label: this.$t('retailers.retailer_name_col'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          classes: 'text-primary',
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'retailerCode',
          align: 'left',
          label: this.$t('retailers.retailer_code_col'),
          field: 'retailerCode',
          sortable: true,
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'createdDate',
          align: 'center',
          label: this.$t('retailers.create_date_col'),
          field: 'createdDate',
          sortable: true,
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'mobile',
          label: this.$t('retailers.phone_col'),
          field: 'mobile',
          align: 'left',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'cityId',
          label: this.$t('retailers.city_col'),
          field: 'cityId',
          align: 'left',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'numberOfOrderSellin',
          label: this.$t('retailers.order_sellin_col'),
          field: 'numberOfOrderSellin',
          align: 'right',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'totalCostOrderSellin',
          label: this.$t('retailers.order_value_sellin_col'),
          field: 'totalCostOrderSellin',
          align: 'right',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'numberOfOrderSellout',
          label: this.$t('retailers.order_sellout_col'),
          field: 'numberOfOrderSellout',
          align: 'right',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'totalCostOrderSellout',
          label: this.$t('retailers.order_value_sellout_col'),
          field: 'totalCostOrderSellout',
          align: 'right',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'status',
          label: this.$t('retailers.status_col'),
          align: 'center',
          field: 'status',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        }
      ]
    },
    isValidToSend: function () {
      return (
        this.isValidEmail &&
        this.isValidMobile &&
        this.isValidFullname &&
        this.isValidAddress &&
        this.isValidSignName //&&
        // this.form.avatar != ''
      )
    },
    isValidEmail: function () {
      return true
    },
    isValidMobile: function () {
      return true
    },
    isValidFullname: function () {
      return true
    },
    isValidAddress: function () {
      return true
    },
    isValidSignName: function () {
      return true
    }
  },
  mounted: function () {
    var self = this
    self.getCities()
    self.getCountRetailers()
  },
  methods: {
    optionsBirthday: function (dateStr) {
      let dt = date.extractDate(dateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },
    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      return (
        dt <= Date.now() && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
      )
    },
    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },
    getCities: function () {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.cities = response.data.data.cities
        self.getRetailers()
      })
    },
    getRetailers: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      self.searchText = ''
      let url =
        '/retailers/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      axiosInstance.get(url).then(response => {
        self.dataLoading = false
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          self.rows = response.data.data.retailers
          self.initRetailers = self.rows
        }
      })
    },
    wrapCsvValue: function (val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val

      formatted =
        formatted === void 0 || formatted === null ? '' : String(formatted)

      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    },
    exportTable: function () {
      let inputData = {}
      inputData['retailers'] = this.selected
      axiosInstance
        .post('/retailers/export', inputData, {
          responseType: 'blob'
        })
        .then(response => {
          return response.data.arrayBuffer()
        })
        .then(ab => {
          const byteArray = new Uint8Array(ab)
          const a = window.document.createElement('a')
          a.href = window.URL.createObjectURL(
            new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
          )
          a.download = `ds_dai_ly_${new Date().getTime()}.xlsx`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
    },
    showCols: function () {
      this.showColumns = !this.showColumns
    },
    onAddRetailer: function () {
      var self = this
      self.form.cityId = 50
      self.form.districtId = 550
      self.form.wardId = 8687
      self.form.address = ''
      self.form.fullName = ''
      self.form.birthday = date.formatDate(Date.now(), 'DD/MM/YYYY')
      self.form.name = ''
      self.form.idCard = ''
      self.form.email = ''
      self.form.mobile = ''
      self.form.avatar = ''
      self.modal = true
      self.getDistricts()
      self.getWards()
    },
    onChangeCity: function () {
      this.cityChange = true
      this.getDistricts()
    },
    getDistricts: function () {
      var self = this
      self.form.districts = []
      axiosInstance
        .get('/districts?cityId=' + self.form.cityId)
        .then(response => {
          self.form.districts = response.data.data.districts
          self.form.districtId = self.form.districts[0].id
          if (self.cityChange) {
            self.getWards()
            self.cityChange = false
          }
        })
    },
    getWards: function () {
      var self = this
      self.form.wards = []
      axiosInstance
        .get('/wards?districtId=' + self.form.districtId)
        .then(response => {
          self.form.wards = response.data.data.wards
          self.form.wardId = self.form.wards[0].id
        })
    },
    requiredFullName: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('retailers.please_enter_retailer_name')
      )
    },
    requiredSignName: function (val) {
      return (
        (val && val.length > 0) || this.$t('retailers.please_enter_agent_name')
      )
    },
    requiredIdCard: function (val) {
      let reg9 = /^[\d]{9}$/
      let reg12 = /^[\d]{12}$/
      let isIdCard = reg9.test(val) || reg12.test(val)
      return (
        (val && val.length > 0 && isIdCard) ||
        this.$t('retailers.please_enter_9_numbers_or_12_numbers')
      )
    },
    requiredEmail: function (val) {
      return (val && val.length > 0) || this.$t('retailers.please_enter_email')
    },
    isValidateEmail: function (val) {
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return (val && reg.test(val)) || this.$t('retailers.incorrect_email')
    },
    requiredMobile: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('retailers.please_enter_phone_number')
      )
    },
    isValidateMobile: function (val) {
      var regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return (val && regex.test(val)) || this.$t('retailers.incorrect_phone')
    },
    requiredAddress: function (val) {
      return (
        (val && val.length > 0) || this.$t('retailers.please_enter_address')
      )
    },
    onFileSelected: function (event) {
      var self = this
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return false
      }

      let file = files.item(0)
      let reader = new FileReader()
      reader.onload = e => {
        let dataURI = e.target.result
        if (dataURI) {
          self.form.avatar = dataURI
        }
      }
      reader.readAsDataURL(file)
    },
    addNewRetailer: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['fullname'] = self.form.fullName
      inputData['birthday'] = date.formatDate(
        date.extractDate(self.form.birthday, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['name'] = self.form.name
      inputData['retailerIdCard'] = self.form.idCard
      inputData['email'] = self.form.email
      inputData['mobile'] = self.form.mobile
      inputData['address'] = self.form.address
      inputData['cityId'] = parseInt(self.form.cityId)
      inputData['districtId'] = parseInt(self.form.districtId)
      inputData['wardId'] = parseInt(self.form.wardId)
      inputData['username'] = self.form.mobile
      inputData['avatar'] = self.form.avatar
      axiosInstance
        .post('/retailers', inputData)
        .then(() => {
          self.progress = false
          self.getRetailers()
          self.getCountRetailers()
          self.modal = false
          Notify.create({
            message: this.$t('retailers.create_successful'),
            type: 'positive',
            position: 'top'
          })
        })
        .catch(error => {
          self.progress = false
          let message = ''
          switch (error.response.data.errors[0].code) {
            case '1202':
              message = `${self.$t('retailers.phone_number')} ${
                self.form.mobile
              } ${self.$t('retailers.exists_phone')}`
              break
            case '1402':
              message = `${self.$t('retailers.email')} ${
                self.form.email
              } ${self.$t('retailers.exists_email')}`
              break
            // default:
            //   message = self.$t('retailers.exceeded_the_limit')
            //   break
          }
          Notify.create({
            message: message,
            type: 'negative',
            position: 'top'
          })
        })
    },
    goToDetail: function (id , retailerCode) {
      LocalStorage.set('rt_i_pt', id)
      LocalStorage.set(Constants.RETAILER_CODE, retailerCode)
      this.$router.push('/retailer-detail')
    },
    searchRetailer: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isFilter = false
        self.isGet = false
      }
      self.searchText = ''
      let url =
        '/retailers/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage +
        '&fromDate=' +
        date.formatDate(
          date.extractDate(self.fromDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        ) +
        '&toDate=' +
        date.formatDate(
          date.extractDate(self.toDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        )
      if (self.cityId != 0) {
        url += '&cityId=' + self.cityId
      }

      if (self.status != -1) {
        url += '&status=' + parseInt(self.status)
      }
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        self.rows = response.data.data.retailers
        self.initRetailers = response.data.data.retailers
      })
    },
    onRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.pagination.sortBy == sortBy || !sortBy) {
        if (
          (self.pagination.page != page ||
            self.pagination.rowsPerPage != rowsPerPage) &&
          self.pagination.descending == descending
        ) {
          self.pagination.page = page
          self.pagination.rowsPerPage = rowsPerPage
          if (self.searchText.trim() != '') {
            self.filterRetailer()
            return
          }
          if (self.isSearch) {
            self.searchRetailer()
          } else {
            self.getRetailers()
          }
        } else {
          if (self.pagination.descending != descending) {
            self.pagination.descending = descending
          } else {
            self.pagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.pagination.sortBy = sortBy
      }

      let sortFn
      switch (self.pagination.sortBy) {
        case 'id':
          sortFn = self.pagination.descending
            ? (a, b) => b.id - a.id
            : (a, b) => a.id - b.id
          break

        default:
          sortFn = self.pagination.descending
            ? (a, b) =>
                a[self.pagination.sortBy] > b[self.pagination.sortBy]
                  ? -1
                  : a[self.pagination.sortBy] < b[self.pagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.pagination.sortBy] > b[self.pagination.sortBy]
                  ? 1
                  : a[self.pagination.sortBy] < b[self.pagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.rows.sort(sortFn)
    },
    getCountRetailers: function () {
      var self = this
      axiosInstance.get('/retailers/summary').then(response => {
        self.summary = response.data.data
      })
    },
    filterRetailer: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getRetailers()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/retailers/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        self.rows = response.data.data.retailers
      })
    }
  }
})
