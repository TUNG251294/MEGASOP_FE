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
                Tạo CTKM
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el label="CTKM" to="/promotions" />
                <q-breadcrumbs-el label="Tạo CTKM" style="color: #2a2a2a" />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div>
      <div class="content-body">
        <div class="row">
          <div class="col col-12 d-flex justify-content-end">
            <q-btn
              class="mr-1 mb-1"
              label="Hủy bỏ"
              color="danger"
              outline
              no-caps
              clickable
              @click="cancel()"
            />
            <q-btn
              class="mr-1 mb-1"
              icon-right="east"
              label="Tiếp tục"
              color="primary"
              no-caps
              clickable
              @click="step = 2"
            />
            <q-btn
              class="mr-1 mb-1"
              icon="west"
              label="Quay lại"
              color="primary"
              outline
              no-caps
              clickable
              @click="step = 1"
            />
            <q-btn
              class="mr-1 mb-1"
              label="Lưu"
              color="primary"
              no-caps
              clickable
              @click="saveInfo()"
            />
          </div>
        </div>
        <div class="row">
          <div class="d-flex col-md-9 col-sm-12 mb-1">
            <q-card class="w-100">
              <q-card-section>
                <div class="d-flex justify-content-between">
                  <div
                    class="text-h6 text-weight-bolder"
                    style="line-height: 2.5rem"
                  >
                    Thông tin CTKM
                  </div>
                  <div class="row">
                    <div
                      class="text-h6 text-weight-bolder"
                      style="line-height: 2.5rem"
                    >
                      Đối tượng áp dụng:
                    </div>
                    <div class="text-h6 text-weight-bolder">
                      <q-radio
                        v-model="form.subjectType"
                        val="1"
                        label="Người tiêu dùng"
                      />
                      <q-radio
                        v-model="form.subjectType"
                        val="2"
                        label="Đại lý"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row form-group">
                  <div class="col-4">
                    <label for="region">Điều kiện áp dụng</label>
                    <select
                      class="custom-select"
                      v-model="form.conditionFormatId"
                    >
                      <option selected value="0">Chọn điều kiện</option>
                      <option
                        v-for="item in conditionTypes"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-4">
                    <label for="region">Loại xét thưởng</label>
                    <select class="custom-select" v-model="form.typeFormatId">
                      <option selected value="0">Chọn loại xét thưởng</option>
                      <option
                        v-for="item in types"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-4">
                    <label for="region">Loại thưởng</label>
                    <select class="custom-select" v-model="form.rewardFormatId">
                      <option selected value="0">Chọn loại thưởng</option>
                      <option
                        v-for="item in rewardTypes"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row form-group">
                  <div class="col-4" v-if="form.subjectType == 1">
                    <label for="earlyDate">Ngày áp dụng sớm</label>
                    <q-input
                      filled
                      v-model="form.earlyDate"
                      mask="date"
                        :rules="['date']"
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
                              style="width: 300px; height: 400px"
                              mask="YYYY/MM/DD"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
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
                  <div class="col-4">
                    <label for="fromDate">Ngày bắt đầu</label>
                    <q-input
                      filled
                      v-model="form.fromDate"
                      mask="date"
                        :rules="['date']"
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
                              mask="YYYY/MM/DD"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
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
                  <div class="col-4">
                    <label for="toDate">Ngày kết thúc</label>
                    <q-input
                      filled
                      v-model="form.toDate"
                      mask="date"
                        :rules="['date']"
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
                              mask="YYYY/MM/DD"
                            >
                              <div class="row items-center justify-end">
                                <q-btn
                                  v-close-popup
                                  label="Close"
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
                <div class="row">
                  <div class="col-4">
                    <label>Mã CTKM</label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      outlined
                      type="text"
                      v-model="form.promotionCode"
                      placeholder="Nhập mã CTKM"
                    />
                  </div>
                  <div class="col-8">
                    <label>Tên CTKM</label>
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      outlined
                      type="text"
                      v-model="form.promotionName"
                      placeholder="Nhập tên CTKM"
                    />
                  </div>
                </div>
                <div class="row form-group mt-1">
                  <div class="col-4">
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
                      />
                      <q-icon
                        class="mb-1"
                        size="50px"
                        name="insert_photo"
                        color="primary"
                      />
                      <span class="text-center size12">Tải ảnh lên</span>
                      <span class="text-center size12">
                        Tỉ lệ ảnh 3.25:1.9 dung lượng dưới 1MB
                      </span>
                    </div>
                  </div>
                  <div class="col-8">
                    <label>Nội dung</label>
                    <textarea
                      class="form-control"
                      placeholder="Nhập nội dung chương trình khuyến mãi"
                      cols="28"
                      rows="6"
                      v-model="form.description"
                    ></textarea>
                  </div>
                </div>
                <div class="row form-group">
                  <q-item
                    clickable
                    v-ripple
                    active-class="bg-teal-1 text-grey-8"
                  >
                    <q-item-section avatar>
                      <q-toggle
                        v-model="form.show"
                        color="primary"
                        keep-color
                      />
                    </q-item-section>
                    <q-item-section
                      >Hiện banner với người tiêu dùng hoặc đại
                      lý</q-item-section
                    >
                  </q-item>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-3 col-sm-12 mb-1">
            <q-card class="w-100">
              <q-card-section>
                <div
                  class="text-h6 text-weight-bolder"
                  style="line-height: 2.5rem"
                  v-if="form.subjectType == '1'"
                >
                  Vùng áp dụng CTKM
                </div>
                <div
                  class="text-h6 text-weight-bolder"
                  style="line-height: 2.5rem"
                  v-if="form.subjectType == '2'"
                >
                  Đại lý/Vùng áp dụng CTKM
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row form-group" v-if="form.subjectType == '2'">
                  <div class="text-h6 text-weight-bolder">
                    <q-radio
                      v-model="form.designated"
                      val="1"
                      label="Chỉ định"
                    />
                    <q-radio
                      v-model="form.designated"
                      val="2"
                      label="Chọn vùng địa lý"
                    />
                  </div>
                </div>
                <q-select
                  v-if="form.subjectType == '1'"
                  v-model="form.cities"
                  :options="cities"
                  label="Chọn tỉnh/thành phố "
                  dense
                  options-dense
                  outlined
                  multiple
                  use-chips
                  emit-value
                  map-options
                  @input="citiesSelected"
                  class="w-select"
                >
                  <template #before-options>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Chọn tất cả</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          v-model="all"
                          @click="checkAllCities"
                        ></q-checkbox>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="scope">
                    <q-item>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          v-model="form.cities"
                          :val="scope.opt.name"
                        ></q-checkbox>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop="citiesCleared"
                      class="cursor-pointer"
                    />
                  </template>
                </q-select>
                <q-select
                  v-if="form.subjectType == '2' && form.designated == '1'"
                  v-model="form.retailers"
                  :options="retailers"
                  label="Chọn Đại lý"
                  dense
                  options-dense
                  outlined
                  multiple
                  use-chips
                  emit-value
                  map-options
                  @input="citiesSelected"
                  class="w-select"
                >
                  <template #before-options>
                    <q-item>
                      <q-item-section>
                        <q-item-label>Chọn tất cả</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          v-model="all"
                          @click="checkAllCities"
                        ></q-checkbox>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:option="scope">
                    <q-item>
                      <q-item-section>
                        <q-item-label v-html="scope.opt.name"></q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          v-model="form.cities"
                          :val="scope.opt.name"
                        ></q-checkbox>
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:append>
                    <q-icon
                      name="close"
                      @click.stop="citiesCleared"
                      class="cursor-pointer"
                    />
                  </template>
                </q-select>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { axiosInstance } from "boot/axios";
import { date, LocalStorage } from "quasar";
import { Constants } from "boot/Constants";

export default defineComponent({
  name: "Tạo CTKM",
  data: function () {
    return {
      form: {
        subjectType: "1",
        conditionFormatId: 0,
        rewardFormatId: 0,
        typeFormatId: 0,
        fromDate: date.formatDate(
          date.subtractFromDate(Date.now(), { days: 7 }),
          "YYYY/MM/DD"
        ),
        toDate: date.formatDate(Date.now(), "YYYY/MM/DD"),
        earlyDate: date.formatDate(
          date.subtractFromDate(Date.now(), { days: 10 }),
          "YYYY/MM/DD"
        ),
        promotionCode: "",
        promotionName: "",
        description: "",
        cities: [],
        show: true,
        designated: "1",
        retailers: [],
      },
      step: 1,
      types: [
        {
          id: 1,
          name: "Mức xét thưởng",
        },
        {
          id: 2,
          name: "Khoảng xét thưởng",
        },
      ],
      rewardTypes: [],
      conditionTypes: [],
      selectedFile: [],
      progress: false,
      cities: [],
      all: false,
      retailers: [],
    };
  },
  mounted: function () {
    this.getPromotionRewardFormat();
    this.getConditionFormat();
    this.getCities();
    this.getRetailers();
  },
  methods: {
    optionsFromDate: function (date) {
      var self = this;
      return self.form.subjectType == "1"
        ? date >= self.form.earlyDate
        : date >= date.formatDate(Date.now(), "YYYY/MM/DD");
    },
    optionsToDate: function (date) {
      var self = this;
      return date >= self.form.fromDate;
    },
    getPromotionRewardFormat: function () {
      var self = this;
      axiosInstance.get("/promotion/reward/format").then((response) => {
        self.rewardTypes = response.data.data.PromotionRewardFormats;
      });
    },
    getConditionFormat: function () {
      var self = this;
      axiosInstance.get("/promotion/condition/format").then((response) => {
        self.conditionTypes = response.data.data.PromotionConditionFormats;
      });
    },
    getCities: function () {
      var self = this;
      axiosInstance.get("/cities").then((response) => {
        self.cities = response.data.data.cities;
      });
    },
    getRetailers: function () {
      var self = this;
      axiosInstance.get("/retailers").then((response) => {
        self.retailers = response.data.data.retailers;
      });
    },
    onFileSelected: function (event) {
      var self = this;
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return false;
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i);
        self.createImage(file);
      }
    },
    createImage: function (file) {
      var self = this;
      let reader = new FileReader();
      reader.onload = (e) => {
        let dataURI = e.target.result;
        if (dataURI) {
          self.selectedFile.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file,
          });
        }
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (imageId) {
      var self = this;
      self.selectedFile = self.selectedFile.filter((element) => {
        return element.id != imageId;
      });
    },
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    checkAllCities() {
      if (this.all) {
        this.form.cities = this.cities.map((v) => v.name);
        this.citiesSelected();
        return;
      }
      this.citiesCleared();
    },
    citiesSelected: function () {
      var self = this;
      if (self.form.cities.length == self.cities.length) {
        self.all = true;
      } else {
        self.all = false;
      }
    },
    citiesCleared() {
      this.all = false;
      this.form.cities = [];
    },
    cancel: function () {
      this.$router.push("/promotions");
    },
  },
});
</script>