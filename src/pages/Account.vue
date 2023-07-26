<template>
  <q-page class="flex">
    <div class="content-wrapper w-100" style="margin-bottom: 127px">
      <!-- Header  -->
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('account.company_profile_bill') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>

                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('account.company_profile_bill')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <!-- Body  -->
      <div class="content-body">
        <!-- Row 1  -->
        <!-- <div class="row mx-n1">
          <div class="col-12">
            <div class="navigate d-flex items-center" style="gap: 20px">
              <span>
                <q-icon class="mr-50" size="20px" name="perm_identity" />
                {{ $t('account.company_profile') }}
              </span>
              <q-btn
                no-caps
                clickable
                unelevated
                color="primary"
                class="rounded-1"
              >
                <img src="../assets/Flag.svg" class="mr-50" />
                {{ $t('account.package_and_payment') }}
              </q-btn>
            </div>
          </div>
        </div> -->
        <!-- Row 2  -->

        <div v-if="isActive" class="row mt-0 mx-n50">
          <div class="col-4 d-flex px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body px-0 py-75">
                <div class="row">
                  <div class="col-7">
                    <p class="float-left text-bold" style="margin-top: 0.3rem">
                      {{ $t('account.representative_profile') }}
                    </p>
                  </div>
                  <div class="col-5 pl-0">
                    <button
                      v-if="isAdmin"
                      @click="onDetail(1)"
                      class="btn-edit float-right"
                    >
                      <q-icon name="edit_calendar" size="20px" class="mr-50" />
                      {{ $t('general.edit') }}
                    </button>
                  </div>
                </div>
                <q-separator
                  style="margin-top: 3px"
                  size="1px"
                  class="text-dark w-100 mb-1"
                />

                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">
                        {{ $t('account.full_name') }}</label
                      >
                      <p class="m-0">{{ form.data?.representative }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.country')
                      }}</label>
                      <p class="m-0">{{ form.dataUpdate.nation }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.phone_number')
                      }}</label>
                      <p class="m-0">{{ form.data?.representative_tel }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.personal_email')
                      }}</label>
                      <p class="m-0">{{ form.data?.representative_email }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-4 d-flex px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body px-0 py-75">
                <div class="row">
                  <div class="col-7">
                    <p class="float-left text-bold" style="margin-top: 0.3rem">
                      {{ $t('account.company_profile') }}
                    </p>
                  </div>
                  <div class="col-5 pl-0">
                    <button
                      v-if="isAdmin"
                      class="btn-edit float-right"
                      @click="onDetail(2)"
                    >
                      <q-icon name="edit_calendar" size="20px" class="mr-50" />
                      {{ $t('general.edit') }}
                    </button>
                  </div>
                </div>
                <q-separator
                  style="margin-top: 3px"
                  size="1px"
                  class="text-dark w-100 mb-1"
                />

                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.company_name')
                      }}</label>
                      <p class="m-0">{{ form.data?.fullname }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.website')
                      }}</label>
                      <p class="m-0">{{ form.data?.website }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.career')
                      }}</label>
                      <p class="m-0">{{ $t(`industries[${form.data?.industry_id}]`) }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.email_login')
                      }}</label>
                      <p class="m-0">{{ form.data?.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.retailer_link')
                      }}</label>
                      <p class="m-0">{{ form.data?.retailer_url }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.user_link')
                      }}</label>
                      <p class="m-0">{{ form.data?.consumer_url }}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.language')
                      }}</label>
                      <p class="m-0">{{ form.data.lang }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-4 d-flex px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body px-0 py-75">
                <div class="row">
                  <div class="col-7">
                    <p class="float-left text-bold" style="margin-top: 0.3rem">
                      {{ $t('account.organization_size') }}
                    </p>
                  </div>
                  <div class="col-5 pl-0">
                    <button
                      v-if="isAdmin"
                      class="btn-edit float-right"
                      @click="onDetail(3)"
                    >
                      <q-icon name="edit_calendar" size="20px" class="mr-50" />
                      {{ $t('general.edit') }}
                    </button>
                  </div>
                </div>
                <q-separator
                  style="margin-top: 3px"
                  size="1px"
                  class="text-dark w-100 mb-1"
                />

                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.monthly_order')
                      }}</label>
                      <p class="m-0">{{ form.data?.organization?.ordered_number}}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.number_of_salesman')
                      }}</label>
                      <p class="m-0">{{ form.data?.organization?.salesman_number}}</p>
                      
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.number_of_distributors')
                      }}</label>
                      <p class="m-0">{{ form.data?.organization?.distributor_number}}</p>
                    </div>
                  </div>
                </div>
                <div class="row my-75">
                  <div class="col-12">
                    <div class="form-group">
                      <label class="form-label">{{
                        $t('account.number_of_retailers')
                      }}</label>
                      <p class="m-0">{{ form.data?.organization?.retailer_number}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- dialog-info  -->
        <q-dialog v-model="modal" position="right" persistent full-height maximized>
          <q-card style="min-width: 505px">
            <!-- form  -->
            <q-form @submit.prevent="handleSubmit()">
              <q-card-section
                class="row items-center q-pb-none justify-content-between"
              >
                <q-btn icon="close" flat round v-close-popup @click="closeDialog" />

                <h5 v-if="edit === 1" class="text-weight-bolder mb-0">
                  {{ $t('account.representative_profile') }}
                </h5>
                <h5 v-else-if="edit === 2" class="text-weight-bolder mb-0">
                  {{ $t('account.company_profile') }}
                </h5>
                <h5 v-else class="text-weight-bolder mb-0">
                  {{ $t('account.organization_size_information') }}
                </h5>

                <div class="d-inline-block float-right q-ml-sm">
                  <q-btn
                    @click="closeDialog"
                    class="rounded-50 mr-50 "
                    :label="$t('general.cancel')"
                    color="danger"
                    outline
                    unelevated
                    no-caps
                  />
                  <q-btn
                    type="submit"
                    class="rounded-50"
                    :label="$t('general.save')"
                    color="primary"
                    unelevated
                    no-caps
                    :disabled="!isValidToSend"
                  />
                </div>
                <q-separator size="1px" class="text-dark w-100 mt-1" />
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div class="row mt-1">
                  <div class="col-12 px-0">
                    <!-- input_1 -->
                    <div v-if="edit === 1" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.full_name') }} *
                      </label>
                      <input
                        :class="
                          personalNameError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.personalName"
                        tabindex="1"
                        @change="validatePersonalNameError"
                      />
                      <span class="error" v-if="personalNameError">{{
                        personalNameError
                      }}</span>
                    </div>
                    <div v-else-if="edit === 2" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.company_name') }} *
                      </label>
                      <input
                        :class="
                          companyNameInfError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.companyName"
                        tabindex="1"
                        @change="validateCompanyNameError"
                      />
                      <span class="error" v-if="companyNameInfError">{{
                        companyNameInfError
                      }}</span>
                    </div>
                    <div v-else class="form-group">
                      <label class="form-label"
                        >{{ $t('account.monthly_order') }} *</label
                      >
                      <input
                        :class="
                          orderNumError ? 'form-control error' : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.orderNum"
                        tabindex="1"
                        @change="validateOrderNumError"
                      />
                      <span class="error" v-if="orderNumError">{{
                        orderNumError
                      }}</span>
                    </div>
                    <!-- input_2 -->
                    <div v-if="edit === 1" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.country') }} *
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        v-model="form.dataUpdate.nation"
                        tabindex="1"
                        disabled
                      />
                    </div>
                    <div v-else-if="edit === 2" class="form-group">
                      <label class="form-label">{{
                        $t('account.website')
                      }}</label>
                      <input
                        :class="
                          websiteError ? 'form-control error ' : 'form-control '
                        "
                        type="text"
                        v-model="form.dataUpdate.website"
                        tabindex="1"
                        @change="validateCompanyLink"
                      />
                      <span class="error" v-if="websiteError">{{
                        websiteError
                      }}</span>
                    </div>
                    <div v-else class="form-group">
                      <label class="form-label"
                        >{{ $t('account.number_of_salesman') }} *</label
                      >
                      <input
                        :class="
                          salemanError ? 'form-control error' : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.salemenNum"
                        tabindex="1"
                        @change="validateSalemenNumError"
                      />
                      <span class="error" v-if="salemanError">{{
                        salemanError
                      }}</span>
                    </div>
                    <!-- input_3 -->
                    <div v-if="edit === 1" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.phone_number') }} *
                      </label>
                      <input
                        :class="
                          mobileError ? 'form-control error' : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.mobile"
                        tabindex="1"
                        @change="validateMobileError"
                      />
                      <span class="error" v-if="mobileError">{{
                        mobileError
                      }}</span>
                    </div>
                    <div v-else-if="edit === 2" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.career') }} *</label
                      >
                      <select
                        :class="
                          industryError
                            ? 'custom-select error'
                            : 'custom-select'
                        "
                        v-model="form.dataUpdate.industryId"
                      >
                        <option
                          v-for="item in industriesI18n"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                        <!-- <option selected="selected">
                          {{ industryI18n }}
                        </option> -->
                      </select>
                      <!-- <span class="error" v-if="industryError">{{
                        industryError
                      }}</span> -->
                    </div>
                    <div v-else class="form-group">
                      <label class="form-label"
                        >{{ $t('account.number_of_distributors') }} *</label
                      >
                      <input
                        :class="
                          distributorError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.distributorNum"
                        tabindex="1"
                        @change="validateDistributorNumError"
                      />
                      <span class="error" v-if="distributorError">{{
                        distributorError
                      }}</span>
                    </div>
                    <!-- input_4 -->
                    <div v-if="edit === 1" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.personal_email') }} *
                      </label>
                      <input
                        :class="
                          personalEmailError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.personalEmail"
                        tabindex="1"
                        @change="validatePersonalEmailError"
                      />
                      <span class="error" v-if="personalEmailError">{{
                        personalEmailError
                      }}</span>
                    </div>
                    <div v-else-if="edit === 2" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.email_login') }} *
                      </label>
                      <input
                        :class="
                          emailLoginError
                            ? 'form-control error'
                            : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.emailLogin"
                        tabindex="1"
                        disabled
                      />
                      <span class="error" v-if="emailLoginError">{{
                        emailLoginError
                      }}</span>
                    </div>
                    <div v-else class="form-group">
                      <label class="form-label"
                        >{{ $t('account.number_of_retailers') }} *</label
                      >
                      <input
                        :class="
                          retailerError ? 'form-control error' : 'form-control'
                        "
                        type="text"
                        v-model="form.dataUpdate.retailerNum"
                        tabindex="1"
                        @change="validateRetailerNumError"
                      />
                      <span class="error" v-if="retailerError">{{
                        retailerError
                      }}</span>
                    </div>
                    <!-- input_5 -->
                    <div v-if="edit === 2" class="form-group">
                      <label class="form-label"
                        >{{ $t('account.language') }} *
                      </label>
                      <select class="custom-select" v-model="form.dataUpdate.langId">
                        <option
                          v-for="lang in languages"
                          :key="lang?.code"
                          :value="lang?.code"
                        >
                          {{ lang?.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/account.js"></script>
