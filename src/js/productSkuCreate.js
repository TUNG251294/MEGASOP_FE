import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'ProductSkuCreatePage',
  data: function () {
    return {
      form: {
        productId: 0,
        productVariationId: 0,
        skuName: '',
        skuCode: '',
        display: '1',
        status: '1',
        purchasePrice: 0,
        sellPrice: 0,
        virtualPrice: 0,
        attributes: [],
        minUnit: 1,
        maxUnit: 1,
        maxToMin: 1,
        minBuy: 1,
        increaseUnit: 1,
        description: ''
      },
      minUnits: [],
      maxUnits: [],
      selectedFile: [],
      attributes: [],
      attributeTypes: [],
      progress: false,
      selectedFileError: ''
    }
  },
  computed: {
    maxUnitsI18n: function () {
      const tempMaxUnits = this.maxUnits.map(e => {
        return {
          ...e,
          name: this.$t(`units[${e.id}]`)
        }
      })
      return tempMaxUnits.filter(
        (value, index, self) =>
          self.findIndex(e => e.name === value.name) === index
      )
    },
    minUnitsI18n: function () {
      const tempMinUnits = this.maxUnits.map(e => {
        return {
          ...e,
          name: this.$t(`units[${e.id}]`)
        }
      })
      return tempMinUnits.filter(
        (value, index, self) =>
          self.findIndex(e => e.name === value.name) === index
      )
    },
    isValid: function () {
      return (
        this.isValidSkuName &&
        this.isValidSkuNameLength &&
        this.isValidSkuCode &&
        this.isSelectedFile &&
        this.isValidPurchasePrice &&
        this.isValidSellPriceAndVirtualPrice &&
        this.isValidAttributes &&
        this.isValidUnitPurchaseLevel
      )
    },
    isValidSkuName: function () {
      return this.form.skuName.trim() != ''
    },
    isValidSkuNameLength: function () {
      return this.form.skuName.length > 0 && this.form.skuName.length <= 100
    },
    isValidSkuCode: function () {
      return this.form.skuCode.trim() != ''
    },
    isSelectedFile: function () {
      return this.selectedFile.length > 0
    },
    isValidPurchasePrice: function () {
      let price = '' + this.form.purchasePrice
      price =
        price.indexOf(',') > 0
          ? this.form.purchasePrice.replace(/,/g, '')
          : this.form.purchasePrice
      let reg = /^[0-9]*$/
      return reg.test(price) && parseInt(price) > 0
    },
    isValidSellPriceAndVirtualPrice: function () {
      let reg = /^[0-9]*$/
      // giá thu mua
      let purchasePrice = '' + this.form.purchasePrice
      purchasePrice =
        purchasePrice.indexOf(',') > 0
          ? this.form.purchasePrice.replace(/,/g, '')
          : this.form.purchasePrice

      // giá bán
      let sellPrice = '' + this.form.sellPrice
      sellPrice =
        sellPrice.indexOf(',') > 0
          ? this.form.sellPrice.replace(/,/g, '')
          : this.form.sellPrice

      // giá gạch
      let virtualPrice = '' + this.form.virtualPrice
      virtualPrice =
        virtualPrice.indexOf(',') > 0
          ? this.form.virtualPrice.replace(/,/g, '')
          : this.form.virtualPrice

      return (
        reg.test(purchasePrice) &&
        parseInt(purchasePrice) > 0 &&
        reg.test(sellPrice) &&
        parseInt(sellPrice) > 0 &&
        (reg.test(virtualPrice) ||
        parseInt(virtualPrice) === 0)
        // parseInt(sellPrice) > parseInt(purchasePrice) &&
        // ((reg.test(virtualPrice) &&
        //   parseInt(virtualPrice) > parseInt(sellPrice) &&
        //   parseInt(virtualPrice) > parseInt(purchasePrice)) ||
        //   parseInt(virtualPrice) === 0)
      )
    },
    isValidAttributes: function () {
      let length = this.form.attributes.filter(item => item == 0).length
      return length == 0
    },
    isValidUnitPurchaseLevel() {
      let minBuy = '' + this.form.minBuy
      let increaseUnit = '' + this.form.increaseUnit
      let maxToMin = '' + this.form.maxToMin
      let reg = /^[0-9]*$/
      return (
        reg.test(minBuy) && parseInt(minBuy) > 0 &&
        reg.test(increaseUnit) && parseInt(increaseUnit) > 0 &&
        reg.test(maxToMin) && parseInt(maxToMin) > 0
      )
    }
  },
  mounted: async function () {
    await this.getMaxUnits()
    await this.getMinUnits()
    await this.getAttributeTypes()
  },
  methods: {
    requiredValue(val) {
      return val && val.length > 0 || this.$t('general.required_value')
    },
    validateSkuNameLength(val) {
      return val && val.length <= 100 || this.$t('sku.sku_name_too_long')
    },
    isValidNumber(val) {
      return val && parseInt(val) > 0 || this.$t('general.invalid_value')
    },
    getAttributeTypes: async function () {
      var self = this
      let product = LocalStorage.getItem(Constants.PRODUCT_INFO)
      let type = LocalStorage.getItem(Constants.PRODUCT_BACK_HISTORY)
      if (type == 'product-create') {
        self.attributeTypes = product.attributeTypes
      } else {
        self.attributeTypes = LocalStorage.getItem(
          Constants.PRODUCT_ATTRIBUTE_TYPES
        )
      }
      await self.getAttributes()
    },
    getAttributes: function () {
      var self = this
      axiosInstance
        .get('/attribute/available')
        .then(response => {
          self.attributes = response.data.data.attributes
          self.attributeTypes.forEach(element => {
            element['values'] = []
            self.attributes.forEach(item => {
              if (item.attributeType.id == element.id) {
                element['values'].push(item)
              }
            })
          })
        })
        .catch(error => {
          console.log(error)
        })
      self.form.attributes = new Array(self.attributeTypes.length).fill(0)
    },
    getMaxUnits: function () {
      var self = this
      axiosInstance.get('/packing/list').then(response => {
        self.maxUnits = response.data.data.packings
        self.form.maxUnit = self.maxUnits[0].id
      })
    },
    getMinUnits: function () {
      var self = this
      axiosInstance.get('/units').then(response => {
        self.minUnits = response.data.data.units
        self.form.minUnit = self.minUnits[0].id
      })
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
    convertCurrency: function (value, type) {
      value = value.replace(/,/g, '')
      value = Number(value).toLocaleString('en-US')
      switch (type) {
        case 'v':
          this.form.virtualPrice = value
          break
        case 's':
          this.form.sellPrice = value
          break
        default:
          this.form.purchasePrice = value
          break
      }
    },
    saveInfoSku: function () {
      this.progress = true
      this.createProduct()
    },
    createProduct: function () {
      // if (this.form.description.trim() == '') {
      //   Notify.create({
      //     message: this.$t('sku.please_enter_description'),
      //     type: 'negative',
      //     position: 'top'
      //   })
      //   this.progress = false

      //   return
      // }

      if (this.form.skuName.length == 0) {
        Notify.create({
          message: this.$t('sku.please_enter_sku_name'),
          type: 'negative',
          position: 'top'
        })
        this.progress = false

        return
      }

      if (this.form.skuName.length > 100) {
        Notify.create({
          message: this.$t('sku.sku_name_too_long'),
          type: 'negative',
          position: 'top'
        })
        this.progress = false

        return
      }

      let purchasePrice =
        typeof this.form.purchasePrice === 'string'
          ? parseInt(this.form.purchasePrice.replace(/,/g, ''))
          : parseInt(this.form.purchasePrice.toString().replace(/,/g, ''))
      let sellPrice =
        typeof this.form.sellPrice === 'string'
          ? parseInt(this.form.sellPrice.replace(/,/g, ''))
          : parseInt(this.form.sellPrice.toString().replace(/,/g, ''))
      let virtualPrice =
        typeof this.form.virtualPrice === 'string'
          ? parseInt(this.form.virtualPrice.replace(/,/g, ''))
          : parseInt(this.form.virtualPrice.toString().replace(/,/g, ''))

      if (
        purchasePrice === 0 ||
        sellPrice === 0 //||
        // purchasePrice > sellPrice ||
        // (virtualPrice > 0 && sellPrice > virtualPrice) ||
        // (virtualPrice > 0 && purchasePrice > virtualPrice)
      ) {
        Notify.create({
          message: this.$t('sku.please_check_product_price'),
          type: 'negative',
          position: 'top'
        })
        this.progress = false

        return
      }

      let product = LocalStorage.getItem('pd_cr_pt')
      let mainCateId = LocalStorage.getItem(Constants.MAIN_CATEGORY)

      if (product != null && product.id == 0) {
        let inputData = {}
        inputData['brandId'] = parseInt(product.brandId)
        inputData['categroyIds'] = product.categroyIds
        inputData['name'] = product.name
        inputData['productCode'] = product.productCode
        inputData['mainCateId'] =
          mainCateId != null && mainCateId != 0 ? mainCateId : 0
        axiosInstance
          .post('/products', inputData)
          .then(response => {
            this.form.productId = response.data.data.productId
            product.id = this.form.productId
            LocalStorage.set('pd_cr_pt', product)
            this.createProductVariation()
            this.progress = false
          })
          .catch(() => {
            this.progress = false
            Notify.create({
              message: this.$t('sku.create_product_successful'),
              type: 'negative',
              position: 'top'
            })
          })
      } else {
        this.progress = false
        this.form.productId = product.id
        this.createProductVariation()
      }
    },
    createProductVariation: function () {
      var self = this
      let inputData = {}
      let attributes = []
      let productVariationAttributes = LocalStorage.getItem(
        Constants.PRODUCT_VARIATION_ATTRIBUTES
      )
      self.form.attributes.forEach(item => {
        let obj = {}
        let attr = self.attributes.filter(element => element.id == item)[0]
        obj['attributeTypeId'] = attr.attributeType.id
        obj['attributeTypeValue'] = attr.attributeType.name
        obj['attributeId'] = item
        obj['attributeValue'] = attr.value
        attributes.push(obj)
      })
      inputData['attributes'] = attributes
      inputData['productId'] = self.form.productId
      inputData['description'] = self.form.description
      inputData['incomePrice'] = parseInt(
        self.form.purchasePrice.replace(/,/g, '')
      )
      inputData['minOrder'] = self.form.minBuy
      inputData['name'] = self.form.skuName
      inputData['orderInc'] = self.form.increaseUnit
      inputData['packingExchangeRatio'] = self.form.maxToMin
      inputData['packingId'] = self.form.maxUnit
      inputData['packingPrice'] =
        self.form.maxToMin * self.form.sellPrice.replace(/,/g, '')
      inputData['price'] = self.form.sellPrice.replace(/,/g, '')
      inputData['sku'] = self.form.skuCode
      inputData['status'] = parseInt(self.form.status)
      inputData['unitId'] = self.form.minUnit
      inputData['virtualPrice'] =
        typeof self.form.virtualPrice === 'string'
          ? parseInt(self.form.virtualPrice.replace(/,/g, ''))
          : parseInt(self.form.virtualPrice.toString().replace(/,/g, ''))
      axiosInstance
        .post('/productVariations', inputData)
        .then(response => {
          self.form.productVariationId = response.data.data.productVariationId
          self.createProductResource()
        })
        .catch(errors => {
          self.progress = false
          let message = errors.response.data.errors[0].message
          if (errors.response.data.errors[0].code == '1402') {
            message = this.$t('sku.sku_code_exists')
          }
          Notify.create({
            message: message,
            type: 'negative',
            position: 'top'
          })
        })
    },
    createProductResource: function () {
      var self = this
      let formData = new FormData()
      // let files = new Array();
      self.selectedFile.forEach(item => {
        // files.push(item.file);
        formData.append('files[]', item.file)
      })

      formData.append('productId', self.form.productId)
      formData.append('productVariationId', self.form.productVariationId)
      axiosInstance
        .post('/productResources', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          self.progress = false
          let history = LocalStorage.getItem('pd_a_e_pt')
          self.$router.push('/' + history)
        })
    },
    cancelCreate: function () {
      let edit = localStorage.getItem('pd_id')
      if (edit) {
        this.$router.push('/product-edit')
      } else {
        this.$router.push('/product-create')
      }
    },
    isNumber (event) {
      event = event ? event : window.event
      // if (event.target.value.length >= 5) {
      //   event.preventDefault()
      //   return
      // }

      var charCode = event.which ? event.which : event.keyCode
      if (charCode < 48 || charCode > 57) {
        event.preventDefault()
      } else {
        return true
      }
    },
  }
})
