import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

// API: `/promotions/{id}/switchStatus/{action}`
const PROMOTION_ACTION = Object.freeze({
  APPROVE: 'APPROVE',
  PENDING: 'PENDING',
  RERUN: 'RERUN',
  PAUSE: 'PAUSE',
  CANCEL: 'CANCEL',
  STOP: 'STOP'
})

export default defineComponent({
  name: 'Chi tiết khuyến mãi',
  data: function () {
    return {
      PROMOTION_ACTION,
      promotion: {},
      categories: [],
      nodes: [],
      updateHistoryModal: false,
      detailModal: false,
      types: {
        1: this.$t('promotions_retailer.reward_level'),
        2: this.$t('promotions_retailer.reward_range'),
        0: this.$t('promotions_retailer.reward_range')
      },
      // conditionFormat: {
      //   1: this.$t('promotions_retailer.number_of_products'),
      //   2: this.$t('promotions_retailer.product_sales'),
      //   3: this.$t('promotions.order_value')
      // },
      // rewardFormat: {
      //   1: this.$t('promotions.product_giveaway'),
      //   2: this.$t('promotions_retailer.depreciation'),
      //   3: `${this.$t('promotions_retailer.percentage_reduction')} (%)`
      // },
      limitations: [],

      promotionState: {
        NEW: this.$t('promotions.to_approval'),
        APPROVED: this.$t('promotions.approved'),
        PENDING: this.$t('promotions.pending'),
        RUNNING: this.$t('promotions.running'),
        PAUSE: this.$t('promotions.paused'),
        FINISH: this.$t('promotions.end'),
        CANCELED: this.$t('promotions.cancelled')
      },
      stateColor: {
        NEW: 'text-warning warning',
        APPROVED: 'text-blue blue',
        PENDING: 'text-orange orange',
        RUNNING: 'text-success success',
        PAUSE: 'text-info info',
        FINISH: 'text-purple purple',
        CANCELED: 'text-danger danger'
      },
      units: [],
      locations: '',
      description: '',
      retailers: '',
      histories: [],
      showLocation: false,
      showRetailers: false,
      isApproved: false,
      progress: false,
      confirm: false,
      statusSwitch: false
    }
  },
  computed: {
    promotionStateI18n: function () {
      return {
        NEW: this.$t('promotions.to_approval'),
        APPROVED: this.$t('promotions.approved'),
        PENDING: this.$t('promotions.pending'),
        RUNNING: this.$t('promotions.running'),
        PAUSE: this.$t('promotions.paused'),
        FINISH: this.$t('promotions.end'),
        CANCELED: this.$t('promotions.cancelled')
      }
    },
    rewardColumnsI18n: function () {
      return [
        {
          name: 'productVariationName',
          label: this.$t('promotions_retailer.product'),
          align: 'left',
          field: 'productVariationName',
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
          name: 'unitId',
          label: this.$t('promotions_retailer.unit'),
          align: 'left',
          field: 'unitId',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        }
      ]
    },
  },
  mounted: async function () {
    await this.getUnits()
    await this.getUpdateHistory()
    await this.getPromotionDetail()
  },
  methods: {
    conditionFormatText (conditionFormatId) {
      let text
      switch(conditionFormatId) {
        case 1:
          text = this.$t('promotions_retailer.number_of_products')
          break
        
        case 2:
          text = this.$t('promotions_retailer.product_sales')
          break
        
        case 3:
          text = this.$t('promotions.order_value')
          break
      }
      return text
    },
    bonusTypeFormatText (bonusTypeId) {
      let text
      switch (bonusTypeId) {
        case 0:
        case 2:
          text = this.$t('promotions_retailer.reward_range')
          break

        case 1:
          text = this.$t('promotions_retailer.reward_level')
          break
      }

      return text
    },
    rewardFormatText (rewardFormatId) {
      let text
      switch(rewardFormatId) {
        case 1:
          text = this.$t('promotions.product_giveaway')
          break
        
        case 2:
          text = this.$t('promotions_retailer.depreciation')
          break
        
        case 3:
          text = `${this.$t('promotions_retailer.percentage_reduction')} (%)`
          break
      }
      return text
    },
    getPromotionDetail: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      axiosInstance
        .get('/promotions/' + promotionId)
        .then(response => {
          self.promotion = response.data.data.promotion
          LocalStorage.set(Constants.PROMOTION_DETAIL, self.promotion)
          self.limitations = self.promotion.promotionLimitation
          self.locations =
            self.promotion.promotionLocationDto.promotionLocationNamesForDisplay
          self.retailers =
            self.promotion.subjectType == 'RETAILER' &&
            (self.locations == '' || self.locations == null)
              ? self.promotion.promotionParticipants.retailerNames
              : ''
          self.description = self.promotion.content

          let startDate = date.formatDate(
            date.extractDate(self.promotion.startDate, 'DD/MM/YYYY'),
            'YYYY/MM/DD'
          )
          self.isApproved =
            (startDate >= date.formatDate(Date.now(), 'YYYY/MM/DD') &&
              ['PENDING', 'NEW'].includes(self.promotion.promotionState)) ||
            self.promotion.promotionState == 'PAUSE'
            
          if (!self.statusSwitch) {
            self.getCategories(self.promotion.promotionGroups)
          }
        })
        .catch(error => {})
    },
    getCategories: function (promotionGroups) {
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      var self = this
      axiosInstance.get('/category/' + promotionId).then(response => {
        let categories = response.data.data.categories
        let nodesLv0 = categories.filter(category => category.level == 0)
        nodesLv0 = nodesLv0.map(obj => ({ ...obj, children: [] }))
        let nodesLv1 = categories.filter(category => category.level == 1)
        nodesLv1 = nodesLv1.map(obj => ({ ...obj, children: [] }))
        let nodesLv2 = categories.filter(category => category.level == 2)
        nodesLv2 = nodesLv2.map(obj => ({ ...obj, children: [] }))

        promotionGroups.forEach(element => {
          let nodeLv0s = []
          let nodeLv1s = []
          let nodeLv2s = []
          element.promotionProductGroupDetails.forEach(group => {
            group['body'] = 'story'
            group['name'] = group.productVariationName

            if (group.categoryIdLv2 == 0 && group.categoryIdLv1 == 0) {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv0 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                nodeLv0['children'].push(group)
                nodeLv0s.push(nodeLv0)
              } else {
                nl0['children'].push(group)
              }
            } else if (group.categoryIdLv2 == 0) {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv1 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              let nl1 = nodeLv1s.find(item => item.id == group.categoryIdLv1)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
                nodeLv1s.push(nodeLv1)
                nodeLv0['children'].push(nodeLv1)
                nodeLv0s.push(nodeLv0)
              } else if (nl1 == undefined) {
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
                nodeLv1s.push(nodeLv1)
                nl0['children'].push(nodeLv1)
              } else {
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
              }
            } else {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv2 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              let nl1 = nodeLv1s.find(item => item.id == group.categoryIdLv1)
              let nl2 = nodeLv2s.find(item => item.id == group.categoryIdLv2)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )

                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                nodeLv1['children'].push(nodeLv2)
                nodeLv1s.push(nodeLv1)
                nodeLv0['children'].push(nodeLv1)
                nodeLv0s.push(nodeLv0)
              } else if (nl1 == undefined) {
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                nodeLv1['children'].push(nodeLv2)
                nodeLv1s.push(nodeLv1)
                nl0['children'].push(nodeLv1)
              } else if (nl2 == undefined) {
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(nodeLv2)
              } else {
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodeLv1['children'].find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
              }
            }
          })
          self.categories.push(nodeLv0s)
          nodeLv0s = []
          nodeLv1s = []
          nodeLv2s = []
          nodesLv0 = nodesLv0.map(obj => ({ ...obj, children: [] }))
          nodesLv1 = nodesLv1.map(obj => ({ ...obj, children: [] }))
          nodesLv2 = nodesLv2.map(obj => ({ ...obj, children: [] }))
        })
      })
    },
    getUnits: function () {
      var self = this
      axiosInstance
        .get('/units')
        .then(response => {
          self.units = response.data.data.units
        })
        .catch(error => {})
    },
    getUnitName: function (id) {
      return this.units.filter(e => e.id == id)[0]?.name
    },
    viewDetail: function (type) {
      var self = this
      switch (type) {
        case 'd':
          self.detailModal = true
          break
        case 'l':
          self.showLocation = true
          break
        case 'r':
          self.showRetailers = true
          break
        case 'rl':
          self.showRetailers = false
          break
        default:
          self.showLocation = false
          break
      }
    },
    goToReport: function () {
      var self = this
      let str =
        self.randomstring(5) + self.promotion.subjectType + self.randomstring(5)
      let url
      if (self.promotion.subjectType == 'RETAILER') {
        LocalStorage.set(Constants.PROMOTION_SUBJECT_RETAILER, str)
        url = '/retailer-promotion-report'
      } else {
        LocalStorage.set(Constants.PROMOTION_SUBJECT, str)
        url = '/consumer-promotion-report'
      }
      self.$router.push(url)
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
    getUpdateHistory: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      axiosInstance
        .get('/promotions/' + promotionId + '/histories')
        .then(response => {
          self.histories = response.data.data.histories
        })
        .catch(error => {})
    },
    onHistory: function () {
      var self = this
      self.updateHistoryModal = true
    },
    goToEditPage: function () {
      var self = this
      let str =
        self.randomstring(5) +
        (self.promotion.subjectType == 'RETAILER' ? '2' : '1') +
        self.randomstring(5)
      let url
      if (self.promotion.subjectType == 'RETAILER') {
        LocalStorage.set(Constants.PROMOTION_SUBJECT_RETAILER, str)
        url = '/retailer-promotion-edit'
      } else {
        LocalStorage.set(Constants.PROMOTION_SUBJECT, str)
        url = '/consumer-promotion-edit'
      }
      self.$router.push(url)
    },
    switchStatus: function (state, promotionAction, accept = false) {
      console.log('Run switch status')
      if (!this.isApproved && accept) {
        Notify.create({
          message: this.$t(
            'promotions.please_edit_the_start_date_of_the_promotion'
          ),
          type: 'negative',
          position: 'top'
        })
        return
      }
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      this.progress = true
      let message = ''
      switch (state) {
        case 'NEW':
          message = this.$t('promotions.promotion_approve_success')
          break
        case 'APPROVED':
          message = this.$t('promotions.promotion_pending_success')
          break
        case 'PENDING':
          message = this.$t('promotions.promotion_rerun_success')
          break
        case 'RUNNING':
          message = this.$t('promotions.promotion_pause_success')
          break
        default:
          message = this.$t('promotions.promotion_rerun_success')
          break
      }
      axiosInstance
        .get(`/promotions/${promotionId}/switchStatus/${promotionAction}`)
        .then(() => {
          this.progress = false
          Notify.create({
            message: message,
            type: 'positive',
            position: 'top'
          })
          this.statusSwitch = true
          this.getPromotionDetail()
        })
        .catch(() => {
          this.progress = false
        })
    },
    forceFinish: function () {
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      this.progress = true
      axiosInstance
        .get('/promotions/' + promotionId + '/forceFinish')
        .then(() => {
          this.progress = false
          this.confirm = false
          Notify.create({
            message: this.$t('promotions.promotion_end'),
            type: 'positive',
            position: 'top'
          })
          this.getPromotionDetail()
        })
        .catch(() => {
          this.progress = false
          this.confirm = false
          Notify.create({
            message: this.$t('promotions.promotion_cannot_end'),
            type: 'negative',
            position: 'top'
          })
        })
    }
  }
})
