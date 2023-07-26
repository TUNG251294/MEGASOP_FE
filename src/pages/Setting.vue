<template>
  <q-page class="flex">
    <div class="content-wrapper" style="width: 764px">
      <!-- Header  -->
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.setting') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>

                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.setting')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <!-- Body -->
      <div class="content-body">
        <!-- Row1  -->
        <div class="row mx-n1">
          <div class="col-12">
            <!-- app form  -->
            <q-form
              @submit.prevent="
                tab === 'consumer' ? onSubmitConsumer() : onSubmitRetailer()
              "
              action=""
            >
              <div class="card card-shadow border-0">
                <div class="card-body px-1">
                  <div class="row items-center justify-between">
                    <div class="col col-6">
                      <h6
                        class="text-weight-bolder mb-0"
                      >
                        {{ $t('setting.show_on_apps_and_websites') }}
                      </h6>
                    </div>

                    <div class="col col-6 text-right">
                      <div v-if="isAdmin">
                        <q-btn
                          class="rounded-50"
                          outline
                          no-caps
                          color="primary"
                          @click="
                            tab === 'consumer'
                              ? openButton()
                              : openButtonRetailer()
                          "
                          v-if="
                            tab === 'consumer' ? buttonInfo : buttonInfoRetailer
                          "
                          :disable="isDisableInfo ? true : false"
                          :label="$t('setting.update_information')"
                        />
                      </div>

                      <div
                        v-if="
                          tab === 'consumer' ? !buttonInfo : !buttonInfoRetailer
                        "
                        class="d-inline-block float-right"
                      >
                        <q-btn
                          @click="
                            tab === 'consumer'
                              ? openButton()
                              : openButtonRetailer()
                          "
                          class="mr-50 rounded-50"
                          color="danger"
                          outline
                          no-caps
                          :label="$t('general.cancel')"
                        />
                        <q-btn
                          class="rounded-50"
                          type="submit"
                          :disabled="
                            tab === 'consumer'
                              ? !isValidToSend
                              : !isValidToSendRetailer
                          "
                          color="primary"
                          no-caps
                          unelevated
                          :label="$t('general.save')"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <!-- // Tabs  -->
                <q-separator size="1px" class="text-dark w-100 m-0" />
                <div class="q-py-md w-100">
                  <div class="q-gutter-y-md">
                    <q-tabs
                      v-model="tab"
                      no-caps
                      inline-label
                      align="left"
                      class="text-left m-0 text-dark q-px-md"
                      active-color="primary"
                      indicator-color="primary"
                    >
                      <q-tab
                        class="bg-transparent"
                        name="consumer"
                        :label="$t('setting.user')"
                        :disable="isVisibleRetailer ? true : false"
                      />
                      <q-tab
                        class="bg-transparent"
                        name="retailer"
                        :label="$t('setting.retailer')"
                        :disable="isVisibleConsumer ? true : false"
                      />
                    </q-tabs>
                    <q-separator size="1px" class="text-dark w-100 m-0 p-0" />

                    <q-tab-panels
                      v-model="tab"
                      animated
                      class="q-px-md"
                      style="height: 260px"
                    >
                      <!-- // consumer  -->
                      <q-tab-panel name="consumer">
                        <!-- // Main content tab  -->
                        <div class="row">
                          <div class="col-6 p-0">
                            <div class="form-group">
                              <label class="form-label" for="signName"
                                >{{ $t('setting.app_name') }}
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                :placeholder="$t('setting.enter_app_name')"
                                autofocus=""
                                tabindex="1"
                                v-model="form.appName"
                                :readonly="isReadOnly ? true : false"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- // Upload image -->
                        <div class="row">
                          <div class="col-4 px-0">
                            <label class="mb-75">{{
                              $t('setting.brand_logo')
                            }}</label>
                            <div
                              class="w-img-wrap mr-custom mb-1"
                              v-for="image in selectedFileLogoConsumer"
                              :key="image.id"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <img
                                id="logoConsumer"
                                class="h-100 w-100"
                                :src="image.path"
                              />

                              <q-btn
                                style="top: -25px"
                                icon="cancel"
                                unelevated
                                round
                                :class="isReadOnly ? 'd-none ' : 'upload-image'"
                                clickable
                                @click="removeImageLogoConsumer(image.id)"
                              />
                              <!-- layer  -->
                              <div v-if="!isReadOnly" class="w-img-wrap-layer">
                                <input
                                  type="file"
                                  @change="onFileSelectedLogoConsumer"
                                  accept="image/*"
                                  id="imageFileLogoConsumer"
                                  :disabled="isReadOnly ? true : false"
                                />
                                <img
                                  src="../assets/Image-icons-white.png"
                                  alt="image-icon"
                                  class="mb-1"
                                  @click="selectFileLogoConsumerLayer()"
                                />
                                <span
                                  style="font-size: 10px; color: #fff"
                                  class="text-center"
                                  >{{ $t('setting.change_image') }}</span
                                >
                              </div>
                            </div>

                            <div
                              class="w-dropper"
                              v-if="selectedFileLogoConsumer.length == 0"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <input
                                type="file"
                                @change="onFileSelectedLogoConsumer"
                                accept="image/*"
                                id="imageFileLogoConsumer"
                                :disabled="isReadOnly ? true : false"
                              />
                              <img
                                src="../assets/Image-icons.png"
                                alt="image-icon"
                                class="mb-1"
                                @click="selectFileLogoConsumer()"
                              />
                              <span
                                style="font-size: 10px; color: #9aa7aa"
                                class="text-center"
                                >{{
                                  $t('setting.click_here_to_upload_photos')
                                }}</span
                              >
                            </div>
                          </div>

                          <div class="col-4 px-0">
                            <label class="mb-75">{{
                              $t('setting.app_icons')
                            }}</label>
                            <div
                              class="w-img-wrap mr-custom mb-1"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                              v-for="image in selectedFileIconConsumer"
                              :key="image.id"
                            >
                              <img class="h-100 w-100" :src="image.path" />
                              <q-btn
                                style="top: -25px"
                                icon="cancel"
                                unelevated
                                round
                                :class="isReadOnly ? 'd-none ' : 'upload-image'"
                                clickable
                                @click="removeImageIconConsumer(image.id)"
                              />
                              <!-- layer  -->
                              <div v-if="!isReadOnly" class="w-img-wrap-layer">
                                <input
                                  type="file"
                                  @change="onFileSelectedIconConsumer"
                                  accept="image/*"
                                  id="imageFileIconConsumer"
                                  :disabled="isReadOnly ? true : false"
                                />
                                <img
                                  src="../assets/Image-icons-white.png"
                                  alt="image-icon"
                                  class="mb-1"
                                  @click="selectFileIconConsumer()"
                                />
                                <span
                                  style="font-size: 10px; color: #fff"
                                  class="text-center"
                                  >{{ $t('setting.change_image') }}</span
                                >
                              </div>
                            </div>

                            <div
                              class="w-dropper"
                              v-if="selectedFileIconConsumer.length == 0"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <input
                                type="file"
                                @change="onFileSelectedIconConsumer"
                                accept="image/*"
                                id="imageFileIconConsumer"
                                :disabled="isReadOnly ? true : false"
                              />
                              <img
                                src="../assets/Image-icons.png"
                                alt="image-icon"
                                class="mb-1"
                                @click="selectFileIconConsumer()"
                              />
                              <span
                                style="font-size: 10px; color: #9aa7aa"
                                class="text-center"
                                >{{
                                  $t('setting.click_here_to_upload_photos')
                                }}</span
                              >
                            </div>
                          </div>

                          <div class="col-4 px-0 d-none">
                            <label class="mb-75"
                              >{{ $t('setting.landing_page_background_image') }}
                              <span class="ml-75">
                                <img
                                  src="../assets/exclamation-icon.png"
                                  alt="exclamation-icon"
                                />

                                <q-tooltip
                                  anchor="center right"
                                  self="center start"
                                  class="setting-tooltip"
                                >
                                  <div style="width: 182px">
                                    <p>
                                      .
                                      {{
                                        $t('setting.landing_page_first_screen')
                                      }}
                                    </p>
                                    <p>. {{ $t('setting.ratio_image') }}</p>
                                  </div>
                                </q-tooltip>
                              </span>
                            </label>
                            <div
                              class="w-img-wrap mr-custom mb-1"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                              v-for="image in selectedFileLandingPageConsumer"
                              :key="image.id"
                            >
                              <img class="h-100 w-100" :src="image.path" />
                              <q-btn
                                style="top: -25px"
                                icon="cancel"
                                unelevated
                                round
                                :class="isReadOnly ? 'd-none ' : 'upload-image'"
                                clickable
                                @click="
                                  removeImageLandingPageConsumer(image.id)
                                "
                              />
                              <!-- layer  -->
                              <div v-if="!isReadOnly" class="w-img-wrap-layer">
                                <input
                                  type="file"
                                  @change="onFileSelectedLandingPageConsumer"
                                  accept="image/*"
                                  id="imageFileLandingPageConsumer"
                                  :disabled="isReadOnly ? true : false"
                                />
                                <img
                                  src="../assets/Image-icons-white.png"
                                  alt="image-icon"
                                  class="mb-1"
                                  @click="selectFileLandingPageConsumer()"
                                />
                                <span
                                  style="font-size: 10px; color: #fff"
                                  class="text-center"
                                  >{{ $t('setting.change_image') }}</span
                                >
                              </div>
                            </div>

                            <div
                              class="w-dropper"
                              v-if="selectedFileLandingPageConsumer.length == 0"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <input
                                type="file"
                                @change="onFileSelectedLandingPageConsumer"
                                accept="image/*"
                                id="imageFileLandingPageConsumer"
                                :disabled="isReadOnly ? true : false"
                              />
                              <img
                                src="../assets/Image-icons.png"
                                alt="image-icon"
                                class="mb-1"
                                @click="selectFileLandingPageConsumer()"
                              />
                              <span
                                style="font-size: 10px; color: #9aa7aa"
                                class="text-center"
                                >{{
                                  $t('setting.click_here_to_upload_photos')
                                }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>

                      <!-- retailer  -->
                      <q-tab-panel name="retailer">
                        <div class="row">
                          <div class="col-6 p-0">
                            <div class="form-group">
                              <label class="form-label" for="signName"
                                >{{ $t('setting.app_name') }}
                              </label>
                              <input
                                class="form-control"
                                type="text"
                                :placeholder="$t('setting.enter_app_name')"
                                autofocus=""
                                tabindex="1"
                                v-model="form.appNameRetailer"
                                :readonly="isReadOnlyRetailer ? true : false"
                              />
                            </div>
                          </div>
                        </div>
                        <!-- // Upload image -->
                        <div class="row">
                          <div class="col-4 px-0">
                            <label class="mb-75">{{
                              $t('setting.brand_logo')
                            }}</label>
                            <div
                              class="w-img-wrap mr-custom mb-1"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                              v-for="image in selectedFileLogoRetailer"
                              :key="image.id"
                            >
                              <img class="h-100 w-100" :src="image.path" />
                              <q-btn
                                style="top: -25px"
                                icon="cancel"
                                unelevated
                                round
                                :class="
                                  isReadOnlyRetailer
                                    ? 'd-none '
                                    : 'upload-image'
                                "
                                clickable
                                @click="removeImageLogoRetailer(image.id)"
                              />
                              <!-- layer  -->
                              <div
                                v-if="!isReadOnlyRetailer"
                                class="w-img-wrap-layer"
                              >
                                <input
                                  type="file"
                                  @change="onFileSelectedLogoRetailer"
                                  accept="image/*"
                                  id="imageFileLogoRetailer"
                                  :disabled="isReadOnlyRetailer ? true : false"
                                />
                                <img
                                  src="../assets/Image-icons-white.png"
                                  alt="image-icon"
                                  class="mb-1"
                                  @click="selectFileLogoRetailer()"
                                />
                                <span
                                  style="font-size: 10px; color: #fff"
                                  class="text-center"
                                  >{{ $t('setting.change_image') }}</span
                                >
                              </div>
                            </div>

                            <div
                              class="w-dropper"
                              v-if="selectedFileLogoRetailer.length == 0"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <input
                                type="file"
                                @change="onFileSelectedLogoRetailer"
                                accept="image/*"
                                id="imageFileLogoRetailer"
                                :disabled="isReadOnlyRetailer ? true : false"
                              />
                              <img
                                src="../assets/Image-icons.png"
                                alt="image-icon"
                                class="mb-1"
                                @click="selectFileLogoRetailer()"
                              />
                              <span
                                style="font-size: 10px; color: #9aa7aa"
                                class="text-center"
                                >{{
                                  $t('setting.click_here_to_upload_photos')
                                }}</span
                              >
                            </div>
                          </div>

                          <div class="col-4 px-0">
                            <label class="mb-75">{{
                              $t('setting.app_icons')
                            }}</label>
                            <div
                              class="w-img-wrap mr-custom mb-1"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                              v-for="image in selectedFileIconRetailer"
                              :key="image.id"
                            >
                              <img class="h-100 w-100" :src="image.path" />
                              <q-btn
                                style="top: -25px"
                                icon="cancel"
                                unelevated
                                round
                                :class="
                                  isReadOnlyRetailer
                                    ? 'd-none '
                                    : 'upload-image'
                                "
                                clickable
                                @click="removeImageIconRetailer(image.id)"
                              />
                              <!-- layer  -->
                              <div
                                v-if="!isReadOnlyRetailer"
                                class="w-img-wrap-layer"
                              >
                                <input
                                  type="file"
                                  @change="onFileSelectedIconRetailer"
                                  accept="image/*"
                                  id="imageFileIconRetailer"
                                  :disabled="isReadOnlyRetailer ? true : false"
                                />
                                <img
                                  src="../assets/Image-icons-white.png"
                                  alt="image-icon"
                                  class="mb-1"
                                  @click="selectFileIconRetailer()"
                                />
                                <span
                                  style="font-size: 10px; color: #fff"
                                  class="text-center"
                                  >{{ $t('setting.change_image') }}</span
                                >
                              </div>
                            </div>

                            <div
                              class="w-dropper"
                              v-if="selectedFileIconRetailer.length == 0"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #9aa7aa;
                              "
                            >
                              <input
                                type="file"
                                @change="onFileSelectedIconRetailer"
                                accept="image/*"
                                id="imageFileIconRetailer"
                                :disabled="isReadOnlyRetailer ? true : false"
                              />
                              <img
                                src="../assets/Image-icons.png"
                                alt="image-icon"
                                class="mb-1"
                                @click="selectFileIconRetailer()"
                              />
                              <span
                                style="font-size: 10px; color: #9aa7aa"
                                class="text-center"
                                >{{
                                  $t('setting.click_here_to_upload_photos')
                                }}</span
                              >
                            </div>
                          </div>
                          <!--  disable - col  -->

                          <!-- <div class="col-4 px-0">
                            <label class="mb-75" style="color: #e3e3e3"
                              >Hình nền trang landing page
                              <span class="ml-75">
                                <img
                                  src="../assets/disable-exclamation-icon.png"
                                  alt="exclamation-icon"
                                />
                              </span>
                            </label>
                            <div
                              class="w-dropper"
                              style="
                                width: 216px;
                                height: 124px;
                                border: 1px dashed #e3e3e3;
                              "
                            >
                              <img
                                src="../assets/disable-image-icon.png"
                                alt="image-icon"
                                class="mb-1"
                              />
                            </div>
                          </div> -->
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </div>
        <!-- Row2 -->
        <div class="row mx-n1 mt-2 pb-2">
          <div class="col-12">
            <!-- email form  -->
            <q-form @submit.prevent="onSubmitEmail()" action="">
              <div class="card card-shadow border-0 pb-2">
                <div class="card-body pb-0 px-0">
                  <div class="row items-center justify-between px-1">
                    <div class="col col-6">
                      <h6
                        class="text-weight-bolder mb-0"
                      >
                        {{ $t('setting.show_email_name_notification') }}
                    </h6>
                    </div>
                    <div class="col col-6 text-right">
                      <div v-if="isAdmin">
                        <q-btn
                          @click="openButtonEmail"
                          class="rounded-50"
                          v-if="showButtonEmail"
                          :disable="isDisableEmail ? true : false"
                          :label="$t('setting.update_email_name')"
                          color="primary"
                          outline
                          no-caps
                        />
                      </div>

                      <div
                        v-if="!showButtonEmail"
                        class="d-inline-block float-right"
                      >
                        <q-btn
                          @click="openButtonEmail"
                          class="mr-50 rounded-50"
                          :label="$t('general.cancel')"
                          color="danger"
                          outline
                          no-caps
                        />
                        <q-btn
                          type="submit"
                          class="rounded-50"
                          :disabled="!isValidToSendEmail"
                          :label="$t('general.save')"
                          color="primary"
                          no-caps
                          unelevated
                        />
                      </div>
                    </div>
                  </div>
                  <q-separator size="1px" class="text-dark w-100 mt-1" />
                  <!-- input -->
                  <div class="row mt-2 px-1">
                    <div class="col-6 p-0 pr-50">
                      <div class="form-group">
                        <label class="form-label" for="signName"
                          >{{ $t('setting.email_name_to_employee') }}
                        </label>
                        <input
                          :class="
                            emailStaffError
                              ? 'form-control error '
                              : 'form-control'
                          "
                          type="text"
                          :placeholder="$t('setting.enter_display_name')"
                          autofocus=""
                          tabindex="1"
                          v-model="form.emailStaff"
                          @change="validateEmailStaffError"
                          :readonly="isReadOnlyEmail ? true : false"
                        />
                        <span class="error" v-if="emailStaffError">{{
                          emailStaffError
                        }}</span>
                      </div>
                    </div>
                    <div class="col-6 p-0 pl-50">
                      <div class="form-group">
                        <label class="form-label" for="signName"
                          >{{ $t('setting.email_name_to_retailer') }}
                        </label>
                        <input
                          :class="
                            emailRetailerError
                              ? 'form-control error '
                              : 'form-control'
                          "
                          type="text"
                          :placeholder="$t('setting.enter_display_name')"
                          autofocus=""
                          tabindex="1"
                          v-model="form.emailRetailer"
                          @change="validateEmailRetailerError"
                          :readonly="isReadOnlyEmail ? true : false"
                        />
                        <span class="error" v-if="emailRetailerError">{{
                          emailRetailerError
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/setting.js"></script>
