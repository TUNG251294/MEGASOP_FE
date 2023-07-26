import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Lịch sử nhập kho',
  data: function () {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      warehouses: [],

      importHistory: [],
      initHistory: [],
      searchText: '',
      minUnits: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      warehouseId: 0,
      isSearch: false,
      isGet: false,
      isFilter: false,
      is_focusInputSearch: false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('import.id_col'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'importDate',
          label: this.$t('import.import_time_col'),
          align: 'left',
          field: 'importDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'sku',
          label: this.$t('import.product_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productVariationName',
          label: this.$t('import.product_name_col'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitId',
          label: this.$t('import.unit_col'),
          align: 'left',
          field: 'unitId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amount',
          label: this.$t('import.amount_col'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'importTicketCode',
          label: this.$t('import.form_code_col'),
          align: 'left',
          field: 'importTicketCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'warehouseId',
          label: this.$t('import.warehouse_name_col'),
          align: 'left',
          field: 'warehouseId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'personInCharge',
          label: this.$t('import.staff_in_charge_col'),
          align: 'left',
          field: 'personInCharge',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'description',
          label: this.$t('import.note_col'),
          align: 'left',
          field: 'description',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: async function () {
    await this.getMinUnits()
    await this.getWarehouses()
  },
  methods: {
    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      let fromDate = date.extractDate(this.fromDate, 'DD/MM/YYYY')
      let lateDate = date.addToDate(fromDate, { days: 30 })
      return (
        dt <= lateDate && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
      )
    },
    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      let toDate = date.extractDate(this.toDate, 'DD/MM/YYYY')
      let earlyDate = date.subtractFromDate(toDate, { days: 30 })
      return dt <= toDate && dt > earlyDate
    },
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
        self.getImportHistory()
      })
    },
    getMinUnits: function () {
      var self = this
      axiosInstance.get('/units').then(response => {
        self.minUnits = response.data.data.units
      })
    },
    getImportHistory: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = true
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      axiosInstance
        .get(
          '/warehouse/item/history/import/search?segment=' +
            segment +
            '&offset=' +
            offset
        )
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.WarehouseItemHistory =
              response.data.data.WarehouseItemHistory.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.importHistory = response.data.data.WarehouseItemHistory
            self.initHistory = response.data.data.WarehouseItemHistory
          } else {
            self.importHistory = []
            self.initHistory = []
          }
        })
    },
    onRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.pagination.sortBy == sortBy) {
        if (
          (self.pagination.page != page ||
            self.pagination.rowsPerPage != rowsPerPage) &&
          self.pagination.descending == descending
        ) {
          self.pagination.page = page
          self.pagination.rowsPerPage = rowsPerPage
          if (self.isSearch) {
            self.searchHistory()
          } else if (self.isGet) {
            self.getImportHistory()
          } else {
            self.filterHistory()
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
      } else {
        if (self.pagination.descending != descending) {
          self.pagination.descending = descending
        } else {
          self.pagination.descending = !descending
        }
      }
      let sortFn
      switch (self.pagination.sortBy) {
        case 'id':
          sortFn = self.pagination.descending
            ? (a, b) => b.id - a.id
            : (a, b) => a.id - b.id
          break
        case 'amount':
          sortFn = self.pagination.descending
            ? (a, b) => b.amount - a.amount
            : (a, b) => a.amount - b.amount
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
      self.importHistory.sort(sortFn)
    },
    searchHistory: function () {
      var self = this
      let fromDate = date.extractDate(self.fromDate, 'DD/MM/YYYY')
      let toDate = date.extractDate(self.toDate, 'DD/MM/YYYY')
      let diffDate = date.getDateDiff(toDate, fromDate, 'days')
      if (diffDate > 30) {
        Notify.create({
          message: self.$t('import.rule_select_date'),
          type: 'negative',
          position: 'top'
        })
        return
      }

      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isGet = false
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/warehouse/item/history/import/search?segment=' +
        segment +
        '&offset=' +
        offset +
        '&fromDate=' +
        date.formatDate(fromDate, 'YYYY-MM-DD') +
        '&toDate=' +
        date.formatDate(toDate, 'YYYY-MM-DD')
      if (self.warehouseId != 0) {
        url += '&warehouseId=' + self.warehouseId
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.WarehouseItemHistory =
            response.data.data.WarehouseItemHistory.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.importHistory = response.data.data.WarehouseItemHistory
          self.initHistory = response.data.data.WarehouseItemHistory
        } else {
          self.importHistory = []
          self.initHistory = []
        }
      })
    },
    filterHistory: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getImportHistory()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/warehouse/item/history/import/search?segment=' +
        segment +
        '&offset=' +
        offset +
        '&keyword=' +
        self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.WarehouseItemHistory =
            response.data.data.WarehouseItemHistory.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.importHistory = response.data.data.WarehouseItemHistory
          self.initHistory = response.data.data.WarehouseItemHistory
        } else {
          self.importHistory = []
          self.initHistory = []
        }
      })
    }
  }
})
