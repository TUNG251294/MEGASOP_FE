import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Lịch sử tồn kho',
  data: function () {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), {
          days: 7
        }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      warehouses: [],
      searchText: '',

      histories: [],
      initHistories: [],
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
      is_focusInputSearch: false
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('inventory_list.ordinal_number'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'sku',
          label: this.$t('inventory_list.product_id'),
          align: 'center',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productVariationName',
          label: this.$t('inventory_list.product_name'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitName',
          label: this.$t('inventory_list.unit'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountAtStartDate',
          label: this.$t('inventory_list.inventory_for_the_period'),
          align: 'right',
          field: 'amountAtStartDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountImportInPeriod',
          label: this.$t('inventory_list.import_the_period'),
          align: 'right',
          field: 'amountImportInPeriod',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountExportInPeriod',
          label: this.$t('inventory_list.export_the_period'),
          align: 'right',
          field: 'amountExportInPeriod',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountAtEndDate',
          label: this.$t('inventory_list.actual_inventory'),
          align: 'right',
          field: 'amountAtEndDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    this.getWarehouses()
  },
  methods: {
    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      let earlyDate = date.addToDate(
        date.extractDate(self.fromDate, 'DD/MM/YYYY'),
        {
          days: 30
        }
      )
      return (
        dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY') &&
        dt <= Date.now() &&
        dt <= earlyDate
      )
    },
    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
        self.getHistories()
      })
    },
    getHistories: function () {
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
          '/warehouse/daily/remain/search/advance?segment=' +
            segment +
            '&offset=' +
            offset +
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
        )
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.warehouseDailyRemains =
              response.data.data.warehouseDailyRemains.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.histories = response.data.data.warehouseDailyRemains
            self.initHistories = response.data.data.warehouseDailyRemains
          } else {
            self.histories = []
            self.initHistories = []
          }
        })
    },
    searchHistory: function () {
      var self = this
      let fromDate = date.extractDate(self.fromDate, 'DD/MM/YYYY')
      let toDate = date.extractDate(self.toDate, 'DD/MM/YYYY')
      let diffDate = date.getDateDiff(toDate, fromDate, 'days')
      if (diffDate > 30) {
        Notify.create({
          message: this.$t('inventory_list.please_select_an_end_date'),
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
        '/warehouse/daily/remain/search/advance?segment=' +
        segment +
        '&offset=' +
        offset +
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
      if (self.warehouseId != 0) {
        url += '&warehouseId=' + self.warehouseId
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.warehouseDailyRemains =
            response.data.data.warehouseDailyRemains.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.histories = response.data.data.warehouseDailyRemains
          self.initHistories = response.data.data.warehouseDailyRemains
        } else {
          self.histories = []
          self.initHistories = []
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
            self.getHistories()
          } else {
            self.filterInventory()
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
      switch (self.pagination.sortBy.includes('amount')) {
        case true:
          sortFn = self.pagination.descending
            ? (a, b) => b[self.pagination.sortBy] - a[self.pagination.sortBy]
            : (a, b) => a[self.pagination.sortBy] - b[self.pagination.sortBy]
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
      self.histories.sort(sortFn)
    },
    filterInventory: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getHistories()
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
        '/warehouse/daily/remain/search/advance?segment=' +
        segment +
        '&offset=' +
        offset +
        '&keyWord=' +
        self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.warehouseDailyRemains =
            response.data.data.warehouseDailyRemains.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.histories = response.data.data.warehouseDailyRemains
          self.initHistories = response.data.data.warehouseDailyRemains
        } else {
          self.histories = []
          self.initHistories = []
        }
      })
    }
  }
})
