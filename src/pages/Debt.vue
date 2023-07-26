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
                <div class=" d-flex justify-content-between">
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
                        @click="searchDebts()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                <q-table
                  :rows="rows"
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
                          @change="filterDebts()"
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
                      <div class="col col-md-6 text-right">
                        <q-btn
                          class="mr-50 rounded-50"
                          color="primary"
                          :label="$t('debt.create.create_debt')"
                          no-caps
                          clickable
                          @click="onNew"
                        />
                        <q-btn
                          class="mr-50 rounded-50"
                          :label="$t('debt.import_file')"
                          color="primary"
                          no-caps
                          clickable
                          @click="uploadFile = true"
                        />
                        <q-btn
                          class="mr-50 rounded-50"
                          :label="$t('debt.export_template')"
                          color="primary"
                          no-caps
                          clickable
                          @click="downloadTemplate()"
                        />
                      </div>
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr
                      :props="props"
                      @click="props.selected = !props.selected"
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
                      <q-td key="mobie" :props="props">
                        {{ props.row.mobie }}
                      </q-td>
                      <q-td key="creditLimit" :props="props">
                        {{
                          Number(props.row.creditLimit).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td key="overDraftCredit" :props="props">
                        {{
                          Number(props.row.overdraftCredit).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="paymentPeriod" :props="props">
                        {{ props.row.paymentPeriod }}
                      </q-td>
                      <q-td key="initialBalance" :props="props">
                        {{
                          Number(props.row.initialBalance).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="createTime" :props="props">
                        {{ props.row.createTime }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="modal" position="right" persistent>
          <q-card style="width: 1000px; position: absolute; right: 0; top: 0">
            <q-form @submit="onSubmit()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="d-flex justify-content-start items-center">
                  <q-btn icon="close" flat round v-close-popup />
                  <h5 class="text-weight-bolder mb-0 ml-2">
                    {{ $t('debt.create.create_debt') }}
                  </h5>
                </div>

                <div class="d-inline-block float-right q-ml-sm">
                  <q-btn
                    v-close-popup
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
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div v-for="(field, index) in form" :key="index" class="row mt-1 ">
                  <div class="d-flex justify-content-start items-left col col-12" v-if="index !== 0">
                  <q-btn icon="close" flat round class="align-self-start ml-0" @click="deleteFieldDebt(index)"/>
                </div>
                  <div class="col col-6 px-1">
                    <div class="">
                      <label style="height: 18px;" class="form-label"><strong>{{ $t('debt.retailer_code') }}</strong> <label style="color: red;">*</label>
                      </label>
                      <q-select
                        outlined
                        :hide-bottom-space="true"
                        v-model="field.retailerCode"
                        :options="filteredRetailers"
                        :option-value="item => item.retailerCode"
                        :option-label="item => item.retailerCode"
                        @filter="retailerFilterNameFn"
                        use-input
                        :no-error-icon="true"
                        @update:model-value="
                          e => onChangeRetailerCode(e, index)
                        "
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
                        tabindex="2"
                        v-model="field.name"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"
                        ><strong>{{ $t('debt.retailer_phone') }}</strong>
                      </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        :disable="true"
                        type="text"
                        tabindex="3"
                        v-model="field.mobie"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label style="height: 18px;" class="form-label"><strong>{{ $t('debt.detail.debt_term') }}</strong> <label style="color: red;">*</label>
                      </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="number"
                        :placeholder="$t('debt.placeholder.enter_debt_term')"
                        tabindex="4"
                        v-model="field.paymentPeriod"
                        :rules="[this.requiredDebtTerm]"
                        lazy-rules
                      />
                    </div>
                  </div>
                  <div class="col col-6 px-1">
                    <div class="" style="padding-top: ;">
                      <label class="form-label"
                        ><strong>{{ $t('debt.retailer_address') }}</strong>
                      </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class=""
                        outlined
                        type="text"
                        :disable="true"
                        tabindex="5"
                        v-model="field.fullAddress"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"><strong>{{
                        $t('debt.debt_init')
                      }}</strong></label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        :placeholder="$t('debt.placeholder.enter_debt_init')"
                        tabindex="6"
                        v-model="field.initialBalance"
                        :model-value="formatNumber(field.initialBalance)"
                        :disable="field.initialBalanceCheck !== 'null'"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"><strong>{{
                        $t('debt.debt_limit')
                      }}</strong></label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        :placeholder="$t('debt.placeholder.enter_debt_limit')"
                        tabindex="6"
                        v-model="field.creditLimit"
                        :model-value="formatNumber(field.creditLimit)"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"><strong>{{
                        $t('debt.overdraft_limit')
                      }}</strong></label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        :placeholder="
                          $t('debt.placeholder.enter_debt_overdraft_limit')
                        "
                        tabindex="7"
                        v-model="field.overdraftCredit"
                        lazy-rules
                        :model-value="formatNumber(field.overdraftCredit)"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="center" class="bg-white py-1">
                <q-icon
                  name="add_circle"
                  size="1.5em"
                  class="text-primary cursor-pointer"
                  style="margin-right: 2px"
                  @click="addFieldDebt"
                />
                <span no-caps outline>
                  {{ $t('debt.create.create_retailer') }}</span>
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="activateModal"
          position="right"
          persistent
          full-height
        >
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">
                {{ $t('warehouses.enable_warehouses_status') }}
              </div>
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
                  <div class="form-group mt-1">
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="active" val="Active" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ $t('general.active') }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="active" val="Inactive" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{
                          $t('general.inactive')
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                no-caps
                :label="$t('general.closed')"
                v-close-popup
                outline
                color="secondary"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                outline
                no-caps
                clickable
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="uploadFile"
          persistent
          :class="progress ? 'loading-opacity' : ''"
        >
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ $t('stock.choose_file') }}</div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                @click="hideModal()"
              />
            </q-card-section>
            <q-card-section>
              <div class="dropper w-100">
                <input type="file" @change="onFileSelected" accept=".xlsx" />
                <q-icon
                  class="mb-1"
                  size="30px"
                  name="description"
                  color="primary"
                />
                <span class="text-center size12">{{
                  fileName == '' ? 'File Upload' : fileName
                }}</span>
              </div>
            </q-card-section>
            <q-card-actions
              align="center"
              class="bg-white text-teal mr-50 py-1"
            >
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debt"></script>