import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { exportFile, useQuasar, Notify, LocalStorage } from 'quasar'
import { mapActions, mapState, mapGetters } from 'vuex'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Tạo phiếu nhập kho',
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
      nodeSelected: {}
    }
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
        }
        // {
        //   name: "action",
        //   label: "",
        //   align: "left",
        //   field: "action",
        //   format: (val) => `${val}`,
        //   sortable: true,
        // },
      ]
    },
    columnsI18n: function () {
      return [
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
    this.getWarehouseImportTicketItems()
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
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
        self.form.warehouseCode = self.warehouses[0].code
        self.form.warehouseId = self.warehouses[0].id
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

      let warehouse = LocalStorage.getItem('warehouseImportTicketItems')
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
            message: self.$t('stock.import_successful'),
            type: 'positive',
            position: 'top'
          })
          self.hideModal()
          // self.exportErrorList();
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('stock.import_failed'),
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
    removeProduct: function (product) {
      this.$store.dispatch('warehouseImportTicketItems/removeItem', {
        product: product
      })
    },
    wrapCsvValue: function (val, formatFn) {
      let formatted = formatFn !== void 0 ? formatFn(val) : val

      formatted =
        formatted === void 0 || formatted === null ? '' : String(formatted)

      formatted = formatted.split('"').join('""')

      return `"${formatted}"`
    },
    exportErrorList: function () {
      // const $q = useQuasar();
      // var self = this;
      // const content = [
      //   self.errorColumns.map((col) => self.wrapCsvValue(col.label)).join(";"),
      // ]
      //   .concat(
      //     self.failureList.map((row) =>
      //       self.errorColumns
      //         .map((col) =>
      //           self.wrapCsvValue(
      //             typeof col.field === "function"
      //               ? col.field(row)
      //               : row[col.field === void 0 ? col.name : col.field],
      //             col.format
      //           )
      //         )
      //         .join(";")
      //     )
      //   )
      //   .join("\r\n");

      // const status = exportFile("import-failure.csv", content, "text/csv");

      // if (status !== true) {
      //   $q.notify({
      //     message: "Browser denied file download...",
      //     color: "negative",
      //     icon: "warning",
      //   });
      // }
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
    saveInfo: function () {
      var self = this
      self.progress = true
      var inputData = {}
      inputData['description'] = self.form.description
      inputData['importType'] = 0
      inputData['warehouseId'] = self.form.warehouseId
      inputData['warehouseImportTicketItems'] = new Array()
      let warehouse = LocalStorage.getItem('warehouseImportTicketItems')
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
          .post('/warehouse/import/tickets', inputData)
          .then(response => {
            LocalStorage.remove('warehouseImportTicketItems')
            self.progress = false
            self.$router.push('/warehouse-receipt')
          })
          .catch(() => {
            self.progress = false
          })
      }
    },
    onAdd: function () {
      this.persistent = true
      this.products = []
      this.rows = []
      this.initRows = []
      this.pagination.page = 1
    },
    // addProduct: function (product) {
    //   if (product.amount == null || product.amount == "") {
    //     Notify.create({
    //       message: "Vui lòng nhập số lượng sản phẩm",
    //       type: "negative",
    //       position: "top",
    //     });
    //     return;
    //   }
    //   this.products.push(product);
    //   this.rows = this.rows.filter(
    //     (row) => row.productVariationId != product.productVariationId
    //   );
    // },
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
    cancel: function () {
      this.$store.dispatch("warehouseImportTicketItems/resetWarehouse")
      this.$router.push('/warehouse-receipt')
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
            message: self.$t('stock.not_found'),
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
    cancelImport: function () {
      var self = this
      //   self.$store.dispatch("warehouseImportTicketItems/resetWarehouse");
      self.products = []
      self.persistent = false
    },
    importProducts: function () {
      var self = this

      let productHaveQuantity = self.rows.filter(
        row => ![null, undefined, ''].includes(row.amount) && row.amount > 0
      )

      if (!productHaveQuantity.length) {
        Notify.create({
          message: self.$t('stock.please_enter_product_quantity'),
          type: 'negative',
          position: 'top'
        })
        return
      }

      productHaveQuantity.forEach(product => {
        self.$store.dispatch(
          'warehouseImportTicketItems/addProductToWarehouse',
          {
            product: product
          }
        )
      })
      self.persistent = false
    },
    changeWarehouse: function () {
      var self = this
      let warehouse = self.warehouses.find(
        item => item.id == self.form.warehouseId
      )
      self.form.warehouseCode = warehouse != undefined ? warehouse.code : ''
    }
  }
})
