<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{
                  $t(
                    'promotions.detailed_report_of_promotional_offers_for_retailers'
                  )
                }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('promotions_end_user.promotion')"
                  to="/promotions"
                />
                <q-breadcrumbs-el
                  :label="$t('promotions.promotion_detail_title')"
                  to="/promotion-detail"
                />
                <q-breadcrumbs-el
                  :label="$t('promotions.report_promotion')"
                  to="/retailer-promotion-report"
                />
                <q-breadcrumbs-el
                  :label="$t('promotions.detail_report')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <h5 class="font-weight-bolder">
                    {{ $t('promotions.sales_information') }}
                  </h5>
                </div>
                <div class="row mt-2">
                  <div class="col-md-2-4">
                    <div class="media">
                      <div class="avatar bg-light-primary mr-1">
                        <div class="avatar-content">
                          <q-icon
                            name="attach_money"
                            class="text-success"
                            size="sm"
                            style="
                              font-size: 2rem;
                              background-color: #f2fcf5;
                              padding: 8px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                      </div>
                      <div class="media-body my-auto">
                        <p class="font-weight-bolder mb-0">
                          {{
                            Number(summary.orderCost).toLocaleString('en-US')
                          }}đ
                        </p>
                        <p class="card-text font-small-3 mb-0">
                          {{ $t('promotions.total_sales_completed_order') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2-4">
                    <div class="media">
                      <div class="avatar bg-light-primary mr-1">
                        <div class="avatar-content">
                          <q-icon
                            name="attach_money"
                            class="text-success"
                            size="sm"
                            style="
                              font-size: 2rem;
                              background-color: #f2fcf5;
                              padding: 8px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                      </div>
                      <div class="media-body my-auto">
                        <p class="font-weight-bolder mb-0">
                          {{
                            Number(
                              summary.productOnPromotionCost
                            ).toLocaleString('en-US')
                          }}đ
                        </p>
                        <p class="card-text font-small-3 mb-0">
                          {{ $t('promotions.total_product_sale') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2-4">
                    <div class="media">
                      <div class="avatar bg-light-primary mr-1">
                        <div class="avatar-content">
                          <q-icon
                            name="attach_money"
                            class="text-success"
                            size="sm"
                            style="
                              font-size: 2rem;
                              background-color: #f2fcf5;
                              padding: 8px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                      </div>
                      <div class="media-body my-auto">
                        <p class="font-weight-bolder mb-0">
                          {{
                            Number(summary.discount).toLocaleString('en-US')
                          }}đ
                        </p>
                        <p class="card-text font-small-3 mb-0">
                          {{ $t('promotions.total_discount') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2-4">
                    <div class="media">
                      <div class="avatar bg-light-primary mr-1">
                        <div class="avatar-content">
                          <q-icon
                            name="redeem"
                            class="text-primary"
                            size="sm"
                            style="
                              font-size: 2rem;
                              background-color: #f2fcf5;
                              padding: 8px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                      </div>
                      <div class="media-body my-auto">
                        <p class="font-weight-bolder mb-0">
                          {{ summary.rewardAmount }}
                        </p>
                        <p class="card-text font-small-3 mb-0">
                          {{ $t('promotions.total_amount_gift') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2-4">
                    <div class="media">
                      <div class="avatar bg-light-primary mr-1">
                        <div class="avatar-content">
                          <q-icon
                            name="trending_up"
                            class="text-success"
                            size="sm"
                            style="
                              font-size: 2rem;
                              background-color: #f2fcf5;
                              padding: 8px;
                              border-radius: 50%;
                            "
                          />
                        </div>
                      </div>
                      <div class="media-body my-auto">
                        <p class="font-weight-bolder mb-0">
                          {{ summary.cir }}%
                        </p>
                        <p class="card-text font-small-3 mb-0">
                          {{ $t('promotions.cir_index') }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('promotions.detail_report') }}
                  </h4>
                </div>
                <div class="row mt-2">
                  <q-table
                    :rows="promotionReports"
                    :columns="reportColumns"
                    color="primary"
                    row-key="index"
                    :visible-columns="visibleColumns"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top-left>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        v-model="searchText"
                        :placeholder="$t('promotions.search_by_order_code')"
                      >
                        <template v-slot:append>
                          <q-icon name="search" @click="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:top-right>
                      <!-- <q-btn
                        outline
                        color="primary"
                        icon-right="archive"
                        :label="$t('retailers.export_excel')"
                        no-caps
                        class="mr-1"
                        @click="downloadReport()"
                      /> -->
                      <q-btn
                        color="primary"
                        icon="grid_view"
                        padding="5px"
                        @click="showColumns = true"
                      />
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="index" :props="props"
                          >{{ props.row.index }}
                        </q-td>
                        <q-td key="retailerCode" :props="props"
                          >{{ props.row.retailerCode }}
                        </q-td>
                        <q-td key="retailerName" :props="props"
                          >{{ props.row.retailerName }}
                        </q-td>
                        <q-td key="orderCode" :props="props"
                          >{{ props.row.orderCode }}
                        </q-td>
                        <q-td key="orderCost" :props="props"
                          >{{
                            Number(props.row.orderCost).toLocaleString('en-US')
                          }}đ
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="productVariationName" :props="props">
                          {{ props.row.productVariationName }}
                        </q-td>
                        <q-td key="productOnPromotionAmount" :props="props">
                          {{ props.row.productOnPromotionAmount }}
                        </q-td>
                        <q-td key="unitName" :props="props">
                          {{ props.row.unitName }}
                        </q-td>
                        <q-td key="productOnPromotionCost" :props="props"
                          >{{
                            Number(
                              props.row.productOnPromotionCost
                            ).toLocaleString('en-US')
                          }}đ
                        </q-td>
                        <q-td key="discount" :props="props"
                          >{{
                            Number(props.row.discount).toLocaleString('en-US')
                          }}đ
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="showColumns" position="right" full-height>
          <q-card style="width: 480px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ $t('promotions.show_columns') }}</div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mt-1">
                <div class="col col-12">
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="index"
                    :label="$t('promotions_retailer.ordinal_number')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="retailerCode"
                    :label="$t('promotions.retailer_code')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="retailerName"
                    :label="$t('promotions.retailer_name')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="orderCode"
                    :label="$t('order_list.order_code')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="orderCost"
                    :label="$t('promotions.sales_order')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="sku"
                    :label="$t('promotions_retailer.product_id')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="productVariationName"
                    :label="$t('promotions_retailer.product_name')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="productOnPromotionAmount"
                    :label="$t('promotions.amount')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="unitName"
                    :label="$t('inventory_list.unit')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="productOnPromotionCost"
                    :label="$t('promotions.sales_product')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="discount"
                    :label="$t('promotions.discount')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Báo cáo chi tiết CTKM cho Đại lý ',
  data: function () {
    return {
      reportColumns: [
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
      ],
      visibleColumns: [
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
      promotionReports: [],
      searchText: '',
      oldSearchText: '',
      showColumns: false,
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'desc',
        descending: false
      },
      summary: {}
    }
  },
  mounted: function () {
    this.getPromotionReport()
    this.getReportSummary()
  },
  methods: {
    search: function () {
      this.searchText = this.searchText.trim()
      if (this.oldSearchText === this.searchText) {
        return
      }

      this.pagination.page = 1
      this.oldSearchText = this.searchText
      this.getPromotionReport()
    },
    onRequest: function (props) {
      var self = this
      self.pagination.page = props.pagination.page
      self.pagination.rowsPerPage = props.pagination.rowsPerPage
      self.getPromotionReport()
    },
    getReportSummary: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_RETAILER_ID
      )

      axiosInstance
        .get(
          '/promotions/' + promotionId + '/retailers/' + retailerId + '/summary'
        )
        .then(response => {
          self.summary = response.data.data.retailer
          if (self.summary.promotionId == null) {
            self.summary = {
              orderCost: 0,
              productOnPromotionCost: 0,
              discount: 0,
              rewardAmount: 0,
              rewardValue: 0,
              cir: 0
            }
          } else {
            let totalDiscount = self.summary.discount + self.summary.rewardValue
            if (totalDiscount > 0) {
              self.summary.cir = parseInt(
                100 *
                  (totalDiscount / (self.summary.orderCost - totalDiscount)),
                10
              )
            }
          }
        })
        .catch(error => {})
    },
    getPromotionReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_RETAILER_ID
      )
      if (!promotionId || !retailerId) {
        this.$router.push('/')
      }

      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/promotions/' +
        promotionId +
        '/retailers/' +
        retailerId +
        '/productVariations?reportType=SELLIN&segment=' +
        segment +
        '&offset=' +
        offset
      if (self.searchText) {
        url += '&keySearch=' + encodeURIComponent(self.searchText)
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.promotionReports = response.data.data.productVariations
          self.pagination.rowsNumber = response.data.data.count
          for (let idx = 0; idx < self.pagination.rowsNumber; idx++) {
            let obj = self.promotionReports[idx]
            obj['index'] = segment + 1 + idx
          }
          console.log(self.promotionReports)
        })
        .catch(error => {
          console.log(error)
        })
    },
    downloadReport: function () {
      var self = this
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let retailerId = LocalStorage.getItem(
        Constants.PROMOTION_REPORT_DETAIL_RETAILER_ID
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
</script>
