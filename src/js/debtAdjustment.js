import { defineComponent, ref } from 'vue'
import { Constants } from 'boot/Constants'
import { axiosInstance } from 'boot/axios'
export default defineComponent({
  name: 'DebtAdjustment',
  data() {
    const options = ref(this.retailerCodes)
    const retailerCodes = []
    return {
      options,
      retailerCodes,
      filteredRetailers: [],
      filterFn(val, update, abort) {
        if (val.length < 2) {
          abort()
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = retailerCodes.filter(
            v => v.name.toLowerCase().indexOf(needle) > -1
          )
        })
      },
      textColorStatus: {
        2: 'red-500',
        0: 'yellow-500',
        1: 'blue-500',
      },
      bgColorStatus: {
        2: 'red-200',
        0: 'orange-200',
        1: 'blue-200',
      },
      classStatus: {
        2: 'text-danger',
        0: 'text-warning',
        1: 'text-lime',
      },
      colorStatus: {
        2: 'danger',
        0: 'warning',
        1: 'lime',
      },

      rows: [],
      is_focusInputSearch: false,
      selected: [],
      modalConfirm: false,
      modalReject: false,
      modalAdjustment: false,
      progress: false,
      searchText: '',
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'name',
        descending: false
      },
      form: {
        retailerCode: '',
        name: '',
        mobie: '',
        address: '',
        value: 0,
        rejectionReason: '',
        status: 0,
        confirmTime: '',
        createTime: '',
        content: '',
        currentDebt: '',
        docNo: '',
        previousAccountReceivable: '',
        id: 0
      },
      formAdjustment: {
        retailerCode: '',
        retailerName: '',
        retailerPhone: '',
        retailerAddress: '',
        value: '',
        content: ''
      },
      selectedItem: null,
      isTooltipVisible: false,
      tooltipContent: ''
    }
  },
  computed: {
    labelStatusI18n: function () {
      return {
        0: this.$t('order_list.to_pay'),//chờ xác nhận
        1: this.$t('order_list.confirmed'),//xác nhận
        2: this.$t('order_list.canceled'),//đã bị hủy
      }
    },
    statusesI18n: function () {
      return [
        {
          name: this.$t('order_list.canceled'),
          value: 2
        },
        {
          name: this.$t('order_list.to_pay'),
          value: 0
        },
        {
          name: this.$t('order_list.confirmed'),
          value: 1
        },
      ]
    },
    columnsI18n() {
      return [
        {
          name: 'retailerCode',
          label: `${this.$t('debt.retailer_code')}`,
          align: 'left',
          sortable: true,
          field: 'retailerCode',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'name',
          label: `${this.$t('debt.retailer_name')}`,
          align: 'left',
          sortable: true,
          field: 'name',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'docNo',
          label: `${this.$t('debt.code')}`,
          align: 'left',
          sortable: true,
          field: 'docNo',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'createTime',
          label: `${this.$t('debt.created_at')}`,
          align: 'right',
          sortable: true,
          field: 'createTime',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'confirmTime',
          label: `${this.$t('debt.confirm_date')}`,
          align: 'right',
          sortable: true,
          field: 'confirmTime',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'previousAccountReceivable',
          label: `${this.$t('debt.debt_before')}`,
          align: 'right',
          sortable: true,
          field: 'previousAccountReceivable',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'value',
          label: `${this.$t('debt.value')}`,
          align: 'right',
          sortable: true,
          field: 'value',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'currentDebt',
          label: `${this.$t('debt.debt_after')}`,
          align: 'right',
          sortable: true,
          field: 'currentDebt',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'content',
          label: `${this.$t('debt.content')}`,
          align: 'left',
          sortable: true,
          field: 'content',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'status',
          label: `${this.$t('debt.status')}`,
          align: 'left',
          sortable: true,
          field: 'status',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'rejectionReason',
          label: `${this.$t('debt.reason')}`,
          align: 'left',
          sortable: true,
          field: 'rejectionReason',
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    isValidToSendAdjustment: function () {
      return this.isValidateRetailerCode && this.isvalidateValue
    },
    isValidateRetailerCode: function () {
      return this.formAdjustment.retailerCode?.id > 0
    },
    isvalidateValue: function () {
      let data = parseFloat(this.formAdjustment.value)
      return data > 0 || data < 0
    },
    isValidRejectAdjustment: function () {
      console.log(this.isValidateReason)
      console.log(this.isValidateReValue)
      console.log(this.isValidateReRetailerCode)
      // console.log('this.form.value',this.form.value)

      return (
        this.isValidateReRetailerCode &&
        this.isValidateReValue &&
        this.isValidateReason
      )
    },
    isValidateReRetailerCode: function () {
      return this.selected.length > 0
    },
    isValidateReValue: function () {
      for (let item of this.selected) {
        if (parseFloat(item.value) == 0) {
          return false
        }
      }
      return true
    },
    isValidateReason: function () {
      for (let item of this.selected) {
        console.log(item)
        if (item.rejectionReason == null || item.rejectionReason == '') {
          return false
        }
      }
      return true
    }
  },
  mounted: function () {
    var self = this
    self.getDebtAdjustments()
    self.getRetailerCodes()
  },
  methods: {
    validateRetailerCode: function (value) {
      if (!value) {
        return this.$t('debt.validate.retailer_code_required')
      }
    },
    validateValue: function (value) {
      if (!value) {
        return this.$t('debt.validate.value_required')
      }
    },
    validateReason: function (value) {
      if (!value) {
        return this.$t('debt.validate.reason_required')
      }
    },
    handleConfirm() {
      var self = this
      var self = this
        let index = self.selected?.findIndex(
          item => item.status != '0'
        )
      if (index != -1) {
        self.$q.notify({
          message: `${self.$t('debt.noti.confirm_adjusment_error')}`,
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      } else {
        self.modalConfirm = true
      }
    },
    handleReject() {
      var self = this
      console.log(self.selected)
      let index = self.selected?.findIndex(
        item => item.status != '0'
      )
      if (index != -1) {
        self.$q.notify({
          message: `${self.$t('debt.noti.reject_payment_error')}`,
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      } else {

        self.modalReject = true
      }
    },
    handleRejectAdjustment() {
      var self = this
      self.progress = true
      const inputData = [...self.selected] || []
      const dataSubmit = {
        list: [...inputData]
      }
      console.log('data', inputData)
      axiosInstance
        .put('/retailer/debt/adjustment/deny', dataSubmit)
        .then(response => {
          if (response.data) {
            self.progress = false
            self.$q.notify({
              message: `${self.$t('debt.noti.reject_success')}`,
              color: 'positive',
              position: 'top',
              timeout: 2000
            })
            self.modalReject = false
            self.getDebtAdjustments()
          } else {
            self.progress = false
            self.$q.notify({
              message: 'Từ chối thất bại',
              color: 'danger',
              position: 'top'
            })
          }
        })
        .catch(error => {
          self.progress = false
          console.log('message', error)
          self.$q.notify({
            message: error.message,
            color: 'danger',
            position: 'top'
          })
        })
      // setTimeout(() => {
      //   self.progress = false
      //   self.modalReject = false
      // }, 1000)
      // console.log('Từ chối thành công')
    },
    // handle input
    handleChangeRetailerCode: function (value) {
      console.log('value', value)
      var self = this
      if (value.name === 'DL01') {
        self.formAdjustment.retailerName = 'Công ty TNHH ABC'
        self.formAdjustment.retailerPhone = '0123456789'
        self.formAdjustment.retailerAddress = 'Hà Nội'
      } else {
        self.formAdjustment.retailerName = ''
        self.formAdjustment.retailerPhone = ''
        self.formAdjustment.retailerAddress = ''
      }
    },
    getRetailerCodes: function () {
      var self = this
      let url = '/retailer/payments/active-inactive'
      axiosInstance
        .get(url)
        .then(response => {
          self.retailerCodes = response.data.data.retailerActive
        })
        .catch(error => {
          self.retailerCodes = []
        })
    },
    onChangeRetailerCode: function (val) {
      var self = this
      const id = val.id
      const item = self.retailerCodes.find(item => item.id === id)
      if (id) {
        ;(self.formAdjustment.retailerName = item.name || ''),
          (self.formAdjustment.retailerPhone = item?.mobile || ''),
          (self.formAdjustment.retailerAddress = item.fullAddress || ''),
          (self.formAdjustment.value = item.value || '-')
      }
    },
    retailerFilterNameFn(val, update) {
      let self = this

      if (val == '') {
        update(() => {
          self.filteredRetailers = self.retailerCodes
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        self.filteredRetailers = self.retailerCodes.filter(
          v => v.retailerCode.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    onNew() {
      var self = this
      self.formAdjustment = {
        retailerCode: '',
        retailerName: '',
        retailerPhone: '',
        retailerAddress: '',
        value: '',
        content: ''
      }
      self.modalAdjustment = true
    },
    handleSubmitAdjustment: function () {
      var self = this
      // console.log('self', self.formAdjustment)
      self.progress = true
      const inputData = {}
      const {
        retailerCode,
        retailerName,
        retailerAddress,
        retailerPhone,
        content,
        value
      } = self.formAdjustment
      // if (self.$refs.formAdjustment.validate()) {
      ;(inputData.retailerCode = retailerCode?.retailerCode),
        (inputData.name = retailerName || ''),
        (inputData.mobile = retailerPhone || ''),
        (inputData.address = retailerAddress || ''),
        (inputData.note = content || ''),
        (inputData.amount = value !== '' ? value.replaceAll(',', '') : ''),
        axiosInstance
          .post('/retailer/debt/adjustment', inputData)
          .then(response => {
            if (response.data?.data?.message) {
              self.progress = false
              self.$q.notify({
                message: `${self.$t(
                  'debt.noti.create_debt_adjustment_success'
                )}`,
                color: 'positive',
                position: 'top',
                timeout: 2000
              })
              self.modalAdjustment = false
              self.getDebtAdjustments()
            } else {
              self.progress = false
              self.$q.notify({
                message: error.message,
                color: 'negative',
                position: 'top'
              })
            }
          })
          .catch(error => {
            console.log('message', error)
            self.progress = false
            self.$q.notify({
              message: error.message,
              color: 'negative',
              position: 'top'
            })
          })
    },
    handleConfirmAdjustment() {
      var self = this
      self.progress = true
      const inputData = [...self.selected] || []
      const dataSubmit = {
        RetailerDebtAdjustments: [...inputData]
      }
      axiosInstance
        .put('/retailer/debt/adjustment/confirm', dataSubmit)
        .then(response => {
          if (response.data.data.message != 'failing') {
            console.log(response.data.data.message)
            self.progress = false
            self.$q.notify({
              message: `${self.$t('debt.noti.confirm_success')}`,
              color: 'positive',
              position: 'top',
              timeout: 2000
            })
            self.modalConfirm = false
            self.getDebtAdjustments()
          } else {
            self.progress = false
            self.$q.notify({
              message: `${self.$t('Xác nhận thất bại')}`,
              color: 'positive',
              position: 'top',
              timeout: 2000
            })
          }
        })
        .catch(error => {
          // console.log('message',error)
          self.progress = false
          self.$q.notify({
            message: error.message,
            color: 'negative',
            position: 'top'
          })
        })
    },
    getDebtAdjustments: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      self.searchText = ''
      let url =
        '/retailer/debt/adjustment/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
        self.selected = []
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            self.rows = response.data.data.retailerDebtAdjustmentAllForms
            self.initRetailers = self.rows
          }
        })
        .catch(error => {
          console.log(error)
          self.rows = []
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
            self.filterDebtAdjustments()
            return
          }
          if (self.isSearch) {
            self.getDebtAdjustments()
          } else {
            self.getDebtAdjustments()
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

    filterDebtAdjustments: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebtAdjustments()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/retailer/debt/adjustment/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          self.rows = response.data.data.retailerDebtAdjustmentAllForms
        })
        .catch(error => {
          console.log(error)
          self.rows = []
        })
    },

    formatNumber: function (number) {
      if (number != '0' && number != '' && number != '-' && number != '+') {
        let checknegative = number.toString().indexOf('-')
        number = number.toString().replace(/[^0-9.]/g, '')
        if (checknegative != '-1')
          return (
            '-' +
            Number(number).toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2
            })
          )
        else
          return Number(number).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
      } else {
        return ''
      }
    },
    filterItems(searchTerm, updateOptions) {
      // Filter the options array based on the search term
      const filteredOptions = this.options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Update the options in the autocomplete dropdown
      updateOptions(filteredOptions)
    },
    showTooltip(content) {
      this.tooltipContent = content
      this.isTooltipVisible = true
    },
    hideTooltip() {
      this.isTooltipVisible = false
    }
  }
})
