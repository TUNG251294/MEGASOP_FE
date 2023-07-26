import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'ProductsPage',
  data: function () {
    return {
      rows: [],
      selected: [],
      searchText: '',
      showColumns: false,
      visibleColumns: [
        'index',
        'sku',
        'name',
        // "brandName",
        'categoryLv0',
        'categoryLv1',
        'categoryLv2',
        'incomePrice',
        'price',
        'virtualPrice',
        'status'
      ],
      form: {
        status: -1,
        brand: 0
      },
      brands: [],
      initProducts: [],
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
      is_focusInputSearch: false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'sku',
          label: this.$t('products.sku_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'name',
          label: this.$t('products.version_name_col'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        // {
        //   name: "brandName",
        //   label: "THƯƠNG HIỆU ",
        //   align: "left",
        //   field: "brandName",
        //   format: (val) => `${val}`,
        //   sortable: true,
        //   headerClasses: "font-weight-bolder",
        // },
        {
          name: 'categoryLv0',
          label: this.$t('products.level_1_col'),
          align: 'left',
          field: 'categoryLv0',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'categoryLv1',
          label: this.$t('products.level_2_col'),
          align: 'left',
          field: 'categoryLv1',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'categoryLv2',
          label: this.$t('products.level_3_col'),
          align: 'left',
          field: 'categoryLv2',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'incomePrice',
          label: this.$t('products.purchase_price_col'),
          align: 'right',
          field: 'incomePrice',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'price',
          label: this.$t('products.sales_price_col'),
          align: 'right',
          field: 'price',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'virtualPrice',
          label: this.$t('products.brick_price_col'),
          align: 'right',
          field: 'virtualPrice',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'status',
          label: this.$t('products.status_col'),
          align: 'center',
          field: 'status',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    this.getProductVariations()
    // this.getBrands();
  },
  methods: {
    getBrands: function () {
      var self = this
      axiosInstance.get('/brands').then(response => {
        self.brands = response.data.data.brands
      })
    },
    getProductVariations: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = true
        self.isFilter = false
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      axiosInstance
        .get(
          '/productVariations/search?segment=' + segment + '&offset=' + offset
        )
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.productVariationDtos =
              response.data.data.productVariationDtos.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.rows = response.data.data.productVariationDtos
            self.initProducts = response.data.data.productVariationDtos
          } else {
            self.rows = []
            self.initProducts = []
          }
        })
    },
    changeStatus: function () {},
    addNewProduct: function () {
      this.$router.push('/product-create')
    },
    goToDetail: function (productId) {
      LocalStorage.set('pd_id', productId)
      this.$router.push('/product-detail')
    },
    showCols: function () {
      this.showColumns = !this.showColumns
    },
    searchProducts: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isGet = false
        self.isFilter = false
      }
      if (self.form.status == -1 && self.form.brand == 0) {
        self.getProductVariations()
        return
      }

      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/productVariations/search?segment=' + segment + '&offset=' + offset
      if (self.form.status != -1) {
        url += '&status=' + self.form.status
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.productVariationDtos =
            response.data.data.productVariationDtos.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.productVariationDtos
          self.initProducts = response.data.data.productVariationDtos
        } else {
          self.rows = []
          self.initProducts = []
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
            self.searchProducts()
          } else if (self.isGet) {
            self.getProductVariations()
          } else {
            self.filterProducts()
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
    filterProducts: function () {
      var self = this
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      if (self.searchText.trim() == '') {
        self.getProductVariations()
        return
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage

      let url =
        '/productVariations/search?segment=' + segment + '&offset=' + offset
      if (self.form.status != -1) {
        url += '&status=' + self.form.status
      }
      url += '&keyword=' + self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.productVariationDtos =
            response.data.data.productVariationDtos.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.productVariationDtos
          self.initProducts = response.data.data.productVariationDtos
        } else {
          self.rows = []
          self.initProducts = []
        }
      })
    }
  }
})
