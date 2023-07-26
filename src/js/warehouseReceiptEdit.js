import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'
import { mapActions, mapState, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Chỉnh sửa phiếu nhập kho',
  data: function () {
    return {
      form: {
        importTicketCode: '',
        warehouseCode: '',
        warehouseId: 0,
        staffName: '',
        staffId: 0,
        description: '',
        products: []
      },
      warehouses: [],
      persistent: false,

      categories: [],
      searchText: '',
      uploadFile: false,
      fileName: '',
      canUpload: false,
      failureList: [],

      selected: '',
      rows: [],
      initRows: [],
      products: [],
      progress: false,
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      isGet: false,
      nodeSelected: {},
      ticketInfo: {}
    }
  },
  created: function () {
    this.$store.dispatch('warehouseImportTicketItems/resetWarehouse')
  },
  computed: {
    ...mapState('warehouseImportTicketItems', ['warehouseImportTicketItems']),
    ...mapGetters('warehouseImportTicketItems', ['warehouseItemCount']),
    addColumnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('stock.id_col'),
          align: 'left',
          field: 'index',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sku',
          label: this.$t('stock.product_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productVariationName',
          label: this.$t('stock.product_name_col'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitName',
          label: this.$t('stock.unit_col'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'amount',
          label: this.$t('stock.amount_col'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: false
        },
        {
          name: 'action',
          label: '',
          align: 'left',
          field: 'action',
          format: val => `${val}`,
          sortable: true
        }
      ]
    },
    columnsI18n: function () {
      return [
        {
          name: 'sku',
          label: this.$t('stock.product_code_col'),
          align: 'center',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productVariationName',
          label: this.$t('stock.product_name_col'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitName',
          label: this.$t('stock.unit_col'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'amount',
          label: this.$t('stock.amount_col'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: false
        },
        {
          name: 'action',
          label: '',
          align: 'left',
          field: 'action',
          format: val => `${val}`,
          sortable: true
        }
      ]
    },
    errorColumnsI18n: function () {
      return [
        {
          name: 'orderNumber',
          label: this.$t('stock.id_col'),
          align: 'left',
          field: 'orderNumber',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sku',
          label: this.$t('stock.product_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'amount',
          label: this.$t('stock.amount_col'),
          align: 'left',
          field: 'amount',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'error',
          label: this.$t('stock.error_col'),
          align: 'left',
          field: 'error',
          format: val => `${val}`,
          sortable: true
        }
      ]
    }
  },
  mounted: function () {
    this.getWarehouses()
    this.getCategories()
  },
  methods: {
    ...mapActions('warehouseImportTicketItems', [
      'getWarehouseImportTicketItems'
    ]),
    onKeydown:function(event) {
      const target = event.target;
      const next = target.closest('tr').nextElementSibling;
      const prev = target.closest('tr').previousElementSibling;

      switch (event.keyCode) {
        case 40:
          next && next.querySelector('.input_qty').focus();
          break;
        case 38:
          prev && prev.querySelector('.input_qty').focus();
          break;
      }
    },
    getWarehouseImportTicketDetail: function () {
      var self = this
      let ticketId = LocalStorage.getItem('wh_ip_t_i')
      if (ticketId == null || ticketId == '') {
        self.$router.push('/warehouse-receipt')
        return
      }
      axiosInstance
        .get(
          '/warehouse/import/ticket/detail?warehouseImportTicketId=' + ticketId
        )
        .then(response => {
          self.ticketInfo = response.data.data.warehouseImpTicketDto
          self.form.warehouseId = self.ticketInfo.warehouseId
          self.form.warehouseCode = self.warehouses.find(
            item => item.id == self.form.warehouseId
          ).code
          self.ticketInfo.warehouseImportTicketItems.forEach(product => {
            self.$store.dispatch(
              'warehouseImportTicketItems/addProductToWarehouse',
              {
                product: product
              }
            )
          })
        })
    },
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
        self.getWarehouseImportTicketDetail()
      })
    },
    getCategories: function () {
      var self = this
      let categories = LocalStorage.getItem(Constants.CATEGORIES)
      if (categories != null) {
        self.categories = LocalStorage.getItem(Constants.CATEGORIES)
        return
      }
      axiosInstance.get('/category/list').then(response => {
        let categories = response.data.data.categories
        let nodesLv0 = categories.filter(category => category.level == 0)
        let nodesLv1 = categories.filter(category => category.level == 1)
        let nodesLv2 = categories.filter(category => category.level == 2)

        nodesLv1.forEach(item => {
          item['children'] = []
          nodesLv2.forEach(tmp => {
            if (tmp.parentIdLv1 == item.id) {
              tmp['header'] = 'generic'
              tmp['children'] = []
              item['children'].push(tmp)
            }
          })
        })

        nodesLv0.forEach(item => {
          item['children'] = []
          nodesLv1.forEach(tmp => {
            if (tmp.parentIdLv0 == item.id) {
              if (tmp.children.length == 0) {
                tmp['header'] = 'generic'
              }
              item['children'].push(tmp)
            }
          })
          if (item.children.length == 0) {
            item['header'] = 'generic'
          }
        })
        self.categories = nodesLv0
        LocalStorage.set(Constants.CATEGORIES, self.categories)
      })
    },
    changeWarehouse: function () {
      var self = this
      let warehouse = self.warehouses.find(
        item => item.id == self.form.warehouseId
      )
      self.form.warehouseCode = warehouse != undefined ? warehouse.code : ''
    },
    downloadTemplate: function () {
      axiosInstance
        .get('/warehouse/import/ticket/items/template/download', {
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
          a.download = `template_${new Date().getTime()}.xlsx`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
    },
    cancel: function () {
      LocalStorage.remove(Constants.WAREHOUSE_IMPORT_TICKET_ITEMS)
      this.$router.push('/warehouse-receipt-detail')
    },
    onFileSelected: function (event) {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        this.canUpload = false
        return false
      }
      let file = files.item(0)
      this.fileName = file.name
      this.canUpload = true
      this.upload(file)
    },
    upload: function (file) {
      var self = this
      self.progress = true
      let formData = new FormData()
      formData.append('file', file)
      axiosInstance
        .post('/warehouse/import/ticket/items/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          self.progress = false
          self.failureList = response.data.data.failureList
          let products = response.data.data.successList
          products.forEach(product => {
            self.$store.dispatch(
              'warehouseImportTicketItems/addProductToWarehouse',
              {
                product: product
              }
            )
          })

          Notify.create({
            message: this.$t('stock.import_successful'),
            type: 'positive',
            position: 'top'
          })
          self.hideModal()
          // self.exportErrorList();
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('stock.import_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    hideModal: function () {
      this.fileName = ''
      this.uploadFile = false
      this.canUpload = false
    },
    exportErrorList: function () {
      let inputData = {}
      inputData['errorItems'] = this.failureList
      axiosInstance
        .post('/warehouse/import/ticket/items/error/download', inputData, {
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
          a.download = `error_items_${new Date().getTime()}.xlsx`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
    },
    changeAmount: function (product) {
      var self = this
      if (
        product.amount == null ||
        product.amount == '' ||
        product.amount == 0
      ) {
        self.$store.dispatch('warehouseImportTicketItems/removeItem', {
          product: product
        })
        return
      }
      self.$store.dispatch('warehouseImportTicketItems/updateAmountItem', {
        product: product
      })
    },
    removeProduct: function (product) {
      this.$store.dispatch('warehouseImportTicketItems/removeItem', {
        product: product
      })
    },
    cancelImport: function () {
      var self = this
      self.products = []
      self.persistent = false
    },
    onAdd: function () {
      this.persistent = true
      this.products = []
      this.rows = []
      this.initRows = []
      this.pagination.page = 1
    },
    search: function (node, filter) {
      const filt = filter.toLowerCase()
      return node.name && node.name.toLowerCase().indexOf(filt) > -1
    },
    getProductByCategory: function (node) {
      var self = this
      self.searchText = ''
      let categoryId = node.id
      let isEqual = JSON.stringify(self.nodeSelected) === JSON.stringify(node)
      if (!isEqual) {
        self.nodeSelected = node
        self.isGet = false
        self.pagination.page = 1
      } else {
        self.isGet = true
      }

      let warehouse = LocalStorage.getItem(
        Constants.WAREHOUSE_IMPORT_TICKET_ITEMS
      )
      let ids =
        warehouse != null && warehouse.length > 0
          ? warehouse.map(item => item.product.productVariationId)
          : []
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let inputData = {}
      inputData['segment'] = segment
      inputData['offset'] = self.pagination.rowsPerPage
      inputData['productVariationIds'] = ids

      axiosInstance
        .post('/productCategory/' + categoryId + '/products', inputData)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.productVariations =
              response.data.data.productVariations.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.initRows = response.data.data.productVariations
            self.rows = response.data.data.productVariations
          } else {
            self.initRows = []
            self.rows = []
          }
        })
    },
    filterProduct: function (isFilter = true) {
      var self = this
      let inputData = {}
      if (isFilter) {
        self.pagination.page = 1
      }
      if (self.searchText.trim() !== '') {
        inputData['keyword'] = self.searchText.trim()
      }

      inputData['segment'] =
        (self.pagination.page - 1) * self.pagination.rowsPerPage
      inputData['offset'] = self.pagination.rowsPerPage
      // inputData['productVariationIds'] = productIds
      axiosInstance
        .post('/productVariations/searchIds', inputData)
        .then(response => {
          self.rows = response.data.data.productVariationDtos
          self.rows = self.rows.map(obj => ({
            ...obj,
            productVariationId: obj.id,
            productVariationName: obj.name
          }))
          self.pagination.rowsNumber = response.data.data.count
        })
        .catch(() => {
          Notify.create({
            message: this.$t('promotions.not_found_product'),
            type: 'negative',
            position: 'top'
          })
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
          if (self.searchText.trim() == '') {
            self.getProductByCategory(self.nodeSelected)
          } else {
            self.filterProduct(false)
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
      self.rows.sort(sortFn)
    },
    addProduct: function (product) {
      if (product.amount == null || product.amount == '') {
        Notify.create({
          message: this.$t('stock.please_enter_product_quantity'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      this.products.push(product)
      this.rows = this.rows.filter(
        row => row.productVariationId != product.productVariationId
      )
    },
    importProducts: function () {
      var self = this
      self.products.forEach(product => {
        self.$store.dispatch(
          'warehouseImportTicketItems/addProductToWarehouse',
          {
            product: product
          }
        )
      })
      self.persistent = false
    },
    saveInfo: function () {
      var self = this
      self.progress = true
      var inputData = {}
      inputData['description'] = self.form.description
      inputData['importType'] = 0
      inputData['warehouseId'] = self.form.warehouseId
      inputData['ticketId'] = LocalStorage.getItem(
        Constants.WAREHOUSE_IMPORT_TICKET_ID
      )
      inputData['warehouseImportTicketItems'] = new Array()
      let warehouse = LocalStorage.getItem(
        Constants.WAREHOUSE_IMPORT_TICKET_ITEMS
      )
      const flag = warehouse.every(element => {
        let item = {}
        if (
          parseInt(element.product.amount) <= 0 ||
          isNaN(parseInt(element.product.amount))
        ) {
          return false
        }
        item['amount'] = parseInt(element.product.amount)
        item['incomePrice'] = element.product.incomePrice
        item['productId'] = element.product.productId
        item['productVariationId'] = element.product.productVariationId
        item['sku'] = element.product.sku
        item['total'] = parseInt(
          element.product.amount * element.product.incomePrice
        )
        item['unitId'] = element.product.unitId
        inputData['warehouseImportTicketItems'].push(item)
        return true
      })
      if (!flag) {
        self.progress = false
        Notify.create({
          message: self.$t('stock.please_enter_product_quantity'),
          type: 'negative',
          position: 'top'
        })
      } else {
        axiosInstance
          .put('/warehouse/import/tickets', inputData)
          .then(() => {
            self.progress = false
            Notify.create({
              message: this.$t('stock.edit_warehouse_received_success'),
              position: 'top',
              type: 'positive'
            })
            LocalStorage.remove(Constants.WAREHOUSE_IMPORT_TICKET_ITEMS)

            self.$router.push('/warehouse-receipt-detail')
          })
          .catch(() => {
            self.progress = false
            Notify.create({
              message: this.$t('stock.edit_warehouse_received_fail'),
              position: 'top',
              type: 'negative'
            })
          })
      }
    }
  }
})
