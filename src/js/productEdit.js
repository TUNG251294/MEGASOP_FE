import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'ProductEditPage',
  data: function () {
    return {
      productInfo: {
        id: 0,
        name: '',
        brandId: '1',
        type: 0, // 0: Bán, 1: Tặng
        productCode: 'dummy',
        mainCateId: 0
      },
      nodes: [],
      brands: [],

      visibleColumns: [
        'sku',
        'name',
        'incomePrice',
        'price',
        'virtualPrice',
        'unitId',
        'minOrder',
        'orderInc',
        'status'
      ],
      rows: [],
      categroyIds: [],
      minUnits: [],
      variationChange: false,
      attributeTypes: [],
      mainCate: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'sku',
          label: this.$t('products.sku_code_col'),
          align: 'center',
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
        },
        {
          name: 'action',
          label: '',
          align: 'left',
          field: 'action'
        }
      ]
    }
  },
  mounted: async function () {
    // this.getBrands();
    if (LocalStorage.getItem(Constants.CATEGORIES) == null) {
      await this.getIndustry()
    } else {
      this.nodes = LocalStorage.getItem(Constants.CATEGORIES)
    }
    await this.getMinUnits()
    await this.getProductDetail()
  },
  methods: {
    getProductDetail: function () {
      var self = this
      let productId = LocalStorage.getItem(Constants.PRODUCT_ID)
      axiosInstance.get('/products/' + productId + '/detail').then(response => {
        self.productInfo = response.data.data.product
        self.rows = response.data.data.productVariations
        self.attributeTypes = response.data.data.attributeTypes
        let variationLength = LocalStorage.getItem(
          Constants.PRODUCT_VARIATION_LENGTH
        )
        if (variationLength == null || variationLength == '') {
          LocalStorage.set(Constants.PRODUCT_VARIATION_LENGTH, self.rows.length)
        } else {
          if (variationLength != self.rows.length) {
            self.variationChange = true
          } else {
            self.variationChange = false
          }
        }
        let categories = response.data.data.categories
        categories.forEach(element => {
          self.categroyIds.push(element.categoryId)
        })
        self.editColumnsDisplay(response.data.data.attributeTypes)
        self.editDisplaySku(response.data.data.attributeValues)
        self.selectedNode()
      })
    },
    getBrands: function () {
      var self = this
      axiosInstance.get('/brands').then(response => {
        self.brands = response.data.data.brands
      })
    },
    getIndustry: function () {
      var self = this
      axiosInstance.get('/category/list').then(response => {
        let categories = response.data.data.categories
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
              // && tmp.children.length > 0) {
              if (tmp.children.length == 0) {
                tmp['header'] = 'leaf'
              } else {
                tmp['header'] = 'node'
              }
              item['children'].push(tmp)
            }
          })
          if (item.children.length == 0) {
            item['header'] = 'leaf'
          } else {
            item['header'] = 'node'
          }
        })
        self.nodes = nodesLv0
        LocalStorage.set(Constants.CATEGORIES, self.nodes)
        // self.nodes = self.nodes.filter((item) => item.children.length > 0);
      })
    },
    getMinUnits: function () {
      var self = this
      axiosInstance.get('/units').then(response => {
        self.minUnits = response.data.data.units
      })
    },
    onNewClickAction: function () {
      LocalStorage.set(Constants.PRODUCT_INFO, this.productInfo)
      LocalStorage.set(Constants.PRODUCT_ATTRIBUTE_TYPES, this.attributeTypes)
      LocalStorage.set(Constants.PRODUCT_BACK_HISTORY, 'product-edit')
      this.$router.push('/sku-create')
    },
    saveInfo: function () {
      var self = this
      if (self.productInfo.name == '' || self.categroyIds.length == 0) {
        Notify.create({
          message: self.$t('products.please_check_information_again'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      let inputData = {}
      inputData['id'] = LocalStorage.getItem('pd_id')
      inputData['brandId'] = parseInt(self.productInfo.brandId)
      inputData['categroyIds'] = self.categroyIds
      inputData['name'] = self.productInfo.name
      inputData['productCode'] = self.productInfo.productCode
      inputData['mainCateId'] = self.productInfo.mainCateId
      axiosInstance.put('/products', inputData).then(() => {
        LocalStorage.remove('pd_id')
        LocalStorage.remove('pd_dt_vr')
        LocalStorage.remove('pd_cr_pt')
        LocalStorage.remove('pd_a_e_pt')
        Notify.create({
          message: self.$t('products.update_product_successful'),
          type: 'positive',
          position: 'top'
        })
        self.$router.push('/products')
      })
    },
    cancelEdit: function () {
      this.$router.push('/product-detail')
    },
    editSku: function (skuId) {
      LocalStorage.set(Constants.PRODUCT_VARIATION_ID, skuId)
      LocalStorage.set(Constants.PRODUCT_ATTRIBUTE_TYPES, this.attributeTypes)
      LocalStorage.set(Constants.PRODUCT_BACK_HISTORY, 'product-edit')
      this.$router.push('/sku-edit')
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
        self.visibleColumns.push(item.name)
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
    selectedNode: function () {
      this.mainCate = []
      let mainCateId = this.productInfo.mainCateId
      let length = this.categroyIds.length
      if (length == 0) {
        LocalStorage.remove(Constants.MAIN_CATEGORY)
        this.productInfo.mainCateId = 0
        return
      }
      for (let index = 0; index < length; index++) {
        let item = this.categroyIds[index]
        if (
          mainCateId != null &&
          mainCateId != 0 &&
          this.categroyIds.includes(mainCateId)
        ) {
          if (mainCateId == item) {
            this.mainCate.push({
              id: item,
              isMain: true
            })
          } else {
            this.mainCate.push({
              id: item,
              isMain: false
            })
          }
        } else {
          if (index == 0) {
            LocalStorage.set(Constants.MAIN_CATEGORY, item)
            this.productInfo.mainCateId = item
            this.mainCate.push({
              id: item,
              isMain: true
            })
          } else {
            this.mainCate.push({
              id: item,
              isMain: false
            })
          }
        }
      }
    },
    changeMainCate: function (id) {
      let category = this.mainCate.find(item => item.id == id)
      if (category.isMain) {
        this.productInfo.mainCateId = id
        LocalStorage.set(Constants.MAIN_CATEGORY, id)
        for (let index = 0; index < this.mainCate.length; index++) {
          let cate = this.mainCate[index]
          if (cate.id != id) {
            this.mainCate[index].isMain = false
          }
        }
        return
      }
      if (this.mainCate.length == 0) {
        this.productInfo.mainCateId = 0
        LocalStorage.remove(Constants.MAIN_CATEGORY)
        return
      }
    }
  }
})
