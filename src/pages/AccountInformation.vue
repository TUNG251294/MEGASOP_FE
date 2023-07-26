<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('personal.personal_info') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('personal.personal_info')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="d-flex col-7">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="row justify-content-between items-center">
                  <h6 class="text-weight-bolder mb-0">{{ $t('personal.general_info') }}</h6>
                  <button
                    @click="changePersonalModal = true"
                    class="btn-edit float-right"
                  >
                    <q-icon name="edit_calendar" size="20px" class="mr-50" />
                    {{ $t('general.edit') }}
                  </button>
                </div>
              </div>
              <q-separator />
              <div class="card-body">
                <div class="row">
                  <div class="col col-sm-12 col-md-3">
                    <div class="row">
                      <span class="avatar avatar-center" id="display-area">
                        <span class="avatar-img">
                          <img
                            id="retailerAvatar"
                            :src="
                              form.imageSrc != ''
                                ? form.imageSrc
                                : 'favicon-128x128.png'
                            "
                            alt="Avatar"
                            class="rounded"
                            @click="handleUpload()"
                            @error="loadErrorImage"
                          />
                          <input
                            id="image-upload"
                            class="d-none"
                            type="file"
                            @change="onFileSelected"
                            accept="image/*"
                          />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div class="col-sm-12 col-md-9">
                    <div class="row mb-1">
                      <div class="col-6 pr-0 text-weight-bolder">
                        {{ getFullnameLabel() }}:
                      </div>
                      <div class="col-6 px-0">
                        {{ form.info.fullname }}
                      </div>
                    </div>
                    <div class="row mb-1">
                      <div class="col-6 pr-0 text-weight-bolder">
                        {{ $t('personal.email') }}:
                      </div>
                      <div class="col-6 px-0">{{ form.info.email }}</div>
                    </div>
                    <div class="row">
                      <div class="col-6 text-weight-bolder pr-0">
                        {{ $t('personal.phone') }}:
                      </div>
                      <div class="col-6 px-0">{{ form.info.tel }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-5 pl-md-0">
            <div class="card card-shadow border-0 w-100">
              <div style="flex: none" class="card-body">
                <div class="row justify-content-between items-center">
                  <h6 class="text-weight-bolder">{{ $t('personal.login_info') }}</h6>
                  <button
                    @click="changePasswordModal = true"
                    class="btn-edit float-right text-no-wrap"
                  >
                    <q-icon name="autorenew" size="20px" class="mr-50" />
                    {{ $t('personal.change_password') }}
                  </button>
                </div>
              </div>
              <q-separator />

              <div class="card-body">
                <!-- <div class="row mb-1">
                  <div class="col-6 text-weight-bolder pr-0">
                    Tên đăng nhập:
                  </div>
                  <div class="col-6 px-0">{{ form.info.email }}</div>
                </div> -->
                <div class="row">
                  <div class="col-6 text-weight-bolder pr-0">
                    {{ $t('personal.password') }}:
                  </div>
                  <div class="col-6 px-0">********</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- dialog-information  -->
        <q-dialog
          v-model="changePersonalModal"
          position="right"
          persistent
          full-height
          maximized
        >
          <q-card style="width: 505px">
            <!-- form  -->
            <q-form @submit.prevent="handleSubmitPersonalInformation()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="flex items-center">
                  <q-btn icon="close" flat round @click="closePersonalModal" />

                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('personal.edit_info') }}
                  </h6>
                </div>

                <div class="d-inline-block float-right">
                  <q-btn
                    @click="closePersonalModal"
                    class=" mr-50 rounded-50 bg-white"
                    color="danger"
                    no-caps
                    outline
                    >{{ $t('general.cancel') }}</q-btn
                  >
                  <q-btn
                    type="submit"
                    class="rounded-50"
                    color="primary"
                    no-caps
                    unelevated
                    :disabled="!isValidToSendPersonalInformation"
                    >{{ $t('general.save') }}</q-btn
                  >
                </div>
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row mt-1">
                  <div class="col-12 px-0">
                    <div class="form-group">
                      <label class="form-label"
                        >{{ getFullnameLabel() }} *</label
                      >
                      <input
                        :class="
                          representativeError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.info.fullname"
                        tabindex="1"
                        @change="validateRepresentativeError"
                      />
                      <span class="error" v-if="representativeError">{{
                        representativeError
                      }}</span>
                    </div>

                    <div disabled class="form-group">
                      <label class="form-label"
                        >{{ $t('personal.email') }} *</label
                      >
                      <input
                        class="form-control"
                        type="text"
                        v-model="form.info.email"
                        tabindex="1"
                        disabled
                      />
                    </div>

                    <div class="form-group">
                      <label class="form-label"
                        >{{ $t('personal.phone') }} *</label
                      >
                      <input
                        :class="
                          tellError ? 'form-control error' : 'form-control'
                        "
                        type="text"
                        v-model="form.info.tel"
                        tabindex="1"
                        @change="validateTellError"
                      />
                      <span class="error" v-if="tellError">{{
                        tellError
                      }}</span>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-form>
          </q-card>
        </q-dialog>
        <!-- dialog-password  -->
        <q-dialog
          v-model="changePasswordModal"
          position="right"
          full-height
          persistent
          maximized
        >
          <q-card style="width: 505px">
            <q-form @submit.prevent="handleSubmitChangePassword()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <div class="flex items-center">
                  <q-btn icon="close" flat round @click="closePasswordModal()" />

                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('personal.change_password') }}
                  </h6>
                </div>

                <div class="d-inline-block float-right">
                  <q-btn
                    @click="closePasswordModal"
                    class="mr-50 rounded-50 bg-white"
                    color="danger"
                    no-caps
                    outline
                    >{{ $t('general.cancel') }}</q-btn
                  >
                  <q-btn
                    type="submit"
                    class="rounded-50"
                    color="primary"
                    no-caps
                    unelevated
                    :disabled="!isValidToSendPassword"
                    >{{ $t('general.save') }}</q-btn
                  >
                </div>
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row mt-1">
                  <div class="col-12 px-0">
                    <div style="position: relative">
                      <div class="form-group">
                        <label class="form-label"
                          >{{ $t('personal.current_password') }} *</label
                        >
                        <input
                          :class="
                            oldPasswordError
                              ? 'form-control error'
                              : 'form-control'
                          "
                          v-model="form.pw.oldPassword"
                          :type="oldPasswordType"
                          @change="validateOldPassword"
                          :placeholder="$t('personal.enter_current_password')"
                        />
                        <span class="error" v-if="oldPasswordError">{{
                          oldPasswordError
                        }}</span>
                      </div>
                      <q-btn
                        style="position: absolute; top: 33px; right: 3%"
                        round
                        dense
                        flat
                        :icon="visibilityOldIcon"
                        @click="showOldPass"
                      />
                    </div>

                    <div style="position: relative">
                      <div class="form-group">
                        <label class="form-label"
                          >{{ $t('personal.new_password') }} *</label
                        >
                        <input
                          :class="
                            passwordError
                              ? 'form-control error'
                              : 'form-control'
                          "
                          v-model="form.pw.password"
                          :type="passwordType"
                          @change="validatePassword"
                          :placeholder="$t('personal.enter_new_password')"
                        />
                        <span class="error" v-if="passwordError">{{
                          passwordError
                        }}</span>
                      </div>
                      <q-btn
                        style="position: absolute; top: 33px; right: 3%"
                        round
                        dense
                        flat
                        :icon="visibilityIcon"
                        @click="showPass"
                      />
                    </div>

                    <div style="position: relative">
                      <div class="form-group">
                        <label class="form-label"
                          >{{ $t('personal.confirm_new_password') }} *</label
                        >
                        <input
                          :class="
                            confirmPasswordError
                              ? 'form-control error'
                              : 'form-control'
                          "
                          v-model="form.pw.confirmPassword"
                          :type="confirmPasswordType"
                          @change="validateConfirmPassword"
                          :placeholder="
                            $t('personal.enter_confirm_new_password')
                          "
                        />
                        <span class="error" v-if="confirmPasswordError">{{
                          confirmPasswordError
                        }}</span>
                      </div>
                      <q-btn
                        style="position: absolute; top: 33px; right: 3%"
                        round
                        dense
                        flat
                        :icon="visibilityConfirmIcon"
                        @click="showConfirmPass"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-form>
          </q-card>
        </q-dialog>
        <q-popup-proxy
          v-model="showCropper"
          anchor="center middle"
          self="center left"
          transition-show="scale"
          transition-hide="scale"
          target="#display-area"
          style="width: 300px"
        >
          <image-cropper
            v-on:destroy="handleSubmitAvatar"
            :imageSrc="imageSrc"
          />
        </q-popup-proxy>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/accountInformation.js"></script>
