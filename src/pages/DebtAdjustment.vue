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
                  :rows="rows"
                  :columns="columnsI18n"
                  color="primary"
                  row-key="id"
                  selection="multiple"
                  v-model:selected="selected"
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
                          @change="filterDebtAdjustments()"
                          :placeholder="
                            $t('debt.search_by_retailer_code_a_name')
                          "
                          :title="$t('debt.search_by_retailer_code_a_name')"
                          class="search_datatable"
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
                          :label="$t('general.reject')"
                          color="red" outline text-color="red"
                          no-caps
                          clickable
                          :disable="selected.length === 0"
                          @click="handleReject()"
                        />
                        <q-btn
                          class="mr-50 rounded-50"
                          color="primary"
                          :label="$t('general.confirmed')"
                          no-caps
                          clickable
                          :disable="selected.length === 0"
                          @click="handleConfirm()"
                        />

                        <q-btn
                          class="mr-50 rounded-50"
                          :label="$t('general.create')"
                          color="primary"
                          no-caps
                          clickable
                          @click="onNew()"
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
                      <q-td key="docNo" :props="props">
                        {{ props.row.docNo }}
                      </q-td>
                      <q-td key="createTime" :props="props">
                        {{ props.row.createTime }}
                      </q-td>
                      <q-td key="confirmTime" :props="props">
                        {{ props.row.confirmTime }}
                      </q-td>
                      <q-td key="previousAccountReceivable" :props="props">
                        {{
                          Number(
                            props.row.previousAccountReceivable
                          ).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td key="value" :props="props">
                        {{ Number(props.row.value).toLocaleString('en-US') }}đ
                      </q-td>
                      <q-td key="currentDebt" :props="props">
                        {{
                          Number(props.row.currentDebt).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td
                        key="content"
                        :props="props"
                        class="column-content"
                        :title="props.row.content"
                      >
                        <div
                          class="text-ellipsis"
                          @mouseover="showTooltip(props.row.content)"
                          @mouseleave="hideTooltip"
                        >
                          {{ props.row.content }}</div>
                      </q-td>
                        <q-td key="status" :props="props">
                          <q-chip
                            :class="`title-xs text-${textColorStatus[props.row.status]} bg-${bgColorStatus[props.row.status]} my-0`"
                          >
                            {{ labelStatusI18n[props.row.status] }}
                          </q-chip>
                        </q-td>
                      <q-td
                        key="rejectionReason"
                        :props="props"
                        class="column-rejectionReason"
                        :title="props.row.rejectionReason"
                      >
                        <div
                          class="text-ellipsis"
                          @mouseover="showTooltip(props.row.rejectionReason)"
                          @mouseleave="hideTooltip"
                        >
                          {{ props.row.rejectionReason }}
                        </div>
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="modalAdjustment" position="right" persistent full-height>
          <q-card
            style="
              width: 500px;
              position: absolute;
              right: 0;
              top: 0;
              padding-bottom: 10px;
            "
          >
            <q-form @submit="handleSubmitAdjustment()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="d-flex justify-content-start items-center">
                  <q-btn icon="close" flat round v-close-popup />
                  <h5 class="text-weight-bolder mb-0 ml-2">
                    {{ $t('debt.debt_in_de_adjustment') }}
                  </h5>
                </div>
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row mt-1">
                  <div class="col col-12 px-1">
                    <div class="mt-1">
                      <label class="form-label"
                        ><strong>{{ $t('debt.retailer_code') }}</strong> <label style="color: red;">*</label>
                      </label>
                      <q-select
                        outlined
                        :hide-bottom-space="true"
                        v-model="formAdjustment.retailerCode"
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
                    <div class="row mt-1">
                      <div class="col col-6 pr-1">
                        <div class="">
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
                            v-model="formAdjustment.retailerName"
                            lazy-rules
                          />
                        </div>
                      </div>
                      <div class="col col-6 pl-1">
                        <div class="">
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
                            autofocus=""
                            tabindex="1"
                            v-model="formAdjustment.retailerPhone"
                            lazy-rules
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-12 px-1">
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
                        v-model="formAdjustment.retailerAddress"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"><strong>{{ $t('debt.value') }} </strong> <label style="color: red;">*</label></label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class=""
                        outlined
                        autofocus=""
                        tabindex="1"
                        v-model="formAdjustment.value"
                        :rules="[this.validateValue]"
                        :model-value="formatNumber(formAdjustment.value)"
                        :placeholder="$t('debt.placeholder.value')"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"
                        ><strong>{{ $t('debt.content') }}</strong>
                      </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class=""
                        outlined
                        type="text"
                        autofocus=""
                        tabindex="1"
                        v-model="formAdjustment.content"
                        :placeholder="$t('debt.placeholder.content')"
                        lazy-rules
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white mt-2 mr-2">
               <q-btn :label="$t('general.cancel')" style="width: 75px; border-radius: 10px; border: 1px solid #ea5455"
                  class="btn-outline-danger" no-caps v-close-popup :disable="progress" />
                <q-btn style="width: 75px; border-radius: 10px" :label="$t('general.save')" color="primary" no-caps type="submit"
                  :disable="!isValidToSendAdjustment" :loading="progress" clickable />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalReject" position="right" persistent>
          <q-card
            style="
              width: 500px;
              position: absolute;
              right: 0;
              top: 0;
              padding-bottom: 10px;
            "
          >
            <q-form @submit="handleRejectAdjustment()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="d-flex justify-content-start items-center">
                  <q-btn icon="close" flat round v-close-popup />
                  <h5 class="text-weight-bolder mb-0 ml-2">
                    {{ $t('debt.rect_debt_in_de_adjustment') }}
                  </h5>
                </div>
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <div
                class="row mt-1"
                v-for="(item, index) in selected"
                :key="index"
              >
                <div class="col col-12 px-1">
                  <div class="mt-1">
                    <label class="form-label"><strong>{{
                      $t('debt.retailer_code')
                    }}</strong> <label style="color: red;">*</label></label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      class="mb-2"
                      outlined
                      :disable="true"
                      type="text"
                      autofocus=""
                      tabindex="1"
                      v-model="item.retailerCode"
                      lazy-rules
                    />
                  </div>
                  <div class="row">
                    <div class="col col-6 pr-1">
                      <div class="">
                        <label class="form-label"><strong>{{
                          $t('debt.retailer_name')
                        }}</strong></label>
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          class="mb-2"
                          outlined
                          :disable="true"
                          type="text"
                          autofocus=""
                          tabindex="1"
                          v-model="item.name"
                          lazy-rules
                        />
                      </div>
                    </div>
                    <div class="col col-6 pl-1">
                      <div class="">
                        <label class="form-label"><strong>{{
                          $t('debt.retailer_phone')
                        }}</strong></label>
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          class="mb-2"
                          outlined
                          :disable="true"
                          type="text"
                          autofocus=""
                          tabindex="1"
                          v-model="item.mobie"
                          lazy-rules
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col col-12 px-1">
                  <div class="">
                    <label class="form-label"><strong>{{
                      $t('debt.retailer_address')
                    }}</strong></label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      class=""
                      outlined
                      type="text"
                      autofocus=""
                      :disable="true"
                      tabindex="1"
                      v-model="item.address"
                      lazy-rules
                    />
                  </div>
                  <div class="mt-1">
                    <label class="form-label"><strong>{{ $t('debt.value') }}</strong> <label style="color: red;">*</label></label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      outlined
                      tabindex="1"
                      v-model="item.value"
                      :disable="true"
                      :model-value="Number(item.value).toLocaleString('en-US')"
                      lazy-rules
                    />
                  </div>
                  <div class="mt-1">
                    <label class="form-label"><strong>{{ $t('debt.reason') }}</strong> <label style="color: red;">*</label></label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      class=""
                      outlined
                      type="text"
                      autofocus=""
                      tabindex="1"
                      v-model="item.rejectionReason"
                      :rules="[this.validateReason]"
                      lazy-rules
                    />
                  </div>
                  <q-separator size="1px" class="text-dark w-100 mt-1" />
                </div>
              </div>
              
              <q-card-actions align="right" class="bg-white">
                <q-btn
                  :label="$t('general.cancel')"
                  style="width: 100px; border: 1px solid #ea5455"
                  class="btn-outline-danger"
                  no-caps
                  v-close-popup
                  :disable="progress"
                />
                <q-btn
                  style="width: 100px"
                  :label="$t('general.save')"
                  color="primary"
                  no-caps
                  clickable
                  :disable="!isValidRejectAdjustment || progress"
                  @click="handleRejectAdjustment()"
                  :loading="progress"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalConfirm">
          <div>
            <q-card style="width: 450px; padding: 0; border-radius:8px">
              <q-card-section class="row items-center d-flex justify-content">
                <div class="flex items-center mb-1 ml-1 mt-1">
                  <h5 class="text-weight-bolder text-primary">
                    {{ $t('debt.confirm_debt_adjustment') }}
                  </h5>
                </div>
                <div class="ml-1 mb-1">
                <p>{{ $t('debt.des_confirm_debt_adjustment') }}</p>
                </div>
              </q-card-section>
            </q-card>
            <q-btn style="width: 450px; border-radius:10px" class="mt-1" :label="$t('general.confirmed')" color="primary" no-caps clickable
                @click="handleConfirmAdjustment()" :loading="progress" />
          </div>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debtAdjustment"></script>