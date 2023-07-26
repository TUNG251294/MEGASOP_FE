<template>
  <q-page class="flex">
    
    <div
      :class="`content-wrapper w-100 ${progress ? 'loading-opacity' : ''}`"
    >
      <div class="content-header d-none">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.order_list') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.order_list')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-md-2-4 d-flex">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.totalOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.total_order') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-primarya-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:12px">
                      <svg-icon name="deploy_code" size="24" viewBox="0 0 24 24" class="text-primarya-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.newOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.to_pay') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-orange-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="waiting_confirm" size="32" class="text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.approveOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.confirmed') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-green-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="confirmed" size="32" class="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.deliveredOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.delivered') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-blue-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="in_delivery" size="32" color="#007aff" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.finishOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.completed') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-primarya-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="delivered" size="32" color="#018abe" class="text-primarya-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-md-2-4 d-flex">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.returnOrderCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.refunded') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-red-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="return" size="32" color="#ea5455" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.canceledByCustomerCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t('order_list.orders_waiting_cancelled_from_customer')
                      }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-red-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="waiting_cancel" size="32" class="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.canceledByOutStockCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t('order_list.orders_waiting_cancelled_by_sold_out')
                      }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-red-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="waiting_cancel" size="32" class="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.canceledByOtherCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t('order_list.orders_waiting_canceled_by_other_reason')
                      }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-red-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="waiting_cancel" size="32" class="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2-4 d-flex pl-md-0">
            <div class="card card-shadow border-0 w-100 mb-1">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0"
                      style="font-size: 18px !important"
                    >
                      {{ orderCount.approveToCancelCount }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{ $t('order_list.cancelled_order_confirmed') }}
                    </p>
                  </div>
                  <div class="icon-wrapper bg-red-100 round-circle">
                    <div class="d-flex items-center justify-center icon-content" style="padding:8px">
                      <svg-icon name="canceled" size="32" class="text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <div class="row d-none">
                  <h4 class="font-weight-bolder">
                    {{ $t('menu.order_list') }}
                  </h4>
                </div>
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label class="text-black-400 fs-10"> {{ $t('order_list.status') }}</label>
                      <select class="custom-select fs-12" v-model="statusValue">
                        <option selected value="0">
                          {{ $t('order_list.select_status') }}
                        </option>
                        <option
                          :value="item.value"
                          v-for="item in statusesI18n"
                          :key="item"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="fromDate" class="text-black-400 fs-10">{{
                        $t('general.from_date')
                      }}</label>
                      <q-input
                        filled
                        v-model="fromDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control fs-12"
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
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="toDate" class="text-black-400 fs-10">{{ $t('general.to_date') }}</label>
                      <q-input
                        filled
                        v-model="toDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
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
                    <div class="mb-1" style="margin-left:-0.75rem">
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
                        @click="search()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator class="bg-black-200" />
                <div class="row mt-1">
                  <q-markup-table v-if="dataLoading">
                    <thead>
                      <tr>
                        <th 
                          v-for="(th, idx) in columnsI18n" 
                          :key="idx"
                          :class="`text-${th.align}`"
                          :style="idx == 0 ? 'width:150px' : ''"
                        >
                          <q-skeleton animation="blink" type="text" />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="n in rowsPerPageOptions" :key="n">
                        <td 
                          v-for="(td, idx) in columnsI18n" 
                          :key="idx"
                          :class="`text-${td.align}`"
                        >
                          <q-skeleton animation="blink" type="text" />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                  <q-table
                    v-else
                    :rows="orders"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    v-model:selected="selected"
                    selection="multiple"
                    @request="onRequest"
                  >
                    <template v-slot:top>
                      <div class="row justify-between w-100">
                        <div :class="`col col-md-${is_focusInputSearch ? '5' : '3'} pr-1`" style="transition: all .3s ease-in-out">
                          <q-input
                            class="search_datatable"
                            no-error-icon
                            hide-bottom-space
                            outlined
                            type="text"
                            v-model="searchText"
                            :placeholder="$t('order_list.search_by_order_code')"
                            @change="filterOrders()"
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col col-md-3 text-right">
                          <q-btn
                            class="mr-1 rounded-50"
                            to="/order-create"
                            unelevated
                            no-caps
                            color="primary"
                            :label="$t('order_list.order_create')"
                          />
                          <q-btn
                            class="rounded-50"
                            unelevated
                            no-caps
                            color="primary"
                            :label="$t('order_list.order_print')"
                            @click="printOrders"
                            :disable="selected && selected?.length === 0"
                          />
                        </div>
                      </div>
                      
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props" @click="onDetail(props.row)">
                        <q-td key="checkbox" class="row justify-center">
                          <q-checkbox dense v-model="props.selected" />
                        </q-td>
                        <q-td key="orderCode" :props="props"
                          >{{ props.row.orderCode }}
                        </q-td>
                        <q-td key="retailerInvoiceName" :props="props"
                          >{{ props.row.retailerInvoiceName }}
                        </q-td>
                        <q-td key="tel" :props="props"
                          >{{ props.row.tel }}
                        </q-td>
                        <q-td key="orderDate" :props="props"
                          >{{ props.row.orderDate }}
                        </q-td>
                        <q-td key="finalCost" :props="props">
                          {{
                            Number(props.row.finalCost).toLocaleString('en-US')
                          }}đ
                        </q-td>
                        <q-td key="orderCreator" :props="props">
                          {{ props.row.createByName || 'RETAILER' }}
                        </q-td>
                        <q-td key="orderStatus" :props="props">
                          <q-chip 
                            :class="`title-xs text-${textColorStatus[props?.row?.orderStatus]} bg-${bgColorStatus[props?.row?.orderStatus]} my-0`"
                          >
                            {{ labelStatusI18n[props?.row?.orderStatus] }}
                          </q-chip>
                        </q-td>
                      </q-tr>
                    </template>
                    <!-- <template v-slot:bottom="scope">
                      <div class="row justify-center w-100">
                        <div class="col col-md-4"></div>
                        <div class="col col-md-4">
                          <div class="d-flex items-center justify-center">
                            <q-btn unelevated round dense flat :disable="scope.isFirstPage" @click="scope.prevPage">
                              <svg-icon name="chevron_left" size="24" class="text-black-400" />
                            </q-btn>
                            <q-pagination
                              v-model="pagination.page"
                              :max="pagesNumber"
                              size="24"
                              unelevated
                            />
                            <q-btn unelevated round dense flat :disable="scope.isLastPage" @click="scope.nextPage">
                              <svg-icon name="chevron_right" size="24" class="text-black-400" />
                            </q-btn>
                          </div>
                        </div>
                        <div class="col col-md-4"></div>
                      </div>
                    </template> -->
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog
          v-model="modal"
          position="right"
          full-height
          full-width
          maximized
          @hide="hideModal()"
        >
          <q-card style="width: 1068px">
            <q-card-section class="row items-center pt-2">
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none text-black-500"
              />
              <h4 class="title-lg text-black-500 mb-0 ml-1">
                {{ $t('order_list.order_detail') }}
              </h4>
              <q-space />
              <!-- orderStatus == 'NEW' -->
              <q-btn 
                v-if="!cancelation && order.orderStatus == 'NEW'"
                color="danger"
                :label="$t('order_list.cancel')"
                outline
                no-caps
                class="label-md rounded-50"
                clickable
                @click="cancelOrder()"
              />
              <q-btn
                v-if="!cancelation && order.orderStatus == 'NEW'"
                unelevated
                color="primary"
                :label="$t('general.confirmed')"
                no-caps
                class="label-md ml-50 rounded-50"
                clickable
                @click="confirmOrder()"
              />

              <q-btn
                v-if="cancelation && order.cancelReason == null"
                class="label-md rounded-50"
                :label="$t('general.cancel')"
                color="danger"
                outline
                no-caps
                v-close-popup
                unelevated
                @click="cancelCancelOrder()"
              />
              <q-btn
                v-if="cancelation && order.cancelReason == null"
                class="label-md ml-50 rounded-50"
                :label="$t('general.confirmed')"
                color="primary"
                unelevated
                no-caps
                clickable
                :disabled="
                  ((cancelReason == '0' ||
                    (cancelReason == 3 && reason == '')) &&
                    order.orderStatus == 'NEW') ||
                  (reason == '' && order.orderStatus == 'APPROVED')
                "
                @click="confirmCancelOrder()"
              />
              <!-- orderStatus == 'NEW' -->

              <!-- order.orderStatus == 'APPROVED' -->
              <q-btn
                v-if="!delivery && order.orderStatus == 'APPROVED'"
                unelevated
                color="primary"
                :label="$t('order_list.delivery')"
                no-caps
                class="label-md ml-50 rounded-50"
                clickable
                @click="deliveryOrder()"
              />

              <q-btn
                v-if="delivery"
                class="label-md rounded-50"
                :label="$t('general.cancel')"
                color="danger"
                outline
                no-caps
                v-close-popup
                unelevated
                @click="cancelDeliveryOrder()"
              />
              <q-btn
                v-if="delivery"
                class="label-md ml-50 rounded-50"
                :label="$t('general.confirmed')"
                color="primary"
                unelevated
                no-caps
                clickable
                :disabled="!isValidToDelivery"
                @click="confirmDeliveryOrder()"
              />
              <!-- order.orderStatus == 'APPROVED' -->

              <!-- order.orderStatus == 'DELIVERED' -->
              <q-btn
                v-if="!result && order.orderStatus == 'DELIVERED'"
                unelevated
                color="primary"
                :label="$t('order_list.complete_order')"
                no-caps
                class="label-md ml-50 rounded-50"
                clickable
                @click="finishOrder()"
              />

              <q-btn
                v-if="result"
                :label="$t('general.cancel')"
                class="label-md rounded-50"
                color="danger"
                outline
                no-caps
                v-close-popup
                unelevated
                @click="cancelResult()"
              />
              <q-btn
                v-if="result"
                class="label-md ml-50 rounded-50"
                :label="$t('general.confirmed')"
                color="primary"
                unelevated
                clickable
                no-caps
                :disabled="
                  resultOption == '0' ||
                  (resultOption == 2 &&
                    (resultReason == '' || warehouseId == 0))
                "
                @click="confirmFinishOrder()"
              />
              <!-- order.orderStatus == 'DELIVERED' -->
            </q-card-section>
            <q-separator />
            <q-card-section class="p-2">
              <!-- ORDER PROGRESS START -->
              <q-card class="no-shadow border d-none">
                <q-card-section>
                  <h5 class="title-sm text-black-500 mb-0">
                    {{ $t('order_list.order_progress') }}
                  </h5>
                </q-card-section>
                <q-separator />
                <q-card-section class="pb-0">
                  
                </q-card-section>
              </q-card>
              <!-- ORDER PROGRESS END -->

              <!-- ORDER CANCEL REASON START -->
              <q-card v-if="cancelation == true" class="no-shadow border mt-75">
                <q-card-section class="d-flex items-center justify-between">
                  <h5 class="title-sm text-black-500 mb-0">
                    {{ $t('order_list.reason_cancel') }}
                  </h5>
                  <!-- <q-space />
                  <q-btn
                    v-if="order.cancelReason == null"
                    class="label-md rounded-50"
                    :label="$t('general.cancel')"
                    color="danger"
                    flat
                    outline
                    no-caps
                    v-close-popup
                    unelevated
                    @click="cancelCancelOrder()"
                  />
                  <q-btn
                    v-if="order.cancelReason == null"
                    class="label-md ml-50 rounded-50"
                    :label="$t('general.confirmed')"
                    color="primary"
                    unelevated
                    no-caps
                    clickable
                    :disabled="
                      ((cancelReason == '0' ||
                        (cancelReason == 3 && reason == '')) &&
                        order.orderStatus == 'NEW') ||
                      (reason == '' && order.orderStatus == 'APPROVED')
                    "
                    @click="confirmCancelOrder()"
                  /> -->
                </q-card-section>
                <q-separator />
                <q-card-section v-if="order.cancelReason == null" class="row mx-n1">
                  <div class="col-md-5">
                    <select 
                      v-model="cancelReason"
                      class="custom-select fs-12" 
                    >
                      <option selected value="0">
                        {{ $t('order_list.select_reason') }}
                      </option>
                      <option
                        v-for="item in optionsI18n"
                        :value="item.value"
                        :key="item"
                      >
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-7">
                    <textarea
                      class="form-control"
                      v-if="cancelReason == 3"
                      :placeholder="$t('order_list.enter_reason_cancel')"
                      cols="28"
                      rows="10"
                      v-model="reason"
                    ></textarea>
                  </div>
                </q-card-section>
                <q-card-section v-else>
                  <div class="row items-start justify-start mx-n1">
                    <div class="col-md-2">
                      <label
                        for=""
                        v-if="order.orderStatus != 'RETURN'"
                        class="label-md text-black-400 mb-0"
                        >{{ $t('order_list.reason_cancel') }}</label
                      >
                      <label
                        for=""
                        v-if="order.orderStatus == 'RETURN'"
                         class="label-md text-black-400 mb-0"
                        >{{ $t('order_list.reason_return') }}</label
                      >
                    </div>
                    <div class="col-md-10">
                      <label for="" class="label-md text-black-400 mb-0">{{ order.cancelReason }}</label>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <!-- ORDER CANCEL REASON END -->

              <!-- ORDER DELIVERY START -->
              <q-card v-if="delivery == true" class="no-shadow border mt-75">
                <q-card-section class="d-flex items-center justify-between">
                  <h5 class="title-sm text-black-500 mb-0">
                    {{ $t('order_list.shipment_detail') }}
                  </h5>
                </q-card-section>
                <q-separator />
                <q-card-section class="">
                  <div class="form-group">
                    <select
                      v-model="warehouseId"
                      class="custom-select"
                      @change="compareToWarehouse()"
                    >
                      <option value="0">
                        {{ $t('order_list.choose_a_delivery_warehouse') }}
                      </option>
                      <option
                        v-for="item in warehouses"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <q-table
                      class="no-border-radius"
                      :rows="compareItems"
                      :columns="deliveryColumnsI18n"
                      color="primary"
                      row-key="id"
                      hide-bottom
                      :rows-per-page-options="rowsPerPageOptions"
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td
                            class="text-wrap text-truncate"
                            key="productVariationName"
                            :props="props"
                          >
                            {{ props.row.productVariationName }}
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ props.row.productVariationName }}
                            </q-tooltip>
                          </q-td>
                          <q-td key="countInOrder" :props="props">
                            {{ props.row.countInOrder }}
                          </q-td>
                          <q-td key="countInWarehouse" :props="props">
                            {{ props.row.countInWarehouse }}
                          </q-td>
                          <q-td key="available" :props="props">
                            <svg-icon
                              :name="props.row.available ? 'check_circle' : 'close_circle'"
                              size="24"
                              :class="props.row.available ? 'text-green-500' : 'text-red-500'"
                            />
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                </q-card-section>
              </q-card>
              <!-- ORDER DELIVERY END -->

              <!-- ORDER FINISH START -->
              <q-card v-if="result == true" class="no-shadow border mt-75">
                <q-card-section class="d-flex items-center justify-between">
                  <h5 class="title-sm text-black-500 mb-0">
                    {{ $t('order_list.complete_order') }}
                  </h5>
                </q-card-section>
                <q-separator />
                <q-card-section class="row mx-n1">
                  <div class="col-md-5">
                    <select 
                      v-model="resultOption"
                      class="custom-select fs-12" 
                    >
                      <option value="0">
                        {{ $t('order_list.select_status') }}
                      </option>
                      <option
                        v-for="item in resultOptionsI18n"
                        :value="item.value"
                        :key="item"
                      >
                        {{ item.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-7">
                    <select
                      v-if="resultOption == 2"
                      v-model="warehouseId" 
                      class="custom-select"
                    >
                      <option value="0">
                        {{ $t('order_list.choose_a_warehouse') }}
                      </option>
                      <option
                        v-for="item in warehouses"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>

                    <textarea
                      v-if="resultOption == 2"
                      class="form-control mt-75"
                      :placeholder="$t('order_list.enter_reason_return')"
                      cols="28"
                      rows="10"
                      v-model="resultReason"
                    ></textarea>
                  </div>
                </q-card-section>
              </q-card>
              <!-- ORDER FINISH END -->

              <!-- ORDER INFORMATION START -->
              <q-card class="no-shadow border mt-75">
                <q-card-section class="d-flex items-center justify-between">
                  <h5 class="title-sm text-black-500 mb-0">{{
                    $t('order_list.order_information')
                  }}</h5>
                  <q-chip 
                    :class="`title-xs text-${textColorStatus[order.orderStatus]} bg-${bgColorStatus[order.orderStatus]} my-0`"
                  >
                    {{ labelStatusI18n[order.orderStatus] }}
                  </q-chip>
                </q-card-section>
                <q-separator />
                <q-card-section>
                  <div class="form-group mb-0">
                    <div class="row mx-n1">
                      <div class="col-md-6">
                        <div class="row items-start justify-start mx-n1">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('order_list.order_creation_time')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.orderDate }}</label>
                          </div>
                        </div>
                        <div class="row items-start justify-start mx-n1 mt-50">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('order_list.order_code')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.orderCode }}</label>
                          </div>
                        </div>
                        <div class="row items-start justify-start mx-n1 mt-50">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('promotions.retailer_name')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.retailerInvoiceName }}</label>
                          </div>
                        </div>
                        <div class="row items-start justify-start mx-n1 mt-50">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">Mã đại lý</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.retailerCode }}</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="row items-start justify-start mx-n1">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('order_list.name_of_receiver')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.retailerInvoiceName }}</label>
                          </div>
                        </div>
                        <div class="row items-start justify-start mx-n1 mt-50">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('order_list.phone_number')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ order.tel }}</label>
                          </div>
                        </div>
                        <div class="row items-start justify-start mx-n1 mt-50">
                          <div class="col-md-5">
                            <label for="" class="label-md text-black-400 mb-0">{{
                              $t('order_list.delivery_address')
                            }}</label>
                          </div>
                          <div class="col-md-7">
                            <label for="" class="label-md text-black-400 mb-0">{{ retailerAddress }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </q-card-section>
              </q-card>
              <!-- ORDER INFORMATION END -->

              <!-- ORDER SKU LIST START -->
              <q-card class="no-shadow border mt-75">
                <q-card-section>
                  <h5 class="title-sm text-black-500 mb-0">
                    {{ $t('order_list.order_sku') }}
                  </h5>
                </q-card-section>
                <q-separator />
                <q-card-section class="p-0">
                  <q-table
                    :rows="order.sellinItems"
                    :columns="skuColumnsI18n"
                    color="primary"
                    row-key="id"
                    hide-bottom
                    :rows-per-page-options="[0]"
                    id="orders"
                  >
                    <!-- product-info -->

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="sku" :props="props">{{
                          props.row.sku
                        }}</q-td>
                        <q-td
                          class="text-wrap text-truncate"
                          key="productName"
                          :props="props"
                        >
                          <q-item clickable v-ripple>
                            <q-item-section avatar>
                              <q-avatar square>
                                <img :src="props.row.image" />
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>{{
                              props.row.productName
                            }}</q-item-section>
                          </q-item></q-td
                        >
                        <q-td key="unitId" :props="props">{{
                          minUnits.filter(
                            item => item.id == props.row.unitId
                          )[0].name
                        }}</q-td>
                        <q-td key="totalAmount" :props="props">{{
                          props.row.totalAmount
                        }}</q-td>
                        <q-td key="unitPrice" :props="props"
                          >{{
                            props.row.isReward
                              ? 0
                              : Number(props.row.unitPrice).toLocaleString(
                                  'en-US'
                                )
                          }}đ</q-td
                        >
                        <!-- <q-td key="totalCost" :props="props"
                          >{{
                            props.row.isReward
                              ? 0
                              : Number(props.row.totalCost).toLocaleString(
                                  "en-US"
                                )
                          }}đ
                        </q-td> -->
                        <!-- <q-td key="discount" :props="props"
                          >{{
                            props.row.isReward
                              ? 0
                              : Number(props.row.discount).toLocaleString(
                                  "en-US"
                                )
                          }}đ
                        </q-td> -->
                        
                        <q-td key="finalCost" :props="props"
                          >{{
                            props.row.isReward
                              ? 0
                              : Number(props.row.finalCost).toLocaleString(
                                  'en-US'
                                )
                          }}đ
                        </q-td>
                      </q-tr>
                    </template>

                    <template v-slot:bottom-row>
                      <q-tr class="text-weight-bolder">
                        <q-td :colspan="columnsI18n?.length - 2">{{
                          $t('order_list.temporary_total_money')
                        }}</q-td>
                        <q-td class="text-right"
                          >{{
                            Number(order.orderCost).toLocaleString('en-US')
                          }}đ</q-td
                        >
                      </q-tr>
                      <q-tr class="text-weight-bolder">
                        <q-td :colspan="columnsI18n?.length - 2">
                          {{ $t('order_list.total_discount') }}
                          <q-btn
                            v-if="order.promotions.length > 0"
                            flat
                            size="sm"
                            class="text-black"
                            round
                            dense
                            :icon="expand ? 'expand_less' : 'expand_more'"
                            @click="toggleExpanded()"
                          />
                        </q-td>
                        <q-td class="text-right"
                          >-{{
                            Number(order.promotionRedeem).toLocaleString(
                              'en-US'
                            )
                          }}đ</q-td
                        >
                      </q-tr>
                      <q-tr
                        class="text-weight-bolder"
                        v-show="expand"
                        v-for="promotion in order.promotions"
                        :key="promotion"
                      >
                        <q-td style="width:50px"></q-td>
                        <q-td :colspan="columnsI18n?.length - 3">{{
                          promotion.promotionName
                        }}</q-td>
                        <q-td class="text-right"
                          >-{{
                            Number(promotion.discount).toLocaleString(
                              'en-US'
                            )
                          }}đ</q-td
                        >
                      </q-tr>
                      <q-tr class="text-weight-bolder">
                        <q-td :colspan="columnsI18n?.length - 2">{{
                          $t('order_list.delivery_fee')
                        }}</q-td>
                        <q-td class="text-right"
                          >+{{
                            Number(order.shippingFee).toLocaleString('en-US')
                          }}đ</q-td
                        >
                      </q-tr>
                      <q-tr class="text-weight-bolder">
                        <q-td :colspan="columnsI18n?.length - 2">{{
                          $t('order_list.vat_fee')
                        }}</q-td>
                        <q-td class="text-right"
                          >+{{
                            Number(order.vatFee).toLocaleString('en-US')
                          }}đ</q-td
                        >
                      </q-tr>
                      <q-tr class="text-primary text-weight-bolder">
                        <q-td :colspan="columnsI18n?.length - 2">{{
                          $t('order_list.total_money')
                        }}</q-td>
                        <q-td class="text-right"
                          >{{
                            Number(order.finalCost).toLocaleString('en-US')
                          }}đ</q-td
                        >
                      </q-tr>
                    </template>
                  </q-table>
                </q-card-section>
              </q-card>
              <!-- ORDER SKU LIST END -->
            </q-card-section>
          </q-card>
        </q-dialog>
        <!-- <q-dialog v-model="cancelation" position="right" maximized>
          <q-card style="width: 500px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-primary text-weight-bold">
                {{ $t('order_list.reason_cancel') }}
              </div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                @click="cancelCancelOrder()"
              />
            </q-card-section>
            <q-card-section>
              <q-option-group
                v-if="order.orderStatus == 'NEW'"
                :options="optionsI18n"
                type="radio"
                v-model="cancelReason"
                class="d-flex flex-column align-items-start"
              />
              <textarea
                class="form-control"
                v-if="cancelReason == 3 || order.orderStatus == 'APPROVED'"
                :placeholder="$t('order_list.enter_reason_cancel')"
                cols="28"
                rows="10"
                v-model="reason"
              ></textarea>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                :label="$t('general.cancel')"
                color="danger"
                outline
                no-caps
                v-close-popup
                unelevated
                @click="cancelCancelOrder()"
              />
              <q-btn
                :label="$t('general.confirmed')"
                unelevated
                color="primary"
                clickable
                :disabled="
                  ((cancelReason == '' ||
                    (cancelReason == 3 && reason == '')) &&
                    order.orderStatus == 'NEW') ||
                  (reason == '' && order.orderStatus == 'APPROVED')
                "
                @click="confirmCancelOrder()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
        <!-- <q-dialog v-model="result" position="right" maximized>
          <q-card style="width: 500px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-primary text-weight-bold">
                {{ $t('order_list.complete_order') }}
              </div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                @click="cancelResult()"
              />
            </q-card-section>
            <q-card-section>
              <q-option-group
                :options="resultOptionsI18n"
                type="radio"
                v-model="resultOption"
                class="d-flex flex-column align-items-start"
              />
              <div class="text-left form-group mt-1" v-if="resultOption == 2">
                <label class="text-weight-bolder">{{
                  $t('order_list.warehouse_return')
                }}</label>
                <select class="custom-select" v-model="warehouseId">
                  <option value="0">
                    {{ $t('order_list.choose_a_warehouse') }}
                  </option>
                  <option
                    v-for="item in warehouses"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <textarea
                class="form-control"
                v-if="resultOption == 2"
                :placeholder="$t('order_list.enter_reason_return')"
                cols="28"
                rows="10"
                v-model="resultReason"
              ></textarea>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                :label="$t('general.cancel')"
                color="danger"
                outline
                no-caps
                v-close-popup
                unelevated
                @click="cancelResult()"
              />
              <q-btn
                :label="$t('general.confirmed')"
                unelevated
                color="primary"
                clickable
                :disabled="
                  resultOption == '' ||
                  (resultOption == 2 &&
                    (resultReason == '' || warehouseId == 0))
                "
                @click="confirmFinishOrder()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
        <!-- <q-dialog v-model="delivery" position="right" maximized>
          <q-card style="width: 700px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6 text-weight-bolder">
                {{ $t('order_list.shipment_detail') }}
              </div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                @click="cancelDeliveryOrder()"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mt-1">
                <div class="col col-12">
                  <div class="form-group mt-1"></div>
                  <div class="form-group mt-1">
                    <label class="text-weight-bolder">{{
                      $t('order_list.delivery_warehouse')
                    }}</label>
                    <select
                      class="custom-select"
                      @change="compareToWarehouse()"
                      v-model="warehouseId"
                    >
                      <option value="0">
                        {{ $t('order_list.choose_a_delivery_warehouse') }}
                      </option>
                      <option
                        v-for="item in warehouses"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group mt-1">
                    <q-table
                      :rows="compareItems"
                      :columns="deliveryColumnsI18n"
                      color="primary"
                      row-key="id"
                      hide-bottom
                      :rows-per-page-options="rowsPerPageOptions"
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td
                            class="text-wrap text-truncate"
                            key="productVariationName"
                            :props="props"
                          >
                            {{ props.row.productVariationName }}
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ props.row.productVariationName }}
                            </q-tooltip>
                          </q-td>
                          <q-td key="countInOrder" :props="props">
                            {{ props.row.countInOrder }}
                          </q-td>
                          <q-td key="countInWarehouse" :props="props"
                            >{{ props.row.countInWarehouse }}
                          </q-td>
                          <q-td key="available" :props="props"
                            ><q-icon
                              size="18px"
                              :color="
                                props.row.available ? 'success' : 'danger'
                              "
                              :name="props.row.available ? 'check' : 'cancel'"
                            />
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                color="danger"
                :label="$t('general.cancel')"
                outline
                no-caps
                clickable
                v-close-popup
                @click="cancelDeliveryOrder()"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                no-caps
                clickable
                :disabled="!isValidToDelivery"
                @click="confirmDeliveryOrder()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog> -->
      </div>
    </div>

    <!-- Máy in -->

    <div class="orderPrintContainer" v-if="selected && selected?.length > 0">
      <div class="bg"></div>

      <!-- <div
        class="header"
        v-for="(order, orderIndex) in selected"
        :key="orderIndex" 
      >
        <p class="orderCode">
          Mã đơn hàng: <strong>{{ order.orderCode }}</strong>
        </p>
      </div>
      <footer class="footer" style="text-align: center">
        (Cần kiểm tra, đối chiếu khi lập, giao, nhận hóa đơn)
      </footer> -->

      <table width="100%">
        <thead>
          <tr>
            <td>
              <!-- <div class="header-space">&nbsp;</div> -->
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div
                class="content"
                v-for="(order, orderIndex) in selected"
                :key="orderIndex"
              >
                <div class="logoWrapper">
                  <img
                    src="@assets/Logo_Megasop.png"
                    alt="Logo_Megasop"
                  />
                </div>
                
                <header class="header">
                  <div>
                    <p>Mã đơn hàng: <strong>{{ order.orderCode }}</strong></p>
                  </div>
                  <!-- <div class="dayRequire">
                    <p class="">Ngày yêu cầu: {{ toDate }}</p>
                  </div> -->
                </header>
                <footer class="footer row">
                  <span class="footerText bg-red">
                    (Cần kiểm tra, đối chiếu khi lập, giao, nhận hóa đơn)
                  </span>
                </footer>
                <div class="orderPrintWrapper">

                  <!-- Header -->
                  <div class="printHeader">
                    <div class="">
                      <!-- <div class="logoWrapper">
                        <img
                          src="@assets/Logo_Megasop.png"
                          alt="Logo_Megasop"
                        />
                      </div> -->
                      <p class=""><strong>{{ inforUser.companyName }}</strong></p>
                      <!-- <p class="">
                        35/7 D5, phường 25, quận Bình Thạnh, Tp.HCM
                      </p> -->
                      <p class="" style="font-size:14px;">SĐT: {{ inforUser.tel }}</p>
                    </div>

                    <!-- <div class="dayRequire">
                      <p class="">Ngày yêu cầu: {{ toDate }}</p>
                    </div> -->
                  </div>

                  <!-- Phieu -->
                  <div class="deliveryNote">
                    <p class="">PHIẾU GIAO HÀNG</p>
                    <!-- <p class="">Thời gian tạo đơn: {{ order.orderDate }}</p>
                    <p class="orderCode">
                      Mã đơn hàng: <strong>{{ order.orderCode }}</strong>
                    </p> -->
                  </div>

                  <!-- Thong tin -->
                  <div class="summaryInfoList">
                    <div style="display:flex;flex-direction:row;align-items:center;width:100%">
                      <div style="width:40%;">
                        <div class="summaryInfoItem">
                          <p class="">Tên người nhận:</p>
                          <p class="">{{ order.retailerInvoiceName }}</p>
                        </div>
                      </div>
                      <div style="width:10%"></div>
                      <div style="width:40%">
                        <div class="summaryInfoItem">
                          <p class="">Tên đại lý:</p>
                          <p class="">{{ order.retailerInvoiceName }}</p>
                        </div>
                      </div>
                    </div>
                    <div class="summaryInfoItem">
                      <p class="">Điện thoại:</p>
                      <p class="">{{ order.tel }}</p>
                    </div>
                    <div class="summaryInfoItem">
                      <p class="">Địa chỉ:</p>
                      <p class="">{{ order.invoiceAddress }}</p>
                    </div>
                    <div class="summaryInfoItem">
                      <p class="">Ghi chú:</p>
                      <p class="">
                        ..................................................................................................................................
                      </p>
                    </div>
                  </div>

                  <!-- Sell In Table -->
                  <table
                    v-if="order.sellinItems && order.sellinItems?.length > 0"
                    class="orderTable sellInTable"
                  >
                    <tr>
                      <th style="width:5%">STT</th>
                      <th style="width:12%">Mã hàng</th>
                      <th>Tên hàng hóa, dịch vụ</th>
                      <th style="width:6%">ĐVT</th>
                      <th style="width:6%">SL</th>
                      <th style="width:12%">Đơn giá</th>
                      <th style="width:12%">Chiết khấu</th>
                      <th style="width:12%">Thành tiền</th>
                    </tr>
                    <tr v-for="(item, index) in order.sellinItems" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td style="text-align:left">{{ item.sku }}</td>
                      <td style="text-align:left;">{{ item.productName }}</td>
                      <td style="text-align:left">
                        {{ minUnits.filter(e => e.id === item.unitId)[0].name }}
                      </td>
                      <td style="text-align:right">{{ item.totalAmount }}</td>
                      <td style="text-align:right">
                        {{
                          item.isReward
                            ? 0
                            : Number(item.unitPrice).toLocaleString('en-US')
                        }}đ
                      </td>
                      <td style="text-align:right">{{
                          item.isReward
                            ? 0
                            : Number(item.discount).toLocaleString('en-US')
                        }}đ
                      </td>
                      <td style="text-align:right">
                        {{
                          item.isReward
                            ? 0
                            : Number(
                                item.totalAmount * (item.unitPrice - item.discount)
                              ).toLocaleString('en-US')
                        }}đ
                      </td>
                    </tr>
                  </table>

                  

                  <div style="display:flex;flex-direction:row;align-items:flex-start;margin-left:-15px;margin-right:-15px;">
                    <div style="width:50%;padding:0 15px;">
                      <!-- Rewards Table -->
                      <table
                        v-if="order.rewardItems && order.rewardItems?.length > 0"
                        class="orderTable reWardTable"
                      >
                        <tr>
                          <th style="width: 5%">STT</th>
                          <th style="width:12%">Mã hàng</th>
                          <th>Quà tặng</th>
                        </tr>
                        <tr v-for="(item, index) in order.rewardItems" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td style="text-align:left">{{ item.sku}}</td>
                          <td style="text-align:left">
                            {{ item.productName }}<br>
                            {{ minUnits.filter(e => e.id === item.unitId)[0].name }} &times;{{ item.totalAmount }}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <div style="width:50%;padding:0 15px;">

                      <!-- Payment Table -->
                      <table class="paymentTable">
                        <tr>
                          <td>Tổng tiền tạm tính:</td>
                          <td>
                            {{ Number(order.orderCost).toLocaleString('en-US') }}đ
                          </td>
                        </tr>
                        <!-- <template
                          v-if="order.promotions && order.promotions?.length > 0"
                        > -->
                          <tr v-if="order.promotions && order.promotions?.length > 0">
                            <td>Khuyến mãi</td>
                            <td></td>
                          </tr>
                          <tr
                            v-for="(item, index) in order.promotions"
                            :key="index"
                          >
                            <td class="promotionItem">
                              <span class="item">
                                {{ item.promotionName }}
                              </span>
                            </td>
                            <td>
                              -{{ Number(item.discount).toLocaleString('en-US') }}đ
                            </td>
                          </tr>
                          <tr>
                            <td>Tổng tiền sau chiết khấu:</td>
                            <td>
                              {{
                                Number(
                                  !order.promotions || order.promotions?.length == 0 
                                  ? order.orderCost 
                                  : order.orderCost - order.promotionRedeem
                                ).toLocaleString('en-US')
                              }}đ
                            </td>
                          </tr>
                        <!-- </template> -->
                        <tr>
                          <td>Phí vận chuyển:</td>
                          <td>
                            {{ Number(order.shippingFee).toLocaleString('en-US') }}đ
                          </td>
                        </tr>
                        <tr>
                          <td>Tiền thuế VAT ({{ (order.vatFee * 100) / order.orderCost }}%):</td>
                          <td>
                            {{ Number(order.vatFee).toLocaleString('en-US') }}đ
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng thanh toán:</td>
                          <td>
                            {{ Number(order.finalCost).toLocaleString('en-US') }}đ
                          </td>
                        </tr>
                        <!-- <tr>
                          <td>Số tiền viết bằng chữ:</td>
                          <td>Bốn triệu không trăm bảy mười nghìn đồng</td>
                          <td></td>
                        </tr> -->
                      </table>
                    </div>
                  </div>

                  <!-- Sign List -->
                  <div class="signList">
                    <div class="signItem">
                      <div></div>
                      <p class="">Người nhận</p>
                      <p class="">Chữ ký</p>
                    </div>
                    <div class="signItem">
                      <div></div>
                      <p class="">Người giao</p>
                      <p class="">Chữ ký</p>
                    </div>
                    <div class="signItem">
                      <div>Ngày <span style="padding:0 0.25rem;font-style:italic;">{{ currentDay }}</span> tháng <span style="padding:0 0.25rem;font-style:italic;">{{ currentMonth }}</span> năm <span style="padding:0 0.25rem;font-style:italic;">{{ currentYear}}</span></div>
                      <p class="">Thủ kho</p>
                      <p class="">Chữ ký</p>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td>
              <div class="footer-space">&nbsp;</div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.orderPrintContainer {
  display: none;
}
.q-table__top {
  align-items: flex-start;
}
</style>

<script src="@js/orders.js"></script>
