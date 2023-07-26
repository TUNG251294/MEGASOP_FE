import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Chương trình khuyến mãi',
  data: function () {
    return {
      stats: {
        PROMOTION_CONSUMER_COUNT: 0,
        PROMOTION_RETAILER_COUNT: 0,
        PROMOTION_CONSUMER_DISCOUNT: 0.0,
        PROMOTION_RETAILER_DISCOUNT: 0.0,
        PROMOTION_CONSUMER_TOTAL_COST: 0.0,
        PROMOTION_RETAILER_TOTAL_COST: 0.0
      },
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      searchText: '',

      conditionType: [],
      rewardType: [],
      promotions: [],
      initPromotions: [],

      visibleColumns: [
        'index',
        'promotionCode',
        'name',
        'preparationDate',
        'startDate',
        'endDate',
        'subjectType',
        'conditionFormatId',
        'rewardFormatId',
        'promotionState'
      ],
      showColumns: false,
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
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
      status: -1,
      isSearch: false,
      isGet: false,
      isFilter: false,
      modal: false,
      subjectType: '1',
      statuses: [
        'NEW',
        'APPROVED',
        'PENDING',
        'RUNNING',
        'PAUSE',
        'FINISH',
        'CANCELED'
      ],
      is_focusInputSearch:false,
      dataLoading: true
    }
  },
  computed: {
    conditionTypeI18n: function () {
      return this.conditionType.map(e => {
        return {
          ...e,
          name: this.$t(`conditionTypes[${e.id}]`)
        }
      })
    },
    rewardTypeI18n: function () {
      return this.rewardType.map(e => {
        return {
          ...e,
          name: this.$t(`rewardTypes[${e.id}]`)
        }
      })
    },
    applicableTypeI18n: function () {
      return {
        CONSUMER: this.$t(`subjectOfApplication.CONSUMER`),
        RETAILER: this.$t(`subjectOfApplication.RETAILER`)
      }
    },
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
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('promotions.ordinal_number'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'promotionCode',
          label: this.$t('promotions.promotion_id'),
          align: 'left',
          field: 'promotionCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'name',
          label: this.$t('promotions.promotion_name'),
          align: 'left',
          field: 'name',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'preparationDate',
          label: this.$t('promotions.early_application_date'),
          align: 'left',
          field: 'preparationDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'startDate',
          label: this.$t('promotions.start_day'),
          align: 'left',
          field: 'startDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'endDate',
          label: this.$t('promotions.end_day'),
          align: 'left',
          field: 'endDate',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'subjectType',
          label: this.$t('promotions.subjects_of_application'),
          align: 'left',
          field: 'subjectType',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'conditionFormatId',
          label: this.$t('promotions.condition_type'),
          align: 'left',
          field: 'conditionFormatId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'rewardFormatId',
          label: this.$t('promotions.bonus_type'),
          align: 'left',
          field: 'rewardFormatId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'promotionState',
          label: this.$t('promotions.status'),
          align: 'left',
          field: 'promotionState',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    this.getPromotionRewardFormat()
    this.getPromotionStats()
  },
  methods: {
    getPromotionStats: function () {
      let self = this
      axiosInstance.get('/promotions/stats').then(response => {
        self.stats = response.data.data
        self.dataLoading = false
      })
    },
    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      return (
        dt <= Date.now() && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
      )
    },
    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },
    searchPromotion: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isGet = false
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/promotions/search?segment=' +
        segment +
        '&offset=' +
        offset +
        '&fromDate=' +
        date.formatDate(
          date.extractDate(self.fromDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        ) +
        '&toDate=' +
        date.formatDate(
          date.extractDate(self.toDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        )
      url += self.status != -1 ? '&state=' + self.status : ''
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.promotions = response.data.data.promotions.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.promotions = response.data.data.promotions
          self.initPromotions = response.data.data.promotions
        } else {
          self.promotions = []
          self.initPromotions = []
        }
      })
    },
    getPromotions: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = true
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url = '/promotions/search?segment=' + segment + '&offset=' + offset
      let statusReq = this.$route.query.status
      if (undefined !== statusReq && '' !== statusReq) {
        self.status = statusReq
        url += '&state=' + self.status
      }
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.promotions = response.data.data.promotions.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.promotions = response.data.data.promotions
          self.initPromotions = response.data.data.promotions
        } else {
          self.promotions = []
          self.initPromotions = []
        }
      })
    },
    getPromotionRewardFormat: function () {
      var self = this
      axiosInstance.get('/promotions/reward/format').then(response => {
        self.rewardType = response.data.data.PromotionRewardFormats
        self.getConditionFormat()
      })
    },
    getConditionFormat: function () {
      var self = this
      axiosInstance.get('/promotions/condition/format').then(response => {
        self.conditionType = response.data.data.PromotionConditionFormats
        self.getPromotions()
      })
    },
    onRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.pagination.sortBy == sortBy || !sortBy) {
        if (
          (self.pagination.page != page ||
            self.pagination.rowsPerPage != rowsPerPage) &&
          self.pagination.descending == descending
        ) {
          self.pagination.page = page
          self.pagination.rowsPerPage = rowsPerPage
          if (self.isSearch) {
            self.searchPromotion()
          } else if (self.isGet) {
            self.getPromotions()
          } else {
            self.filterPromotions()
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
      self.promotions.sort(sortFn)
    },
    onNew: function () {
      var self = this
      self.modal = true
    },
    confirm: function () {
      var self = this
      let str = self.randomstring(5) + self.subjectType + self.randomstring(5)
      let url
      if (self.subjectType == '1') {
        LocalStorage.set(Constants.PROMOTION_SUBJECT, str)
        url = '/consumer-promotion-create'
      } else {
        LocalStorage.set(Constants.PROMOTION_SUBJECT_RETAILER, str)
        url = '/retailer-promotion-create'
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
    goToDetail: function (id) {
      LocalStorage.set(Constants.PROMOTION_ID, id)
      this.$router.push('/promotion-detail')
    },
    filterPromotions: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getPromotions()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url = '/promotions/search?segment=' + segment + '&offset=' + offset
      url += '&keyword=' + self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.promotions = response.data.data.promotions.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.promotions = response.data.data.promotions
          self.initPromotions = response.data.data.promotions
        } else {
          self.promotions = []
          self.initPromotions = []
        }
      })
    }
  }
})
