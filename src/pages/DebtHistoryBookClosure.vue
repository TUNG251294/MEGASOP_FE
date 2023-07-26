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
                <div class="d-flex justify-content-between">
                  <div class="row">
                    <div class="col col-5 form-group mr-custom">
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
                    <div class="col col-5 form-group mr-custom">
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

                    <div  class="form-group d-flex justify-content-center flex-column">
                      <label for="">&nbsp;</label>
                      <q-btn
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchDebtHistoryBookClosures()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                <div class="row mt-1">
                  <q-table
                    ref="table"
                    :rows="rows"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    :rows-per-page-options="rowsPerPageOptions"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top>
                      <div class="row justify-between w-100">
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
                            @change="filterDebtHistoryBookClosures()"
                            :placeholder="
                              $t('debt.search_by_retailer_code_a_name')
                            "
                            :title="
                              $t('debt.search_by_retailer_code_a_name')
                            "
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"
                            class="search_datatable"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col col-md-6 text-right">
                          <q-btn
                            class="mr-1 rounded-50"
                            color="primary"
                            :label="$t('debt.export_report')"
                            no-caps
                            clickable
                            @click="exportExcel"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="stt" :props="props">
                          {{ props.row.id }}
                        </q-td>
                        <q-td key="retailerCode" :props="props">
                          {{ props.row.retailerCode }}
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
                        <q-td key="accountBalance" :props="props">
                          {{
                            Number(props.row.accountBalance).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="creditLimit" :props="props">
                          {{
                            Number(props.row.creditLimit).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="overdraftCredit" :props="props">
                          {{
                            Number(props.row.overdraftCredit).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="availableCredit" :props="props">
                          {{
                            Number(props.row.availableCredit).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>

                        <q-td key="accountReceivable" :props="props">
                          {{
                            Number(props.row.accountReceivable || 0).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="bookDate" :props="props">
                          {{ props.row.bookDate }}
                        </q-td>
                        <q-td
                          key="createBy"
                          :props="props"
                          class="column-createBy"
                          :title="props.row.createBy"
                        >
                          <div
                            class="text-ellipsis"
                            @mouseover="showTooltip(props.row.createBy)"
                            @mouseleave="hideTooltip"
                          >
                            {{ props.row.createBy }}
                          </div>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debtHistoryBookClosure"></script>