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
                <q-table
                  :rows="debtOrders"
                  :columns="columnsI18n"
                  color="primary"
                  row-key="id"
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
                          @change="filterDebtOrders()"
                          :placeholder="
                            $t('debt.search_by_retailer_code_a_name')
                          "
                          :title="$t('debt.search_by_retailer_code_a_name')"
                          @focus="is_focusInputSearch = true"
                          @blur="is_focusInputSearch = false"
                          class="search_datatable"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr
                      :props="props"
                      @click="
                        () => {
                          props.selected = !props.selected
                          goToDebtOrder(props.row)
                        }
                      "
                    >
                      <q-td key="index" :props="props">
                        {{ props.row.index }}
                      </q-td>
                      <q-td key="retailerCode" :props="props">
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
                      <q-td key="totalOrderValue" :props="props">
                        {{
                          Number(props.row.totalOrderValue).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="outstandingBalance" :props="props">
                        {{
                          Number(props.row.outstandingBalance).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="timeUpdate" :props="props">
                        {{ props.row.timeUpdate }}
                      </q-td>
                      <q-td key="quantitySellin" :props="props">
                        {{
                          Number(props.row.quantitySellin).toLocaleString(
                            'en-US'
                          )
                        }}
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
              max-width: 2200px !important;
              position: absolute;
              width: 1500px;
              right: 0;
              top: 0;
            "
          >
            <q-form @submit="onSubmit()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="d-flex justify-content-start items-center">
                  <q-btn icon="close" flat round v-close-popup />
                  <h5 class="text-weight-bolder mb-0 ml-2">
                    {{ $t('debt.order_list_of_retailer') }}
                    {{ retailerName }}({{ retailerCode }})
                  </h5>
                </div>

                <div class="d-inline-block float-right q-ml-sm">
                  <q-btn
                    @click="autoAllocateValueOrder"
                    :disable="!isConfirm"
                    class="btn btn-send mr-50"
                    >{{ $t('general.auto_allocate') }}</q-btn
                  >
                  <q-btn
                    :disable="!isValidateAllocated"
                    @click="updateAllocateValueOrder"
                    class="btn btn-send"
                    >{{ $t('general.updated') }}</q-btn
                  >
                </div>

                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>
              <q-card-section class="q-pt-none">
                <div class="row mt-2">
                  <q-table
                    :rows="orderListofRetailer"
                    :columns="orderColumnsI18n"
                    color="primary"
                    row-key="index"
                    :filter="filter"
                    :filter-method="customFilter"
                    :rows-per-page-options="[-1]"
                    selection="multiple"
                    v-model:selected="selected"
                    :hide-pagination="true"
                    hide-bottom
                  >
                    <template v-slot:top>
                      <div class="col col-6">
                        <div class="flex justify-content-between mx-2">
                          <p class="my-2" style="font-weight: 700">
                            {{ $t('debt.money_overdraft') }}:
                            <span
                              >{{
                                Number(totalValueOverdraft).toLocaleString(
                                  'en-US'
                                )
                              }}đ</span
                            >
                          </p>
                          <p class="my-2" style="font-weight: 700">
                            {{ $t('debt.money_allocation') }}:
                            <span
                              >{{
                                Number(totalValueAllocated).toLocaleString(
                                  'en-US'
                                )
                              }}đ</span
                            >
                          </p>
                        </div>
                      </div>
                      <div class="col col-6">
                        <div class="float-right">
                          <q-input
                            no-error-icon
                            hide-bottom-space
                            style="width: 300px;"
                            outlined
                            :placeholder="$t('debt.search_by_order_code_a_name')"
                            color="primary"
                            v-model="filter"
                            :title="$t('debt.search_by_order_code_a_name')"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
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
                        <q-td key="index" :props="props" class="text-left">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="orderCode" :props="props">
                          {{ props.row.orderCode }}
                        </q-td>
                        <q-td key="finalCost" :props="props" class="text-right">
                          {{
                            Number(props.row.finalCost).toLocaleString('en-US')
                          }}đ
                        </q-td>
                        <q-td key="orderDate" :props="props" class="text-right">
                          {{ props.row.orderDate }}
                        </q-td>
                        <q-td
                          key="amountAllocated"
                          :props="props"
                          class="text-right"
                        >
                          {{
                            Number(props.row.amountAllocated).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="allocation" :props="props" class="text-right">
                          <div
                            class="input-allocated flex items-center justify-content-end"
                          >
                            <q-input
                              input-style=" text-align: center;"
                              v-model="props.row.allocation"
                              :dense="true"
                              :hide-bottom-space="true"
                              :no-error-icon="true"
                              :disable="autoAllocated"
                              :model-value="formatNumber(props.row?.allocation)"
                              :rules="[
                                () => this.validateAllocatedValue(props?.row)
                              ]"
                            >
                            </q-input>
                            <span class="ml-1">đ</span>
                          </div>
                        </q-td>
                        <q-td
                          key="remainingAmount"
                          :props="props"
                          style="text-align: right !important"
                        >
                          {{
                            Number(props.row.remainingAmount).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </q-card-section>
              <q-card-actions
                align="right"
                class="bg-white text-teal mr-50 py-1"
              >
              <q-btn
                  color="danger"
                  :label="$t('general.cancel')"
                  outline
                  no-caps
                  @click="setAutoAll()"
                  v-close-popup
                />
                <q-btn
                  color="primary"
                  @click="onSubmit()"
                  :disabled="!validateIsSend || progress"
                  :loading="progress"
                  :label="$t('general.confirmed')"
                  no-caps
                  clickable
                />

              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debtOrder"></script>
<style>
/* @import '../css/scss/custom.scss'; */
</style>