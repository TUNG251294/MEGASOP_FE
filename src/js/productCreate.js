import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'ProductCreatePage',
  data: function () {
    return {
      productInfo: {
        id: 0,
        name: '',
        brandId: '1',
        type: 0, // 0: Bán, 1: Tặng
        categroyIds: [],
        productCode: 'dummy',
        attributeTypes: [],
        typesSelection: [],
        mainCateId: 0
      },
      brands: [],
      nodes: [],

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
      maxUnits: [],
      minUnits: [],
      attributeTypes: [],
      typesSelection: [],
      allTypes: false,
      expandedType: false,
      mainCate: [],
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
          align: 'CENTER',
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
  mounted: function () {
    let product = LocalStorage.getItem('pd_cr_pt')
    if (product != null) {
      this.productInfo = product
      this.typesSelection = product.typesSelection
      if (product.id > 0) {
        this.getProductDetail(product.id)
      }
    } else {
      LocalStorage.remove('pd_cr_pt')
    }
    // this.getBrands();
    if (LocalStorage.getItem(Constants.CATEGORIES) == null) {
      this.getIndustry()
    } else {
      this.nodes = LocalStorage.getItem(Constants.CATEGORIES)
    }
    this.getMaxUnits()
    this.getMinUnits()
    this.getAttributes()
  },
  methods: {
    requiredProductName: function (val) {
      return (
        (val && val.length > 0) || this.$t('products.please_enter_product_name')
      )
    },
    isValidProductName: function (val) {
      return (
        (val && val.length >= 1 && val.length <= 100) ||
        this.$t('products.product_name_must_have_1_100')
      )
    },
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
          if (item['children'].length == 0) {
            item['header'] = 'leaf'
          } else {
            item['header'] = 'node'
          }
        })
        self.nodes = nodesLv0
        // self.nodes = self.nodes.filter((item) => item.children.length > 0);
        LocalStorage.set(Constants.CATEGORIES, self.nodes)
      })
    },
    getAttributes: function () {
      var self = this
      axiosInstance
        .get('/attribute-type/available')
        .then(response => {
          self.attributeTypes = response.data.data.attributeTypes
          self.attributeTypes.forEach((item, index) => {
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
        })
        .catch(error => {})
    },
    selectAllTypes: function () {
      var self = this
      self.allTypes = true
      self.typesSelection = self.allTypes
        ? self.attributeTypes.map(item => item.id)
        : []
      self.productInfo.attributeTypes = self.allTypes ? self.attributeTypes : []
    },
    clickType: function () {
      var self = this
      self.productInfo.attributeTypes = self.attributeTypes.filter(item =>
        self.typesSelection.includes(item.id)
      )
      self.allTypes =
        self.productInfo.attributeTypes.length == self.attributeTypes.length
      self.visibleColumns = [
        'sku',
        'name',
        'incomePrice',
        'price',
        'virtualPrice',
        'unitId',
        'minOrder',
        'orderInc',
        'status'
      ]
      for (
        let index = 0;
        index < self.productInfo.attributeTypes.length;
        index++
      ) {
        self.visibleColumns.push(self.productInfo.attributeTypes[index].name)
      }
    },
    removeType: function (id) {
      var self = this
      self.typesSelection = self.typesSelection.filter(item => item != id)
      self.allTypes = false
      self.clickType()
    },
    filterRow: function (row) {
      let newRow = {}
      for (let key in row) {
        if (key != 'id') {
          newRow[key] = row[key]
        }
      }

      return newRow
    },
    onNewClickAction: function () {
      // this.addRow();
      this.productInfo.typesSelection = this.typesSelection
      LocalStorage.set(Constants.PRODUCT_INFO, this.productInfo)
      LocalStorage.set(Constants.PRODUCT_BACK_HISTORY, 'product-create')
      this.$router.push('/sku-create')
    },
    addRow: function () {
      var self = this
      const index = self.rows.length + 1
      const newRow = {}
      self.columns.forEach(column => {
        newRow[column.name] = ''
      })

      self.rows = [
        ...self.rows.slice(0, index),
        newRow,
        ...self.rows.slice(index)
      ]
    },
    getProductDetail: function (id) {
      var self = this
      axiosInstance.get('products/detail?id=' + id).then(response => {
        self.rows = response.data.data.productVariations
        self.attributeTypes = response.data.data.attributeTypes
        self.editColumnsDisplay(response.data.data.attributeTypes)
        self.editDisplaySku(response.data.data.attributeValues)
        self.productInfo.mainCateId = LocalStorage.getItem(
          Constants.MAIN_CATEGORY
        )
        self.selectedNode()
      })
    },
    editColumnsDisplay: function (attributeTypes) {
      var self = this
      attributeTypes.forEach(item => {
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
    saveInfo: function () {
      var self = this
      if (
        self.productInfo.mainCateId == null ||
        self.productInfo.mainCateId == 0
      ) {
        Notify.create({
          message: self.$t('products.please_select_main_category'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      if (
        self.productInfo.name.length == 0 ||
        self.productInfo.name.length > 100
      ) {
        Notify.create({
          message: self.$t('products.please_enter_product_name'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      let inputData = {}
      inputData['id'] = self.productInfo.id
      inputData['brandId'] = 1
      inputData['categroyIds'] = self.productInfo.categroyIds
      inputData['name'] = self.productInfo.name
      inputData['productCode'] = self.productInfo.productCode
      inputData['mainCateId'] = self.productInfo.mainCateId
      axiosInstance.put('/products', inputData).then(response => {
        LocalStorage.remove('pd_cr_pt')
        LocalStorage.remove('pd_a_e_pt')
        Notify.create({
          message: self.$t('products.create_product_successful'),
          type: 'positive',
          position: 'top'
        })
        self.$router.push('/products')
      })
    },
    cancelCreate: function () {
      this.$router.push('/products')
    },
    selectedNode: function () {
      this.mainCate = []
      let mainCateId = this.productInfo.mainCateId
      let length = this.productInfo.categroyIds.length
      if (length == 0) {
        LocalStorage.remove(Constants.MAIN_CATEGORY)
        this.productInfo.mainCateId = 0
        return
      }
      for (let index = 0; index < length; index++) {
        let item = this.productInfo.categroyIds[index]
        if (
          mainCateId != null &&
          mainCateId != 0 &&
          this.productInfo.categroyIds.includes(mainCateId)
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
