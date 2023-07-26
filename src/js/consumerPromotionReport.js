import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Báo cáo CTKM cho Người tiêu dùng ',
  data: function () {
    return {
      visibleColumns: [
        'promotionId',
        'retailerCode',
        'retailerName',
        'orderCost',
        'productOnPromotionCost',
        'productOnPromotionAmount',
        'discount',
        'rewardAmount'
      ],
      promotionSellinReports: [],
      promotionSelloutReports: [],
      searchSellinText: '',
      searchSelloutText: '',
      showColumns: false,
      sellinPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'promotionId',
        descending: false
      },
      rowsSellinPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      selloutPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'promotionId',
        descending: false
      },
      rowsSelloutPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      summary: {},
      summarySellin: {},
      isSellinSearch: false,
      isSelloutSearch: false,
      tab: 'sellin',
      filename: '',
      is_focusInputSearch:false
    }
  },
  mounted: function () {
    this.getPromotionSellinReport()
    this.getPromotionSelloutReport()
    this.getReportSummary()
  },
  computed: {
    reportColumnsI18n: function () {
      return [
        {
          name: 'promotionId',
          label: this.$t('promotions_retailer.ordinal_number'),
          align: 'center',
          field: 'promotionId',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerCode',
          label: this.$t('promotions.retailer_code'),
          align: 'center',
          field: 'retailerCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerName',
          label: this.$t('promotions.retailer_name'),
          align: 'left',
          field: 'retailerName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderCost',
          label: this.$t('promotions.sales_order'),
          align: 'right',
          field: 'retailers',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productOnPromotionCost',
          label: this.$t('promotions.sales_product'),
          align: 'right',
          field: 'productOnPromotionCost',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productOnPromotionAmount',
          label: this.$t('promotions.total_product'),
          align: 'right',
          field: 'productOnPromotionAmount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'discount',
          label: this.$t('promotions.discount'),
          align: 'right',
          field: 'discount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'rewardAmount',
          label: this.$t('promotions.number_of_gift'),
          align: 'right',
          field: 'rewardAmount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  methods: {
    getPromotionSellinReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let segment =
        (self.sellinPagination.page - 1) * self.sellinPagination.rowsPerPage
      let offset = self.sellinPagination.rowsPerPage
      axiosInstance
        .get(
          `/promotions/${promotionId}/retailers/summary?reportType=SELLIN&segment=${segment}&offset=${offset}&keySearch=${self.searchSellinText}`
        )
        .then(response => {
          self.promotionSellinReports = response.data.data.retailers
          self.sellinPagination.rowsNumber = response.data.data.count
        })
    },
    getPromotionSelloutReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let segment =
        (self.selloutPagination.page - 1) * self.selloutPagination.rowsPerPage
      let offset = self.selloutPagination.rowsPerPage
      axiosInstance
        .get(
          `/promotions/${promotionId}/retailers/summary?reportType=SELLOUT&segment=${segment}&offset=${offset}&keySearch=${self.searchSelloutText}`
        )
        .then(response => {
          self.promotionSelloutReports = response.data.data.retailers
          self.selloutPagination.rowsNumber = response.data.data.count
        })
    },
    getReportSummary: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      axiosInstance
        .get('/promotions/' + promotionId + '/summary')
        .then(response => {
          self.summary = response.data.data.consumer
          let totalDiscount = self.summary.discount + self.summary.rewardValue
          self.summary.cir =
            totalDiscount > 0
              ? parseInt(
                  100 *
                    (totalDiscount / (self.summary.orderCost - totalDiscount)),
                  10
                )
              : 0

          self.summarySellin = response.data.data.retailer
          totalDiscount =
            self.summarySellin.discount + self.summarySellin.rewardValue
          self.summarySellin.cir =
            totalDiscount > 0
              ? parseInt(
                  100 *
                    (totalDiscount /
                      (self.summarySellin.orderCost - totalDiscount)),
                  10
                )
              : 0
        })
        .catch(error => {})
    },
    gotoDetail: function (retailerId, selectedTab) {
      LocalStorage.set(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID,
        retailerId
      )
      LocalStorage.set(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_SELECTED_TAB,
        selectedTab
      )
      this.$router.push('/consumer-promotion-report-detail')
    },

    onSellinRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.sellinPagination.sortBy == sortBy) {
        if (
          (self.sellinPagination.page != page ||
            self.sellinPagination.rowsPerPage != rowsPerPage) &&
          self.sellinPagination.descending == descending
        ) {
          self.sellinPagination.page = page
          self.sellinPagination.rowsPerPage = rowsPerPage
          self.getPromotionSellinReport()
        } else {
          if (self.sellinPagination.descending != descending) {
            self.sellinPagination.descending = descending
          } else {
            self.sellinPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.sellinPagination.sortBy = sortBy
      } else {
        if (self.sellinPagination.descending != descending) {
          self.sellinPagination.descending = descending
        } else {
          self.sellinPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.sellinPagination.sortBy) {
        case 'finalCost':
          sortFn = self.sellinPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.sellinPagination.descending
            ? (a, b) =>
                a[self.sellinPagination.sortBy] >
                b[self.sellinPagination.sortBy]
                  ? -1
                  : a[self.sellinPagination.sortBy] <
                    b[self.sellinPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.sellinPagination.sortBy] >
                b[self.sellinPagination.sortBy]
                  ? 1
                  : a[self.sellinPagination.sortBy] <
                    b[self.sellinPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.promotionSellinReports.sort(sortFn)
    },
    onSelloutRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.selloutPagination.sortBy == sortBy) {
        if (
          (self.selloutPagination.page != page ||
            self.selloutPagination.rowsPerPage != rowsPerPage) &&
          self.selloutPagination.descending == descending
        ) {
          self.selloutPagination.page = page
          self.selloutPagination.rowsPerPage = rowsPerPage
          self.getPromotionSelloutReport()
        } else {
          if (self.selloutPagination.descending != descending) {
            self.selloutPagination.descending = descending
          } else {
            self.selloutPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.selloutPagination.sortBy = sortBy
      } else {
        if (self.selloutPagination.descending != descending) {
          self.selloutPagination.descending = descending
        } else {
          self.selloutPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.selloutPagination.sortBy) {
        case 'finalCost':
          sortFn = self.selloutPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.selloutPagination.descending
            ? (a, b) =>
                a[self.selloutPagination.sortBy] >
                b[self.selloutPagination.sortBy]
                  ? -1
                  : a[self.selloutPagination.sortBy] <
                    b[self.selloutPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.selloutPagination.sortBy] >
                b[self.selloutPagination.sortBy]
                  ? 1
                  : a[self.selloutPagination.sortBy] <
                    b[self.selloutPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.promotionSelloutReports.sort(sortFn)
    },
    downloadReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      axiosInstance
        .get('/promotions/' + promotionId + '/export', {
          responseType: 'blob'
        })
        .then(response => {
          self.filename = `report_${new Date().getTime()}.xlsx`
          let disposition = response.request.getResponseHeader(
            'Content-Disposition'
          )
          if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            var matches = filenameRegex.exec(disposition)
            if (matches != null && matches[1]) {
              let encodedFilename = matches[1].replace(/['"]/g, '')
              self.filename = decodeURIComponent(encodedFilename)
            }
          }
          return response.data.arrayBuffer()
        })
        .then(ab => {
          const byteArray = new Uint8Array(ab)
          const a = window.document.createElement('a')
          a.href = window.URL.createObjectURL(
            new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
          )
          a.download = self.filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
    }
  }
})
