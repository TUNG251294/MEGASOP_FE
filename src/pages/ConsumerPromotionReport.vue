<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('promotions.report_promotion_consumer_title') }}
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
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-md-4 col-sm-6 col-xs-12">
            <q-tabs
              v-model="tab"
              no-caps
              inline-label
              indicator-color="transparent"
              align="left"
              class="mb-1 text-left"
            >
              <q-tab name="sellin" label="SELL - IN" />
              <q-tab name="sellout" label="SELL - OUT" />
            </q-tabs>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-sm-12">
            <q-tab-panels v-model="tab" animated class="w-100">
              <q-tab-panel name="sellin">
                <div class="card card-shadow border-0">
                  <div class="card-body">
                    <!-- <div class="row">
                      <h5 class="font-weight-bolder">
                        {{ $t('promotions.sales_information') }}
                      </h5>
                    </div> -->
                    <div class="row mx-n1">
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
                                Number(summarySellin.orderCost).toLocaleString(
                                  'en-US'
                                )
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
                                  summarySellin.productOnPromotionCost
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
                                Number(summarySellin.discount).toLocaleString(
                                  'en-US'
                                )
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
                              {{ summarySellin.rewardAmount }}
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
                              {{ summarySellin.cir }}%
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
                <div class="card card-shadow border-0 mt-2">
                  <div class="card-body">
                    <!-- <div class="row">
                      <h5 class="font-weight-bolder">
                        {{ $t('promotions.list_of_agent_promotion') }}
                      </h5>
                    </div> -->
                    <div class="row">
                      <q-table
                        :rows="promotionSellinReports"
                        :columns="reportColumnsI18n"
                        color="primary"
                        row-key="promotionId"
                        :visible-columns="visibleColumns"
                        :rows-per-page-options="rowsSellinPerPageOptions"
                        :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                        v-model:pagination="sellinPagination"
                        @request="onSellinRequest"
                      >
                        <template v-slot:top>
                          <div class="row justify-between items-end w-100">
                            <div :class="`col col-md-${is_focusInputSearch ? '5' : '3'} pr-1`" style="transition: all .3s ease-in-out">
                              <q-input
                                class="search_datatable"
                                no-error-icon
                                hide-bottom-space
                                outlined
                                type="text"
                                v-model="searchSellinText"
                                :placeholder="$t('promotions.search_by_retailer_code_name')"
                                @change="getPromotionSellinReport()"
                                @focus="is_focusInputSearch = true"
                                @blur="is_focusInputSearch = false"
                              >
                                <template v-slot:append>
                                  <q-icon name="search" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col col-md-3 mb-25 text-right">
                              <!-- <q-btn
                                outline
                                color="primary"
                                icon-right="archive"
                                :label="$t('retailers.export_excel')"
                                no-caps
                                class="mr-1"
                                clickable
                                @click="downloadReport()"
                              /> -->
                              <q-btn
                                color="primary"
                                icon="grid_view"
                                padding="5px"
                                class="rounded-50"
                                unelevated
                                @click="showColumns = true"
                              />
                            </div>
                          </div>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="promotionId" :props="props"
                              >{{ props.row.promotionId }}
                            </q-td>
                            <q-td key="retailerCode" :props="props"
                              >{{ props.row.retailerCode }}
                            </q-td>
                            <q-td key="retailerName" :props="props">
                              <a
                                class="primary"
                                style="cursor: pointer"
                                @click="
                                  gotoDetail(props.row.retailerId, 'sellin')
                                "
                                >{{ props.row.retailerName }}</a
                              >
                            </q-td>
                            <q-td key="orderCost" :props="props"
                              >{{
                                Number(props.row.orderCost).toLocaleString(
                                  'en-US'
                                )
                              }}đ
                            </q-td>
                            <q-td key="productOnPromotionCost" :props="props"
                              >{{
                                Number(
                                  props.row.productOnPromotionCost
                                ).toLocaleString('en-US')
                              }}đ
                            </q-td>
                            <q-td key="productOnPromotionAmount" :props="props"
                              >{{ props.row.productOnPromotionAmount }}
                            </q-td>
                            <q-td key="discount" :props="props"
                              >{{
                                Number(props.row.discount).toLocaleString(
                                  'en-US'
                                )
                              }}đ
                            </q-td>
                            <q-td key="rewardAmount" :props="props">
                              {{ props.row.rewardAmount }}
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="sellout">
                <div class="card card-shadow border-0">
                  <div class="card-body">
                    <!-- <div class="row">
                      <h5 class="font-weight-bolder">
                        {{ $t('promotions.sales_information') }}
                      </h5>
                    </div> -->
                    <div class="row mx-n1">
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
                                Number(summary.orderCost).toLocaleString(
                                  'en-US'
                                )
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
                                Number(summary.discount).toLocaleString(
                                  'en-US'
                                )
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
                <div class="card card-shadow border-0 mt-2">
                  <div class="card-body">
                    <!-- <div class="row">
                      <h5 class="font-weight-bolder">
                        {{ $t('promotions.list_of_agent_promotion') }}
                      </h5>
                    </div> -->
                    <div class="row">
                      <q-table
                        :rows="promotionSelloutReports"
                        :columns="reportColumnsI18n"
                        color="primary"
                        row-key="promotionId"
                        :visible-columns="visibleColumns"
                        :rows-per-page-options="rowsSelloutPerPageOptions"
                        v-model:pagination="selloutPagination"
                        @request="onSelloutRequest"
                      >
                        <template v-slot:top>
                          <div class="row justify-between items-end w-100">
                            <div :class="`col col-md-${is_focusInputSearch ? '5' : '3'} pr-1`" style="transition: all .3s ease-in-out">
                              <q-input
                                class="search_datatable"
                                no-error-icon
                                hide-bottom-space
                                outlined
                                type="text"
                                v-model="searchSelloutText"
                                :placeholder="$t('promotions.search_by_retailer_code_name')"
                                @change="getPromotionSelloutReport()"
                                @focus="is_focusInputSearch = true"
                                @blur="is_focusInputSearch = false"
                              >
                                <template v-slot:append>
                                  <q-icon name="search" />
                                </template>
                              </q-input>
                            </div>
                            <div class="col col-md-3 mb-25 text-right">
                              <!-- <q-btn
                                outline
                                color="primary"
                                icon-right="archive"
                                :label="$t('retailers.export_excel')"
                                no-caps
                                class="mr-1"
                                clickable
                                @click="downloadReport()"
                              /> -->
                              <q-btn
                                color="primary"
                                icon="grid_view"
                                padding="5px"
                                class="rounded-50"
                                unelevated
                                @click="showColumns = true"
                              />
                            </div>
                          </div>
                        </template>
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="promotionId" :props="props"
                              >{{ props.row.promotionId }}
                            </q-td>
                            <q-td key="retailerCode" :props="props"
                              >{{ props.row.retailerCode }}
                            </q-td>
                            <q-td key="retailerName" :props="props">
                              <a
                                class="primary"
                                style="cursor: pointer"
                                @click="
                                  gotoDetail(props.row.retailerId, 'sellout')
                                "
                                >{{ props.row.retailerName }}</a
                              >
                            </q-td>
                            <q-td key="orderCost" :props="props"
                              >{{
                                Number(props.row.orderCost).toLocaleString(
                                  'en-US'
                                )
                              }}đ
                            </q-td>
                            <q-td key="productOnPromotionCost" :props="props"
                              >{{
                                Number(
                                  props.row.productOnPromotionCost
                                ).toLocaleString('en-US')
                              }}đ
                            </q-td>
                            <q-td key="productOnPromotionAmount" :props="props"
                              >{{ props.row.productOnPromotionAmount }}
                            </q-td>
                            <q-td key="discount" :props="props"
                              >{{
                                Number(props.row.discount).toLocaleString(
                                  'en-US'
                                )
                              }}đ
                            </q-td>
                            <q-td key="rewardAmount" :props="props">
                              {{ props.row.rewardAmount }}
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
        <q-dialog v-model="showColumns" position="right" full-height maximized>
          <q-card style="width: 480px">
            <q-card-section class="row items-center pb-0">
              <h6 class="text-weight-bolder mb-0">{{ $t('promotions.show_columns') }}</h6>
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
                    val="promotionId"
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
                    val="orderCost"
                    :label="$t('promotions.sales_order')"
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
                    val="productOnPromotionAmount"
                    :label="$t('promotions.total_product')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="discount"
                    :label="$t('promotions.discount')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="rewardAmount"
                    :label="$t('promotions.number_of_gift')"
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

<script src="../js/consumerPromotionReport.js"></script>
