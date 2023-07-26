import { defineComponent, ref } from 'vue'
import { date } from 'quasar'
import { Constants } from 'boot/Constants'
import { axiosInstance } from 'boot/axios'

export default defineComponent({
  name: 'PaymentTransaction',
  data() {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      selected: [],
      rows: [],
      textColorStatus: {
        DELETED: 'red-500',
        INACTIVE: 'yellow-500',
        ACTIVE: 'blue-500',
      },
      bgColorStatus: {
        DELETED: 'red-200',
        INACTIVE: 'orange-200',
        ACTIVE: 'blue-200',
      },
      classStatus: {
        DELETED: 'text-danger',
        INACTIVE: 'text-warning',
        ACTIVE: 'text-lime',
      },
      colorStatus: {
        DELETED: 'danger',
        INACTIVE: 'warning',
        ACTIVE: 'lime',
      },
      confirmPaymentRows: [],
      id: '0',
      paymentTransactions: [],
      form: {
        id: 0,
        retailerCode: '',
        name: '',
        mobile: '',
        retailerAddress: '',
        amount: '',
        note: ''
      },
      is_focusInputSearch: false,
      modal: false,
      modalDetail: false,
      modalComfirm: false,
      modalCancel: false,
      modalConfirmPayment: false,
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      progress: false,
      closeDialog: false,
      searchText: '',
      selectError: '',
      status: -1,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      retailerCodes: [],
      filteredRetailers: [],
      paymentTransactionDetail: {},
      array: [],
      isTooltipVisible: false,
      tooltipContent: ''
    }
  },
  
  computed: {
   
    labelStatusI18n: function () {
      return {
        INACTIVE: this.$t('order_list.to_pay'),//chờ xác nhận
        ACTIVE: this.$t('order_list.confirmed'),//xác nhận
        DELETED: this.$t('order_list.canceled'),//đã bị hủy
      }
    },
    statusesI18n: function () {
      return [
        {
          name: this.$t('order_list.canceled'),
          value: DELETED
        },
        {
          name: this.$t('order_list.to_pay'),
          value: INACTIVE
        },
        {
          name: this.$t('order_list.confirmed'),
          value: ACTIVE
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
          name: 'phoneNumber',
          label: `${this.$t('debt.phone')}`,
          align: 'left',
          sortable: true,
          field: 'phoneNumber',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'useLimit',
          label: `${this.$t('debt.detail.debt_limit')}`,
          align: 'right',
          sortable: true,
          field: 'useLimit',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'creditLimit',
          label: `${this.$t('debt.detail.debt_availabilty_limit')}`,
          align: 'right',
          sortable: true,
          field: 'creditLimit',
          headerClasses: 'text-uppercase font-weight-bolder',
          width: '200px'
        },
        {
          name: 'endBalance',
          label: `${this.$t('debt.detail.debt_end_of_term')}`,
          align: 'right',
          sortable: true,
          field: 'endBalance',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'payment',
          label: `${this.$t('debt.payment')}`,
          align: 'right',
          sortable: true,
          field: 'payment',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'paidAmount',
          label: `${this.$t('debt.actual_received')}`,
          align: 'right',
          sortable: true,
          field: 'paidAmount',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'paymentTime',
          label: `${this.$t('debt.payment_time')}`,
          align: 'right',
          sortable: true,
          field: 'paymentTime',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'paidTime',
          label: `${this.$t('debt.actual_received_time')}`,
          align: 'right',
          sortable: true,
          field: 'paidTime',
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
          name: 'note',
          label: `${this.$t('debt.payment_noted')}`,
          align: 'left',
          sortable: true,
          field: 'note',
          headerClasses: 'text-uppercase font-weight-bolder',
          class: {
            'truncate-text': item => this.isDataTooLong(item.note)
          }
        }
      ]
    },
    paymentColumnsI18n() {
      return [
        {
          name: 'retailerCode',
          label: `${this.$t('debt.retailer_code')}`.toUpperCase(),
          align: 'center',
          sortable: true,
          field: 'retailerCode',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'name',
          label: `${this.$t('debt.retailer_name')}`.toUpperCase(),
          align: 'center',
          sortable: true,
          field: 'name',
          headerClasses: 'text-uppercase font-weight-bolder',
        },
        {
          name: 'payAmount',
          label: `${this.$t('debt.payment')}`.toUpperCase(),
          align: 'right',
          sortable: true,
          field: 'payAmount',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'paidAmount',
          label: `${this.$t('debt.actual_received')}`.toUpperCase(),
          align: 'right',
          sortable: true,
          field: 'paidAmount',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'note',
          label: `${this.$t(`debt.payment_noted`)}`.toUpperCase(),
          align: 'center',
          sortable: true,
          field: 'note',
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    isValidToSend() {
      // console.log(
      //   'isValidToSend',
      //   this.isValidateRetailerCode && this.isValidateRetailerPayment
      // )
      return this.isValidateRetailerCode && this.isValidateRetailerPayment
    },
    isValidateRetailerCode() {
      return this.form.retailerCode?.id > 0
    },
    isValidateRetailerPayment() {
      if (this.form.amount) {
        console.log('this.fomamount', this.form.amount)
        const data = parseInt(this.form.amount.replaceAll(',', '')) || 0
        return data > 0
      } else {
        return false
      }
    },
    isValidateComfirmPayment() {
      const validateComfirmPayment = this.selected.filter(item => {
        const data = item.paidAmount ? parseInt(item.paidAmount) : 0
        const payAmount = item.payAmount ? parseInt(item.payAmount) : 0
        if (
          typeof data !== 'number' ||
          isNaN(data) ||
          data > payAmount ||
          data == 0
        ) {
          return false
        }
        return true
      })
      return validateComfirmPayment.length === this.selected.length
    },
    isValidateToSendComfirmPayment() {
      return this.isValidateComfirmPayment
    }
  },
  mounted: function () {
    var self = this
    self.getDebtTransactions()
    self.getRetailerCodes()
  },
  methods: {
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
    validateComfirmPayment: function (value, payAmount) {
      let data = null
      if (value) {
        data = parseInt(value.replaceAll(/,/g, ''))
      }
      if (!value) {
        return this.$t('debt.validate.comfirm_payment_required')
      } else if (typeof data !== 'number' || isNaN(data)) {
        console.log('typeof data', typeof data)
        return this.$t('debt.validate.comfirm_payment_invalid')
      } else if (data > payAmount) {
        return this.$t('debt.validate.comfirm_payment_invalid')
      }
    },
    validateRetailerPayment: function (value) {
      let data = null
      if (value) {
        data = parseInt(value.replaceAll(/,/g, ''))
      }
      if (!value) {
        return this.$t('debt.validate.payment_address_required')
      }
      return true
    },
    validateRetailerCode: function (value) {
      var self = this
      if (!value) {
        return this.$t('debt.validate.retailer_code_required')
      }
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
            self.filterDebtTransactions()
            return
          }
          if (self.isSearch) {
            self.searchDebtTransactions()
          } else {
            self.getDebtTransactions()
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
      self.paymentTransactions.sort(sortFn)
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
    onNew: function () {
      var self = this
      self.form = {
        id: 0,
        retailerCode: '',
        retailerName: '',
        retailerPhone: '',
        retailerAddress: '',
        retailerPayment: ''
      }
      self.modal = true
    },
    onSubmit: function () {
      var self = this
      const { retailerCode, name, mobile, retailerAddress, amount, note } =
        self.form
      const inputData = {}
      inputData.retailerCode = retailerCode?.retailerCode || ''
      inputData.amount =
        amount != ''
          ? amount.replaceAll(',', '').replace(/[^0-9]/g, '')
          : '' || ''
      inputData.note = note
      self.progress = true
      axiosInstance
        .post('/retailer/payment', { ...inputData })
        .then(response => {
          if (response?.data?.data?.message) {
            self.progress = false
            self.modal = false
            self.$q.notify({
              color: 'positive',
              message: 'Thêm mới thành công',
              icon: 'check_circle',
              position: 'top'
            })
            self.getDebtTransactions()
          } else {
            self.progress = false
            self.$q.notify({
              color: 'danger',
              message: 'Thêm mới thất bại',
              icon: 'check_circle',
              position: 'top'
            })
          }
        })
        .catch(e => {
          self.progress = false
          self.$q.notify({
            color: 'danger',
            message: 'Thêm mới thất bại',
            icon: 'check_circle',
            position: 'top'
          })
        })
    },
    gotoDetail: function (id) {
      var self = this
      self.modalDetail = true
      const item = self.paymentTransactions.find(item => item?.id === id)
      self.paymentTransactionDetail = item ? item : {} || {}
    },
    gotoComfirmPayment: function (id) {
      var self = this
      self.modalComfirm = true
    },
    handleComfirmPayment: function (id) {
      var self = this
      self.modalConfirmPayment = true
      console.log(self.selected)
      self.selected = self.selected.map(item => {
        let number =
          item?.paidAmount != '0' &&
          item?.paidAmount != '' &&
          typeof item?.paidAmount != 'undefined'
            ? item?.paidAmount.toString().replace(/[^0-9.]/g, '')
            : 0
        item.paidAmount = number || 0
        return {
          ...item
        }
      })
    },
    handleSubmitConfirmPayment: function (id) {
      var self = this
      self.progress = true

      const inputData = self.selected.map(item => {
        return {
          id: item?.id || '',
          retailerCode: item?.retailerCode || '',
          paidAmount: item?.paidAmount.toString() || ''
        }
      })
      const dataSumit = {
        retailerPaymentPaidForms: [...inputData]
      }
      axiosInstance
        .post('/retailer/payment/confirm', dataSumit)
        .then(response => {
          if (response?.data?.data?.message === 'successful') {
            self.progress = false
            self.modalConfirmPayment = false
            self.$q.notify({
              message: `${self.$t('debt.noti.confirm_success')}`,
              color: 'positive',
              icon: 'done',
              position: 'top'
            })
            self.getDebtTransactions()
          } else {
            self.progress = false
            self.$q.notify({
              message: 'Comfirm thất bại',
              color: 'error',
              position: 'top'
            })
          }
          self.progress = false
        })
        .catch(() => {
          self.progress = false
          self.$q.notify({
            message: 'Comfirm thất bại',
            color: 'error',
            position: 'top'
          })
        })
    },
    handleCancelConfirmPayment: function () {
      var self = this
      const inputData = self.selected.map(item => {
        return {
          id: item?.id || ''
        }
      })
      const dataSumit = [...inputData]

      // console.log('id',self.id)
      self.progress = true
      axiosInstance
        .put(`/retailer/payment/cancel`, dataSumit)
        .then(response => {
          if (response?.data?.data?.message === 'successful') {
            self.progress = false
            self.modalCancel = false
            self.$q.notify({
              message: `${self.$t('debt.noti.confirm_cancel')}`,
              color: 'success',
              icon: 'done',
              position: 'top'
            })
            self.getDebtTransactions()
          } else {
            self.progress = false
            self.$q.notify({
              message: 'Hủy thanh toán thất bại',
              color: 'danger',
              position: 'top'
            })
          }
          // self.progress = false
        })
        .catch(() => {
          self.progress = false
          self.$q.notify({
            message: 'Comfirm thất bại',
            color: 'danger',
            position: 'top'
          })
        })
    },
    onChangeConfirmPayment: function (val, id) {
      var self = this
      const item = self.selected.find(item => item.id === id)
      const value = val.replace(/\D/g, '')
      item.paidAmount = value || ''
    },
    onChangeRetailerCode: function (val) {
      var self = this
      const id = val.id
      const item = self.retailerCodes.find(item => item.id === id)
      if (id) {
        ;(self.form.name = item.name || ''),
          (self.form.mobile = item?.mobile || ''),
          (self.form.retailerAddress = item.fullAddress || '')
      }
    },
    getDebtTransactions: function () {
      this.selected = []
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let url =
        '/retailer/payment/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerPayment =
              response.data.data.retailerPayment.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.paymentTransactions = response.data.data.retailerPayment
            self.initRetailers = self.paymentTransactions
          }
        })
        .catch(error => {
          self.paymentTransactions = []
        })
    },
    searchDebtTransactions: function () {
      this.selected = []
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isFilter = false
        self.isGet = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let url =
        '/retailer/payment/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage

      if (this.fromDate != '') {
        url +=
          '&fromDate=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }

      if (this.toDate != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      if (self.status != -1) {
        url += '&status=' + parseInt(self.status)
      }
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          console.log(url)
          console.log(response)
          self.pagination.rowsNumber = response.data.data.count
          response.data.data.retailerPayment =
            response.data.data.retailerPayment.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.paymentTransactions = response.data.data.retailerPayment
          self.initRetailers = response.data.data.retailerPayment
        })
        .catch(error => {
          console.log(error)
          self.paymentTransactions = []
        })
    },
    filterDebtTransactions: function () {
      this.selected = []
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebtTransactions()

        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/retailer/payment/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          console.log('ress', response)
          self.pagination.rowsNumber = response.data.data.count
          self.paymentTransactions = response.data.data.retailerPayment
        })
        .catch(error => {
          console.log(error)
          self.rows = []
        })
    },
    showModal: function (type) {
      var self = this
      switch (type) {
        case 'confirmed':
          if (self.selected.length > 0) {
            let index = -1
            const lengthSelect = self.selected.length
            if (lengthSelect > 0) {
              for (let i = self.selected.length - 1; i >= 0; i--) {
                console.log(self.selected[i].id)
                index = self.paymentTransactions.findIndex(
                  item =>
                    item.id == self.selected[i].id && item.status != 'INACTIVE'
                )
                if (index != -1) break
              }
            }

            if (index != -1) {
              self.$q.notify({
                message: `${self.$t('debt.noti.confirm_payment_error')}`,
                color: 'negative',
                icon: 'warning',
                position: 'top'
              })
            } else {
              self.selected = self.selected.map(item => {
                return {
                  ...item,
                  paidAmount:
                    typeof item?.payAmount === 'number'
                      ? item?.paidAmount.toString()
                      : item?.paidAmount || '0'
                }
              })
              self.modalComfirm = true
            }
          }
          break
        case 'cancel':
          if (self.selected.length > 0) {
            console.log('self.array', self.selected)
            let index = -1
            const lengthSelect = self.selected.length
            if (lengthSelect > 0) {
              for (let i = self.selected.length - 1; i >= 0; i--) {
                console.log(self.selected[i].id)
                index = self.paymentTransactions.findIndex(
                  item =>
                    item.id == self.selected[i].id && item.status != 'INACTIVE'
                )
                if (index != -1) break
              }
            }

            if (index != -1) {
              self.$q.notify({
                message: `${self.$t('debt.noti.reject_payment_error')}`,
                color: 'negative',
                icon: 'warning',
                position: 'top'
              })
              // }else if(lengthSelect > 1){
              //   self.$q.notify({
              //     message: `${self.$t('debt.noti.reject_number_payment_error')}`,
              //     color: 'negative',
              //     icon: 'warning',
              //     position: 'top'
              //   })
            } else {
              console.log('self.selected', self.selected)
              ;(self.id = self.selected[0]?.id || 0), (self.modalCancel = true)
            }
          }
      }
    },
    formatNumber: function (number) {
      console.log(number)
      if (number != '0' && number != '' && typeof number !== 'undefined') {
        number = number.toString().replace(/[^0-9.]/g, '')
        console.log(
          Number(number).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
        )
        return Number(number).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        })
      } else {
        return ''
      }
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
