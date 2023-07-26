<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="`content-wrapper w-100${progress ? ' loading-opacity' : ''}`"
    >
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('promotions_end_user.create_promotions_for_endUser') }}
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
                  :label="$t('promotions_end_user.create_promotion')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n50">
          <div class="col col-12 d-flex justify-content-end">
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              clickable
              @click="cancel()"
              v-if="step == 1"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50"
              icon-right="east"
              :label="$t('promotions_end_user.continue')"
              color="primary"
              no-caps
              clickable
              unelevated
              :disabled="!isValidToContinue"
              @click="toContinue()"
              v-if="step == 1"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              icon="west"
              :label="$t('promotions_end_user.back')"
              color="primary"
              outline
              no-caps
              clickable
              @click="returnBack()"
              v-if="step == 2"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              @click="saveInfo()"
              v-if="step == 2"
            />
          </div>
        </div>
        <div class="row mx-n1" v-if="step == 1">
          <div class="d-flex col-md-8 col-sm-12 mb-1 pr-md-0">
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <div class="flex items-center justify-between">
                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('promotions_end_user.promotion_information') }}
                  </h6>
                  <q-badge
                    class="size14 text-primary text-weight-bolder promotion-subject"
                  >
                    {{ $t('promotions_end_user.consumer') }}</q-badge
                  >
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row mx-n50">
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="region" class="label-md">
                        {{ $t('promotions_retailer.condition_apply') }}</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="form.conditionFormatId"
                      >
                        <option selected value="0">
                          {{ $t('promotions_retailer.select_condition') }}
                        </option>
                        <option
                          v-for="item in conditionTypesI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="region" class="label-md">{{
                        $t('promotions_retailer.bonus_type')
                      }}</label>
                      <select
                        class="custom-select fs-12"
                        v-model="form.rewardFormatId"
                        @change="enableTypeFormat()"
                      >
                        <option selected value="0">
                          {{ $t('promotions_retailer.select_bonus_type') }}
                        </option>
                        <option
                          v-for="item in rewardTypesI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="region" class="label-md">{{
                        $t('promotions_retailer.reward_type')
                      }}</label>
                      <select
                        class="custom-select fs-12"
                        v-model="form.typeFormatId"
                        :disabled="!canChoose"
                      >
                        <option selected value="0">
                          {{ $t('promotions_retailer.select_reward_type') }}
                        </option>
                        <option
                          v-for="item in typesI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="earlyDate" class="label-md">{{
                        $t('promotions_end_user.early_date_of_application')
                      }}</label>
                      <q-input
                        filled
                        v-model="form.earlyDate"
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
                                v-model="form.earlyDate"
                                :options="optionsEarlyDate"
                                style="width: 300px; height: 400px"
                                mask="DD/MM/YYYY"
                                :title="
                                  $t('promotions_end_user.early_start_dates')
                                "
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
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="fromDate" class="label-md">{{
                        $t('promotions_end_user.start_date')
                      }}</label>
                      <q-input
                        filled
                        v-model="form.fromDate"
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
                                v-model="form.fromDate"
                                style="width: 300px; height: 400px"
                                :options="optionsFromDate"
                                mask="DD/MM/YYYY"
                                :title="$t('promotions_end_user.start_date')"
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
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="toDate" class="label-md">{{
                        $t('promotions_end_user.end_date')
                      }}</label>
                      <q-input
                        filled
                        v-model="form.toDate"
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
                                v-model="form.toDate"
                                style="width: 300px; height: 400px"
                                :options="optionsToDate"
                                mask="DD/MM/YYYY"
                                :title="$t('promotions_end_user.end_date')"
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
                  <div class="col-12 col-md-4 px-50">
                    <div class="mb-1">
                      <label class="label-md">{{ $t('promotions_retailer.promotion_id') }}</label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        v-model="form.promotionCode"
                        :placeholder="
                          $t('promotions_retailer.enter_promotion_id')
                        "
                        tabindex="1"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-8 px-50">
                    <div class="mb-1">
                      <label class="label-md">{{
                        $t('promotions_retailer.promotion_name')
                      }}</label>
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        v-model="form.promotionName"
                        :placeholder="
                          $t('promotions_retailer.enter_promotion_name')
                        "
                        tabindex="2"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <label for="">&nbsp;</label>
                    <div
                      class="w-img-wrap mr-custom mb-1"
                      v-for="image in selectedFile"
                      :key="image.id"
                    >
                      <img class="h-100 w-100" :src="image.path" />
                      <q-btn
                        icon="cancel"
                        unelevated
                        round
                        class="upload-image"
                        clickable
                        @click="removeImage(image.id)"
                      />
                    </div>

                    <div class="w-dropper" v-if="selectedFile.length == 0">
                      <input
                        type="file"
                        @change="onFileSelected"
                        accept="image/*"
                        id="imageFile"
                      />
                      <q-icon
                        class="mb-1"
                        size="50px"
                        name="insert_photo"
                        color="primary"
                        @click="selectFile()"
                      />
                      <span class="text-center size12">{{
                        $t('promotions_retailer.upload_image_ratio')
                      }}</span>
                      <!-- <span class="text-center size12">
                        Tỉ lệ ảnh 3.25:1.9 dung lượng dưới 1MB
                      </span> -->
                    </div>
                  </div>
                  <div class="col-12 col-md-8 px-50">
                    <label>{{ $t('promotions_retailer.content') }}</label>
                    <!-- <textarea
                      class="form-control"
                      placeholder="Nhập nội dung chương trình khuyến mãi"
                      cols="28"
                      rows="6"
                      v-model="form.description"
                    ></textarea> -->
                    <q-editor
                      v-model="form.description"
                      :placeholder="
                        $t('promotions_retailer.enter_promotion_content')
                      "
                      height="5rem"
                      tabindex="3"
                    />
                  </div>
                </div>
                <div class="row mx-n1">
                  <q-item
                    active-class="bg-teal-1 text-grey-8"
                  >
                    <q-item-section avatar>
                      <q-toggle
                        v-model="form.show"
                        color="primary"
                        keep-color
                      />
                    </q-item-section>
                    <q-item-section class="fs-14">{{
                      $t(
                        'promotions_end_user.show_banners_to_consumers_or_retailer'
                      )
                    }}</q-item-section>
                  </q-item>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-4 col-sm-12 mb-1">
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <h6 class="text-weight-bolder mb-0">
                  {{ $t('promotions_end_user.where_promotion_applies') }}
                </h6>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-list bordered class="rounded-borders">
                  <q-expansion-item
                    v-model="expandedRegion"
                    :label="
                      $t('promotions_end_user.select_a_geographic_region')
                    "
                    header-class="fs-12"
                  >
                    <q-card>
                      <q-scroll-area style="height: 400px; max-width: 700px">
                        <q-list>
                          <q-item tag="label" v-ripple>
                            <q-item-section>
                              <q-item-label>{{
                                $t('promotions_retailer.all')
                              }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              <q-checkbox
                                size="2rem"
                                v-model="allRegion"
                                @click="selectAllRegion()"
                              ></q-checkbox>
                            </q-item-section>
                          </q-item>
                          <q-item
                            tag="label"
                            v-ripple
                            v-for="item in regions"
                            :key="item.id"
                          >
                            <q-item-section>
                              <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              <q-checkbox
                                size="2rem"
                                :val="item.id"
                                v-model="regionSelection"
                                @click="clickRegion(item.id)"
                              ></q-checkbox>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-scroll-area>
                    </q-card>
                  </q-expansion-item>
                </q-list>
                <div class="row">
                  <div
                    v-for="item in form.regions"
                    :key="item.id"
                    class="float-left mr-50"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
                      class="rounded-50"
                      @remove="removeRegion(item.id)"
                      v-if="regionSelection.includes(item.id)"
                    >
                      {{ item.name }}
                    </q-chip>
                  </div>
                </div>
                <q-separator class="mt-1 mb-1" />
                <q-list bordered class="rounded-borders">
                  <q-expansion-item
                    v-model="expandedCity"
                    :label="$t('promotions_retailer.province_city')"
                    header-class="fs-12"
                  >
                    <q-card>
                      <q-scroll-area style="height: 400px; max-width: 700px">
                        <q-list>
                          <q-item tag="label" v-ripple>
                            <q-item-section>
                              <q-item-label>{{
                                $t('promotions_retailer.all')
                              }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              <q-checkbox
                                size="2rem"
                                v-model="allCity"
                                @click="selectAllCity()"
                              ></q-checkbox>
                            </q-item-section>
                          </q-item>
                          <q-item
                            tag="label"
                            v-ripple
                            v-for="item in cities"
                            :key="item.id"
                          >
                            <q-item-section>
                              <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              <q-checkbox
                                size="2rem"
                                :val="item.id"
                                v-model="citySelection"
                                @click="clickCity()"
                              ></q-checkbox>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-scroll-area>
                    </q-card>
                  </q-expansion-item>
                </q-list>
                <div class="row">
                  <div
                    v-for="item in form.cities"
                    :key="item.id"
                    class="float-left mr-50"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
                      class="rounded-50"
                      @remove="removeCity(item.id)"
                      v-if="citySelection.includes(item.id)"
                    >
                      {{ item.name }}
                    </q-chip>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row" v-if="step == 2">
          <div
            class="d-flex col-md-4 col-sm-12 mb-1"
            v-if="form.conditionFormatId != 3"
          >
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <div class="d-flex justify-content-between">
                  <h6
                    class="text-weight-bolder mb-0"
                    v-if="productGroupsCount == 0"
                  >
                    {{ $t('promotions_end_user.product_categories') }}
                  </h6>
                  <h6
                    class="text-weight-bolder mb-0"
                    v-if="productGroupsCount > 0"
                  >
                    {{ $t('promotions.category') }}
                </h6>
                  <q-btn
                    outline
                    no-caps
                    class="rounded-50 fs-10"
                    color="primary"
                    size="sm"
                    :label="$t('promotions_retailer.add_product_group')"
                    v-if="productGroupsCount > 0"
                    @click="onAddProducts()"
                  />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="form-group mt-5" v-if="productGroupsCount == 0">
                  <div class="text-center fs-14 mb-0 w-75 mx-auto">
                    {{
                      $t(
                        'promotions_retailer.add_product_group_to_create_catalog'
                      )
                    }}
                  </div>
                  <div class="text-center">
                    <q-btn
                      outline
                      no-caps
                      color="primary"
                      :label="$t('promotions_retailer.add_product_group')"
                      class="mt-1 rounded-50"
                      @click="onAddProducts()"
                    />
                  </div>
                </div>
                <div v-if="productGroupsCount > 0">
                  <q-list
                    bordered
                    separator
                    class="mb-2"
                    v-for="item in groups"
                    :key="item.index"
                  >
                    <q-item>
                      <q-item-section>
                        <div
                          class="flex justify-between items-center"
                        >
                          <label class="label-md text-weight-bolder mb-0"
                            >{{ $t('promotions_retailer.product_group') }}
                            {{ item.index }}</label
                          >
                          <q-btn
                            outline
                            no-caps
                            flat
                            clickable
                            color="primary"
                            icon="far fa-edit"
                            size="sm"
                            class="rounded-50"
                            @click="editGroup(item.index)"
                          />
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section>
                        <div class="row w-100">
                          <q-tree
                            id="groups"
                            dense
                            no-connectors
                            :nodes="item.group"
                            default-expand-all
                            node-key="id"
                            label-key="name"
                            class="w-100"
                          >
                            <template v-slot:header-test="prop">
                              <div class="row justify-between items-center w-100">
                                <label class="fs-14 col-9 mb-0">{{
                                  prop.node.name
                                }}</label>
                                <q-btn
                                  outline
                                  flat
                                  color="danger"
                                  icon="cancel"
                                  size="sm"
                                  class="col-3"
                                  clickable
                                  @click="removeProduct(prop.node)"
                                />
                              </div>
                            </template>
                            <template v-slot:body-story="prop">
                              <input
                              class="form-control fs-12 mb-50"
                                type="text"
                                :placeholder="
                                  $t('promotions_end_user.product_description')
                                "
                                :value="prop.node.description"
                                @input.prevent="
                                  changeDescription(prop.node, $event)
                                "
                              />
                            </template>
                          </q-tree>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
          :class="
              form.conditionFormatId != 3
                ? 'd-flex col-md-8 col-sm-12 mb-1 pl-md-0'
                : 'd-flex col-sm-12 mb-1'
            "
          >
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <div class="flex items-center justify-between">
                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('promotions_retailer.constitution') }}
                  </h6>
                  <q-btn
                    class="rounded-50 bg-white"
                    outline
                    no-caps
                    size="sm"
                    color="primary"
                    :label="$t('promotions_end_user.add_a_bonus_limit')"
                    v-if="showLevel && levelGroupsCount > 0"
                    clickable
                    @click="addNewLevel(true)"
                  />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row mx-n1">
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_retailer.condition_apply')
                    }}</label>
                    <p for="">
                      {{
                        conditionTypesI18n.find(
                          item => item.id == form.conditionFormatId
                        )['name']
                      }}
                    </p>
                  </div>
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_end_user.bonus_type')
                    }}</label>
                    <p for="">
                      {{
                        rewardTypesI18n.find(
                          item => item.id == form.rewardFormatId
                        )['name']
                      }}
                    </p>
                  </div>
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_end_user.reward_type')
                    }}</label>
                    <p for="">
                      {{
                        typesI18n.find(item => item.id == form.typeFormatId)[
                          'name'
                        ]
                      }}
                    </p>
                  </div>
                </div>
                <div
                  class="row form-group mt-3 justify-content-center"
                  v-if="!showLevel"
                >
                  <div class="col-3"></div>
                  <div class="col-6 text-center fs-14">
                    <p class="fs-14">{{ $t('promotions_end_user.add_bonus_limits_to_create_structure') }}</p>

                    <q-btn
                      outline
                      no-caps
                      color="primary"
                      class="mt-1 rounded-50"
                      :label="$t('promotions_end_user.add_a_bonus_limit')"
                      clickable
                      :disabled="
                        levelGroupsCount == 0 && form.conditionFormatId != 3
                      "
                      @click="addNewLevel(false)"
                    />
                  </div>
                  <div class="col-3"></div>
                </div>
              </q-card-section>
              <q-card-section v-if="showLevel && levelGroupsCount > 0">
                <div
                  class="row mb-1"
                  v-for="(item, index) in levelGroups"
                  :key="item.index"
                >
                  <q-list bordered separator class="w-100">
                    <q-item class="w-100">
                      <q-item-section>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <label class="text-weight-bolder"
                            >{{ $t('promotions_end_user.limit') }}
                            {{ index + 1 }}</label
                          >
                          <q-btn
                            outline
                            no-caps
                            flat
                            color="primary"
                            icon="close"
                            label=""
                            clickable
                            @click="removeLevel(item.index)"
                          />
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      class="mb-4"
                      v-for="(it, ind) in item.groups"
                      :key="it.index"
                    >
                      <q-item-section>
                        <div class="row">
                          <div class="w-100 d-flex justify-content-between">
                            <div
                              class="row"
                              v-if="
                                form.conditionFormatId == 1 &&
                                form.typeFormatId == 2
                              "
                            >
                              <label class="d-flex align-items-center"
                                >{{
                                  $t(
                                    'promotions_end_user.approximately_buying_from'
                                  )
                                }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions_end_user.enter_the_quantity')
                                "
                                :value="it.fromValue"
                                @input.prevent="
                                  changeFromValue(index, ind, $event)
                                "
                              />
                              <label class="d-flex align-items-center">
                                {{ $t('promotions.to_v2') }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions_end_user.enter_the_quantity')
                                "
                                :value="it.toValue"
                                @input.prevent="
                                  changeToValue(index, ind, $event)
                                "
                              />
                              <label class="d-flex align-items-center">
                                {{ $t('promotions_retailer.product') }}
                              </label>
                            </div>
                            <div
                              class="row"
                              v-if="
                                form.conditionFormatId != 1 &&
                                form.typeFormatId == 2
                              "
                            >
                              <label class="d-flex align-items-center"
                                >{{
                                  $t(
                                    'promotions_end_user.approximately_buying_from'
                                  )
                                }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions.enter_amount_money')
                                "
                                :value="it.fromValue"
                                @input.prevent="
                                  changeFromValue(index, ind, $event)
                                "
                              />
                              <label class="d-flex align-items-center">
                                {{ $t('promotions.currency') }}
                                {{ $t('promotions.to_v2') }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions.enter_amount_money')
                                "
                                :value="it.toValue"
                                @input.prevent="
                                  changeToValue(index, ind, $event)
                                "
                              />
                              <label class="d-flex align-items-center">
                                {{ $t('promotions.currency') }}
                              </label>
                            </div>
                            <div
                              class="row"
                              v-if="
                                form.rewardFormatId == 1 &&
                                form.conditionFormatId == 1 &&
                                form.typeFormatId == 1
                              "
                            >
                              <label class="d-flex align-items-center"
                                >{{
                                  $t(
                                    'promotions_retailer.bonus_level_when_buying_from'
                                  )
                                }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions_end_user.enter_the_quantity')
                                "
                                :value="it.fixValue"
                                @input.prevent="
                                  changeFixValue(index, ind, $event)
                                "
                              />
                            </div>
                            <div
                              class="row"
                              v-if="
                                form.rewardFormatId == 1 &&
                                form.conditionFormatId != 1 &&
                                form.typeFormatId == 1
                              "
                            >
                              <label class="d-flex align-items-center"
                                >{{
                                  $t(
                                    'promotions_retailer.bonus_level_when_buying_from'
                                  )
                                }}
                              </label>
                              <input
                                type="text"
                                class="form-input"
                                :placeholder="
                                  $t('promotions.enter_amount_money')
                                "
                                :value="it.fixValue"
                                @input.prevent="
                                  changeFixValue(index, ind, $event)
                                "
                              />
                              <label class="d-flex align-items-center">
                                {{ $t('promotions.currency') }}
                              </label>
                            </div>
                            <div class="row" v-if="form.conditionFormatId != 3">
                              <q-badge
                                class="size12 text-primary text-weight-bolder promotion-subject"
                              >
                                {{ $t('promotions_retailer.product_group') }}
                                {{ ind + 1 }}</q-badge
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="row mt-2 w-100"
                          v-if="form.rewardFormatId == 1"
                        >
                          <q-table
                            :columns="rewardColumnsI18n"
                            color="primary"
                            row-key="id"
                            class="w-100"
                            :rows="it.rewards"
                            hide-bottom
                          >
                            <template v-slot:body="props">
                              <q-tr class="cursor-pointer" :props="props">
                                <q-td
                                  key="name"
                                  :props="props"
                                  style="
                                    white-space: break-spaces !important;
                                    width: 300px !important;
                                  "
                                  >{{ props.row.name }}
                                </q-td>
                                <q-td key="unitAmount" :props="props">
                                  <input
                                    type="text"
                                    class="form-input"
                                    :placeholder="
                                      $t(
                                        'promotions_end_user.enter_the_quantity'
                                      )
                                    "
                                    :value="props.row.unitAmount"
                                    @input.prevent="
                                      changeAmount(
                                        ind,
                                        item.index,
                                        props.row.id,
                                        $event
                                      )
                                    "
                                  />
                                </q-td>
                                <q-td key="unitName" :props="props"
                                  >{{ props.row.unitName }}
                                </q-td>
                                <q-td key="action" :props="props">
                                  <!-- Ẩn btn xoá sp -->
                                  <q-btn
                                    outline
                                    round
                                    color="danger"
                                    icon="cancel"
                                    size="sm"
                                    clickable
                                    @click="
                                      removeReward(
                                        ind,
                                        item.index,
                                        props.row.productVariationId
                                      )
                                    "
                                  />
                                </q-td>
                              </q-tr>
                            </template>
                            <template v-slot:bottom-row>
                              <q-tr>
                                <q-td colspan="100%" class="text-center">
                                  <q-btn
                                    class="rounded-50 bg-white"
                                    :label="
                                      $t('promotions_end_user.add_a_gift')
                                    "
                                    color="primary"
                                    no-caps
                                    outline
                                    icon="add"
                                    @click="onAddRewards(item.index, ind)"
                                  />
                                </q-td>
                              </q-tr>
                            </template>
                          </q-table>
                        </div>
                        <div
                          class="row mt-1 w-100"
                          v-if="form.rewardFormatId == 2"
                        >
                          <label class="d-flex align-items-center"
                            >{{ $t('promotions.reduce') }}
                          </label>
                          <input
                            type="text"
                            class="form-input"
                            :placeholder="$t('promotions.enter_amount_money')"
                            :value="it.descreaseValue"
                            @input.prevent="
                              changeDescreaseGroupValue(index, ind, $event)
                            "
                          />
                          <label
                            class="d-flex align-items-center"
                            v-if="form.conditionFormatId == 3"
                          >
                            {{ $t('promotions.currency') }}
                            {{ $t('promotions.for_order') }}
                          </label>
                          <label
                            class="d-flex align-items-center"
                            v-if="form.conditionFormatId != 3"
                          >
                            {{ $t('promotions.currency') }}
                            {{ $t('promotions.for_each_order') }}
                          </label>
                        </div>
                        <div
                          class="row mt-1 w-100"
                          v-if="form.rewardFormatId == 3"
                        >
                          <label class="d-flex align-items-center"
                            >{{ $t('promotions.reduce') }}
                          </label>
                          <input
                            type="text"
                            class="form-input"
                            :placeholder="$t('promotions.enter_ratio')"
                            :value="it.descreaseValue"
                            @input.prevent="
                              changeDescreaseGroupValue(index, ind, $event)
                            "
                          />
                          <label
                            class="d-flex align-items-center"
                            v-if="form.conditionFormatId == 3"
                          >
                            % {{ $t('promotions.for_order') }}
                          </label>
                          <label
                            class="d-flex align-items-center"
                            v-if="form.conditionFormatId != 3"
                          >
                            % {{ $t('promotions.for_each_order') }}
                          </label>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-dialog v-model="modal" position="right" full-height persistent maximized>
          <q-card class="card card-shadow border-0" style="width: 968px">
            <q-card-section class="row items-center">
              <h4 class="text-weight-bolder mb-0">
                {{ $t('promotions_retailer.add_product_group') }}
              </h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                class="d-sm-flex d-none"
                @click="cancelAdd()"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mx-n1">
                <div class="col-md-4 col-sm-4">
                  <q-tree :nodes="categories" node-key="id" label-key="name">
                    <template v-slot:header-generic="prop">
                      <div class="row items-center">
                        <a
                          class="btn text-primary"
                          style="padding: 0"
                          @click="getProductByCategory(prop.node, false)"
                          >{{ prop.node.name }}</a
                        >
                      </div>
                    </template>
                  </q-tree>
                </div>
                <div class="col-md-8 col-sm-8 border-left">
                  <h6 class="text-weight-bolder mb-1">{{
                    $t('promotions_retailer.select_product')
                  }}</h6>
                  <q-table
                    :columns="addColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="rows"
                    style="height: 250px"
                    hide-no-data
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top-left>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('promotions_retailer.search_product')"
                        stack-label
                        v-model="searchText"
                        tabindex="1"
                        @change="filterProduct(false)"
                      >
                        <template v-slot:append>
                          <q-btn round dense flat icon="search" /> </template
                      ></q-input>
                    </template>
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="productVariationName" :props="props">
                          {{ props.row.productVariationName }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.productVariationName }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="success"
                            icon="add"
                            size="sm"
                            clickable
                            @click="addProduct(props.row)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>

                  <h6 for="" class="text-weight-bolder mb-1">{{
                    $t('promotions.selected_products')
                  }}</h6>
                  <q-table
                    :columns="removeColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="productsTmp"
                    style="height: 250px"
                    hide-no-data
                  >
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="rowIndex" :props="props">
                          {{ props.row.rowIndex }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="name" :props="props">
                          {{ props.row.name }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.name }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="danger"
                            icon="cancel"
                            size="sm"
                            clickable
                            @click="removeRow(props.row, false)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                color="danger"
                :label="$t('general.cancel')"
                outline
                no-caps
                @click="cancelAdd()"
                class="rounded-50"
                style="width:130px"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                no-caps
                clickable
                unelevated
                :disabled="productsTmp.length == 0"
                @click="confirm()"
                class="rounded-50"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="notifyBack" persistent>
          <q-card style="width: 500px; padding: 10px">
            <q-card-section class="row items-center">
              <q-icon
                name="warning"
                class="text-warning"
                style="font-size: 2rem"
              />
              <span class="q-ml-sm">{{
                $t(
                  'promotions_end_user.product_categories_and_quotas_will_be_deleted'
                )
              }}</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.closed')"
                color="danger"
                no-caps
                v-close-popup
                unelevated
                outline
                :disabled="loading"
                class="rounded-50"
                style="width:130px"
              />
              <q-btn
              :label="$t('general.agree')"
                color="primary"
                no-caps
                clickable
                unelevated
                @click="confirmBack()"
                :loading="loading"
                class="rounded-50"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalReward" position="right" full-height persistent maximized>
          <q-card style="width: 968px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{ $t('promotions_end_user.add_a_gift') }}
              </h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                class="d-sm-flex d-none"
                @click="cancelAddReward()"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mx-n1">
                <div class="col-md-4 col-sm-4 ">
                  <q-tree :nodes="categories" node-key="id" label-key="name">
                    <template v-slot:header-generic="prop">
                      <div class="row items-center">
                        <a
                          class="btn text-primary"
                          style="padding: 0"
                          @click="getProductByCategory(prop.node, true)"
                          >{{ prop.node.name }}</a
                        >
                      </div>
                    </template>
                  </q-tree>
                </div>
                <div class="col-md-8 col-sm-8 border-left">
                  <h6 for="" class="text-weight-bolder mb-1">{{
                    $t('promotions_retailer.select_product')
                  }}</h6>
                  <q-table
                    :columns="addColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="rows"
                    style="height: 250px"
                    hide-no-data
                    :rows-per-page-options="rowsPerPageOptions"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top-left>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('promotions_retailer.search_product')"
                        stack-label
                        v-model="searchText"
                        tabindex="1"
                        @change="filterProduct(true)"
                      >
                        <template v-slot:append>
                          <q-btn round dense flat icon="search" /> </template
                      ></q-input>
                    </template>
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="productVariationName" :props="props">
                          {{ props.row.productVariationName }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.productVariationName }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="success"
                            icon="add"
                            size="sm"
                            clickable
                            @click="addReward(props.row)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>

                  <h6 for="" class="text-weight-bolder mb-1 mt-2">{{
                    $t('promotions.selected_products')
                  }}</h6>
                  <q-table
                    :columns="removeColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="rewardsTmp"
                    style="height: 250px"
                    hide-no-data
                  >
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="rowIndex" :props="props">
                          {{ props.row.rowIndex }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="name" :props="props">
                          {{ props.row.name }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.name }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="danger"
                            icon="cancel"
                            size="sm"
                            clickable
                            @click="removeRow(props.row, true)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                color="danger"
                :label="$t('general.cancel')"
                outline
                no-caps
                @click="cancelAddReward()"
                class="rounded-50"
                style="width:130px"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                no-caps
                clickable
                unelevated
                :disabled="rewardsTmp.length == 0"
                @click="confirmAddReward()"
                class="rounded-50"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="modalUpdate" position="right" full-height persistent maximized>
          <q-card class="card card-shadow border-0" style="width: 968px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{ $t('promotions_end_user.edit_product_group') }}
                {{ groupIndex }}
              </h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                class="d-sm-flex d-none"
                @click="cancelAddProductInGroup()"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mx-n1">
                <div class="col-md-4 col-sm-4">
                  <q-tree :nodes="categories" node-key="id" label-key="name">
                    <template v-slot:header-generic="prop">
                      <div class="row items-center">
                        <a
                          class="btn text-primary"
                          style="padding: 0"
                          @click="getProductByCategory(prop.node, false)"
                          >{{ prop.node.name }}</a
                        >
                      </div>
                    </template>
                  </q-tree>
                </div>
                <div class="col-md-8 col-sm-8 border-left">
                  <h6 for="" class="text-weight-bolder mb-1">{{
                    $t('promotions_retailer.select_product')
                  }}</h6>
                  <q-table
                    :columns="addColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="rows"
                    style="height: 250px"
                    hide-no-data
                    :rows-per-page-options="rowsPerPageOptions"
                    v-model:pagination="pagination"
                    @request="onRequest"
                  >
                    <template v-slot:top-left>
                      <q-input
                        class="my-input mb-1"
                        outlined
                        :placeholder="$t('promotions_retailer.search_product')"
                        stack-label
                        v-model="searchText"
                        tabindex="1"
                        @change="filterProduct(false)"
                      >
                        <template v-slot:append>
                          <q-btn round dense flat icon="search" /> </template
                      ></q-input>
                    </template>
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="productVariationName" :props="props">
                          {{ props.row.productVariationName }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.productVariationName }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="success"
                            icon="add"
                            size="sm"
                            clickable
                            @click="addProductInGroup(props.row)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>

                  <h6 for="" class="text-weight-bolder mb-1 mt-2">{{
                    $t('promotions.selected_products')
                  }}</h6>
                  <q-table
                    :columns="removeColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="productsTmp"
                    style="height: 250px"
                    hide-no-data
                  >
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="rowIndex" :props="props">
                          {{ props.row.rowIndex }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="name" :props="props">
                          {{ props.row.name }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.name }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="danger"
                            icon="cancel"
                            size="sm"
                            clickable
                            @click="removeRow(props.row, false)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                color="danger"
                :label="$t('general.cancel')"
                outline
                no-caps
                @click="cancelAddProductInGroup()"
                class="rounded-50"
                style="width:130px"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                no-caps
                clickable
                unelevelated
                :disabled="productsTmp.length == 0"
                @click="confirmAddProductInGroup()"
                class="rounded-50"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/consumerPromotionCreate.js"></script>
