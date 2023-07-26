import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'WarehousesPage',
  data: function () {
    return {
      warehouses: [],
      initWarehouses: [],
      searchWarehousess: [],

      status: -1,
      progress: false,
      selected: [],
      modal: false,
      activateModal: false,
      warehouseTypes: [],
      warehouseType: 0,
      form: {
        id: 0,
        warehouseCode: '',
        warehouseName: '',
        warehouseTypeId: 1,
        cities: [],
        cityId: '',
        districts: [],
        districtId: '',
        wards: [],
        wardId: '',
        address: ''
      },
      searchText: '',
      edit: false,
      cityChange: false,
      types: [
        {
          code: 'ACTIVE',
          name: this.$t('general.active')
        },
        {
          code: 'INACTIVE',
          name: this.$t('general.inactive')
        }
      ],
      active: 'Active',
      statuses: {
        ACTIVE: 1,
        INACTIVE: 0
      },
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
      },
      isSearch: false,
      isGet: false,
      isFilter: false,
      is_focusInputSearch: false,
      dataLoading: false
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('warehouses.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'code',
          label: this.$t('warehouses.warehouse_code_col'),
          align: 'left',
          field: 'code',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'name',
          label: this.$t('warehouses.warehouse_name_col'),
          align: 'left',
          field: 'name',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'warehouseTypeId',
          label: this.$t('warehouses.warehouse_type_col'),
          align: 'left',
          field: 'warehouseTypeId',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'addressText',
          label: this.$t('warehouses.address_col'),
          align: 'left',
          field: 'addressText',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'status',
          label: this.$t('warehouses.status_col'),
          align: 'center',
          field: 'status',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    isValidToSend: function () {
      return (
        this.form.warehouseCode.trim().length > 0 &&
        this.form.warehouseName.trim().length > 0 &&
        this.form.address.trim().length > 0
      )
    }
  },
  mounted: function () {
    this.getWarehouseTypes()
    this.getCities()
  },
  methods: {
    getWarehouses: function () {
      var self = this
      self.dataLoading = true
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
        .get('/warehouses/search?segment=' + segment + '&offset=' + offset)
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.warehouses = response.data.data.warehouses.map(
              (obj, index) => ({ ...obj, index: segment + index + 1 })
            )
            self.warehouses = response.data.data.warehouses
            self.initWarehouses = response.data.data.warehouses
          } else {
            self.warehouses = []
            self.initWarehouses = []
          }
        })
    },
    onDetail: function (warehouseId) {
      this.edit = true
      this.form.id = warehouseId
      this.getWarehouseDetail(warehouseId)
      this.modal = true
    },
    getWarehouseDetail: function (warehouseId) {
      var self = this
      axiosInstance.get('/warehouse/' + warehouseId).then(response => {
        let warehouse = response.data.data.warehouse
        self.form.warehouseCode = warehouse.code
        self.form.warehouseName = warehouse.name
        self.form.warehouseTypeId = warehouse.warehouseTypeId
        self.form.address = warehouse.address
        self.form.cityId = '' + warehouse.cityId
        self.form.districtId = '' + warehouse.districtId
        self.form.wardId = '' + warehouse.wardId
        self.getDistricts()
        self.getWards()
      })
    },
    getCities: function () {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.form.cities = response.data.data.cities
        self.form.cityId = self.form.cities[0].id
      })
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
    getWarehouseTypes: function () {
      var self = this
      axiosInstance.get('/warehouse/types').then(response => {
        self.warehouseTypes = response.data.data.WarehouseTypes
        self.getWarehouses()
      })
    },
    onNew: function () {
      var self = this
      self.edit = false
      self.form.id = 0
      self.form.warehouseName = ''
      self.form.warehouseCode = ''
      let type = self.warehouseTypes.find(
        item => item.name.toLowerCase() == 'kho doanh nghiệp'
      )
      self.form.warehouseTypeId = type != undefined ? type.id : 1
      self.form.cityId = 50
      self.form.districtId = 550
      self.form.wardId = 8687
      self.form.address = ''
      self.modal = true
      self.getDistricts()
      self.getWards()
    },
    onChangeCity: function () {
      this.cityChange = true
      this.getDistricts()
    },
    onActive: function () {
      var self = this
      if (self.selected.length > 0) {
        self.activateModal = true
        self.active = self.selected[0].status
      }
    },
    requiredWarehouseName: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('warehouses.please_enter_warehouse_name')
      )
    },
    requiredWarehouseCode: function (val) {
      return (
        (val && val.length > 0) || this.$t('warehouses.enter_warehouse_code')
      )
    },
    requiredAddress: function (val) {
      return (
        (val && val.length > 0) || this.$t('warehouses.please_enter_address')
      )
    },
    addOrUpdateWarehouse: function () {
      var self = this
      let inputData = {}
      inputData['address'] = self.form.address
      inputData['cityId'] = parseInt(self.form.cityId)
      inputData['code'] = self.form.warehouseCode
      inputData['districtId'] = parseInt(self.form.districtId)
      inputData['name'] = self.form.warehouseName
      inputData['wardId'] = parseInt(self.form.wardId)
      inputData['warehouseTypeId'] = parseInt(self.form.warehouseTypeId)

      if (self.edit) {
        inputData['warehouseId'] = self.form.id
        axiosInstance
          .put('/warehouses', inputData)
          .then(() => {
            self.progress = false
            self.modal = false
            self.getWarehouses()
          })
          .catch(errors => {
            self.progress = false
            Notify.create({
              message: errors.response.data.errors[0].message,
              type: 'negative',
              position: 'top'
            })
          })
      } else {
        axiosInstance
          .post('/warehouses', inputData)
          .then(() => {
            self.progress = false
            self.modal = false
            self.getWarehouses()
          })
          .catch(error => {
            self.progress = false
            let message = ''
            switch (error.response.data.errors[0].code) {
              case '1402':
                message = `${self.$t('warehouses.warehouse_code')} ${
                  self.form.warehouseCode
                } ${self.$t('warehouses.exists_warehouse_code')}`
                break

              default:
                message = self.$t('warehouses.create_failed')
                break
            }
            Notify.create({
              message: message,
              type: 'negative',
              position: 'top'
            })
          })
      }
    },
    searchWarehouses: function () {
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
      let url = '/warehouses/search?segment=' + segment + '&offset=' + offset
      if (self.warehouseType == 0 && self.status == -1) {
        self.getWarehouses()
        return
      }
      if (self.warehouseType == 0) {
        url += '&status=' + self.status
      } else if (self.status == -1) {
        url += '&warehouseTypeId=' + self.warehouseType
      } else {
        url +=
          '&status=' +
          self.status +
          '&' +
          'warehouseTypeId=' +
          self.warehouseType
      }

      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.warehouses = response.data.data.warehouses.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.warehouses = response.data.data.warehouses
          self.initWarehouses = response.data.data.warehouses
        } else {
          self.warehouses = []
          self.initWarehouses = []
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
            self.searchWarehouses()
          } else if (self.isGet) {
            self.getWarehouses()
          } else {
            self.filterWarehouses()
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
      self.warehouses.sort(sortFn)
    },
    filterWarehouses: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getWarehouses()
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
      axiosInstance
        .get(
          '/warehouses/search?segment=' +
            segment +
            '&offset=' +
            offset +
            '&keyword=' +
            self.searchText.trim()
        )
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.warehouses = response.data.data.warehouses.map(
              (obj, index) => ({ ...obj, index: segment + index + 1 })
            )
            self.warehouses = response.data.data.warehouses
            self.initWarehouses = response.data.data.warehouses
          } else {
            self.warehouses = []
            self.initWarehouses = []
          }
        })
    }
  }
})
