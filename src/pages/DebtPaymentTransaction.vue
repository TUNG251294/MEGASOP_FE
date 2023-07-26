<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="
        progress
          ? 'content-wrapper w-100 loading-opacity'
          : 'content-wrapper w-100'
      "
    >
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card border-0 card-shadow">
              <div class="card-body">
                <div class="row d-flex justify-content-between">
                </div>
                <div class="d-flex justify-content-between">
                  <div class="row">
                    <div class="col col-3 form-group mr-custom">
                      <label for="fromDate">{{ $t('promotions.from') }}</label>
                      <q-input
                        filled
                        v-model="fromDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                        readonly
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
                                :title="$t('promotions.from')"
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
                    <div class="col col-3 form-group mr-custom">
                      <label for="toDate">{{ $t('promotions.to') }}</label>
                      <q-input
                        filled
                        v-model="toDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                        readonly
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
                                :title="$t('promotions.to')"
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
                    <div class="col col-3 form-group mr-custom">
                      <label for="">{{ $t('general.status') }}</label>
                      <select class="custom-select" v-model="status">
                        <option selected value="-1">
                          {{ $t('general.select_status') }}
                        </option>
                        <option value="0">
                          {{ $t('general.waiting_for_confirm') }}
                        </option>
                        <option value="1">{{ $t('order_list.confirmed') }}</option>
                        <option value="9">{{ $t('order_list.canceled') }}</option>
                      </select>
                    </div>
                    <div
                      class="form-group d-flex justify-content-center flex-column"
                    >
                      <label for="">&nbsp;</label>
                      <q-btn
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchDebtTransactions()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                  <q-table
                    :rows="paymentTransactions"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    selection="multiple"
                    v-model:selected.sync="selected"
                    :rows-per-page-options="rowsPerPageOptions"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top>
                      <div class="row justify-between w-100 mt-1">
                      <div
                        :class="`col col-md-${
                          is_focusInputSearch ? '5' : '3'
                        } pr-1`"
                        style="transition: all 0.3s ease-in-out"
                      >
                          <q-input
                            no-error-icon
                            hide-bottom-space
                            outlined
                            type="text"
                            v-model="searchText"
                            @change="filterDebtTransactions()"
                            :placeholder="
                              $t('debt.search_by_retailer_code_a_name')
                            "
                            class="search_datatable"
                            :title="$t('debt.search_by_retailer_code_a_name')"
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"                           
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col col-md-6 text-right">
                        <q-btn
                        class="mr-50 rounded-50"
                        :disable="selected.length === 0"
                        color="primary"
                        :label="$t('general.confirmed')"
                        no-caps
                        clickable
                        @click="showModal('confirmed')"
                      />
                      <q-btn
                        class="mr-50 rounded-50"
                        :label="$t('general.create_payment')"
                        color="primary"
                        no-caps
                        clickable
                        @click="onNew()"
                      />
                      <q-btn
                        class="mr-50 rounded-50"
                        :disable="selected.length === 0"
                        :label="$t('general.cancel_payment')"
                        color="danger"
                        outline
                        no-caps
                        clickable
                        @click="showModal('cancel')"
                      />
                    </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr
                        :props="props"
                        @click="
                          () => {
                            props.selected = !props.selected
                          }
                        "
                      >
                        <q-td>
                          <q-checkbox v-model="props.selected" />
                        </q-td>
                        <q-td
                          @click="gotoDetail(props.row.id)"
                          key="retailerCode"
                          :props="props"
                          style="cursor: pointer; color: #018abe"
                        >
                          <a>{{ props.row.retailerCode }}</a>
                        </q-td>
                        <q-td
                          key="name"
                          :props="props"
                          class="column-name"
                          :title="props.row.name"
                        >
                          <div
                            class="text-ellipsis"
                            @mouseover="showTooltip(props.row.name)"
                            @mouseleave="hideTooltip"
                          >
                            {{ props.row.name }}
                          </div>
                        </q-td>
                        <q-td key="phoneNumber" :props="props">
                          {{ props.row.mobile }}
                        </q-td>
                        <q-td key="useLimit" :props="props">
                          {{
                            Number(props.row.creditLimit).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="creditLimit" :props="props">
                          {{
                            Number(props.row.availableCredit).toLocaleString(
                              'en-US'
                            ) || 0
                          }}đ
                        </q-td>
                        <q-td key="endBalance" :props="props">
                          {{
                            Number(props.row.accountReceivable).toLocaleString(
                              'en-US'
                            ) || 0
                          }}đ
                        </q-td>
                        <q-td key="payment" :props="props">
                          {{
                            Number(props.row.payAmount).toLocaleString(
                              'en-US'
                            ) || 0
                          }}đ
                        </q-td>
                        <q-td key="paidAmount" :props="props">
                          {{
                            Number(props.row.paidAmount).toLocaleString(
                              'en-US'
                            ) || 0
                          }}đ
                        </q-td>
                        <q-td key="paymentTime" :props="props">
                          {{ props.row.payTime }}
                        </q-td>
                        <q-td key="paidTime" :props="props">
                          {{ props.row.paidTime }}
                        </q-td>
                        <q-td key="status" :props="props">
                          <q-chip
                            :class="`title-xs text-${textColorStatus[props.row.status]} bg-${bgColorStatus[props.row.status]} my-0`"
                          >
                            {{ labelStatusI18n[props.row.status] }}
                          </q-chip>
                        </q-td>
                        <q-td
                          key="note"
                          :props="props"
                          class="column-note"
                          :title="props.row.note"
                        >
                          <div
                            class="text-ellipsis"
                            @mouseover="showTooltip(props.row.note)"
                            @mouseleave="hideTooltip"
                          >
                            {{ props.row.note }}
                          </div>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
          </div>
        </div>
        <q-dialog v-model="modal" position="right" persistent>
          <q-card
            style="
              width: 1000px;
              position: absolute;
              right: 0;
              top: 0;
              padding-bottom: 10px;
            "
          >
            <q-form @submit="onSubmit()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="d-flex justify-content-start items-center">
                  <q-btn icon="close" flat round v-close-popup />
                  <h5 class="text-weight-bolder mb-0 ml-2">
                    {{ $t('debt.create.create_payment') }}
                  </h5>
                </div>

                <div class="d-inline-block float-right q-ml-sm">
                  <q-btn
                    v-close-popup
                    @click="closeDialog"
                    :disable="progress"
                    class="btn btn-outline-danger mr-50"
                    >{{ $t('general.cancel') }}</q-btn
                  >
                  <q-btn
                    :disable="progress || !isValidToSend"
                    :loading="progress"
                    type="submit"
                    class="btn btn-send"
                    >{{ $t('general.create') }}</q-btn
                  >
                </div>
                <q-separator size="3px" class="text-dark w-100 mt-1" />
              </q-card-section>
            </q-form>
              <q-card 
                style="
                width: 955px;"
                class="ml-2"
              >
                <q-card-section class="q-pt-none">
                <h5 class="text-weight-bolder py-2">
                  {{ $t('debt.payment_info') }}
                </h5>
                <q-separator size="3px" style="width: 100%" class="text-dark" />
                <div class="row mt-1">
                  <div class="col col-6 px-1">
                    <div class="">
                      <label class="form-label" style="height: 18px;"
                        ><strong>{{ $t('debt.retailer_code') }}</strong> <label style="color: red;">*</label>
                      </label>
                      <q-select
                        outlined
                        :hide-bottom-space="true"
                        v-model="form.retailerCode"
                        :options="filteredRetailers"
                        :option-value="item => item.retailerCode"
                        :option-label="item => item.retailerCode"
                        @filter="retailerFilterNameFn"
                        use-input
                        :no-error-icon="true"
                        @update:model-value="e => onChangeRetailerCode(e)"
                        :rules="[this.validateRetailerCode]"
                         fill-input
                         hide-selected
                        :placeholder="$t('debt.placeholder.code_retailer')"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                    <div class="mt-1">
                      <label class="form-label" 
                        ><strong>{{ $t('debt.retailer_name') }}</strong>
                      </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        :disable="true"
                        type="text"
                        autofocus=""
                        tabindex="1"
                        v-model="form.name"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label" ><strong>{{ $t('debt.phone') }}</strong> </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        :disable="true"
                        type="text"
                        autofocus=""
                        tabindex="1"
                        v-model="form.mobile"
                        lazy-rules
                      />
                    </div>
                  </div>
                    <div class="col col-6 px-1">
                      <div class="">
                        <label class="form-label" 
                          ><strong>{{ $t('debt.retailer_address') }}</strong>
                        </label>
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          class=""
                          outlined
                          type="text"
                          autofocus=""
                          :disable="true"
                          tabindex="1"
                          v-model="form.retailerAddress"
                          lazy-rules
                        />
                      </div>
                      <div class="mt-1">
                        <label class="form-label" style="height: 18px;"
                          ><strong>{{ $t('debt.payment') }}</strong> <label style="color: red;">*</label>
                        </label>
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          class=""
                          outlined
                          type="text"
                          autofocus=""
                          tabindex="1"
                          v-model="form.amount"
                          :model-value="formatNumber(form.amount)"
                          :rules="[this.validateRetailerPayment]"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <div class="col col-12 px-1">
                     <div>
                        <label class="form-label" style="font-weight: bold"
                          >{{ $t('debt.payment_noted') }}
                        </label>
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          outlined
                          type="textarea"
                          autofocus=""
                          tabindex="2"
                          v-model="form.note"
                          lazy-rules
                          style="height: 50px"
                          :placeholder="$t('debt.payment_input_noted')"
                        />
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalDetail" position="right" persistent>
          <q-card
            style="
              width: 1500px;
              position: absolute;
              right: 0;
              top: 0;
              padding-bottom: 10px;
            "
          >
            <q-card-section
              class="row items-center q-pb-none justify-content-between py-0"
            >
              <div class="d-flex justify-content-start items-center">
                <q-btn icon="close" flat round v-close-popup />
                <h5 class="text-weight-bolder mb-0 ml-2">
                  {{ $t('debt.detail.detail_payment') }}
                </h5>
              </div>
              <q-separator size="1px" class="text-dark w-100 mt-1" />
            </q-card-section>
              <q-card
              style="
              width: 1130px;"
              class="ml-1"
              >
              <q-card-section class="q-pt-none">
                <div class="flex justify-content-between items-center mx-2">
                <h5 class="text-weight-bolder mt-1">
                  {{ $t('debt.payment_info') }}
                </h5>
                <q-chip
                  :class="`title-xs text-${textColorStatus[paymentTransactionDetail.status]} bg-${bgColorStatus[paymentTransactionDetail.status]} my-0`"
                >
                  {{ labelStatusI18n[paymentTransactionDetail.status] }}
                </q-chip>
                 <q-separator size="3px" class="text-dark w-100 mt-1" />
              </div>
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col-lg-6 col-sm-12 col-12 mb-1 d-flex p-0">
                    <div class="card-body">
                      <div class="row mb-1">
                        <span class="text-bold mr-1 ml-1"
                          >{{ $t('debt.retailer_name') }}:
                        </span>
                        <span>{{ paymentTransactionDetail.name }}</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1 ml-1"
                          >{{ $t('debt.retailer_code') }}:
                        </span>
                        <span>{{ paymentTransactionDetail.retailerCode }}</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1 ml-1" 
                          >{{ $t('debt.phone') }}:
                        </span>
                        <span>{{ paymentTransactionDetail.mobile }}</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1 ml-1"
                          >{{ $t('debt.actual_received') }}:
                        </span>
                        <span>{{
                          Number(
                            paymentTransactionDetail.paidAmount
                          ).toLocaleString('en-US')
                        }}đ</span>
                      </div>
                      <div class="row">
                        <span class="text-bold mr-1 ml-1"
                          >{{ $t('debt.payment_noted') }}:
                        </span>
                        <span v-if="paymentTransactionDetail.note" class="mt-1 ml-1" style="width: 1035px; text-align: justify;">{{ paymentTransactionDetail.note }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-12 col-12 mb-1 d-flex p-0">
                    <div class="card-body">
                      <div class="row mb-1">
                        <span class="text-bold mr-1"
                          >{{ $t('debt.address') }}:
                        </span>
                        <span
                        style="
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            max-width: 436px; /* Adjust this value as per your layout */
                          "
                        :title="paymentTransactionDetail.address"
                        >{{ paymentTransactionDetail.address }}</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1"
                          >{{ $t('debt.payment') }}:
                        </span>
                        <span>{{
                          Number(
                            paymentTransactionDetail.payAmount
                          ).toLocaleString('en-US') 
                        }}đ</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1"
                          >{{ $t('debt.payment_time') }}:
                        </span>
                        <span>{{ paymentTransactionDetail.payTime }}</span>
                      </div>
                      <div class="row mb-1">
                        <span class="text-bold mr-1"
                          >{{ $t('debt.payment_confirm_time') }}:
                        </span>
                        <span>{{ paymentTransactionDetail.paidTime || '' }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              </q-card>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalComfirm" position="right" persistent>
          <q-card
            style="
              width: 1500px;
              position: absolute;
              right: 0;
              top: 0;
              padding-bottom: 10px;
            "
          >
            <q-card-section
              class="row items-center q-pb-none justify-content-between"
            >
              <div class="d-flex justify-content-start items-center">
                <q-btn icon="close" flat round v-close-popup />
                <h5 class="text-weight-bolder mb-0 ml-2">
                  {{ $t('debt.comfirm_payment_transaction') }}
                </h5>
              </div>

              <div class="d-inline-block float-right q-ml-sm">
                <q-btn v-close-popup class="btn btn-outline-danger mr-50">{{
                  $t('general.cancel')
                }}</q-btn>
                <q-btn
                  v-close-popup
                  :disable="!isValidateComfirmPayment || progress"
                  @click="handleComfirmPayment()"
                  class="btn btn-send"
                  >{{ $t('general.confirmed') }}</q-btn
                >
              </div>
              <q-separator size="1px" class="text-dark w-100 mt-1" />
            </q-card-section>
              <q-card
              class="ml-2 mt-1"
              style="
                width: 1120px;
                border-radius: 12px"
              >
              <q-card-section>
                <div v-for="item in selected" :key="item.id" class="row">
                  <div class="col-lg-12">
                    <div class="flex justify-content-between items-center">
                      <h5 class="text-weight-bolder">
                        {{ $t('debt.payment_info') }}
                      </h5>
                      <q-chip
                      :class="`title-xs text-${textColorStatus[`INACTIVE`]} bg-${bgColorStatus[`INACTIVE`]} my-0`"
                    >
                      {{ labelStatusI18n[`INACTIVE`] }}
                    </q-chip>
                  </div>
                   <q-separator size="3px" class="text-dark w-100 mt-1" />
                  </div>
                    <div class="col-lg-6 col-sm-12 col-12 mb-1 d-flex p-0">
                      <div class="card-body">
                        <div class="row mb-1">
                          <span class="text-bold mr-1"
                            >{{ $t('debt.retailer_code') }}:
                          </span>
                          <span>{{ item.retailerCode }}</span>
                        </div>
                        <div class="row mb-1">
                          <span class="text-bold mr-1"
                            >{{ $t('debt.retailer_name') }}:
                          </span>
                          <span>{{ item.name }}</span>
                        </div>
                        <div class="row mb-1">
                          <span class="text-bold mr-1"
                            >{{ $t('debt.payment_noted') }}:
                          </span>
                          <span class="mt-1" style="width: 1059px; text-align:justify">{{ item.note }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-12 mb-1 d-flex p-0">
                      <div class="card-body">
                        <div class="row mb-1">
                          <span class="text-bold mr-1"
                            >{{ $t('debt.payment') }}:
                          </span>
                          <span>{{
                            Number(item.payAmount).toLocaleString('en-US')
                          }}đ</span>
                        </div>
                        <div class="row mb-1">
                          <span class="text-bold mr-1"
                            >{{ $t('debt.actual_received') }}:
                          </span>
                          <q-input
                            :dense="true"
                            :outlined="true"
                            @change="e => onChangeConfirmPayment(e, item.id)"
                            v-model="item.paidAmount"
                            :model-value="formatNumber(item.paidAmount)"
                            :placeholder="$t('debt.actual_received')"
                            :rules="[
                              val => validateComfirmPayment(val, item.payAmount)
                            ]"
                            :hide-bottom-space="true"
                            :no-error-icon="true"
                          />
                          <!-- <span>{{ paymentTransactionDetail.confirmPayment }}</span> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalCancel" persistent>
          <q-card style="width: 500px; padding: 10px">
            <q-card-section class="row items-center justify-content-center">
              <div class="flex items-center">
                <h5 class="text-weight-bolder text-primary">
                  {{ $t('debt.confirm_cancel') }}
                </h5>
              </div>
              <div class="px-3 mx-2 my-1">
                <p>{{ $t('debt.des_comfirm_cancel') }}</p>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                :label="$t('general.closed')"
                style="width: 100px; border-radius: 12px"
                class="btn-outline-danger"
                no-caps
                v-close-popup
                :disable="progress"
              />
              <q-btn
                style="width: 100px; border-radius: 12px"
                :label="$t('general.confirmed')"
                color="primary"
                no-caps
                clickable
                @click="handleCancelConfirmPayment()"
                :loading="progress"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalConfirmPayment" persistent>
          <q-card style="width: 750px; padding: 10px">
            <q-card-section
              class="row items-center justify-content-center flex-column"
            >
              <div class="flex items-center">
                <h5 class="text-weight-bolder text-primary">
                  {{ $t('debt.confirm_payment') }}
                </h5>
              </div>
              <div class="px-3 mx-2 my-1">
                <p>{{ $t('debt.des_comfirm_payment') }}</p>
              </div>
              <q-virtual-scroll
                type="table"
                style="max-height: 50vh"
                :virtual-scroll-item-size="48"
                :virtual-scroll-sticky-size-start="48"
                :virtual-scroll-sticky-size-end="32"
                :items="selected"
              >
                <template v-slot:before>
                  <thead class="text-left">
                    <tr>
                      <th style="font-weight: bold">{{ $t('products.id_col') }}</th>
                      <th
                        v-for="col in paymentColumnsI18n"
                        :key="'1--' + col.name"
                        style="font-weight: bold; width: 100px"
                      >
                        {{ col.label }}
                      </th>
                    </tr>
                  </thead>
                </template>
                <template v-slot="{ item: row, index }">
                  <tr :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>
                      {{ row['retailerCode'] }}
                    </td>
                    <td
                        style="
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 130px; /* Adjust this value as per your layout */
                      "
                      :title="row['name']"
                    >
                      {{ row['name'] }}
                    </td>
                    <td style="text-align:right;">
                      {{ Number(row['payAmount']).toLocaleString('en-US') || 0 }}đ
                    </td>
                    <td style="text-align:right">
                      {{ Number(row['paidAmount']).toLocaleString('en-US') || 0 }}đ
                    </td>
                    <td
                     style="
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 200px; /* Adjust this value as per your layout */
                      "
                    :title="row['note']"
                    >
                      {{ row['note']}}
                    </td>
                  </tr>
                </template>
              </q-virtual-scroll>
              <!-- <q-table :rows="selected" :columns="paymentColumnsI18n" row-key="name" :separator="separator" :hide-bottom="true">
                <template v-slot:body="props">
                  <q-tr>
                    <q-td key="retailerCode" :props="props" style="cursor: pointer; color: #018abe">
                      <a>{{ props.row.retailerCode }}</a>
                    </q-td>
                    <q-td key="name" :props="props">
                      {{ props.row.name }}
                    </q-td>
                    <q-td key="payAmount" :props="props">
                      {{
                        Number(props.row.payAmount).toLocaleString(
                          'en-US'
                        )
                      }}
                    </q-td>
                    <q-td key="paidAmount" :props="props">
                      {{
                        Number(props.row.paidAmount).toLocaleString('en-US')
                      }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table> -->
            </q-card-section>

            <q-card-actions align="center">
              <q-btn
                :label="$t('general.closed')"
                style="width: 100px; border: 1px solid #ea5455; border-radius: 12px"
                class="btn-outline-danger"
                no-caps
                v-close-popup
                :disable="progress"
              />
              <q-btn
                style="width: 100px; border-radius:12px"
                :label="$t('general.confirmed')"
                color="primary"
                no-caps
                clickable
                @click="handleSubmitConfirmPayment()"
                :loading="progress"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debtPaymentTransaction"></script>