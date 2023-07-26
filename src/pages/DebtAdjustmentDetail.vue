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
      <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('debt.menu.debt_adjustments') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('debt.menu.debt_adjustments')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card border-0 card-shadow">
              <div class="card-body">
                <div class="row d-flex justify-content-between">
                  <h4 class="font-weight-bolder">
                    {{ $t('debt.menu.debt_adjustments') }}
                  </h4>
                </div>
                <div class="row mt-2">
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
                      <div class="col col-6">
                        <div class="float-left">
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
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                      <div class="col col-6">
                        <div class="row d-flex justify-content-end">
                          <div
                            class="d-flex justify-content-center align-items-end"
                          >
                            <label for="">&nbsp;</label>
                            <q-btn
                              color="primary"
                              :label="$t('general.confirmed')"
                              no-caps
                              clickable
                              :disable="selected.length === 0"
                              @click="handleConfirm()"
                            />
                          </div>
                          <div
                            class="d-flex justify-content-center align-items-end"
                          >
                            <label for="">&nbsp;</label>
                            <q-btn
                              :label="$t('general.reject')"
                              color="primary"
                              no-caps
                              clickable
                              :disable="selected.length === 0"
                              @click="handleReject()"
                            />
                          </div>
                          <div
                            class="d-flex justify-content-center align-items-end"
                          >
                            <label for="">&nbsp;</label>
                            <q-btn
                              :label="$t('general.create')"
                              color="primary"
                              no-caps
                              clickable
                              @click="onNew()"
                            />
                          </div>
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
                          key="retailerCode"
                          :props="props"
                          style="cursor: pointer; color: blue"
                        >
                          <a>{{ props.row.retailerCode }}</a>
                        </q-td>
                        <q-td key="retailerName" :props="props">
                          {{ props.row.retailerName }}
                        </q-td>
                        <q-td key="code" :props="props">
                          {{ props.row.code }}
                        </q-td>
                        <q-td key="createdAt" :props="props">
                          {{ props.row.createdAt }}
                        </q-td>
                        <q-td key="comfirmDate" :props="props">
                          {{ props.row.comfirmDate }}
                        </q-td>
                        <q-td key="beforeDebt" :props="props">
                          {{
                            Number(props.row.beforeDebt).toLocaleString('en-US')
                          }}
                        </q-td>
                        <q-td key="value" :props="props">
                          {{ Number(props.row.value).toLocaleString('en-US') }}
                        </q-td>
                        <q-td key="afterDebt" :props="props">
                          {{
                            Number(props.row.afterDebt).toLocaleString('en-US')
                          }}
                        </q-td>
                        <q-td key="content" :props="props">
                          {{ props.row.content }}
                        </q-td>
                        <q-td key="status" :props="props">
                          <q-badge
                            color="success"
                            v-if="props.row.status === 'đã xác nhận'"
                          >
                            {{ $t('general.active') }}
                          </q-badge>
                          <q-badge
                            v-if="props.row.status !== 'đã xác nhận'"
                            color="warning"
                          >
                            {{ $t('general.waiting_for_approval') }}
                          </q-badge>
                        </q-td>
                        <q-td key="reason" :props="props">
                          {{ props.row.reason }}
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="modalAdjustment" position="right" persistent>
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
                        >{{ $t('debt.retailer_code') }} 
                      </label>
                      <q-select
                        outlined
                        :hide-bottom-space="true"
                        v-model="formAdjustment.retailerCode"
                        :options="retailerCodes"
                        :option-value="item => item.id"
                        :option-label="item => item.name"
                        :no-error-icon="true"
                        @update:model-value="e => onChangeRetailerCode(e)"
                        :rules="[this.validateRetailerCode]"
                      />
                    </div>
                    <div class="row">
                      <div class="col col-6 pr-1">
                        <div class="">
                          <label class="form-label"
                            >{{ $t('debt.retailer_name') }}
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
                            >{{ $t('debt.retailer_phone') }}
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
                        >{{ $t('debt.retailer_address') }}
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
                      <label class="form-label">{{ $t('debt.value') }} </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class=""
                        outlined
                        autofocus=""
                        tabindex="1"
                        v-model="formAdjustment.value"
                        :rules="[this.validateValue]"
                        type="number"
                        :model-value="formatNumber(formAdjustment.value)"
                        :placeholder="$t('debt.placeholder.value')"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label"
                        >{{ $t('debt.content') }}
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
                  type="submit"
                  :disable="!isValidToSendAdjustment"
                  :loading="progress"
                  clickable
                />
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
            <q-form @submit="onNew()">
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

              <q-card-section class="q-pt-none">
                <div class="row mt-1">
                  <div class="col col-12 px-1">
                    <div class="mt-1">
                      <label class="form-label"
                        >{{ $t('debt.retailer_code') }}
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
                        v-model="form.retailerCode"
                        lazy-rules
                      />
                    </div>
                    <div class="row">
                      <div class="col col-6 pr-1">
                        <div class="">
                          <label class="form-label"
                            >{{ $t('debt.retailer_name') }}
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
                            v-model="form.retailerName"
                            lazy-rules
                          />
                        </div>
                      </div>
                      <div class="col col-6 pl-1">
                        <div class="">
                          <label class="form-label"
                            >{{ $t('debt.retailer_phone') }}
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
                            v-model="form.retailerPhone"
                            lazy-rules
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col col-12 px-1">
                    <div class="">
                      <label class="form-label"
                        >{{ $t('debt.retailer_address') }}
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
                      <label class="form-label">{{ $t('debt.value') }} </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        tabindex="1"
                        v-model="form.value"
                        :disable="true"
                        :model-value="formatNumber(form.value)"
                        lazy-rules
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label">{{ $t('debt.reason') }} </label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class=""
                        outlined
                        type="text"
                        autofocus=""
                        tabindex="1"
                        v-model="form.reason"
                        :rules="[this.validateReason]"
                        lazy-rules
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
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
        <q-dialog v-model="modalConfirm" persistent>
          <q-card style="width: 500px; padding: 10px">
            <q-card-section class="row items-center justify-content-center">
              <div class="flex items-center">
                <h5 class="text-weight-bolder text-primary">
                  {{ $t('debt.confirm_debt_adjustment') }}
                </h5>
              </div>
              <div class="px-1 mx-2 my-1">
                <p>{{ $t('debt.des_confirm_debt_adjustment') }}</p>
              </div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                :label="$t('general.closed')"
                style="width: 100px; border: 1px solid #ea5455"
                class="btn-outline-danger"
                no-caps
                v-close-popup
                :disable="progress"
              />
              <q-btn
                style="width: 100px"
                :label="$t('general.confirmed')"
                color="primary"
                no-caps
                clickable
                @click="handleConfirmAdjustment()"
                :loading="progress"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/debtAdjustment"></script>
