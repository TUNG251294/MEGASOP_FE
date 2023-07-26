import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Báo cáo chi tiết CTKM cho Người tiêu dùng ',
  data: function () {
    return {
      sellinVisibleColumns: [
        'index',
        'retailerCode',
        'retailerName',
        'orderCode',
        'orderCost',
        'sku',
        'productVariationName',
        'productOnPromotionAmount',
        'unitName',
        'productOnPromotionCost',
        'discount'
      ],
      selloutVisibleColumns: [
        'index',
        'retailerCode',
        'retailerName',
        'consumerPhone',
        'consumerName',
        'orderCode',
        'orderCost',
        'sku',
        'productVariationName',
        'productOnPromotionAmount',
        'unitName',
        'productOnPromotionCost',
        'discount'
      ],
      showColumns: false,
      promotionSellinReports: [],
      promotionSelloutReports: [],
      odlSearchSellinText: '',
      searchSellinText: '',
      oldSearchSelloutText: '',
      searchSelloutText: '',
      sellinPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      rowsSellinPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      selloutPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      rowsSelloutPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      tab: 'sellin',
      summary: {},
      summarySellin: {}
    }
  },
  created: function () {
    this.tab = LocalStorage.getItem(
      Constants.PROMOTION_REPORT_DETAIL_SELLOUT_SELECTED_TAB
    )
    if (!this.tab) {
      this.tab = 'sellin'
    }
  },
  mounted: function () {
    this.getPromotionSellinReport()
    this.getPromotionSelloutReport()
    this.getReportSummary()
  },
  computed: {
    reportSellinColumnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('promotions_retailer.ordinal_number'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerCode',
          label: this.$t('promotions.retailer_code'),
          align: 'left',
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
          name: 'orderCode',
          label: this.$t('order_list.order_code'),
          align: 'center',
          field: 'retailerCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderCost',
          label: this.$t('promotions.sales_order'),
          align: 'right',
          field: 'orderCost',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'sku',
          label: this.$t('promotions_retailer.product_id'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productVariationName',
          label: this.$t('promotions_retailer.product_name'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productOnPromotionAmount',
          label: this.$t('promotions.amount'),
          align: 'right',
          field: 'productOnPromotionAmount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'unitName',
          label: this.$t('inventory_list.unit'),
          align: 'center',
          field: 'unitName',
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
          name: 'discount',
          label: this.$t('promotions.discount'),
          align: 'right',
          field: 'discount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    reportSelloutColumnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('promotions_retailer.ordinal_number'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerCode',
          label: this.$t('promotions.retailer_code'),
          align: 'left',
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
          name: 'consumerPhone',
          label: this.$t('promotions.customer_phone_number'),
          align: 'center',
          field: 'consumerPhone',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'consumerName',
          label: this.$t('order_list.name_of_customer'),
          align: 'left',
          field: 'consumerName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderCode',
          label: this.$t('order_list.order_code'),
          align: 'center',
          field: 'retailerCode',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderCost',
          label: this.$t('promotions.sales_order'),
          align: 'right',
          field: 'orderCost',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'sku',
          label: this.$t('promotions_retailer.product_id'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productVariationName',
          label: this.$t('promotions_retailer.product_name'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productOnPromotionAmount',
          label: this.$t('promotions.amount'),
          align: 'right',
          field: 'productOnPromotionAmount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'unitName',
          label: this.$t('inventory_list.unit'),
          align: 'center',
          field: 'unitName',
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
          name: 'discount',
          label: this.$t('promotions.discount'),
          align: 'right',
          field: 'discount',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  methods: {
    searchSellin: function () {
      this.searchSellinText = this.searchSellinText.trim()
      if (this.odlSearchSellinText === this.searchSellinText) {
        return
      }

      this.sellinPagination.page = 1
      this.odlSearchSellinText = this.searchSellinText
      this.getPromotionSellinReport()
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
    getReportSummary: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID
      )

      axiosInstance
        .get(
          '/promotions/' + promotionId + '/retailers/' + retailerId + '/summary'
        )
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
    getPromotionSellinReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID
      )

      if (!promotionId || !retailerId) {
        this.$router.push('/promotions')
      }

      let segment =
        (self.sellinPagination.page - 1) * self.sellinPagination.rowsPerPage
      let offset = self.sellinPagination.rowsPerPage
      let url =
        '/promotions/' +
        promotionId +
        '/retailers/' +
        retailerId +
        '/productVariations?reportType=SELLIN&segment=' +
        segment +
        '&offset=' +
        offset
      if (self.searchSellinText) {
        url += '&keySearch=' + encodeURIComponent(self.searchSellinText)
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.promotionSellinReports = response.data.data.productVariations
          self.sellinPagination.rowsNumber = response.data.data.count
          for (let idx = 0; idx < self.sellinPagination.rowsNumber; idx++) {
            let obj = self.promotionSellinReports[idx]
            obj['index'] = segment + 1 + idx
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    searchSellout: function () {
      this.searchSelloutText = this.searchSelloutText.trim()
      if (this.oldSearchSelloutText === this.searchSelloutText) {
        return
      }

      this.selloutPagination.page = 1
      this.oldSearchSelloutText = this.searchSelloutText
      this.getPromotionSelloutReport()
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
    getPromotionSelloutReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID
      )

      if (!promotionId || !retailerId) {
        this.$router.push('/promotions')
      }

      let segment =
        (self.selloutPagination.page - 1) * self.selloutPagination.rowsPerPage
      let offset = self.selloutPagination.rowsPerPage
      let url =
        '/promotions/' +
        promotionId +
        '/retailers/' +
        retailerId +
        '/productVariations?reportType=SELLOUT&segment=' +
        segment +
        '&offset=' +
        offset

      if (self.searchSelloutText) {
        url += '&keySearch=' + encodeURIComponent(self.searchSelloutText)
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.promotionSelloutReports = response.data.data.productVariations
          self.selloutPagination.rowsNumber = response.data.data.count
          for (let idx = 0; idx < self.selloutPagination.rowsNumber; idx++) {
            let obj = self.promotionSelloutReports[idx]
            obj['index'] = segment + 1 + idx
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    downloadReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_SELLOUT_RETAILER_ID
      )
      if (!promotionId || !retailerId) {
        this.$router.push('/')
      }

      let url =
        '/promotions/' + promotionId + '/retailers/' + retailerId + '/export'
      axiosInstance
        .get(url, {
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
