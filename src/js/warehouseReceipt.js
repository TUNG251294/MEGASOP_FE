import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'WarehouseReceipt',
  data: function () {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      rows: [],

      warehouses: [],
      warehouseId: 0,
      searchText: '',
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      isSearch: false,
      isGet: false,
      isFilter: false,
      initTickets: [],
      is_focusInputSearch: false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('stock.id_col'),
          align: 'left',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'importDate',
          label: this.$t('stock.import_time_col'),
          align: 'left',
          field: 'importDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'importTicketCode',
          label: this.$t('stock.received_code_col'),
          align: 'left',
          field: 'importTicketCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'warehouseId',
          label: this.$t('stock.warehouse_name_col'),
          align: 'left',
          field: 'warehouseId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'importPerson',
          label: this.$t('stock.staff_in_charge_col'),
          align: 'left',
          field: 'importPerson',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        // {
        //   name: "total",
        //   label: "Tồn kho tối thiểu",
        //   align: "left",
        //   field: "total",
        //   format: (val) => `${val}`,
        //   sortable: true,
        // },
        {
          name: 'description',
          label: this.$t('stock.note_col'),
          align: 'left',
          field: 'description',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'status',
          label: this.$t('stock.status_col'),
          align: 'center',
          field: 'status',
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
      return (
        dt <= Date.now() && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
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
        if (self.warehouses.length > 0) {
          self.getWarehouseReceipt()
        }
      })
    },
    getWarehouseReceipt: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = true
        self.isFilter = false
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      self.searchText = ''
      axiosInstance
        .get(
          '/warehouse/import/tickets/search?segment=' +
            segment +
            '&offset=' +
            offset
        )
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.WarehouseImportTicketDtos =
              response.data.data.WarehouseImportTicketDtos.map(
                (obj, index) => ({ ...obj, index: segment + index + 1 })
              )
            self.rows = response.data.data.WarehouseImportTicketDtos
            self.initTickets = response.data.data.WarehouseImportTicketDtos
          } else {
            self.rows = []
            self.initTickets = []
          }
        })
    },
    createReceipt: function () {
      LocalStorage.set('wh_a_e_t', 1)
      LocalStorage.set('warehouseImportTicketItems', [])
      this.$router.push('/warehouse-receipt-create')
    },
    searchWarehouseReceipts: function () {
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
      let url =
        '/warehouse/import/tickets/search?segment=' +
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
      if (self.warehouseId) {
        url += '&warehouseId=' + self.warehouseId
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.WarehouseImportTicketDtos =
            response.data.data.WarehouseImportTicketDtos.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.WarehouseImportTicketDtos
          self.initTickets = response.data.data.WarehouseImportTicketDtos
        } else {
          self.rows = []
          self.initTickets = []
        }
      })
    },
    goToDetail: function (id) {
      LocalStorage.set('wh_ip_t_i', id)
      this.$router.push('/warehouse-receipt-detail')
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
            self.searchWarehouseReceipts()
          } else if (self.isFilter) {
            self.filterTickets()
          } else {
            self.getWarehouseReceipt()
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
    filterTickets: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getWarehouseReceipt()
        return
      }

      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      axiosInstance
        .get(
          '/warehouse/import/tickets/search?segment=' +
            segment +
            '&offset=' +
            offset +
            '&keyword=' +
            self.searchText.trim()
        )
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.WarehouseImportTicketDtos =
              response.data.data.WarehouseImportTicketDtos.map(
                (obj, index) => ({ ...obj, index: segment + index + 1 })
              )
            self.rows = response.data.data.WarehouseImportTicketDtos
            self.initTickets = response.data.data.WarehouseImportTicketDtos
          } else {
            self.rows = []
            self.initTickets = []
          }
        })
    }
  }
})
