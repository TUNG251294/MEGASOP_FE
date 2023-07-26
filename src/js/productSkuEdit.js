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
        description: '',
        images: []
      },
      minUnits: [],
      maxUnits: [],
      selectedFile: [],
      attributes: [],
      attributeTypes: [],
      progress: false,
      removeImages: [],
      addImages: []
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
        this.isValidSkuCode &&
        this.isSelectedFile &&
        this.isValidPurchasePrice &&
        this.isValidSellPriceAndVirtualPrice &&
        // this.isValidAttributes
        this.isValidUnitPurchaseLevel
      )
    },
    isValidSkuName: function () {
      return this.form.skuName.trim() != ''
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
    await this.getSkuDetail()
  },
  methods: {
    requiredValue(val) {
      return val && val.length > 0 || 'Trường thông tin bắt buộc không được để trống'
    },
    isValidNumber(val) {
      return val && parseInt(val) > 0 || 'Trường thông tin không hợp lệ'
    },
    getSkuDetail: function () {
      var self = this
      axiosInstance
        .get(
          '/productVariations/' +
            LocalStorage.getItem(Constants.PRODUCT_VARIATION_ID)
        )
        .then(response => {
          let skuInfo = response.data.data.productVariation
          self.selectedFile = skuInfo.resources
          self.form.images = skuInfo.resources
          self.form.skuName = skuInfo.name
          self.form.skuCode = skuInfo.sku
          self.form.productId = skuInfo.productId
          self.form.productVariationId = skuInfo.id
          self.form.status = skuInfo.status == 'ACTIVE' ? '1' : '0'
          self.form.purchasePrice = Number(skuInfo.incomePrice).toLocaleString(
            'en-US'
          )
          self.form.sellPrice = Number(skuInfo.price).toLocaleString('en-US')
          self.form.virtualPrice = Number(skuInfo.virtualPrice).toLocaleString(
            'en-US'
          )
          self.form.minUnit = skuInfo.unitId
          self.form.maxUnit = skuInfo.packingId
          self.form.maxToMin = skuInfo.packingExchangeRatio
          self.form.minBuy = skuInfo.minOrder
          self.form.increaseUnit = skuInfo.orderInc
          self.form.description = skuInfo.description
          self.form.attributes = response.data.data.attributes.map(
            item => item.values[0].name
          )
          self.attributeTypes = LocalStorage.getItem(
            Constants.PRODUCT_ATTRIBUTE_TYPES
          )
        })
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
          self.addImages.push({
            id: self.uuidv4(),
            url: dataURI,
            file: file
          })

          self.selectedFile.push({
            id: self.uuidv4(),
            url: dataURI,
            file: file
          })
        }
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (imageId) {
      var self = this
      let image = self.form.images.filter(element => {
        return element.id == imageId
      })
      if (image != undefined) {
        self.removeImages.push(imageId)
      }

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
      this.updateProductVariation()
    },
    updateProductVariation: function () {
      var self = this
      // if (self.form.description.trim() == '') {
      //   this.progress = false
      //   Notify.create({
      //     message: self.$t('sku.please_enter_description'),
      //     type: 'negative',
      //     position: 'top'
      //   })
      //   return
      // }
      let purchasePrice = parseInt(self.form.purchasePrice.replace(/,/g, ''))
      let sellPrice = parseInt(self.form.sellPrice.replace(/,/g, ''))
      let virtualPrice = parseInt(self.form.virtualPrice.replace(/,/g, ''))

      if (
        purchasePrice === 0 ||
        sellPrice === 0 //||
        // purchasePrice > sellPrice ||
        // (virtualPrice > 0 && sellPrice > virtualPrice) ||
        // (virtualPrice > 0 && purchasePrice > virtualPrice)
      ) {
        this.progress = false
        Notify.create({
          message: self.$t('sku.please_check_product_price'),
          type: 'negative',
          position: 'top'
        })
        return
      }

      let inputData = {}
      // let attributes = [];
      // self.form.attributes.forEach((item) => {
      //   let obj = {};
      //   let attr = self.attributes.filter((element) => element.id == item)[0];
      //   obj["attributeTypeId"] = attr.attributeType.id;
      //   obj["attributeTypeValue"] = attr.attributeType.name;
      //   obj["attributeId"] = item;
      //   obj["attributeValue"] = attr.value;
      //   attributes.push(obj);
      // });
      inputData['id'] = self.form.productVariationId
      // inputData["attributes"] = attributes;
      inputData['productId'] = self.form.productId
      inputData['description'] = self.form.description
      inputData['incomePrice'] = purchasePrice
      inputData['minOrder'] = self.form.minBuy
      inputData['name'] = self.form.skuName
      inputData['orderInc'] = self.form.increaseUnit
      inputData['packingExchangeRatio'] = self.form.maxToMin
      inputData['packingId'] = self.form.maxUnit
      inputData['packingPrice'] =
        self.form.maxToMin * self.form.sellPrice.replace(/,/g, '')
      inputData['price'] = sellPrice
      inputData['sku'] = self.form.skuCode
      inputData['status'] = parseInt(self.form.status)
      inputData['unitId'] = self.form.minUnit
      inputData['virtualPrice'] = virtualPrice
      axiosInstance
        .put('/productVariations', inputData)
        .then(() => {
          this.progress = false
          if (self.addImages.length > 0) {
            self.createProductResource()
          }
          if (self.removeImages.length > 0) {
            self.removeProductResource()
          }
          self.goBack()
        })
        .catch(errors => {
          this.progress = false
          self.progress = false
          let message = self.$t('sku.update_product_failed')
          if (errors.response.data.errors[0].code == '2400') {
            message = self.$t('sku.can_not_inactive_sku')
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
      self.addImages.forEach(item => {
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
        .then(response => {})
    },
    removeProductResource: function () {
      var self = this
      let inputData = {}
      inputData['productResourceIds'] = self.removeImages
      inputData['productVariationId'] = self.form.productVariationId
      axiosInstance.delete('/productResources/delete', {
        data: inputData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },
    goBack: function () {
      var self = this
      self.progress = false
      let history = LocalStorage.getItem(Constants.PRODUCT_BACK_HISTORY)
      self.$router.push('/' + history)
    },
    cancelEdit: function () {
      this.$router.push('/product-edit')
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
