import { defineComponent, ref } from 'vue'
import { Constants } from 'boot/Constants'
import { axiosInstance } from 'boot/axios'
export default defineComponent({
  name: 'DebtAdjustmentDetail',
  data() {
    const options = ref(this.retailerCodes)
    const retailerCodes = [
      { id: 1, name: 'DL01' },
      { id: 2, name: 'DL02' },
      { id: 3, name: 'DL03' },
      { id: 4, name: 'DL04' },
      { id: 5, name: 'DL05' },
      { id: 6, name: 'DL06' },
      { id: 7, name: 'DL07' }
    ]

    return {
      options,
      retailerCodes,

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
      rows: [
        {
          id: 0,
          retailerCode: 'R001',
          retailerName: 'Công ty TNHH ABC',
          retailerAddress: 'Hồ Chí Minh',
          retailerPhone: '0123456789',
          code: 'DA001',
          createdAt: '01/01/2021',
          comfirmDate: '01/01/2021',
          beforeDebt: '100000000',
          value: '100000000',
          afterDebt: '200000000',
          content: 'Nợ đầu kỳ',
          status: 'Đã xác nhận',
          reason: 'công nợ đã được duyệt'
        },
        {
          id: 1,
          retailerCode: 'R002',
          retailerName: 'Công ty TNHH ABC',
          retailerAddress: 'Hà Nội',
          retailerPhone: '0123456789',
          code: 'DA002',
          createdAt: '01/01/2021',
          comfirmDate: '01/01/2021',
          beforeDebt: '100000000',
          value: '100000000',
          afterDebt: '200000000',
          content: 'Nợ đầu kỳ',
          status: 'Đã xác nhận',
          reason: 'công nợ đã được duyệt'
        }
      ],
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
        retailerName: '',
        retailerPhone: '',
        retailerAddress: '',
        value: '',
        reason: ''
      },
      formAdjustment: {
        retailerCode: '',
        retailerName: '',
        retailerPhone: '',
        retailerAddress: '',
        value: '',
        content: ''
      },
      selectedItem: null
    }
  },
  computed: {
    columnsI18n() {
      return [
        {
          name: 'retailerCode',
          label: `${this.$t('debt.retailer_code')}`,
          align: 'center',
          sortable: true,
          field: 'retailerCode',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerName',
          label: `${this.$t('debt.retailer_name')}`,
          align: 'center',
          sortable: true,
          field: 'retailerName',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'code',
          label: `${this.$t('debt.code')}`,
          align: 'center',
          sortable: true,
          field: 'code',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'createdAt',
          label: `${this.$t('debt.created_at')}`,
          align: 'center',
          sortable: true,
          field: 'createdAt',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'comfirmDate',
          label: `${this.$t('debt.confirm_date')}`,
          align: 'center',
          sortable: true,
          field: 'comfirmDate',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'beforeDebt',
          label: `${this.$t('debt.debt_before')}`,
          align: 'center',
          sortable: true,
          field: 'beforeDebt',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'value',
          label: `${this.$t('debt.value')}`,
          align: 'center',
          sortable: true,
          field: 'value',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'afterDebt',
          label: `${this.$t('debt.debt_after')}`,
          align: 'center',
          sortable: true,
          field: 'afterDebt',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'content',
          label: `${this.$t('debt.content')}`,
          align: 'center',
          sortable: true,
          field: 'content',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'status',
          label: `${this.$t('debt.status')}`,
          align: 'center',
          sortable: true,
          field: 'status',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'reason',
          label: `${this.$t('debt.reason')}`,
          align: 'center',
          sortable: true,
          field: 'reason',
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
      return this.formAdjustment.value.length > 0
    },
    isValidRejectAdjustment: function () {
      console.log(this.isValidateReason)
      return (
        this.isValidateReRetailerCode &&
        this.isValidateReValue &&
        this.isValidateReason
      )
    },
    isValidateReRetailerCode: function () {
      console.log(this.form.retailerCode)
      return this.form.retailerCode.length > 0
    },
    isValidateReValue: function () {
      return this.form.value.length > 0
    },
    isValidateReason: function () {
      return this.form.reason.length > 0
    }
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
      self.modalConfirm = true
    },
    handleReject() {
      var self = this
      if (self.selected.length > 1) {
        self.$q.notify({
          message: `${self.$t('debt.noti.reject_error')}`,
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      } else if (self.selected.length > 0 && self.selected.length < 2) {
        self.modalReject = true
        self.form.retailerCode = self.selected[0]?.retailerCode ?? ''
        self.form.retailerName = self.selected[0]?.retailerName ?? ''
        self.form.retailerPhone = self.selected[0]?.retailerPhone ?? ''
        self.form.retailerAddress = self.selected[0]?.retailerAddress ?? ''
        self.form.reason = ''
        self.form.value = self.selected[0]?.value ?? ''
      }
    },
    handleRejectAdjustment() {
      var self = this
      self.progress = true
      setTimeout(() => {
        self.progress = false
        self.modalReject = false
      }, 1000)
      console.log('Từ chối thành công')
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
      console.log('self', self.formAdjustment)
      self.progress = true
      setTimeout(() => {
        self.$q.notify({
          message: `${self.$t('debt.noti.create_debt_adjustment_success')}`,
          color: 'positive',
          position: 'top',
          timeout: 2000
        })
        self.modalAdjustment = false
        self.progress = false
        self.formAdjustment = {
          retailerCode: '',
          retailerName: '',
          retailerPhone: '',
          retailerAddress: '',
          value: '',
          content: ''
        }
      }, 1000)
    },
    handleConfirmAdjustment() {
      var self = this
      console.log('xác nhận thành công')
      self.progress = true
      setTimeout(() => {
        self.progress = false
        self.modalConfirm = false
        self.$q.notify({
          message: `${self.$t('debt.noti.confirm_success')}`,
          color: 'positive',
          position: 'top',
          timeout: 2000
        })
      }, 1000)
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
        '/debt-adjustments/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            self.rows = response.data.data.retailers
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
        // self.getDebts()
        self.rows = [
          {
            id: 0,
            retailerCode: 'R001',
            retailerName: 'Công ty TNHH ABC',
            retailerAddress: 'Hồ Chí Minh',
            retailerPhone: '0123456789',
            code: 'DA001',
            createdAt: '01/01/2021',
            comfirmDate: '01/01/2021',
            beforeDebt: '100000000',
            value: '100000000',
            afterDebt: '200000000',
            content: 'Nợ đầu kỳ',
            status: 'Đã xác nhận',
            reason: 'công nợ đã được duyệt'
          },
          {
            id: 1,
            retailerCode: 'R002',
            retailerName: 'Công ty TNHH ABC',
            retailerAddress: 'Hà Nội',
            retailerPhone: '0123456789',
            code: 'DA002',
            createdAt: '01/01/2021',
            comfirmDate: '01/01/2021',
            beforeDebt: '100000000',
            value: '100000000',
            afterDebt: '200000000',
            content: 'Nợ đầu kỳ',
            status: 'Đã xác nhận',
            reason: 'công nợ đã được duyệt'
          }
        ]

        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/debt-adjustments/search?segment=' +
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
          self.rows = response.data.data.retailers
        })
        .catch(error => {
          console.log(error)
          self.rows = []
        })
    },

    formatNumber: function (number) {
      const index = number.indexOf('0')
      if (index === 0) {
        number.replace('0', '')
      } else {
        const formatValue = number.replace(/[^-?/0-9]/g, '')
        const removeDash = formatValue.replace(/-/g, (match, offset) => {
          return offset === 0 ? '-' : ''
        })
        return removeDash.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    filterItems(searchTerm, updateOptions) {
      // Filter the options array based on the search term
      const filteredOptions = this.options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Update the options in the autocomplete dropdown
      updateOptions(filteredOptions)
    }
  }
})
