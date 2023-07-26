import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'
import { mapActions, mapState, mapGetters } from 'vuex'

export default defineComponent({
  name: 'Tạo CTKM cho người tiêu dùng',
  data: function () {
    return {
      form: {
        subjectType: '1',
        conditionFormatId: 1,
        rewardFormatId: 1,
        typeFormatId: 1,
        fromDate: date.formatDate(
          date.addToDate(Date.now(), { days: 2 }),
          'DD/MM/YYYY'
        ),
        toDate: date.formatDate(
          date.addToDate(Date.now(), { days: 7 }),
          'DD/MM/YYYY'
        ),
        earlyDate: date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'DD/MM/YYYY'
        ),
        promotionCode: '',
        promotionName: '',
        description: '',
        cities: [],
        regions: [],
        show: true,
        groupProducts: [],
        groupStructures: []
      },
      step: 1,

      rewardTypes: [],
      conditionTypes: [],
      selectedFile: [],
      progress: false,
      cities: [],
      citySelection: [],
      allCity: false,
      expandedCity: false,
      regions: [],
      regionSelection: [],
      allRegion: false,
      expandedRegion: false,
      modal: false,
      searchText: '',
      categories: [],
      rows: [],
      initRows: [],

      nodeLv0Id: 0,
      nodeLv1Id: 0,
      nodeLv2Id: 0,
      index: 1,

      levelIndex: 1,
      levelUuid: '',
      showLevel: false,
      productsTmp: [],
      notifyBack: false,
      loading: false,
      canChoose: true,
      modalReward: false,
      rewardsTmp: [],
      levelGroupIndex: '',
      groupId: 0,
      modalUpdate: false,
      groupIndex: 0,
      group: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'productVariationId',
        descending: false
      },
      isGet: false,
      nodeSelected: {}
    }
  },
  computed: {
    ...mapState('productGroups', ['productGroups']),
    ...mapState('productGroups', ['products']),
    ...mapState('productGroups', ['groups']),
    ...mapState('productGroups', ['levelGroups']),
    ...mapGetters('productGroups', ['productGroupsCount']),
    ...mapGetters('productGroups', ['levelGroupsCount']),

    conditionTypesI18n: function () {
      return this.conditionTypes.map(e => {
        return {
          ...e,
          name: this.$t(`conditionTypes[${e.id}]`)
        }
      })
    },
    rewardTypesI18n: function () {
      return this.rewardTypes.map(e => {
        return {
          ...e,
          name: this.$t(`rewardTypes[${e.id}]`)
        }
      })
    },
    typesI18n: function () {
      return [
        {
          id: 1,
          name: this.$t('promotions_end_user.reward_level')
        },
        {
          id: 2,
          name: this.$t('promotions_end_user.reward_range')
        }
      ]
    },
    addColumnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('promotions.ordinal_number'),
          align: 'left',
          field: 'index',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sku',
          label: this.$t('promotions_retailer.product_id'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productVariationName',
          label: this.$t('promotions_retailer.product_name'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          classes: 'extend-ellipsis'
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
    removeColumnsI18n: function () {
      return [
        {
          name: 'rowIndex',
          label: this.$t('promotions.ordinal_number'),
          align: 'left',
          field: 'rowIndex',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sku',
          label: this.$t('promotions_retailer.product_id'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          label: this.$t('promotions_retailer.product_name'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          classes: 'extend-ellipsis'
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
    levelColumnsI18n: function () {
      return [
        {
          name: 'name',
          label: this.$t('promotions_retailer.product'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'descreaseUnit',
          label: this.$t('promotions.reduction_money'),
          align: 'center',
          field: 'descreaseUnit',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'unitName',
          label: this.$t('promotions_retailer.unit'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        }
      ]
    },
    percentColumnsI18n: function () {
      return [
        {
          name: 'name',
          label: this.$t('promotions_retailer.product'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'descreaseUnit',
          label: this.$t('promotions.percentage_decrease'),
          align: 'center',
          field: 'descreaseUnit',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'unitName',
          label: this.$t('promotions_retailer.unit'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        }
      ]
    },
    rewardColumnsI18n: function () {
      return [
        {
          name: 'name',
          label: this.$t('promotions_retailer.product'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'unitAmount',
          label: this.$t('promotions.amount'),
          align: 'center',
          field: 'unitAmount',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'unitName',
          label: this.$t('promotions_retailer.unit'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
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

    isValidToContinue: function () {
      return (
        this.form.conditionFormatId > 0 &&
        this.form.typeFormatId > 0 &&
        this.form.rewardFormatId > 0 &&
        this.form.promotionCode.trim() != '' &&
        this.form.promotionName.trim() != '' &&
        this.selectedFile.length > 0 &&
        this.form.description.trim() != '' &&
        (this.form.regions.length > 0 || this.form.cities.length > 0) &&
        this.isValidFromDate &&
        this.isValidToDate
      )
    },
    isValidFromDate: function () {
      let dt = date.extractDate(this.form.fromDate, 'DD/MM/YYYY')
      let earlyDate = date.formatDate(
        date.extractDate(this.form.earlyDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > earlyDate && dt >= Date.now()
    },
    isValidToDate: function () {
      let dt = date.extractDate(this.form.toDate, 'DD/MM/YYYY')
      let fromDate = date.formatDate(
        date.extractDate(this.form.fromDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > fromDate && dt >= Date.now()
    }
  },
  mounted: function () {
    this.init()
    this.getPromotionRewardFormat()
    this.getConditionFormat()
    this.getCities()
    this.getRegions()
    this.getCategories()
    this.enableTypeFormat()
  },
  methods: {
    ...mapActions('productGroups', ['setProductGroups']),
    optionsEarlyDate: function (earlyDate) {
      let dt = date.extractDate(earlyDate, 'YYYY/MM/DD')
      return dt >= Date.now()
    },
    optionsFromDate: function (fromDate) {
      var self = this
      let dt = date.extractDate(fromDate, 'YYYY/MM/DD')
      let earlyDate = date.formatDate(
        date.extractDate(self.form.earlyDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > earlyDate && dt >= Date.now()
    },
    optionsToDate: function (toDate) {
      var self = this
      let dt = date.extractDate(toDate, 'YYYY/MM/DD')
      let fromDate = date.formatDate(
        date.extractDate(self.form.fromDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > fromDate && dt >= Date.now()
    },
    init: function () {
      let str = LocalStorage.getItem(Constants.PROMOTION_SUBJECT)
      this.form.subjectType = str[5]
      if (this.form.subjectType != 1) {
        this.$router.push('/promotions')
        return
      }
      this.$store.dispatch('productGroups/setProductGroups')
    },
    getPromotionRewardFormat: function () {
      var self = this
      axiosInstance.get('/promotions/reward/format').then(response => {
        self.rewardTypes = response.data.data.PromotionRewardFormats
      })
    },
    getConditionFormat: function () {
      var self = this
      axiosInstance.get('/promotions/condition/format').then(response => {
        self.conditionTypes = response.data.data.PromotionConditionFormats
      })
    },
    enableTypeFormat: function () {
      var self = this
      if (self.form.rewardFormatId == 1) {
        self.canChoose = true
        return
      }
      self.canChoose = false
      self.form.typeFormatId = 2
    },
    getCities: function () {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.cities = response.data.data.cities
      })
    },
    getRegions: function () {
      var self = this
      axiosInstance.get('/regions').then(response => {
        self.regions = response.data.data.regions
      })
    },
    selectFile: function () {
      document.getElementById('imageFile').click()
    },
    onFileSelected: function (event) {
      var self = this
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return false
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i)
        self.createImage(file)
      }
    },
    createImage: function (file) {
      var self = this
      let reader = new FileReader()
      reader.onload = e => {
        let dataURI = e.target.result
        if (dataURI) {
          self.selectedFile.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file
          })
        }
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (imageId) {
      var self = this
      self.selectedFile = self.selectedFile.filter(element => {
        return element.id != imageId
      })
    },
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
    cancel: function () {
      this.$router.push('/promotions')
    },
    selectAllCity: function () {
      var self = this
      self.allRegion = self.allCity
      self.citySelection = self.allCity ? self.cities.map(item => item.id) : []
      self.form.cities = self.allCity ? self.cities : []
      self.regionSelection = self.allCity
        ? self.regions.map(item => item.id)
        : []
      self.form.regions = self.allCity ? self.regions : []
    },
    clickCity: function () {
      var self = this
      self.form.cities = self.cities.filter(item =>
        self.citySelection.includes(item.id)
      )
      self.allCity = self.form.cities.length == self.cities.length
    },
    selectAllRegion: function () {
      var self = this
      self.allCity = self.allRegion
      self.regionSelection = self.allRegion
        ? self.regions.map(item => item.id)
        : []
      self.form.regions = self.allRegion ? self.regions : []
      self.citySelection = self.allRegion
        ? self.cities.map(item => item.id)
        : []
      self.form.cities = self.allRegion ? self.cities : []
    },
    clickRegion: function (regionId) {
      var self = this
      let cities
      self.form.regions = self.regions.filter(item =>
        self.regionSelection.includes(item.id)
      )
      if (!self.regionSelection.includes(regionId)) {
        // cities = self.cities
        //   .filter((item) => item.regionId == regionId)
        //   .map((item) => item.id);
        // self.citySelection = self.citySelection.filter(
        //   (item) => !cities.includes(item)
        // );
        // self.form.cities = self.form.cities.filter(
        //   (item) => !cities.includes(item.id)
        // );
        return
      }
      self.allRegion = self.form.regions.length == self.regions.length
      cities = self.cities.filter(item =>
        self.regionSelection.includes(item.regionId)
      )
      self.form.cities = cities
      if (cities.length > 0) {
        self.citySelection = cities.map(item => item.id)
      }
      self.allCity = self.form.cities.length == self.cities.length
    },
    removeRegion: function (regionId) {
      var self = this
      self.regionSelection = self.regionSelection.filter(
        item => item != regionId
      )
      self.allRegion = false
      self.clickRegion(regionId)
    },
    removeCity: function (cityId) {
      var self = this
      self.citySelection = self.citySelection.filter(item => item != cityId)
      self.allCity = false
      self.clickCity()
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
    getProductByCategory: function (node, isReward) {
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
      switch (node.level) {
        case 0:
          self.nodeLv0Id = node.id
          self.nodeLv1Id = 0
          self.nodeLv2Id = 0
          break
        case 1:
          self.nodeLv0Id = node.parentIdLv0
          self.nodeLv1Id = node.id
          self.nodeLv2Id = 0
          break
        default:
          self.nodeLv0Id = node.parentIdLv0
          self.nodeLv1Id = node.parentIdLv1
          self.nodeLv2Id = node.id
          break
      }
      let productInCate = isReward
        ? LocalStorage.getItem(Constants.REWARD_GROUPS)
        : LocalStorage.getItem(Constants.PRODUCT_CATEGORY)

      let tmpIds = isReward
        ? self.rewardsTmp.map(item => item.productVariationId)
        : self.productsTmp.map(item => item.productVariationId)
      let ids =
        productInCate && productInCate.length > 0
          ? productInCate.map(item => item.product.productVariationId)
          : []
      ids = ids.concat(tmpIds)
      let inputData = {}
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
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
    filterProduct: function (isReward, isFilter = true) {
      var self = this
      let products = isReward ? self.rewardsTmp : self.productsTmp
      let productIds = products.map(item => item.productVariationId)
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
      inputData['productVariationIds'] = productIds
      axiosInstance
        .post('/productVariations/searchIds', inputData)
        .then(response => {
          self.rows = response.data.data.productVariationDtos
          let length = self.rows.length
          self.rows = self.rows.map(obj => ({
            ...obj,
            productVariationId: obj.id,
            productVariationName: obj.name
          }))
          self.rows = self.rows.filter(
            item =>
              item.categoryLv0Id != null &&
              item.categoryLv1Id != null &&
              item.categoryLv2Id != null
          )
          self.pagination.rowsNumber =
            length == self.rows.length
              ? response.data.data.count
              : self.rows.length
        })
        .catch(() => {
          Notify.create({
            message: this.$t('promotions.not_found_product'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    confirm: function () {
      var self = this
      if (self.productsTmp.length == 0) {
        return
      }
      self.productsTmp.forEach(item => {
        self.$store.dispatch('productGroups/addProducts', {
          product: item
        })
      })
      let productGroups = LocalStorage.getItem(Constants.PRODUCT_GROUPS)
      self.productsTmp = []
      self.$store.dispatch('productGroups/confirmGroups', {
        index: self.index,
        group: productGroups
      })
      self.levelUuid = self.levelUuid != '' ? self.levelUuid : self.uuidv4()
      self.$store.dispatch('productGroups/updateLevelGroups', {
        index: self.levelUuid,
        productIndex: self.index
      })
      Notify.create({
        message: this.$t(
          'promotions_end_user.create_successful_product_groups'
        ),
        type: 'positive',
        position: 'top'
      })
      self.index += 1
      self.modal = false
    },
    cancelAdd: function () {
      var self = this
      self.$store.dispatch('productGroups/clearProductGroups')
      self.modal = false
      self.rows = []
      self.initRows = []
    },
    addProduct: function (row) {
      var self = this
      let product = {}
      product['id'] =
        self.randomstring(5) + row.productId + self.randomstring(5)
      product['productVariationId'] = row.productVariationId
      product['sku'] = row.sku
      product['name'] = row.productVariationName
      product['descreasePackage'] = 0
      product['descreaseUnit'] = 0
      product['nodeLv0Id'] = 0
      product['nodeLv1Id'] = 0
      product['nodeLv2Id'] = 0
      product['description'] = ''
      product['unitId'] = row.unitId
      product['unitName'] = row.unitName
      product['body'] = 'story'
      product['header'] = 'test'
      product['index'] = self.index
      product['rowIndex'] = row.index
      let nodes = LocalStorage.getItem(Constants.CATEGORIES)
      self.productsTmp.push(product)

      if (row.categoryLv0Id != null && row.categoryLv0Id != 0) {
        self.nodeLv0Id = row.categoryLv0Id
      }
      if (row.categoryLv1Id != null && row.categoryLv1Id != 0) {
        self.nodeLv1Id = row.categoryLv1Id
      }
      if (row.categoryLv2Id != null && row.categoryLv2Id != 0) {
        self.nodeLv2Id = row.categoryLv2Id
      }
      self.rows = self.rows.filter(
        row => row.productVariationId != product.productVariationId
      )

      let nodesLv0Length = nodes.length
      for (let index = 0; index < nodesLv0Length; index++) {
        let element = nodes[index]
        let nodesLv1 = element.children
        element.children = []
        if (element.id == self.nodeLv0Id) {
          product['nodeLv0Id'] = self.nodeLv0Id
          if (self.nodeLv1Id == 0) {
            product['nodeLv1Id'] = 0
            product['nodeLv2Id'] = 0
            element.children.push(product)
          } else {
            let nodesLv1Length = nodesLv1.length
            for (let ind = 0; ind < nodesLv1Length; ind++) {
              let item = nodesLv1[ind]
              let nodesLv2 = item.children
              item.children = []
              if (item.id == self.nodeLv1Id) {
                product['nodeLv1Id'] = self.nodeLv1Id
                if (self.nodeLv2Id == 0) {
                  product['nodeLv2Id'] = 0
                  item.children.push(product)
                  element.children.push(item)
                } else {
                  let nodesLv2Length = nodesLv2.length
                  for (let i = 0; i < nodesLv2Length; i++) {
                    let tmp = nodesLv2[i]
                    if (tmp.id == self.nodeLv2Id) {
                      product['nodeLv2Id'] = self.nodeLv2Id
                      tmp.children.push(product)
                      item.children.push(tmp)
                      element.children.push(item)
                    }
                  }
                }
              }
            }
          }
          self.$store.dispatch('productGroups/addProductGroups', {
            nodeLv0Id: self.nodeLv0Id,
            nodeLv1Id: self.nodeLv1Id,
            nodeLv2Id: self.nodeLv2Id,
            product: product,
            category: element
          })
        }
      }
    },
    removeRow: function (row, isReward) {
      if (isReward) {
        this.rewardsTmp = this.rewardsTmp.filter(
          item => item.productVariationId != row.productVariationId
        )
      } else {
        this.productsTmp = this.productsTmp.filter(
          item => item.productVariationId != row.productVariationId
        )
        this.$store.dispatch('productGroups/removeProduct', {
          product: row
        })
      }

      this.getInitRow(isReward)
    },
    getInitRow: function (isReward) {
      var self = this
      let products = self.initRows
      let productInCate = isReward
        ? LocalStorage.getItem(Constants.REWARD_GROUPS)
        : LocalStorage.getItem(Constants.PRODUCT_CATEGORY)

      let tmpIds = isReward
        ? self.rewardsTmp.map(item => item.productVariationId)
        : self.productsTmp.map(item => item.productVariationId)
      let ids =
        productInCate && productInCate.length > 0
          ? productInCate.map(item => item.product.productVariationId)
          : []
      ids = ids.concat(tmpIds)
      self.rows = [
        ...products.filter(
          ({ productVariationId }) => !ids.includes(productVariationId)
        )
      ]
    },
    onAddProducts: function () {
      var self = this
      self.modal = true
      self.searchText = ''
      self.rows = []
      self.productsTmp = []
      self.initRows = []
    },
    changeDescription: function (node, event) {
      this.$store.dispatch('productGroups/updateDescription', {
        node: node,
        value: event.target.value
      })
    },
    editGroup: function (index) {
      var self = this
      self.groupIndex = index
      self.modalUpdate = true
      self.rows = []
      self.initRows = []
      self.searchText = ''
      self.productsTmp = []
    },
    addProductInGroup: function (row) {
      var self = this
      let product = {}
      product['id'] =
        self.randomstring(5) + row.productId + self.randomstring(5)
      product['productVariationId'] = row.productVariationId
      product['sku'] = row.sku
      product['name'] = row.productVariationName
      product['descreasePackage'] = 0
      product['descreaseUnit'] = 0
      product['nodeLv0Id'] = 0
      product['nodeLv1Id'] = 0
      product['nodeLv2Id'] = 0
      product['description'] = ''
      product['unitId'] = row.unitId
      product['unitName'] = row.unitName
      product['body'] = 'story'
      product['header'] = 'test'
      product['index'] = self.groupIndex
      product['rowIndex'] = row.index
      let nodes = LocalStorage.getItem(Constants.CATEGORIES)
      self.productsTmp.push(product)

      if (row.categoryLv0Id != null && row.categoryLv0Id != 0) {
        self.nodeLv0Id = row.categoryLv0Id
      }
      if (row.categoryLv1Id != null && row.categoryLv1Id != 0) {
        self.nodeLv1Id = row.categoryLv1Id
      }
      if (row.categoryLv2Id != null && row.categoryLv2Id != 0) {
        self.nodeLv2Id = row.categoryLv2Id
      }
      self.rows = self.rows.filter(
        row => row.productVariationId != product.productVariationId
      )

      let nodesLv0Length = nodes.length
      for (let index = 0; index < nodesLv0Length; index++) {
        let element = nodes[index]
        let nodesLv1 = element.children
        element.children = []
        if (element.id == self.nodeLv0Id) {
          product['nodeLv0Id'] = self.nodeLv0Id
          if (self.nodeLv1Id == 0) {
            product['nodeLv1Id'] = 0
            product['nodeLv2Id'] = 0
            element.children.push(product)
          } else {
            let nodesLv1Length = nodesLv1.length
            for (let ind = 0; ind < nodesLv1Length; ind++) {
              let item = nodesLv1[ind]
              let nodesLv2 = item.children
              item.children = []
              if (item.id == self.nodeLv1Id) {
                product['nodeLv1Id'] = self.nodeLv1Id
                if (self.nodeLv2Id == 0) {
                  product['nodeLv2Id'] = 0
                  item.children.push(product)
                  element.children.push(item)
                } else {
                  let nodesLv2Length = nodesLv2.length
                  for (let i = 0; i < nodesLv2Length; i++) {
                    let tmp = nodesLv2[i]
                    if (tmp.id == self.nodeLv2Id) {
                      product['nodeLv2Id'] = self.nodeLv2Id
                      tmp.children.push(product)
                      item.children.push(tmp)
                      element.children.push(item)
                    }
                  }
                }
              }
            }
          }
          self.group.push(element)
          self.$store.dispatch('productGroups/addProductGroups', {
            nodeLv0Id: self.nodeLv0Id,
            nodeLv1Id: self.nodeLv1Id,
            nodeLv2Id: self.nodeLv2Id,
            product: product,
            category: element
          })
        }
      }
    },
    randomstring: function (L) {
      var s = ''
      var randomchar = function () {
        var n = Math.floor(Math.random() * 62)
        if (n < 10) return n //1-10
        if (n < 36) return String.fromCharCode(n + 55) //A-Z
        return String.fromCharCode(n + 61) //a-z
      }
      while (s.length < L) s += randomchar()
      return s
    },
    confirmAddProductInGroup: function () {
      if (this.productsTmp.length == 0) {
        return
      }
      this.$store.dispatch('productGroups/addProductInGroup', {
        index: this.groupIndex,
        products: this.productsTmp,
        category: this.group
      })

      Notify.create({
        message: this.$t('promotions.edit_successful_product_groups'),
        type: 'positive',
        position: 'top'
      })
      this.modalUpdate = false
      this.productsTmp = []
      this.group = []
    },
    cancelAddProductInGroup: function () {
      var self = this
      self.modalUpdate = false
      self.groupIndex = 0
      self.productsTmp = []
      self.$store.dispatch('productGroups/clearProductGroups')
      self.rows = []
      self.initRows = []
    },
    addNewLevel: function (init) {
      var self = this
      let message = ''
      if (init || (!init && self.form.conditionFormatId == 3)) {
        let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
          ? LocalStorage.getItem(Constants.LEVEL_GROUPS)
          : []

        for (let index = 0; index < levelGroups.length; index++) {
          let gr = levelGroups[index]
          let groups = gr.groups
          if (self.checkTypeFormat(groups)) {
            message =
              this.$t(
                'promotions.please_fill_in_the_information_about_the_reward_limit'
              ) +
              (index + 1) +
              this.$t('promotions.before_adding_a_new_limit')
            break
          } else if (self.checkRewardFormat(groups)) {
            switch (self.form.rewardFormatId) {
              case 1:
                message =
                  this.$t('promotions.please_add_a_limited_product') +
                  (index + 1) +
                  this.$t('promotions.before_adding_a_new_limit')
                break
              default:
                message =
                  this.$t('promotions.please_enter_the_discount_limit_value') +
                  (index + 1) +
                  this.$t('promotions.before_adding_a_new_limit')
                break
            }
            break
          }
        }

        if (message != '') {
          Notify.create({
            message: message,
            type: 'negative',
            position: 'top'
          })
          return
        }

        self.levelIndex += 1
        self.$store.dispatch('productGroups/addLevelGroup', {
          index: self.uuidv4(),
          productIndex: self.form.conditionFormatId == 3 ? 2 : self.index
        })
        self.showLevel = true
      } else {
        self.showLevel = true
        self.levelIndex = 1
      }
    },
    checkTypeFormat: function (groups) {
      var self = this
      let error = false
      switch (self.form.typeFormatId) {
        case 1:
          error = groups.find(item => item.fixValue == '') != undefined
          break
        default:
          error =
            groups.find(item => item.fromValue == '' || item.toValue == '') !=
            undefined
          break
      }
      return error
    },
    checkRewardFormat: function (groups) {
      var self = this
      let error = false
      switch (self.form.rewardFormatId) {
        case 1:
          error = groups.find(item => item.rewards.length == 0) != undefined
          break
        default:
          error = groups.find(item => item.descreaseValue == '') != undefined
          break
      }
      return error
    },
    removeLevel: function (index) {
      var self = this
      if (self.levelIndex > 1) {
        self.$store.dispatch('productGroups/removeLevelGroup', {
          index: index
        })
      }
      self.levelIndex = self.levelIndex > 0 ? self.levelIndex - 1 : 0
      self.showLevel = true ? self.levelIndex >= 1 : false
    },
    changeFixValue: function (index, productIndex, event) {
      let reg = /^\d+$/
      let value = event.target.value.replace(/,/g, '')
      let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
      if (!reg.test(value) || value == '' || value == null) {
        event.target.value = ''
        Notify.create({
          message: this.$t('promotions.please_enter_a_numeric_value'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      let max = 0
      let min = 0
      let grMin = []
      let grMax = []
      if (index == 0) {
        min = 0
        if (levelGroups.length == 1) {
          max = Number.POSITIVE_INFINITY
        } else {
          grMax = levelGroups[index + 1]
          let group = grMax.groups[productIndex]
          max = parseInt(group.fixValue.replace(/,/g, ''))
        }
      } else if (index == levelGroups.length - 1) {
        grMin = levelGroups[index - 1]
        let group = grMin.groups[productIndex]
        min = parseInt(group.fixValue)
        max = Number.POSITIVE_INFINITY
      } else {
        grMin = levelGroups[index - 1]
        grMax = levelGroups[index + 1]
        let groupMin = grMin.groups[productIndex]
        let groupMax = grMax.groups[productIndex]
        min = parseInt(groupMin.fixValue.replace(/,/g, ''))
        max = parseInt(groupMax.fixValue.replace(/,/g, ''))
      }

      if (value <= min || value >= max) {
        // event.target.value = "";
        // Notify.create({
        //   message: "Giá trị nhập vào không phù hợp.",
        //   type: "negative",
        //   position: "top",
        // });
        return
      }
      this.$store.dispatch('productGroups/updateFixValue', {
        index: index,
        productIndex: productIndex,
        value: Number(value).toLocaleString('en-US')
      })
    },
    changeFromValue: function (index, productIndex, event) {
      let reg = /^\d+$/
      let value = event.target.value.replace(/,/g, '')
      let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
      if (!reg.test(value) || value == '' || value == null) {
        event.target.value = ''
        Notify.create({
          message: this.$t('promotions.please_enter_a_numeric_value'),
          type: 'negative',
          position: 'top'
        })

        return
      }
      let max = 0
      let min = 0
      let grMin = []
      let grMax = []
      if (index == 0) {
        min = 0
        grMax = levelGroups[index]
        let group = grMax.groups[productIndex]
        max =
          group.toValue == ''
            ? Number.POSITIVE_INFINITY
            : parseInt(group.toValue.replace(/,/g, ''))
      } else {
        grMin = levelGroups[index - 1]
        let groupMin = grMin.groups[productIndex]
        min = parseInt(groupMin.toValue.replace(/,/g, ''))
        grMax = levelGroups[index]
        let groupMax = grMax.groups[productIndex]
        max =
          groupMax.toValue == ''
            ? Number.POSITIVE_INFINITY
            : parseInt(groupMax.toValue.replace(/,/g, ''))
      }

      if (value <= min || value >= max) {
        // Notify.create({
        //   message: "Giá trị nhập vào không phù hợp.",
        //   type: "negative",
        //   position: "top",
        // });
        return
      }
      this.$store.dispatch('productGroups/updateFromValue', {
        index: index,
        productIndex: productIndex,
        value: Number(value).toLocaleString('en-US')
      })
    },
    changeToValue: function (index, productIndex, event) {
      let reg = /^\d+$/
      let value = event.target.value.replace(/,/g, '')
      let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
      if (!reg.test(value) || value == '' || value == null) {
        event.target.value = ''
        Notify.create({
          message: this.$t('promotions.please_enter_a_numeric_value'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      let max = 0
      let min = 0
      let grMin = []
      let grMax = []
      if (index == 0) {
        max = Number.POSITIVE_INFINITY
        grMin = levelGroups[index]
        let group = grMin.groups[productIndex]
        min =
          group.fromValue == ''
            ? 1
            : parseInt(group.fromValue.replace(/,/g, ''))
      } else if (index == levelGroups.length - 1) {
        max = Number.POSITIVE_INFINITY
        grMin = levelGroups[index]
        let groupMin = grMin.groups[productIndex]
        let grMin2 = levelGroups[index - 1]
        let groupMin2 = grMin2.groups[productIndex]
        min =
          groupMin.fromValue != ''
            ? parseInt(groupMin.fromValue.replace(/,/g, ''))
            : parseInt(groupMin2.toValue.replace(/,/g, '')) + 2
      } else {
        grMin = levelGroups[index]
        let groupMin = grMin.groups[productIndex]
        let grMin2 = levelGroups[index - 1]
        let groupMin2 = grMin2.groups[productIndex]
        min =
          groupMin.fromValue != ''
            ? parseInt(groupMin.fromValue.replace(/,/g, ''))
            : parseInt(groupMin2.toValue.replace(/,/g, '')) + 2
        grMax = levelGroups[index + 1]
        let groupMax = grMax.groups[productIndex]
        max =
          groupMax.fromValue == ''
            ? Number.POSITIVE_INFINITY
            : parseInt(groupMax.fromValue.replace(/,/g, ''))
      }
      if (value <= min || value >= max) {
        // Notify.create({
        //   message: "Giá trị nhập vào không phù hợp.",
        //   type: "negative",
        //   position: "top",
        // });
        return
      }
      this.$store.dispatch('productGroups/updateToValue', {
        index: index,
        productIndex: productIndex,
        value: Number(value).toLocaleString('en-US')
      })
    },
    changeDescreaseValue: function (index, group, product, event) {
      this.$store.dispatch('productGroups/updateDescreaseValue', {
        index: index,
        group: group,
        product: product,
        value: event.target.value
      })
    },
    returnBack: function () {
      var self = this
      self.notifyBack = true
    },
    confirmBack: function () {
      var self = this
      self.loading = true
      self.$store.dispatch('productGroups/confirmBack')
      self.$store.dispatch('productGroups/setProductGroups')
      setTimeout(function () {
        self.notifyBack = false
        self.step = 1
        self.index = 1
        self.showLevel = false
        self.loading = false
        self.rows = []
        self.initRows = []
      }, 1000)
    },
    changeDescreaseGroupValue: function (index, productIndex, event) {
      let reg = /^\d+$/
      let value = event.target.value.replace(/,/g, '')
      if (!reg.test(value) || value == '' || value == null) {
        event.target.value = ''
        Notify.create({
          message: this.$t('promotions.please_enter_a_numeric_value'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      this.$store.dispatch('productGroups/updateDescreaseGroupValue', {
        index: index,
        productIndex: productIndex,
        value: Number(value).toLocaleString('en-US')
      })
    },
    confirmAddReward: function () {
      var self = this
      self.$store.dispatch('productGroups/addPresentToGroup', {
        levelGroupIndex: self.levelGroupIndex,
        groupId: self.groupId,
        presents: self.rewardsTmp
      })
      self.modalReward = false
      self.rewardsTmp = []
    },
    addReward: function (row) {
      var self = this
      let product = {}
      product['id'] = row.productId
      product['productVariationId'] = row.productVariationId
      product['sku'] = row.sku
      product['name'] = row.productVariationName
      product['unitAmount'] = 1
      product['packingAmount'] = 0
      product['type'] = 0
      product['unitId'] = row.unitId
      product['unitName'] = row.unitName
      product['rowIndex'] = row.index
      self.rewardsTmp.push(product)

      self.rows = self.rows.filter(
        row => row.productVariationId != product.productVariationId
      )
    },
    cancelAddReward: function () {
      var self = this
      self.rewardsTmp = []
      self.modalReward = false
      self.rows = []
      self.initRows = []
    },
    onAddRewards: function (levelGroupIndex, groupId) {
      var self = this
      self.modalReward = true
      self.levelGroupIndex = levelGroupIndex
      self.groupId = groupId
      self.searchText = ''
      self.rows = []
      self.initRows = []
      self.rewardsTmp = []
    },
    changeAmount: function (groupId, levelGroupIndex, presentId, event) {
      let reg = /^\d+$/
      let value = event.target.value.replace(/,/g, '')
      if (!reg.test(value) || value == '' || value == null) {
        event.target.value = ''
        Notify.create({
          message: this.$t('promotions.please_enter_a_numeric_value'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      this.$store.dispatch('productGroups/changeAmount', {
        levelGroupIndex: levelGroupIndex,
        groupId: groupId,
        presentId: presentId,
        value: Number(value).toLocaleString('en-US')
      })
    },
    removeReward: function (groupId, levelGroupIndex, presentId) {
      this.$store.dispatch('productGroups/removePresentFromGroup', {
        levelGroupIndex: levelGroupIndex,
        groupId: groupId,
        presentId: presentId
      })
    },
    removeProduct: function (node) {
      this.$store.dispatch('productGroups/removeProductFromGroup', {
        product: node
      })
      let groups = LocalStorage.getItem(Constants.GROUPS)
      if (this.index > groups.length) {
        this.index = groups.length + 1
      }
      let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
        ? LocalStorage.getItem(Constants.LEVEL_GROUPS)
        : []
      if (levelGroups.length == 0) {
        this.showLevel = false
      }
    },
    toContinue: function () {
      var self = this
      self.progress = true
      axiosInstance
        .get('/promotions/checkCode?code=' + self.form.promotionCode)
        .then(() => {
          self.progress = false
          self.step = 2
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.promo_code_already_exists'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    saveInfo: function () {
      var self = this
      self.progress = true
      let inputData = {}
      let error = false
      inputData['cities'] = self.citySelection
      inputData['conditionComparitionType'] = self.form.typeFormatId
      inputData['conditionFormatId'] = self.form.conditionFormatId
      inputData['content'] = self.form.description
      inputData['display'] = self.form.show
      inputData['endDate'] = date.formatDate(
        date.extractDate(self.form.toDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      let productsInGroup = []

      inputData['limitationClaimType'] = self.form.rewardFormatId == 1 ? 0 : 1
      let levelGroups = LocalStorage.getItem(Constants.LEVEL_GROUPS)
        ? LocalStorage.getItem(Constants.LEVEL_GROUPS)
        : []
      let limitations = []
      if (levelGroups.length == 0) {
        error = true
      }
      for (let index = 0; index < levelGroups.length; index++) {
        let element = levelGroups[index]
        let length = element.groups.length
        let groups = element.groups
        if (self.checkTypeFormat(groups)) {
          error = true
          break
        } else if (self.checkRewardFormat(groups)) {
          error = true
          break
        }

        let items = []
        for (let i = 0; i < length; i++) {
          let node = element.groups[i]
          if (node.descreaseValue == '' && self.form.rewardFormatId != 1) {
            error = true
            break
          }
          if (node.fromValue != '' && node.toValue != '') {
            let fromValue = parseInt(node.fromValue.replace(/,/g, ''))
            let toValue = parseInt(node.toValue.replace(/,/g, ''))
            if (fromValue >= toValue) {
              error = true
              break
            }
          }
          let obj = {}
          obj['conditionFixValue'] =
            node.fixValue != '' ? parseInt(node.fixValue.replace(/,/g, '')) : 0
          obj['conditionRangeFrom'] =
            node.fromValue != ''
              ? parseInt(node.fromValue.replace(/,/g, ''))
              : 0
          obj['conditionRangeTo'] =
            node.toValue != '' ? parseInt(node.toValue.replace(/,/g, '')) : 0
          obj['productGroupIndex'] = node.productIndex
          obj['rewardFormatId'] = self.form.rewardFormatId
          obj['rewardPercent'] =
            node.descreaseValue != '' && self.form.rewardFormatId == 3
              ? parseInt(node.descreaseValue.replace(/,/g, ''))
              : 0
          obj['rewardValue'] =
            node.descreaseValue != '' && self.form.rewardFormatId == 2
              ? parseInt(node.descreaseValue.replace(/,/g, ''))
              : 0
          obj['rewards'] = node.rewards
          items.push(obj)

          if (index == 0) {
            let products = []
            node.products.forEach(item => {
              let product = products.find(pro => pro.id == item.product.id)
              if (product == undefined) {
                products.push(item.product)
              }
            })
            productsInGroup.push({
              products: products
            })
          }
        }
        limitations.push({
          items: items
        })
      }
      if (error) {
        self.progress = false
        Notify.create({
          message: this.$t('promotions_end_user.promotion_creation_failed'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      inputData['groups'] = productsInGroup
      inputData['limitations'] = limitations
      inputData['name'] = self.form.promotionName
      inputData['preparationDate'] = date.formatDate(
        date.extractDate(self.form.earlyDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['priority'] = 0
      inputData['promotionCode'] = self.form.promotionCode
      inputData['promotionType'] = 0
      // inputData["regions"] = self.regionSelection;
      inputData['regions'] = []
      inputData['rewardFormatId'] = self.form.rewardFormatId
      inputData['startDate'] = date.formatDate(
        date.extractDate(self.form.fromDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['subjectType'] = 1
      // console.log(inputData);
      axiosInstance
        .post('/promotions', inputData)
        .then(response => {
          self.uploadBanner(response.data.data.promotionId)
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions_end_user.promotion_creation_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    uploadBanner: function (promotionId) {
      var self = this
      let formData = new FormData()
      // let files = new Array();
      self.selectedFile.forEach(item => {
        // files.push(item.file);
        formData.append('files[]', item.file)
      })

      axiosInstance
        .post('/promotions/' + promotionId + '/banner', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.create_a_successful_promotion'),
            type: 'positive',
            position: 'top'
          })
          self.$store.dispatch('productGroups/setProductGroups')
          self.$router.push('/promotions')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions_end_user.promotion_creation_failed'),
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
            self.getProductByCategory(self.nodeSelected, self.modalReward)
          } else {
            self.filterProduct(self.modalReward, false)
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
    }
  }
})
