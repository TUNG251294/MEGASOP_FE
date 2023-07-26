import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Chỉnh sửa CTKM',
  data: function () {
    return {
      form: {
        subjectType: '1',
        conditionFormatId: 1,
        rewardFormatId: 1,
        typeFormatId: 1,
        fromDate: date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'DD/MM/YYYY'
        ),
        toDate: date.formatDate(
          date.addToDate(Date.now(), { days: 7 }),
          'DD/MM/YYYY'
        ),
        earlyDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
        promotionCode: '',
        promotionName: '',
        description: '',
        note: '',
        cities: [],
        regions: [],
        show: true,
        groupProducts: [],
        groupStructures: [],
        promotionState: '',
        banner: '',
        preparationDateDisable: false
      },
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
      canChoose: true
    }
  },
  computed: {
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
    isValidToSend: function () {
      return this.isValidFromDate && this.isValidToDate
    },
    isValidFromDate: function () {
      if (this.form.promotionState == 'RUNNING') {
        return true
      }

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
    this.enableTypeFormat()
  },
  methods: {
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
        this.$router.push('/promotion-detail')
        return
      }
      let promotion = LocalStorage.getItem(Constants.PROMOTION_DETAIL)
      this.form.promotionState = promotion.promotionState
      this.form.banner = promotion.banner
      this.form.conditionFormatId = promotion.conditionFormatId
      this.form.rewardFormatId = promotion.rewardFormatId
      this.form.typeFormatId = promotion.conditionComparitionType
      this.form.fromDate = promotion.startDate
      let dt = date.formatDate(Date.now(), 'YYYY/MM/DD')
      if (date.extractDate(promotion.startDate, 'YYYY/MM/DD') <= dt) {
        this.form.fromDate = date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'DD/MM/YYYY'
        )
      }
      this.form.toDate = promotion.endDate
      if (date.extractDate(promotion.endDate, 'YYYY/MM/DD') <= dt) {
        this.form.toDate = date.formatDate(
          date.addToDate(Date.now(), { days: 2 }),
          'DD/MM/YYYY'
        )
      }
      this.form.earlyDate = promotion.preparationDate
      this.form.preparationDateDisable =
        date.extractDate(promotion.preparationDate, 'YYYY/MM/DD') < Date.now()
      if (
        !['PENDING'].includes(promotion.promotionState) &&
        date.extractDate(promotion.preparationDate, 'YYYY/MM/DD') <= Date.now()
      ) {
        this.form.earlyDate = date.formatDate(Date.now(), 'DD/MM/YYYY')
      }
      this.form.promotionCode = promotion.promotionCode
      this.form.promotionName = promotion.name
      this.form.description = promotion.content
      let cityIds = promotion.promotionLocationDto.promotionLocationDetail.map(
        item => {
          if (item.cityId != null) return item.cityId
        }
      )
      this.getCities(cityIds)
      let regionIds =
        promotion.promotionLocationDto.promotionLocationDetail.map(item => {
          if (item.regionId != null) return item.regionId
        })
      this.getRegions(regionIds)

      this.form.show = promotion.display
      this.selectedFile.push({ path: promotion.banner })
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
    getCities: function (cityIds) {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.cities = response.data.data.cities
        self.form.cities = self.cities.filter(item => cityIds.includes(item.id))
        self.citySelection = self.form.cities.map(item => item.id)
        self.allCity = self.form.cities.length == self.cities.length
      })
    },
    getRegions: function (regionIds) {
      var self = this
      axiosInstance.get('/regions').then(response => {
        self.regions = response.data.data.regions
        self.form.regions = self.regions.filter(item =>
          regionIds.includes(item.id)
        )
        self.regionSelection = self.form.regions.map(item => item.id)
        self.allRegion = self.form.regions.length == self.regions.length
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
      this.$router.push('/promotion-detail')
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
    saveInfo: function () {
      var self = this
      if (!self.isValidToSend) {
        Notify.create({
          message: this.$t('promotions.please_check_promotion_information'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      self.progress = true
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let inputData = {}
      inputData['cities'] = self.citySelection
      inputData['endDate'] = date.formatDate(
        date.extractDate(self.form.toDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['note'] = self.form.note
      inputData['content'] = self.form.description
      inputData['preparationDate'] = date.formatDate(
        date.extractDate(self.form.earlyDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['regions'] = self.regionSelection
      inputData['retailers'] = []
      inputData['startDate'] = date.formatDate(
        date.extractDate(self.form.fromDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )

      axiosInstance
        .post('/promotions/' + promotionId + '/changeInfo', inputData)
        .then(() => {
          if (self.selectedFile[0].path != self.form.banner) {
            self.uploadBanner(promotionId)
            return
          }
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_successful'),
            type: 'positive',
            position: 'top'
          })
          self.$router.push('/promotion-detail')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_failed'),
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
            message: this.$t('promotions.edit_promotions_successful'),
            type: 'positive',
            position: 'top'
          })
          self.$router.push('/promotion-detail')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    }
  }
})
