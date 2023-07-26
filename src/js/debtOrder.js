import { defineComponent } from 'vue'
import { ref } from 'vue'
import { Constants } from 'src/boot/Constants'
import { Notify } from 'quasar'
import { noConflict } from 'lodash'
import { axiosInstance } from 'boot/axios'

const lodash = require('lodash')

export default defineComponent({
  name: 'DebtOrder',

  data() {
    return {
      debtOrders: [],
      selected: [],
      modal: false,
      activeModal: false,
      retailerCode: '',
      searchText: '',
      searchTextOrder: '',
      progress: false,
      debtOrder: null,
      search: '',
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      autoAllocated: false,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'name',
        descending: false
      },
      rowsOrderPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      orderPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      isValidateAllocated: false,
      isSend: false,
      isAuto: false,
      isConfirm: true,
      totalValueOverdraft: 0,
      totalValueAllocated: 0,
      retailerName: '',
      orderListofRetailer: [],
      is_focusInputSearch: false,
      isTooltipVisible: false,
      tooltipContent: ''
    }
  },
  computed: {
    columnsI18n() {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'left',
          field: 'index',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 50px',
        },
        {
          name: 'retailerCode',
          label: `${this.$t('debt.retailer_code')}`,
          align: 'left',
          sortable: true,
          field: 'retailerCode',
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 150px',
        },
        {
          name: 'name',
          label: `${this.$t('debt.retailer_name')}`,
          align: 'left',
          sortable: true,
          field: 'name',
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 150px',
        },
        {
          name: 'totalOrderValue',
          label: this.$t('debt.debt_end_of_term_col'),
          align: 'right',
          field: 'totalOrderValue',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 150px',
        },
        {
          name: 'outstandingBalance',
          label: `${this.$t('debt.value_overdraft')}`,
          align: 'right',
          sortable: true,
          field: 'outstandingBalance',
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 150px',
        },
        {
          name: 'timeUpdate',
          label: `${this.$t('debt.update_time')}`,
          align: 'right',
          sortable: true,
          field: 'timeUpdate',
          headerClasses: 'text-uppercase font-weight-bolder',
          style: 'width: 150px',
        },
        {
          name: 'quantitySellin',
          label: `${this.$t('debt.quantity_order')}`,
          align: 'right',
          sortable: true,
          field: 'quantitySellin',
          headerClasses: 'quantitySellin text-uppercase font-weight-bolder',
          style: 'width: 120px',
        },
      ]
    },
    orderColumnsI18n() {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'left',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'orderCode',
          label: `${this.$t('debt.order_code')}`,
          align: 'left',
          sortable: true,
          field: 'orderCode',
          format: val => `${val}`,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'finalCost',
          label: `${this.$t('debt.order_value')}`,
          align: 'right',
          sortable: true,
          field: 'finalCost',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderDate',
          label: `${this.$t('debt.order_date')}`,
          align: 'right',
          sortable: true,
          field: 'orderDate',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountAllocated',
          label: `${this.$t('debt.amount_to_allocated')}`,
          align: 'right',
          sortable: true,
          field: 'amountAllocated',
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'allocation',
          label: `${this.$t('debt.payment')}`,
          align: 'right',
          sortable: true,
          field: 'allocation',
          headerClasses: 'text-uppercase font-weight-bolder',
        },
        {
          name: 'remainingAmount',
          label: `${this.$t('debt.remaining_value')}`,
          align: 'right',
          sortable: true,
          field: 'remainingAmount',
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    columnClass(column) {
      if (column.name === 'allocation') {
        return 'allocation-column-class'
      }
      return column.name
    },
    validateIsSend() {
      var self = this
      if (self.isValidateAllocated === false && self.autoAllocated === true) {
        return true
      } else return false
    }
    // filter() {
    //   return {
    //     search: this.search,
    //   }
    // },
  },
  setup() {
    const filter = ref('')
    const selectedDetail = ref([])
    const tableRef = ref(null)
    const navigationActive = ref(false)
    return {
      tableRef,
      navigationActive,
      filter,
      selectedDetail
    }
  },
  mounted: function () {
    var self = this
    self.getDebtOrders()
  },
  methods: {
    setAutoAll: function () {
      var self = this
      setTimeout(() => {
        self.isAuto = false
      }, 500)
    },
    validateAllocatedValue: function (value) {
      const valueFormat =
        typeof value?.allocation === 'string'
          ? parseInt(value?.allocation.replace(/[^0-9]/g, ''))
          : value?.allocation || 0
      const remainingValue = value?.remainingAmount
      const allocatedList = this.orderListofRetailer.map(item => {
        return {
          ...item,
          allocation:
            typeof item?.allocation === 'string'
              ? parseInt(item?.allocation.replaceAll(',', ''))
              : item?.allocation
        }
      })

      const allocatedItems = allocatedList.filter(
        item => item.allocation !== '0' && item.allocation !== ''
      )
      const totalAllocated = allocatedItems.reduce(
        (total, item) => total + parseInt(item.allocation) || 0,
        0
      )
      const remainingValueFormat = remainingValue === 0 ? 0 : remainingValue
      if (valueFormat > remainingValueFormat || valueFormat < 0) {
        this.isValidateAllocated = false
        return this.$t('debt.validate.allocated_invalid')
      } else if (allocatedItems.length === 0) {
        this.isValidateAllocated = false
      } else if (allocatedItems.length > 0) {
        this.isValidateAllocated = true
      } else if (valueFormat > 0 && valueFormat <= remainingValueFormat) {
        this.isValidateAllocated = true
      }
      if (totalAllocated > this.totalValueOverdraft) {
        this.isValidateAllocated = false
        Notify.create({
          message: this.$t('debt.noti.total_allocated_invalid'),
          color: 'negative',
          position: 'top',
          timeout: 2000
        })
      }
    },
    getDebtOrders: function () {
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
        '/order/allocations/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.orderAllocationForms =
              response.data.data.orderAllocationForms.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.debtOrders = response.data.data.orderAllocationForms
          }
        })
        .catch(error => {
          console.log(error)
          self.debtOrders = []
        })
    },
    goToDebtOrder: function (order) {
      var self = this
      self.isConfirm = true
      self.retailerCode = order?.retailerCode || ''
      this.selected = []
      this.searchTextOrder = ''
      axiosInstance
        .get(`/order/allocation/search/sellin?keyWord=${order?.retailerCode}`)
        .then(response => {
          if (response) {
            self.autoAllocated = false
            self.isValidateAllocated = false
            self.totalValueAllocated =
              response?.data?.data?.orderAllocationForms?.allocatedAmount || 0
            self.retailerName =
              response?.data?.data?.orderAllocationForms?.name || ''
            self.totalValueOverdraft =
              response?.data?.data?.orderAllocationForms?.creditBalance || 0
            response.data.data.orderAllocationForms.list =
              response.data.data.orderAllocationForms.list.map(
                (obj, index) => ({
                  ...obj,
                  index: index + 1
                })
              )
            self.orderListofRetailer =
              response.data.data.orderAllocationForms.list
          }
        })
        .catch(e => {
          console.log('e', e)
        })
      self.autoAllocated = false
      self.isValidateAllocated = false
      const list = self.orderListofRetailer
      self.orderListofRetailer = list.map(item => {
        item.allocation = ''
        item.remainingValue = item?.amountAllocated
        return item ?? {}
      })
      self.modal = true
      self.debtOrder = order
    },
    formatNumber: function (number) {
      if (number != '0' && number != '' && typeof number !== 'undefined') {
        number = number.toString().replace(/[^0-9.]/g, '')
        return Number(number).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        })
      } else {
        return ''
      }
    },
    autoAllocateValueOrder: function (order) {
      var self = this
      self.isAuto = true
      // self.autoAllocated = true
      self.isValidateAllocated = true
      let totalAllocatedItem = 0
      let totalValueOverdraft = self.totalValueOverdraft

      const lengthSelect = this.selected.length
      let arraySelect = this.selected.sort((a, b) => a.index - b.index)
      if (lengthSelect > 0) {
        this.resetAutoLocation()
        for (let i = lengthSelect - 1; i >= 0; i--) {
          const item = arraySelect[i]
          const amountToAllocated = item.amountAllocated
          if (
            totalValueOverdraft > 0 &&
            totalValueOverdraft >= amountToAllocated &&
            totalValueOverdraft >= totalAllocatedItem
          ) {
            item.allocation = amountToAllocated
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = self.totalValueOverdraft - totalAllocatedItem
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= totalAllocatedItem &&
            totalValueOverdraft >= amountToAllocated
          ) {
            item.allocation = amountToAllocated
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = self.totalValueOverdraft - totalAllocatedItem
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= totalAllocatedItem &&
            totalValueOverdraft <= amountToAllocated
          ) {
            item.allocation = totalValueOverdraft || 0
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = 0
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= amountToAllocated
          ) {
            item.allocation = totalValueOverdraft || 0
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = 0
          } else {
            item.allocation = 0
          }
        }
      } else {
        const lengthArray = self.orderListofRetailer.length
        for (let i = lengthArray - 1; i >= 0; i--) {
          const item = self.orderListofRetailer[i]
          const amountToAllocated = item.amountAllocated
          if (
            totalValueOverdraft > 0 &&
            totalValueOverdraft >= amountToAllocated &&
            totalValueOverdraft >= totalAllocatedItem
          ) {
            item.allocation = amountToAllocated
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = self.totalValueOverdraft - totalAllocatedItem
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= totalAllocatedItem &&
            totalValueOverdraft >= amountToAllocated
          ) {
            item.allocation = amountToAllocated
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = self.totalValueOverdraft - totalAllocatedItem
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= totalAllocatedItem &&
            totalValueOverdraft <= amountToAllocated
          ) {
            item.allocation = totalValueOverdraft || 0
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = 0
          } else if (
            totalValueOverdraft >= 0 &&
            totalValueOverdraft <= amountToAllocated
          ) {
            item.allocation = totalValueOverdraft || 0
            totalAllocatedItem += item.allocation || 0
            totalValueOverdraft = 0
          } else {
            item.allocation = 0
          }
        }
      }
    },
    resetAutoLocation: function () {
      const lengthArray = this.orderListofRetailer.length
      for (let i = lengthArray - 1; i >= 0; i--) {
        const item = this.orderListofRetailer[i]
        item.allocation = 0
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
            self.filterDebtOrders()
            return
          }
          self.filterDebtOrders()
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
      self.debtOrders.sort(sortFn)
    },
    onOrderRequest: function (props) {
      var self = this

      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.orderPagination.sortBy == sortBy || !sortBy) {
        if (
          (self.orderPagination.page != page ||
            self.orderPagination.rowsPerPage != rowsPerPage) &&
          self.orderPagination.descending == descending
        ) {
          self.orderPagination.page = page
          self.orderPagination.rowsPerPage = rowsPerPage
          if (self.searchTextOrder.trim() != '') {
            self.filterOrders()
            return
          }
          self.goToDebtOrder()
        } else {
          if (self.orderPagination.descending != descending) {
            self.orderPagination.descending = descending
          } else {
            self.orderPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.orderPagination.sortBy = sortBy
      }

      let sortFn
      switch (self.orderPagination.sortBy) {
        case 'id':
          sortFn = self.orderPagination.descending
            ? (a, b) => b.id - a.id
            : (a, b) => a.id - b.id
          break

        default:
          sortFn = self.orderPagination.descending
            ? (a, b) =>
                a[self.orderPagination.sortBy] > b[self.orderPagination.sortBy]
                  ? -1
                  : a[self.orderPagination.sortBy] <
                    b[self.orderPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.orderPagination.sortBy] > b[self.orderPagination.sortBy]
                  ? 1
                  : a[self.orderPagination.sortBy] <
                    b[self.orderPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.orderListofRetailer.sort(sortFn)
    },
    filterDebtOrders: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebtOrders()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/order/allocations/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.totalValueAllocated =
            response?.data?.data?.orderAllocationForms?.allocatedAmount || 0
          self.retailerName =
            response?.data?.data?.orderAllocationForms?.name || ''
          self.totalValueOverdraft =
            response?.data?.data?.orderAllocationForms?.creditBalance || 0
          response.data.data.orderAllocationForms =
            response.data.data.orderAllocationForms.map((obj, index) => ({
              ...obj,
              index: index + 1
            }))
          self.debtOrders = response.data.data.orderAllocationForms
        })
        .catch(error => {
          console.log(error)
          self.debtOrders = []
        })
    },
    filterOrders: function () {
      var self = this
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url = '/order/allocation/search/sellin?keyWord=' + self.retailerCode
      if (self.searchTextOrder.trim() != '') {
        url += '&orderCode=' + self.searchTextOrder
      }
      axiosInstance
        .get(url)
        .then(response => {
          response.data.data.orderAllocationForms.list =
            response.data.data.orderAllocationForms.list.map((obj, index) => ({
              ...obj,
              index: index + 1
            }))
          self.orderListofRetailer =
            response.data?.data?.orderAllocationForms?.list
        })
        .catch(error => {
          console.log(error)
          self.orderListofRetailer = []
        })
    },
    // cập nhật phân bổ đơn hàng
    updateAllocateValueOrder: function () {
      var self = this
      const totalAllocated = self.totalValueAllocated
      const totalValueOverdraft = self.totalValueOverdraft
      let totalValue = 0

      if (self.totalValueOverdraft > 0) {
        self.orderListofRetailer.forEach(function (item) {
          const formatValue =
            typeof item?.allocation === 'string'
              ? isNaN(parseInt(item?.allocation))
                ? 0
                : parseInt(item?.allocation?.replaceAll(',', ''))
              : item?.allocation || 0
          totalValue += formatValue
        })
        if (totalAllocated === 0) {
          self.totalValueOverdraft = totalValueOverdraft - totalValue
          self.totalValueAllocated = totalValue
        } else if (totalAllocated === totalValue) {
          self.totalValueOverdraft = totalValueOverdraft
          self.totalValueAllocated = totalValue
        } else if (totalValue >= totalAllocated) {
          self.totalValueOverdraft =
            totalValueOverdraft - (totalValue - totalAllocated)
          self.totalValueAllocated = totalValue + (totalValue - totalAllocated)
        }
        self.orderListofRetailer.forEach(function (item) {
          const formatValueAllocated =
            typeof item?.allocation === 'string'
              ? isNaN(parseInt(item?.allocation))
                ? 0
                : parseInt(item?.allocation?.replaceAll(',', ''))
              : item?.allocation || 0
          const formatValueAmountToAllocated = item.amountAllocated || 0
          item.remainingAmount =
            formatValueAmountToAllocated - formatValueAllocated || 0
          return item
        })
        setTimeout(() => {
          self.isValidateAllocated = false
          self.autoAllocated = true
          self.isConfirm = false
        }, 500)
      }
    },
    onSubmit() {
      var self = this
      self.progress = true
      const inputData = self.orderListofRetailer.map(item => {
        return {
          ...item,
          allocation:
            typeof item?.allocation === 'string'
              ? isNaN(parseInt(item?.allocation))
                ? 0
                : parseInt(item?.allocation?.replaceAll(',', ''))
              : item?.allocation || 0
        }
      })

      const dataSubmit = {
        allocateType: 'string',
        allocatedAmount: self.totalValueAllocated,
        creditBalance: self.totalValueOverdraft,
        retailerCode: self.retailerCode,
        list: [...inputData]
      }
      axiosInstance
        .post('/order/allocations', dataSubmit)
        .then(response => {
          if (response?.data?.data?.message === 'successful') {
            self.progress = false
            self.modal = false
            Notify.create({
              message: 'Phân bổ đơn hàng thành công',
              color: 'positive',
              position: 'top',
              timeout: 2000
            })
            self.getDebtOrders()
          } else {
            self.progress = false
            self.$q.notify({
              color: 'danger',
              message: 'Phân bổ đơn hàng thất bại',
              icon: 'check_circle',
              position: 'top'
            })
          }
        })
        .catch(e => {
          self.progress = false
          self.$q.notify({
            color: 'danger',
            message: 'Phân bổ đơn hàng thất bại',
            icon: 'check_circle',
            position: 'top'
          })
        })
    },
    customFilter(rows, terms) {
      // rows contain the entire data
      // terms contains whatever you have as filter
      const lowerSearch = terms ? terms.toLowerCase() : ''
      const filteredRows = rows.filter((row, i) => {
        //If search term exists, convert to lower case and see which rows contain it
        if (lowerSearch != '') {
          //Get the values
          let s1_values = Object.values(row)
          //Convert to lowercase
          let s1_lower = s1_values.map(x => x.toString().toLowerCase())
          for (let val = 0; val < s1_lower.length; val++) {
            if (s1_lower[val].includes(lowerSearch)) {
              return true
            }
          }
        }
      })

      return filteredRows
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
