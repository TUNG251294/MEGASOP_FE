<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="`content-wrapper w-100${progress? ' loading-opacity' : ''}`"
    >
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('promotions.edit_promotion_title_for_consumer') }}
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
                  :label="$t('promotions.edit_promotion')"
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
            />

            <q-btn
              class="mr-50 mb-1 rounded-50"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              @click="saveInfo()"
              :disabled="!isValidToSend"
            />
          </div>
        </div>
        <div class="row mx-n1">
          <div
            :class="`d-flex${form.promotionState == 'RUNNING' ? 'col-sm-12' : ' col-sm-8 pr-md-0'} mb-1` "
          >
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
                        disabled
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
                        $t('promotions_end_user.bonus_type')
                      }}</label>
                      <select
                        class="custom-select fs-12"
                        v-model="form.rewardFormatId"
                        @change="enableTypeFormat()"
                        disabled
                      >
                        <option selected value="0">
                          {{ $t('promotions_end_user.choose_a_bonus_type') }}
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
                      <label for="region" class="label-md">
                        {{ $t('promotions_end_user.reward_type') }}</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="form.typeFormatId"
                        disabled
                      >
                        <option selected value="0">
                          {{ $t('promotions_end_user.select_a_reward_type') }}
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
                        :disable="
                          form.promotionState == 'RUNNING' ||
                          (form.preparationDateDisable &&
                            ['PENDING'].includes(form.promotionState))
                        "
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
                                style="width: 300px; height: 400px"
                                mask="DD/MM/YYYY"
                                :options="optionsEarlyDate"
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
                        $t('promotions_retailer.start_day')
                      }}</label>
                      <q-input
                        filled
                        v-model="form.fromDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                        :disable="form.promotionState == 'RUNNING'"
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
                        $t('promotions_retailer.end_day')
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
                        disable
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
                        disable
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
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
                          :disable="form.promotionState == 'RUNNING'"
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
                    
                  </div>
                  <div class="col-12 col-md-8 px-50">
                    <div class="form-group">
                      <label class="label-md">{{ $t('promotions_retailer.content') }}</label>
                      <q-editor
                        v-model="form.description"
                        :placeholder="
                          $t('promotions_retailer.enter_promotion_content')
                        "
                        height="5rem"
                      />
                    </div>
                  </div>
                  <div class="col-12 col-md-4 px-50">
                    <div class="row items-center">
                      <div class="col col-3">
                        <q-toggle
                          v-model="form.show"
                          color="primary"
                          keep-color
                          :disable="form.promotionState == 'RUNNING'"
                        />
                      </div>
                      <div class="col col-9">
                        <span class="fs-14">{{ $t('promotions_end_user.show_banners_to_consumers_or_retailer') }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-8 px-50">
                    <label class="label-md">{{ $t('promotions.note') }}</label>
                    <textarea
                      class="form-control"
                      :placeholder="
                        $t('promotions.enter_a_note_on_promotion_changes')
                      "
                      cols="28"
                      rows="3"
                      v-model="form.note"
                    ></textarea>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="d-flex col-md-4 col-sm-12 mb-1"
            v-if="form.promotionState != 'RUNNING'"
          >
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
                      size="sm"
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
                      size="sm"
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
      </div>
    </div>
  </q-page>
</template>

<script src="../js/consumerPromotionEdit.js"></script>
