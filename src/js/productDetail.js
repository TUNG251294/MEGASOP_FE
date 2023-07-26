import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'ProductDetailPage',
  data: function () {
    return {
      productInfo: {},
      nodes: [],
      rows: [],
      maxUnits: [],
      minUnits: [],
      categories: [],
      brands: [],
      attributeTypes: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS
    }
  },
  computed: {
    maxUnitsI18n: function () {
      return this.maxUnits.map(e => {
        return {
          ...e,
          name: this.$t(`units[${e.id}]`)
        }
      })
    },
    minUnitsI18n: function () {
      return this.minUnits.map(e => {
        return {
          ...e,
          name: this.$t(`units[${e.id}]`)
        }
      })
    },
    columnsI18n: function () {
      return [
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
          label: this.$t('products.sku_name_col'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'incomePrice',
          label: this.$t('products.purchase_price'),
          align: 'right',
          field: 'incomePrice',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'price',
          label: this.$t('products.sales_price'),
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
          name: 'unitId',
          label: this.$t('products.small_unit_col'),
          align: 'left',
          field: 'unitId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'minOrder',
          label: this.$t('products.minimum_purchase_col'),
          align: 'right',
          field: 'minOrder',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'orderInc',
          label: this.$t('products.target_rate'),
          align: 'right',
          field: 'orderInc',
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
  mounted: async function () {
    await this.getMaxUnits()
    await this.getMinUnits()
    await this.getProductDetail()
    await this.getCategories()
  },
  methods: {
    getMaxUnits: function () {
      var self = this
      axiosInstance.get('/packing/list').then(response => {
        self.maxUnits = response.data.data.packings
      })
    },
    getMinUnits: function () {
      var self = this
      axiosInstance.get('/units').then(response => {
        self.minUnits = response.data.data.units
      })
    },
    getProductDetail: function () {
      var self = this
      var arrCategories = []
      let productId = LocalStorage.getItem('pd_id')
      axiosInstance.get('/products/detail?id=' + productId).then(response => {
        self.productInfo = response.data.data.product
        self.rows = response.data.data.productVariations
        self.attributeTypes = response.data.data.attributeTypes
        // self.editColumnsDisplay(response.data.data.attributeTypes)
        self.editDisplaySku(response.data.data.attributeValues)
      })
    },
    editColumnsDisplay: function (attributeTypes) {
      var self = this
      attributeTypes.forEach((item, index) => {
        self.columns.splice(2 + index, 0, {
          name: item.name,
          label: item.name,
          align: 'left',
          field: item.name,
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        })
      })
    },
    getCategories: function () {
      var self = this
      let productId = LocalStorage.getItem('pd_id')
      let categories = []
      axiosInstance.get('/products/detail?id=' + productId).then(response => {
        categories = response.data.data.categories
        let nodesLv0 = categories.filter(category => category.level == 0)
        let nodesLv1 = categories.filter(category => category.level == 1)
        let nodesLv2 = categories.filter(category => category.level == 2)

        nodesLv1.forEach(item => {
          item['children'] = []
          nodesLv2.forEach(tmp => {
            tmp['header'] = 'leaf'
            if (tmp.parentIdLv1 == item.id) {
              item['children'].push(tmp)
            }
          })
        })

        nodesLv0.forEach(item => {
          item['children'] = []
          nodesLv1.forEach(tmp => {
            if (tmp.parentIdLv0 == item.id) {
              if (tmp.children.length == 0) {
                tmp['header'] = 'leaf'
              }
              item['children'].push(tmp)
            }
          })
          if (item.children.length == 0) {
            item['header'] = 'leaf'
          }
        })
        self.categories = nodesLv0
      
      })
    },
    editDisplaySku: function (attributeValues) {
      var self = this
      self.rows.forEach(item => {
        let attrValues = attributeValues.filter(
          node => node.productVariationId == item.id
        )
        attrValues.forEach(value => {
          item[value.attributeTypeName] = value.attributeValue
        })
      })
    },
    editProduct: function () {
      this.$router.push('/product-edit')
    },
    editSku: function(skuId) {
      LocalStorage.set(Constants.PRODUCT_VARIATION_ID, skuId)
      LocalStorage.set(Constants.PRODUCT_ATTRIBUTE_TYPES, this.attributeTypes)
      LocalStorage.set(Constants.PRODUCT_BACK_HISTORY, 'product-detail')
      this.$router.push('/sku-edit')
    }
  }
})
