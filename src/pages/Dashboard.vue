<template>
  <q-page class="flex mx-n1">
    <div class="content-wrapper w-100">
      <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row justify-between items-end breadcrumbs-top">
            <div class="col col-md-9">
              <div class="row items-end justify-start mx-n50">
                <div class="col col-md-4 px-50">
                  <div class="form-group mb-0">
                    <label for="fromDate" class="text-black-400 fs-10">{{
                      $t('general.from_date')
                    }}</label>

                    <q-input
                      outlined
                      v-model="fromDate"
                      mask="##/##/####"
                      :rules="['##/##/####']"
                      class="my-input"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            style="width: 300px; height: 400px"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              no-unset
                              v-model="fromDate"
                              style="width: 300px; height: 400px"
                              :options="optionsFromDate"
                              mask="DD/MM/YYYY"
                              :title="$t('general.from_date')"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  :label="$t('general.closed')"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col col-md-4 px-50">
                  <div class="form-group mb-0">
                    <label for="toDate" class="text-black-400 fs-10">{{
                      $t('general.to_date')
                    }}</label>

                    <q-input
                      outlined
                      v-model="toDate"
                      mask="##/##/####"
                      :rules="['##/##/####']"
                      class="my-input"
                      hide-bottom-space
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            style="width: 300px; height: 400px"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              no-unset
                              v-model="toDate"
                              style="width: 300px; height: 400px"
                              :options="optionsToDate"
                              mask="DD/MM/YYYY"
                              :title="$t('general.to_date')"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  :label="$t('general.closed')"
                                  color="primary"
                                  flat
                                />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col col-md-1">
                    <div class="mb-25">
                      <label for="" class="mb-0">&nbsp;</label>
                      <q-btn
                        class=""
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="submitFilter()"
                      />
                    </div>
                  </div>
              </div>
            </div>
            <div class="col col-md-3 text-right">
              <label>&nbsp;</label>
              <q-btn
                outline
                color="primary"
                icon="refresh"
                no-caps
                :label="$t('general.updated')"
                class="rounded-50 bg-white mb-25"
                @click="reloadData()"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content-body">
        <div class="row mx-n1 grid">
          <div class="grid_box--1">
            <q-card class="statistical card-shadow rounded-50 border-0">
              <div ref="dbNumStats">
                <q-card-section class="card-header py-50 px-1 bg-white">
                  <div class="row flex items-center justify-between">
                    <h4 class="title-sm text-black-500 mb-0">
                      {{ $t('dashboard.statistical') }}
                    </h4>
                    <!-- <label class="label-md text-black-500 mb-0">{{
                      date
                    }}</label> -->
                  </div>
                </q-card-section>
                <q-card-section class="card-body py-75 px-1">
                  <div
                    class="row mb-1 statistical-container"
                    style="margin-left: -1rem !important; cursor: pointer"
                  >
                    <div class="col pl-1 mb-1 statistical-box">
                      <div
                        class="statistics-card statistics-card__revenue rounded-50 bg-gradient-2"
                        style="padding: 10px"
                        @click="goToOrdersByDate()"
                      >
                        <div class="row justify-content-between w-100">
                          <label class="statistical-label text-white mb-0"
                            >{{ $t('dashboard.sales_statistical') }} (VND)
                          </label>
                          <div class="card-icon">
                            <img src="../assets/dollar-gold.svg" />
                          </div>
                        </div>
                        <div class="statistics-number text-white mb-0 w-100">
                          {{
                            revenue.rev > 0
                              ? Number(revenue.rev).toLocaleString('vi-VN')
                              : '--'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="col pl-1 mb-1 statistical-box">
                      <div
                        :class="` statistics-card statistics-card__orders rounded-50 ${
                          revenue.rev < revenue.revKpi
                            ? 'bg-red-100'
                            : 'bg-primarya-100'
                        }`"
                        style="padding: 10px"
                        @click="goToOrdersByDate()"
                      >
                        <div class="row justify-content-between w-100">
                          <label
                            class="statistical-label text-black-400 mb-0"
                            >{{ $t('dashboard.order_statistical') }}</label
                          >
                          <div class="card-icon">
                            <img src="../assets/bill.svg" />
                          </div>
                        </div>
                        <div
                          :class="` statistics-number ${
                            revenue.cnt < revenue.cntKpi
                              ? 'text-danger'
                              : 'text-primary'
                          } mb-0 w-100`"
                        >
                          {{
                            revenue.cnt > 0
                              ? Number(revenue.cnt).toLocaleString('vi-VN')
                              : '--'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="col pl-1 mb-1 statistical-box mb-md-0">
                      <div
                        :class="`statistics-card statistics-card__avg-revenue rounded-50 ${
                          revenue.avg < revenue.avgKpi
                            ? 'bg-red-100'
                            : 'bg-primarya-100'
                        }`"
                        style="padding: 10px"
                        @click="goToOrdersByDate()"
                      >
                        <div class="row justify-content-between w-100 q-px-xs">
                          <label class="statistical-label text-black-400 mb-0"
                            >{{
                              $t('dashboard.average_sales_statistical')
                            }}
                            (VND)</label
                          >
                          <div class="card-icon">
                            <img src="../assets/dollar-blue.svg" />
                          </div>
                        </div>
                        <div
                          :class="`statistics-number ${
                            revenue.avg < revenue.avgKpi
                              ? 'text-danger'
                              : 'text-primary'
                          } mb-0 w-100`"
                        >
                          {{
                            revenue.avg > 0
                              ? Number(revenue.avg).toLocaleString('vi-VN')
                              : '--'
                          }}
                        </div>
                      </div>
                    </div>
                    <div class="col pl-1 mb-1 statistical-box mb-md-0">
                      <div
                        :class="`statistics-card statistics-card__orders-retailer rounded-50 ${
                          ordersRetailer.orders < ordersRetailer.ordersKpi
                            ? 'bg-red-100'
                            : 'bg-primarya-100'
                        }`"
                        style="padding: 10px"
                        @click="goToOrdersByDate()"
                      >
                        <div class="row justify-content-between w-100 q-px-xs">
                          <label class="statistical-label text-black-400 mb-0"
                            >{{ $t('dashboard.retailer_order_statistical') }}
                          </label>
                          <div class="card-icon">
                            <img src="../assets/bell.svg" />
                          </div>
                        </div>
                        <div
                          :class="`statistics-number ${
                            ordersRetailer.orders < ordersRetailer.ordersKpi
                              ? 'text-danger'
                              : 'text-primary'
                          } mb-0 w-100`"
                        >
                          {{
                            ordersRetailer.orders > 0
                              ? Number(ordersRetailer.orders).toLocaleString(
                                  'vi-VN'
                                )
                              : '--'
                          }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="row row-cols-1 row-cols-md-2"
                    style="margin-left: -1rem !important"
                  >
                    <div class="col pl-1 mb-1 mb-md-0">
                      <div
                        class="card statistics-card statistics-card__selling-products rounded-50"
                      >
                        <div class="card-header py-75 px-1 bg-white">
                          <h4
                            class="title-xs text-black-500 mb-0 flex items-center"
                          >
                            <svg-icon name="trend_up" size="24" class="mr-50" />
                            {{ $t('dashboard.marketable_product') }}
                          </h4>
                        </div>
                        <div class="card-body p-0">
                          <div
                            :class="`list-product ${
                              topSellings && topSellings.length > 0
                                ? 'scroll'
                                : ''
                            }`"
                          >
                            <q-list
                              v-if="topSellings && topSellings.length > 0"
                            >
                              <q-item
                                v-for="item in topSellings"
                                :key="item"
                                class="product-item"
                              >
                                <q-item-section
                                  top
                                  thumbnail
                                  class="m-0 pr-50"
                                  @click="
                                    goToWarehouseInventory(
                                      item.productVariationName
                                    )
                                  "
                                  style="cursor: pointer"
                                >
                                  <img :src="item.photo" />
                                </q-item-section>
                                <q-item-section
                                  class="item-info"
                                  @click="
                                    goToWarehouseInventory(
                                      item.productVariationName
                                    )
                                  "
                                  style="cursor: pointer"
                                >
                                  <label class="label-md text-black-500 mb-0">{{
                                    item.productVariationName
                                  }}</label>
                                  <div class="flex items-center">
                                    <label
                                      class="label-md text-black-400 mb-0 mr-2"
                                      >{{ $t('dashboard.sold') }}:
                                      <span class="title-lg text-primary">{{
                                        Number(
                                          item.numberOfProducts
                                        ).toLocaleString('vi-VN')
                                      }}</span></label
                                    >
                                    <label class="label-md text-black-400 mb-0"
                                      >{{ $t('dashboard.inventory') }}:
                                      <span class="title-lg">{{
                                        Number(item.stock).toLocaleString(
                                          'vi-VN'
                                        )
                                      }}</span></label
                                    >
                                  </div>
                                </q-item-section>
                              </q-item>
                            </q-list>
                            <div
                              v-if="!topSellings || topSellings.length == 0"
                              class="flex column items-center justify-center h-100"
                            >
                              <img src="../assets/no-data.svg" />
                              <div class="title-sm mb-0 text-center">
                                {{ $t('general.no_data') }}
                              </div>
                              <div class="body-sm mb-0 text-center">
                                {{ $t('dashboard.message_no_data') }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col pl-1">
                      <div
                        class="card statistics-card statistics-card__selling-products rounded-50"
                      >
                        <div
                          class="card-header flex items-center justify-between py-75 px-1 bg-white"
                        >
                          <h4
                            class="title-xs text-black-500 mb-0 flex items-center"
                          >
                            <svg-icon name="login" size="24" class="mr-50" />
                            {{ $t('dashboard.need_to_import_inventory') }}
                          </h4>
                          <q-btn
                            icon="add"
                            :label="
                              $t('dashboard.create_a_stock_received_docket')
                            "
                            color="primary"
                            padding="0.25rem 0.5rem"
                            size="12px"
                            class="rounded-50"
                            unelevated
                            @click="goToWarehouseReceiptCreate()"
                          />
                        </div>
                        <div class="card-body p-0">
                          <div
                            :class="`list-product ${
                              importProducts && importProducts.length > 0
                                ? 'scroll'
                                : ''
                            }`"
                          >
                            <q-list
                              v-if="importProducts && importProducts.length > 0"
                            >
                              <q-item
                                v-for="item in importProducts"
                                :key="item"
                                class="product-item"
                              >
                                <q-item-section
                                  top
                                  thumbnail
                                  class="m-0 pr-50"
                                  @click="
                                    goToWarehouseInventory(
                                      item.productVariationName
                                    )
                                  "
                                >
                                  <img :src="item.photo" />
                                </q-item-section>
                                <q-item-section
                                  class="item-info"
                                  @click="
                                    goToWarehouseInventory(
                                      item.productVariationName
                                    )
                                  "
                                >
                                  <label class="label-md text-black-500 mb-0">{{
                                    item.productVariationName
                                  }}</label>
                                  <div class="flex items-center">
                                    <label
                                      class="label-md text-black-400 mb-0 mr-2"
                                    >
                                      {{ $t('dashboard.inventory') }}:
                                      <span class="title-lg text-primary">{{
                                        Number(item.stock).toLocaleString(
                                          'vi-VN'
                                        )
                                      }}</span></label
                                    >
                                    <label
                                      class="label-md text-black-400 mb-0 mr-2"
                                      >{{ $t('dashboard.make_order') }}:
                                      <span class="title-lg">{{
                                        Number(
                                          item.numberOfOrders
                                        ).toLocaleString('vi-VN')
                                      }}</span></label
                                    >
                                    <label class="label-md text-danger mb-0"
                                      >{{ $t('dashboard.need') }}:
                                      <span class="title-lg">{{
                                        Number(
                                          item.amount
                                        ).toLocaleString('vi-VN')
                                      }}</span></label
                                    >
                                  </div>
                                </q-item-section>
                              </q-item>
                            </q-list>
                            <div
                              v-if="
                                !importProducts || importProducts.length == 0
                              "
                              class="flex column items-center justify-center h-100"
                            >
                              <img src="../assets/no-data.svg" />
                              <div class="title-sm mb-0 text-center">
                                {{ $t('general.no_data') }}
                              </div>
                              <div class="body-sm mb-0 text-center">
                                {{ $t('dashboard.message_no_data') }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- add -->
                  <div
                    class="row row-cols-1 row-cols-sm-2 w-100 mt-1 justify-content-between"
                  >
                    <div class="col mb-1 mb-md-0 pr-0 pr-sm-50">
                      <q-card
                        class="rounded-50 border-1"
                        bordered
                        flat
                        @click="goToPromotionsForRetailer('RUNNING')"
                      >
                        <q-card-section class="card-body pt-50 pb-75 px-1">
                          <div class="row flex items-center justify-between">
                            <h4 class="title-xs text-black-500 mb-0">
                              {{ $t('dashboard.retailer_promotion') }}
                            </h4>
                            <q-btn flat rounded padding="8px" class="bg-primary"
                              ><svg-icon
                                name="store_16"
                                size="16"
                                class="text-white"
                            /></q-btn>
                          </div>
                          <div
                            class="row mt-50"
                            style="margin-left: -1rem !important"
                          >
                            <div class="col-12 col-sm-7">
                              <q-list>
                                <q-item class="flex items-start p-0">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="loading_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                      >{{
                                        $t('dashboard.running_promotion')
                                      }}</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsRetailer.count
                                          ? Number(
                                              promotionsRetailer.count
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                                <q-item class="flex items-start p-0 mt-50">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="currency_dollar_circle_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25 text-wrap"
                                      style="text-overflow: unset"
                                      >{{ $t('dashboard.discount_promotion')
                                      }}<br />(VND)</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsRetailer.discount
                                          ? Number(
                                              promotionsRetailer.discount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-sm-5">
                              <q-list>
                                <q-item class="flex items-start p-0">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="feed_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                      >{{ $t('dashboard.order_promotion') }}
                                    </q-item-label>
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsRetailer.ordersCount
                                          ? Number(
                                              promotionsRetailer.ordersCount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                                <q-item class="flex items-start p-0 mt-50">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="gift_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                      >{{
                                        $t('dashboard.gift_promotion')
                                      }}</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsRetailer.rewardAmount
                                          ? Number(
                                              promotionsRetailer.rewardAmount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>

                    <div class="col pl-0 pl-sm-50">
                      <q-card
                        class="rounded-50 border-1 mb-0"
                        flat
                        bordered
                        @click="goToPromotionsForConsumer('RUNNING')"
                        style="cursor: pointer"
                      >
                        <q-card-section class="card-body pt-50 pb-75 px-1">
                          <div class="row flex items-center justify-between">
                            <h4 class="title-xs text-black-500 mb-0">
                              {{ $t('dashboard.user_promotion') }}
                            </h4>
                            <q-btn flat rounded padding="8px" class="bg-primary"
                              ><svg-icon
                                name="users_16"
                                size="16"
                                class="text-white"
                            /></q-btn>
                          </div>
                          <div
                            class="row mt-50"
                            style="margin-left: -1rem !important"
                          >
                            <div class="col-12 col-sm-7">
                              <q-list>
                                <q-item class="flex items-start p-0">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="loading_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                    >
                                      {{
                                        $t('dashboard.running_promotion')
                                      }}</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsConsumer.count
                                          ? Number(
                                              promotionsConsumer.count
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                                <q-item class="flex items-start p-0 mt-50">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="currency_dollar_circle_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25 text-wrap"
                                      style="text-overflow: unset"
                                      >{{ $t('dashboard.discount_promotion')
                                      }}<br />(VND)</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsConsumer.discount
                                          ? Number(
                                              promotionsConsumer.discount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                            <div class="col-12 col-sm-5">
                              <q-list>
                                <q-item class="flex items-start p-0">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="feed_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                      >{{
                                        $t('dashboard.order_promotion')
                                      }}</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsConsumer.ordersCount
                                          ? Number(
                                              promotionsConsumer.ordersCount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                                <q-item class="flex items-start p-0 mt-50">
                                  <q-item-section side class="pr-25">
                                    <svg-icon
                                      name="gift_16"
                                      size="16"
                                      class="text-black-400"
                                    />
                                  </q-item-section>
                                  <q-item-section>
                                    <q-item-label
                                      class="body-sm text-black-400 mb-25"
                                      >{{
                                        $t('dashboard.gift_promotion')
                                      }}</q-item-label
                                    >
                                    <q-item-label
                                      class="headline-xs text-primary m-0"
                                      >{{
                                        promotionsConsumer.rewardAmount
                                          ? Number(
                                              promotionsConsumer.rewardAmount
                                            ).toLocaleString('vi-VN')
                                          : '--'
                                      }}</q-item-label
                                    >
                                  </q-item-section>
                                </q-item>
                              </q-list>
                            </div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
              </div>
            </q-card>
          </div>
          <div class="grid_box--2">
            <q-card class="donut-chart card-shadow rounded-50 border-0">
              <q-card-section class="card-header py-50 px-1 bg-white">
                <div
                  class="row flex items-center justify-between title-sm text-black-500"
                >
                  <div>{{ $t('dashboard.order_status') }}</div>
                </div>
              </q-card-section>
              <q-card-section class="card-body py-75 px-1">
                <div class="donut-chart-area">
                  <DonutChartVue :from-date="chartFromDate" :to-date="chartToDate" />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="grid_box--3">
            <q-card class="bar-chart card-shadow rounded-50 border-0">
              <q-card-section class="card-header py-50 px-1 bg-white">
                <div
                  class="row flex items-center justify-between title-sm text-black-500"
                >
                  <div>
                    {{ $t('dashboard.average_order_processing_time') }}
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="card-body py-75 px-1">
                <BarChartVue />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage } from 'quasar'
import { mapActions, mapState, mapGetters } from 'vuex'
import SvgIcon from 'src/components/SvgIcon.vue'
import DonutChartVue from '../components/apexcharts/DonutChart.vue'
import BarChartVue from '../components/apexcharts/BarChart.vue'

export default {
  name: 'ProductsPage',
  components: {
    SvgIcon,
    DonutChartVue,
    BarChartVue
  },

  data() {
    return {
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      today: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      chartFromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      chartToDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      revenue: {
        avg: 0,
        avgKpi: 0,
        cnt: 0,
        cntKpi: 0,
        rev: 0,
        revKpi: 0
      },
      ordersRetailer: {
        orders: 0,
        ordersKpi: 0
      },
      topSellings: [],
      importProducts: [],
      propsProductImport: [],
      orderStates: [],
      promotionsConsumer: {
        count: 0,
        discount: 0,
        totalCost: 0,
        ordersCount: 0,
        rewardAmount: 0
      },
      promotionsRetailer: {
        count: 0,
        discount: 0,
        totalCost: 0,
        ordersCount: 0,
        rewardAmount: 0
      }
    }
  },
  mounted: async function () {
    await this.getSummaryRevenue()
    await this.getSummaryRetailerOrders()
    await this.getTopSelling()
    await this.getImportProducts()
    await this.getOrderStates()
    await this.getPromotionStats()
    this.getWarehouseImportTicketItems()
  },
  methods: {
    ...mapActions('warehouseImportTicketItems', [
      'getWarehouseImportTicketItems'
    ]),
    reloadData: async function () {
      this.fromDate = this.date
      this.toDate = this.date

      await this.getSummaryRevenue()
      await this.getSummaryRetailerOrders()
      await this.getTopSelling()
      await this.getImportProducts()
      await this.getOrderStates()
      await this.getPromotionStats()
    },

    submitFilter() {
      this.getSummaryRevenue()
      this.getSummaryRetailerOrders()
      this.getTopSelling()
      this.getOrderStates()
    },

    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },

    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      return (
        dt <= Date.now() && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
      )
    },

    getSummaryRevenue: function () {
      let self = this
      let url = '/orders/sellin/summary/revenue'

      if (undefined !== self.fromDate && '' !== self.fromDate) {
        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + self.today
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.revenue.avg = response.data.data.avg
          self.revenue.cnt = response.data.data.cnt
          self.revenue.rev = response.data.data.rev
        })
    },

    getSummaryRetailerOrders: function () {
      let self = this
      let url = '/orders/sellin/summary/retailerOrders'

      if (undefined !== self.fromDate && '' !== self.fromDate) {
        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + self.today
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.ordersRetailer.orders = response.data.data.numberOfRetailer
        })
    },

    getTopSelling: function () {
      let self = this
      let url = '/orders/sellin/summary/topOrderProducts'

      if (undefined !== self.fromDate && '' !== self.fromDate) {
        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + self.today
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.topSellings = response.data.data.topProducts
        })
    },

    getImportProducts: function () {
      let self = this
      let importedProducts = LocalStorage.getItem('warehouseImportTicketItems') || []

      axiosInstance
        .get('/orders/sellin/summary/productsTobeImport')
        .then(response => {
          self.importProducts = response.data.data.productsTobeImport.map(item => {
            return {
              ...item,
              amount: item.totalTobeImport
            }
          })
        })
    },

    getOrderStates: function () {
      let self = this
      let url = '/orders/sellin/summary/ordersState'

      if (undefined !== self.fromDate && '' !== self.fromDate) {
        this.chartFromDate = self.fromDate
        this.chartToDate = self.toDate

        url +=
          '?from=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&to=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      } else {
        url += '?date=' + self.today
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.orderStates = response.data.data
        })
    },

    getPromotionStats: function () {
      let self = this

      axiosInstance.get('/promotions/stats').then(response => {
        (self.promotionsConsumer = {
          count: response.data.data.PROMOTION_CONSUMER_COUNT,
          discount: response.data.data.PROMOTION_CONSUMER_DISCOUNT,
          ordersCount: response.data.data.PROMOTION_CONSUMER_ORDERS_COUNT,
          totalCost: response.data.data.PROMOTION_CONSUMER_TOTAL_COST,
          rewardAmount: response.data.data.PROMOTION_CONSUMER_REWARD_AMOUNT
        }),
          (self.promotionsRetailer = {
            count: response.data.data.PROMOTION_RETAILER_COUNT,
            discount: response.data.data.PROMOTION_RETAILER_DISCOUNT,
            ordersCount: response.data.data.PROMOTION_RETAILER_ORDERS_COUNT,
            totalCost: response.data.data.PROMOTION_RETAILER_TOTAL_COST,
            rewardAmount: response.data.data.PROMOTION_RETAILER_REWARD_AMOUNT
          })
      })
    },

    goToOrdersByDate: function () {
      var self = this
      this.$router.push({ path: '/orders', query: { date: self.date } })
    },

    goToOrdersByStatus: function (status) {
      var self = this
      this.$router.push({
        path: 'orders',
        query: { date: self.date, status: status }
      })
    },

    goToWarehouseReceiptCreate: function () {
      const self = this
      const witis = LocalStorage.getItem('warehouseImportTicketItems') || []
      self.importProducts.forEach(product => {
        self.$store.dispatch(
          'warehouseImportTicketItems/addProductToWarehouse',
          {
            product: product
          }
        )
      })

      this.$router.push({
        path: '/warehouse-receipt-create'
      })
    },

    goToWarehouseInventory: function (prod_name) {
      this.$router.push({
        path: '/warehouse-inventory',
        query: { keyword: prod_name }
      })
    },

    goToPromotionsForConsumer: function (status, type) {
      this.$router.push({
        path: '/promotions',
        query: { status: status }
      })
    },

    goToPromotionsForRetailer: function (status, type) {
      this.$router.push({
        path: '/promotions',
        query: { status: status }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.content-header {
  padding: 0px 16px;
}
.grid {
  padding: 0 2rem 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    'statistical donut_chart'
    'statistical bar_chart';
  grid-gap: 1em;

  &_box {
    &--1 {
      grid-area: statistical;

      .statistical {
        height: 100%;
      }
    }

    &--2 {
      grid-area: donut_chart;

      .donut-chart {
        height: 100%;
      }
    }

    &--3 {
      grid-area: bar_chart;
      .bar-chart {
        height: 100%;
      }
    }
  }
}

.donut-chart-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.statistical-label {
  font-size: 14px !important;
  font-weight: bold;
}

.statistics-number {
  font-weight: bold;
  padding-top: 8px;
  font-size: 1.2em;
}

.statistical-box {
  min-width: 204px;
  flex: 25%;
}

:deep(.q-field__control) {
  background: #fff;
  padding-top: 0.25rem;
  padding-bottom: .25rem;
  border-radius: 8px;
}

@media screen and (max-width: 800px) {
  .statistical-container {
    flex-direction: column;
  }
}

@media screen and (max-width: 1240px) {
  .grid {
    grid-template-columns: 100%;
    grid-template-areas:
      'statistical'
      'donut_chart'
      'bar_chart';
  }
}

@media screen and (max-width: 1500px) {
  .statistical-box {
    flex: 50%;
  }
}
</style>
