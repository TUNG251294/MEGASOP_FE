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
                {{ $t('promotions.edit_promotion_title_for_retailer') }}
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
        <div class="row justify-end mx-n50">
          <q-btn
            class="mr-50 mb-1 rounded-50 bg-white"
            :label="$t('general.cancel')"
            color="danger"
            outline
            no-caps
            clickable
            @click="cancel()"
            style="width: 130px"
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
            style="width: 130px"
          />
        </div>
        <div class="row mx-n1">
          <div
            :class="
              form.promotionState == 'RUNNING'
                ? 'd-flex col-sm-12 mb-1'
                : 'd-flex col-md-8 col-sm-12 mb-1'
            "
          >
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <div class="flex justify-between items-center">
                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('promotions_end_user.promotion_information') }}
                  </h6>
                  <q-badge
                    class="fs-14 text-primary text-weight-bolder promotion-subject"
                  >
                    {{ $t('promotions.retailer') }}</q-badge
                  >
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row mx-n50">
                  <div class="col-12 col-md-4 px-50">
                    <div class="form-group">
                      <label for="region" class="label-md">{{
                        $t('promotions_retailer.condition_apply')
                      }}</label>
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
                      <label for="region" class="label-md">{{
                        $t('promotions_end_user.reward_type')
                      }}</label>
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
                      <label for="fromDate" class="label-md">{{
                        $t('promotions_end_user.start_date')
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
                </div>
                <div class="row mx-n50">
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
                </div>
                <div class="row mx-n50 mb-1">
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
                  <div class="col-12 col-md-8 px-50">
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
                <div class="row mx-n50">
                  <div class="col-12 col-md-4 px-50">
                    <div class="flex items-center">
                        <q-toggle
                          v-model="form.show"
                          color="primary"
                          keep-color
                          :disable="form.promotionState == 'RUNNING'"
                        />
                        <span class="fs-14 ml-50">{{ $t('promotions_end_user.show_banners_to_consumers_or_retailer') }}</span>
                        
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
                <h6 class=" text-weight-bolder mb-0">
                  {{ $t('promotions_retailer.retailer_area_application_of_the_promotion') }}
                </h6>
              </q-card-section>
              <q-separator />
              <q-card-section class="pb-0">
                <div class="row form-group">
                  <div class="text-h6 text-weight-bolder">
                    <q-radio
                      v-model="form.designated"
                      val="1"
                      :label="$t('promotions_retailer.appoint')"
                    />
                    <q-radio
                      v-model="form.designated"
                      val="2"
                      :label="
                        $t('promotions_end_user.select_a_geographic_region')
                      "
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="pt-0" v-if="form.designated == '1'">
                <q-list bordered class="rounded-borders">
                  <q-expansion-item
                    v-model="expandedRetailer"
                    :label="$t('promotions.choose_an_agent')"
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
                                v-model="allRetailers"
                                @click="selectAllRetailers()"
                              ></q-checkbox>
                            </q-item-section>
                          </q-item>
                          <q-item
                            tag="label"
                            v-ripple
                            v-for="item in retailers"
                            :key="item.id"
                          >
                            <q-item-section>
                              <q-item-label>{{ item.name }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                              <q-checkbox
                                size="2rem"
                                :val="item.id"
                                v-model="retailerSelection"
                                @click="clickRetailer(item.id)"
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
                    v-for="item in form.retailers"
                    :key="item.id"
                    class="float-left mr-1"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
                      class="rounded-50"
                      @remove="removeRetailer(item.id)"
                      v-if="retailerSelection.includes(item.id)"
                    >
                      {{ item.name }}
                    </q-chip>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="pt-0" v-if="form.designated == '2'">
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
                    class="float-left mr-1"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
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
                    class="float-left mr-1"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
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

<script>
import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Chỉnh sửa CTKM cho đại lý',
  data: function () {
    return {
      form: {
        subjectType: '1',
        conditionFormatId: 1,
        rewardFormatId: 1,
        typeFormatId: 1,
        fromDate: date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'YYYY/MM/DD'
        ),
        toDate: date.formatDate(
          date.addToDate(Date.now(), { days: 7 }),
          'YYYY/MM/DD'
        ),
        earlyDate: date.formatDate(Date.now(), 'YYYY/MM/DD'),
        promotionCode: '',
        promotionName: '',
        description: '',
        note: '',
        retailers: [],
        cities: [],
        regions: [],
        show: true,
        groupProducts: [],
        groupStructures: [],
        designated: '1',
        promotionState: '',
        banner: ''
      },
      rewardTypes: [],
      conditionTypes: [],
      selectedFile: [],
      progress: false,
      cities: [],
      citySelection: [],
      allCity: false,
      expandedCity: false,
      regions: [],
      regionSelection: [],
      allRegion: false,
      expandedRegion: false,
      retailers: [],
      retailerSelection: [],
      expandedRetailer: false,
      allRetailers: false,
      canChoose: true
    }
  },
  computed: {
    conditionTypesI18n: function () {
      return this.conditionTypes.map(e => {
        return {
          ...e,
          name: this.$t(`conditionTypes[${e.id}]`)
        }
      })
    },
    rewardTypesI18n: function () {
      return this.rewardTypes.map(e => {
        return {
          ...e,
          name: this.$t(`rewardTypes[${e.id}]`)
        }
      })
    },
    typesI18n: function () {
      return [
        {
          id: 1,
          name: this.$t('promotions_end_user.reward_level')
        },
        {
          id: 2,
          name: this.$t('promotions_end_user.reward_range')
        }
      ]
    },
    isValidToSend: function () {
      return this.isValidFromDate && this.isValidToDate
    },
    isValidFromDate: function () {
      if (this.form.promotionState == 'RUNNING') {
        return true
      }

      let dt = date.extractDate(this.form.fromDate, 'DD/MM/YYYY')
      return dt >= Date.now()
    },
    isValidToDate: function () {
      let dt = date.extractDate(this.form.toDate, 'DD/MM/YYYY')
      let fromDate = date.formatDate(
        date.extractDate(this.form.fromDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > fromDate && dt >= Date.now()
    }
  },
  mounted: function () {
    this.init()
    this.getPromotionRewardFormat()
    this.getConditionFormat()
    this.enableTypeFormat()
  },
  methods: {
    enableTypeFormat: function () {
      var self = this
      if (self.form.rewardFormatId == 1) {
        self.canChoose = true
        return
      }
      self.canChoose = false
      self.form.typeFormatId = 2
    },
    optionsFromDate: function (fromDate) {
      var self = this
      let dt = date.extractDate(fromDate, 'YYYY/MM/DD')
      let earlyDate = date.formatDate(
        date.extractDate(self.form.earlyDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > earlyDate && dt >= Date.now()
    },
    optionsToDate: function (toDate) {
      var self = this
      let dt = date.extractDate(toDate, 'YYYY/MM/DD')
      let fromDate = date.formatDate(
        date.extractDate(self.form.fromDate, 'DD/MM/YYYY'),
        'YYYY/MM/DD'
      )
      return date.formatDate(dt, 'YYYY/MM/DD') > fromDate && dt >= Date.now()
    },
    init: function () {
      let str = LocalStorage.getItem(Constants.PROMOTION_SUBJECT_RETAILER)
      this.form.subjectType = str[5]
      if (this.form.subjectType != 2) {
        this.$router.push('/promotions')
        return
      }
      let promotion = LocalStorage.getItem(Constants.PROMOTION_DETAIL)
      this.form.promotionState = promotion.promotionState
      this.form.banner = promotion.banner
      this.form.conditionFormatId = promotion.conditionFormatId
      this.form.rewardFormatId = promotion.rewardFormatId
      this.form.typeFormatId = promotion.conditionComparitionType

      this.form.fromDate = promotion.startDate
      let dt = date.formatDate(Date.now(), 'YYYY/MM/DD')
      if (date.extractDate(promotion.startDate, 'YYYY/MM/DD') <= dt) {
        this.form.fromDate = date.formatDate(
          date.addToDate(Date.now(), { days: 1 }),
          'DD/MM/YYYY'
        )
      }
      this.form.toDate = promotion.endDate
      if (date.extractDate(promotion.endDate, 'YYYY/MM/DD') <= dt) {
        this.form.toDate = date.formatDate(
          date.addToDate(Date.now(), { days: 2 }),
          'DD/MM/YYYY'
        )
      }
      this.form.toDate = promotion.endDate
      this.form.promotionCode = promotion.promotionCode
      this.form.promotionName = promotion.name
      this.form.description = promotion.content
      if (promotion.promotionLocationDto.promotionLocationDetail != null) {
        this.form.designated = '2'
        let cityIds =
          promotion.promotionLocationDto.promotionLocationDetail.map(item => {
            if (item.cityId != null) return item.cityId
          })
        this.getCities(cityIds)
        let regionIds =
          promotion.promotionLocationDto.promotionLocationDetail.map(item => {
            if (item.regionId != null) return item.regionId
          })
        this.getRegions(regionIds)
      } else {
        let retailerIds = promotion.promotionParticipants.retailerIds
        this.form.designated = '1'
        this.getRetailers(retailerIds)
      }

      this.form.show = promotion.display
      this.selectedFile.push({ path: promotion.banner })
    },
    getPromotionRewardFormat: function () {
      var self = this
      axiosInstance.get('/promotions/reward/format').then(response => {
        self.rewardTypes = response.data.data.PromotionRewardFormats
      })
    },
    getConditionFormat: function () {
      var self = this
      axiosInstance.get('/promotions/condition/format').then(response => {
        self.conditionTypes = response.data.data.PromotionConditionFormats
      })
    },
    getCities: function (cityIds) {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.cities = response.data.data.cities
        self.form.cities = self.cities.filter(item => cityIds.includes(item.id))
        self.citySelection = self.form.cities.map(item => item.id)
        self.allCity = self.form.cities.length == self.cities.length
      })
    },
    getRegions: function (regionIds) {
      var self = this
      axiosInstance.get('/regions').then(response => {
        self.regions = response.data.data.regions
        self.form.regions = self.regions.filter(item =>
          regionIds.includes(item.id)
        )
        self.regionSelection = self.form.regions.map(item => item.id)
        self.allRegion = self.form.regions.length == self.regions.length
      })
    },
    selectAllCity: function () {
      var self = this
      self.allRegion = self.allCity
      self.citySelection = self.allCity ? self.cities.map(item => item.id) : []
      self.form.cities = self.allCity ? self.cities : []
      self.regionSelection = self.allCity
        ? self.regions.map(item => item.id)
        : []
      self.form.regions = self.allCity ? self.regions : []
    },
    clickCity: function () {
      var self = this
      self.form.cities = self.cities.filter(item =>
        self.citySelection.includes(item.id)
      )
      self.allCity = self.form.cities.length == self.cities.length
    },
    selectAllRegion: function () {
      var self = this
      self.allCity = self.allRegion
      self.regionSelection = self.allRegion
        ? self.regions.map(item => item.id)
        : []
      self.form.regions = self.allRegion ? self.regions : []
      self.citySelection = self.allRegion
        ? self.cities.map(item => item.id)
        : []
      self.form.cities = self.allRegion ? self.cities : []
    },
    clickRegion: function (regionId) {
      var self = this
      let cities
      self.form.regions = self.regions.filter(item =>
        self.regionSelection.includes(item.id)
      )
      if (!self.regionSelection.includes(regionId)) {
        // cities = self.cities
        //   .filter((item) => item.regionId == regionId)
        //   .map((item) => item.id);
        // self.citySelection = self.citySelection.filter(
        //   (item) => !cities.includes(item)
        // );
        // self.form.cities = self.form.cities.filter(
        //   (item) => !cities.includes(item.id)
        // );
        return
      }
      self.allRegion = self.form.regions.length == self.regions.length
      cities = self.cities.filter(item =>
        self.regionSelection.includes(item.regionId)
      )
      self.form.cities = cities
      if (cities.length > 0) {
        self.citySelection = cities.map(item => item.id)
      }
      self.allCity = self.form.cities.length == self.cities.length
    },
    removeRegion: function (regionId) {
      var self = this
      self.regionSelection = self.regionSelection.filter(
        item => item != regionId
      )
      self.allRegion = false
      self.clickRegion(regionId)
    },
    removeCity: function (cityId) {
      var self = this
      self.citySelection = self.citySelection.filter(item => item != cityId)
      self.allCity = false
      self.clickCity()
    },
    getRetailers: function (retailerIds) {
      var self = this
      axiosInstance.get('/retailers').then(response => {
        self.retailers = response.data.data.retailers
        self.form.retailers = self.retailers.filter(item =>
          retailerIds.includes(item.id)
        )
        self.retailerSelection = self.form.retailers.map(item => item.id)
        self.allRetailers = self.form.retailers.length == self.retailers.length
      })
    },
    selectAllRetailers: function () {
      var self = this
      self.retailerSelection = self.allRetailers
        ? self.retailers.map(item => item.id)
        : []
      self.form.retailers = self.allRetailers ? self.retailers : []
    },
    clickRetailer: function () {
      var self = this
      self.form.retailers = self.retailers.filter(item =>
        self.retailerSelection.includes(item.id)
      )
      self.allRetailers = self.form.retailers.length == self.retailers.length
    },
    removeRetailer: function (id) {
      var self = this
      self.retailerSelection = self.retailerSelection.filter(item => item != id)
      self.allRetailers = false
    },
    selectFile: function () {
      document.getElementById('imageFile').click()
    },
    onFileSelected: function (event) {
      var self = this
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return false
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i)
        self.createImage(file)
      }
    },
    createImage: function (file) {
      var self = this
      let reader = new FileReader()
      reader.onload = e => {
        let dataURI = e.target.result
        if (dataURI) {
          self.selectedFile.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file
          })
        }
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (imageId) {
      var self = this
      self.selectedFile = self.selectedFile.filter(element => {
        return element.id != imageId
      })
    },
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
    cancel: function () {
      this.$router.push('/promotions')
    },
    saveInfo: function () {
      var self = this
      if (!self.isValidToSend) {
        Notify.create({
          message: this.$t('promotions.please_check_promotion_information'),
          type: 'negative',
          position: 'top'
        })
        return
      }
      self.progress = true
      let promotionId = LocalStorage.getItem(Constants.PROMOTION_ID)
      let inputData = {}
      inputData['endDate'] = date.formatDate(
        date.extractDate(self.form.toDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['note'] = self.form.note
      inputData['content'] = self.form.description
      inputData['retailers'] = self.form.designated = '1'
        ? self.retailerSelection
        : []
      inputData['cities'] = self.form.designated = '2' ? self.citySelection : []
      inputData['regions'] = self.form.designated = '2'
        ? self.regionSelection
        : []

      inputData['startDate'] = date.formatDate(
        date.extractDate(self.form.fromDate, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )

      axiosInstance
        .post('/promotions/' + promotionId + '/changeInfo', inputData)
        .then(() => {
          if (self.selectedFile[0].path != self.form.banner) {
            self.uploadBanner(promotionId)
            return
          }
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_successful'),
            type: 'positive',
            position: 'top'
          })
          self.$router.push('/promotion-detail')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    uploadBanner: function (promotionId) {
      var self = this
      let formData = new FormData()
      // let files = new Array();
      self.selectedFile.forEach(item => {
        // files.push(item.file);
        formData.append('files[]', item.file)
      })

      axiosInstance
        .post('/promotions/' + promotionId + '/banner', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_successful'),
            type: 'positive',
            position: 'top'
          })
          self.$router.push('/promotion-detail')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('promotions.edit_promotions_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    }
  }
})
</script>
