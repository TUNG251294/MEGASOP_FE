<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="`content-wrapper w-100 ${progress ? 'loading-opacity' : ''}`"
    >
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('sku.edit_sku') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('sku.product_list')"
                  to="/products"
                />
                <q-breadcrumbs-el
                  :label="$t('sku.detail_product')"
                  to="/product-detail"
                />
                <q-breadcrumbs-el
                  :label="$t('sku.edit_product')"
                  to="/product-edit"
                />
                <q-breadcrumbs-el
                  :label="$t('sku.edit_sku')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-12 d-flex justify-content-end">
            <q-btn
              class="mb-1 rounded-50 bg-white"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              clickable
              @click="cancelEdit()"
              style="width: 130px"
            />
            <q-btn
              class="ml-50 mb-1 rounded-50"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              :disabled="!isValid"
              @click="saveInfoSku()"
              style="width: 130px"
            />
          </div>
        </div>
        <div class="row mx-n1">
          <div class="d-flex col-md-9 col-sm-12 mb-1">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section>
                <h6 class="font-weight-bolder mb-0">
                  {{ $t('sku.info') }}
                </h6>
              </q-card-section>
              <q-separator />
              <div class="row mt-1">
                <div class="col-sm-12">
                  <div class="label-md mb-25">{{ $t('sku.sku_status') }} <span class="text-danger">*</span></div>
                  <q-radio
                    v-model="form.status"
                    val="1"
                    :label="$t('general.active')"
                    class="fs-12"
                  />
                  <q-radio
                    v-model="form.status"
                    val="0"
                    :label="$t('general.inactive')"
                    class="fs-12"
                  />
                </div>
                <div class="col-sm-6 mt-1 pr-sm-50">
                  <div class="label-md mb-25">
                    {{ $t('sku.sku_name') }} <span class="text-danger">*</span>
                  </div>
                  <q-input
                    class="my-input mb-1"
                    outlined
                    :placeholder="$t('sku.enter_sku_name')"
                    v-model="form.skuName"
                    :rules="[this.requiredValue]"
                    hide-bottom-space
                    no-error-icon
                  ></q-input>
                </div>
                <div class="col-sm-6 mt-1 pl-sm-50">
                  <div class="label-md mb-25">
                    {{ $t('sku.sku_code') }} <span class="text-danger">*</span>
                  </div>
                  <q-input
                    class="my-input mb-1"
                    outlined
                    :placeholder="$t('sku.enter_sku_code')"
                    v-model="form.skuCode"
                    :rules="[this.requiredValue]"
                    hide-bottom-space
                    no-error-icon
                    disable
                  ></q-input>
                </div>
              </div>
              <q-card-section class="pb-0">
                <h6 class="font-weight-bolder">
                  {{ $t('sku.attribute') }}
                </h6>
                <q-separator />
                <div class="row mx-n50 mt-1">
                  <div
                    class="col-sm-6 col-md-4 px-50"
                    v-for="(item, index) in attributeTypes"
                    :key="item.id"
                  >
                    <div class="label-md mb-25">{{ item.name }} *</div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        v-model="form.attributes[index]"
                        autocomplete="username"
                        disable
                      ></q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="pb-0">
                <h6 class="font-weight-bolder">
                  {{ $t('sku.price') }}
                </h6>
                <q-separator />
                <div class="row mx-n50 mt-1">
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">
                      {{ $t('sku.purchase_price') }} <span class="text-danger">*</span>
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_purchase_price')"
                        v-model="form.purchasePrice"
                        :rules="[this.isValidNumber]"
                        hide-bottom-space
                        no-error-icon
                        @change="convertCurrency(form.purchasePrice, 'p')"
                        @keypress="isNumber($vent)"
                      >
                        <template v-slot:append> đ </template>
                      </q-input>
                    </div>
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">
                      {{ $t('sku.sales_price') }} <span class="text-danger">*</span>
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_sales_price')"
                        v-model="form.sellPrice"
                        :rules="[this.isValidNumber]"
                        hide-bottom-space
                        no-error-icon
                        @change="convertCurrency(form.sellPrice, 's')"
                        @keypress="isNumber($vent)"
                      >
                        <template v-slot:append> đ </template>
                      </q-input>
                  </div>
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">
                      {{ $t('sku.brick_price') }}
                      <q-icon
                        name="fas fa-question-circle"
                        class="justify-content-start"
                      >
                        <q-tooltip
                          anchor="center left"
                          self="center right"
                          :offset="[10, 10]"
                        >
                          {{ $t('sku.tooltip_brick_price') }}
                        </q-tooltip></q-icon
                      >
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_brick_price')"
                        v-model="form.virtualPrice"
                        @change="convertCurrency(form.virtualPrice, 'v')"
                        @keypress="isNumber($vent)"
                      >
                        <template v-slot:append> đ </template>
                      </q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="pb-0">
                <h6 class="font-weight-bolder">
                  {{ $t('sku.unit_purchase_level') }}
                </h6>
                <q-separator />
                <div class="row mx-n50 mt-1">
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">{{ $t('sku.large_unit') }} <span class="text-danger">*</span></div>
                    <div class="form-group">
                      <select
                        class="custom-select fs-12"
                        v-model="form.maxUnit"
                        :placeholder="$t('sku.select_large_unit')"
                      >
                        <option
                          v-for="item in maxUnitsI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="label-md mb-25">
                      {{ $t('sku.minimum_purchase') }} <span class="text-danger">*</span>
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_minimum_purchase')"
                        v-model="form.minBuy"
                        :rules="[this.isValidNumber]"
                        hide-bottom-space
                        no-error-icon
                        @keypress="isNumber($event)"
                      ></q-input>
                  </div>
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">{{ $t('sku.small_unit') }} <span class="text-danger">*</span></div>
                    <div class="form-group">
                      <select
                        class="custom-select fs-12"
                        v-model="form.minUnit"
                        :placeholder="$t('sku.select_small_unit')"
                      >
                        <option
                          v-for="item in minUnitsI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="label-md mb-25">
                      {{ $t('sku.target_rate') }} <span class="text-danger">*</span>
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_target_rate')"
                        v-model="form.increaseUnit"
                        :rules="[this.isValidNumber]"
                        hide-bottom-space
                        no-error-icon
                        @keypress="isNumber($event)"
                      ></q-input>
                  </div>
                  <div class="col-sm-4 px-50">
                    <div class="label-md mb-25">
                      {{ $t('sku.small_unit_conversion_rate') }} <span class="text-danger">*</span>
                    </div>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('sku.enter_small_unit_conversion_rate')"
                        v-model="form.maxToMin"
                        :rules="[this.isValidNumber]"
                        hide-bottom-space
                        no-error-icon
                        @keypress="isNumber($event)"
                      ></q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <h6 class="font-weight-bolder">
                  {{ $t('sku.description') }}
                </h6>
                <q-separator />
                <div class="mt-1">
                  <q-editor
                    class="w-100"
                    v-model="form.description"
                    min-height="10rem"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-3 col-sm-12 mb-1 pl-md-0">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section>
                <h6 class="font-weight-bolder mb-0">
                  {{ $t('sku.image') }} <span class="text-danger">*</span>
                </h6>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div
                  class="img-wrap mr-custom mb-1"
                  v-for="image in selectedFile"
                  :key="image.id"
                >
                  <img class="w-100" :src="image.url" />
                  <q-btn
                    icon="cancel"
                    unelevated
                    round
                    class="upload-image"
                    clickable
                    @click="removeImage(image.id)"
                  />
                </div>

                <div class="dropper">
                  <input
                    type="file"
                    @change="onFileSelected"
                    multiple
                    accept="image/*"
                  />
                  <q-icon
                    class="mb-1"
                    size="20px"
                    name="insert_photo"
                    color="primary"
                  />
                  <span class="text-center size5">{{
                    $t('sku.image_size')
                  }}</span>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/productSkuEdit.js"></script>
