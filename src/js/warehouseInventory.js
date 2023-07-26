import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { Constants } from 'boot/Constants'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'Danh sách tồn kho',
  data: function () {
    return {
      warehouses: [],
      warehouseId: 0,
      searchText: '',
      inventories: [],
      initInventories: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'sku',
        descending: false
      },
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
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productName',
          label: this.$t('inventory_list.product_name'),
          align: 'left',
          field: 'productName',
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
          name: 'amountToday',
          label: this.$t('inventory_list.inventory_for_the_day'),
          align: 'right',
          field: 'amountToday',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountImport',
          label: this.$t('inventory_list.import_the_day'),
          align: 'right',
          field: 'amountImport',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountExport',
          label: this.$t('inventory_list.export_the_day'),
          align: 'right',
          field: 'amountExport',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountApprovedOrder',
          label: this.$t('inventory_list.hang_on_the_order'),
          align: 'right',
          field: 'amountApprovedOrder',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amount',
          label: this.$t('inventory_list.actual_inventory'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'amountAvailable',
          label: this.$t('inventory_list.available_inventory'),
          align: 'right',
          field: 'amountAvailable',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    this.getWarehouses()
    this.getInventories()
  },
  methods: {
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
      })
    },
    getInventories: function () {
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
      let url =
        '/warehouse/daily/remain/search?segment=' +
        segment +
        '&offset=' +
        offset

      let productName = this.$route.query.keyword
      if (undefined !== productName && '' !== productName.trim()) {
        self.searchText = productName
        url += '&keyWord=' + self.searchText
      }

      axiosInstance.get(url).then(response => {
        self.dataLoading = false
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.warehouseDailyRemains =
            response.data.data.warehouseDailyRemains.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.inventories = response.data.data.warehouseDailyRemains
          self.initInventories = response.data.data.warehouseDailyRemains
        } else {
          self.inventories = []
          self.initInventories = []
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
            self.search()
          } else {
            self.getInventories()
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
      self.inventories.sort(sortFn)
    },
    search: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isGet = false
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      if (self.warehouseId == 0) {
        self.getInventories()
        return
      }
      let url =
        '/warehouse/daily/remain/search?segment=' +
        segment +
        '&offset=' +
        offset +
        '&warehouseId=' +
        self.warehouseId

      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.warehouseDailyRemains =
            response.data.data.warehouseDailyRemains.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.inventories = response.data.data.warehouseDailyRemains
          self.initInventories = response.data.data.warehouseDailyRemains
        } else {
          self.inventories = []
          self.initInventories = []
        }
      })
    },
    goToHistory: function () {
      this.$router.push('/warehouse-inventory-history')
    },
    filterInventory: function () {
      var self = this
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      if (self.searchText.trim() == '') {
        self.getInventories()
        return
      }

      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage

      let url =
        '/warehouse/daily/remain/search?segment=' +
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
          self.inventories = response.data.data.warehouseDailyRemains
          self.initInventories = response.data.data.warehouseDailyRemains
        } else {
          self.inventories = []
          self.initInventories = []
        }
      })
    }
  }
})
