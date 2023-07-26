<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0 wrap-login">
      <!-- href="javascript:void(0);" -->
      <a href="https://megasop.com" class="brand-logo">
        <img :src="images.iconLogoMegasop" />
      </a>

      <div class="d-none d-lg-flex col-lg-4 register"></div>
      <div class="d-flex col-lg-8 align-items-center auth-bg px-5 pt-1 pb-1">
        <div
          class="mt-custom-5 mb-custom-5 col-12 col-sm-10 col-md-10 col-lg-12 px-xl-2 mx-auto"
        >
          <div class="row pb-2 mt-custom-2">
            <div :class="step == 1 ? 'col-custom' : 'col-custom-1'">
              <div class="d-flex align-items-center">
                <div
                  :class="step == 1 ? 'text-white bg-primary' : 'bg-custom'"
                  style="border-radius: 6px"
                >
                  <q-icon name="person_outline" size="18px" class="p-05" />
                </div>
                <div class="ml-50">
                  <p
                    :class="
                      step == 1
                        ? 'mb-0 text-primary text-bold'
                        : 'mb-0 text-bold'
                    "
                  >
                    {{ $t('register.personal') }}
                  </p>
                  <label class="mb-0">{{
                    $t('register.company_representative')
                  }}</label>
                </div>
              </div>
            </div>
            <q-icon
              name="chevron_right"
              size="18px"
              class="p-05 ml-2 mr-2 col-custom-1"
            />
            <div :class="step == 2 ? 'col-custom' : 'col-custom-1'">
              <div class="d-flex align-items-center">
                <div
                  :class="step == 2 ? 'text-white bg-primary' : 'bg-custom'"
                  style="border-radius: 6px"
                >
                  <q-icon name="home" size="18px" class="p-05" />
                </div>
                <div class="ml-50">
                  <p
                    :class="
                      step == 2
                        ? 'mb-0 text-primary text-bold'
                        : 'mb-0 text-bold'
                    "
                  >
                    {{ $t('register.company') }}
                  </p>
                  <label class="mb-0">{{
                    $t('register.details_and_scale')
                  }}</label>
                </div>
              </div>
            </div>
          </div>
          <q-form @submit.prevent="submit()">
            <div :class="step == 1 ? 'personal' : 'd-none'">
              <h2 class="text-bold mt-2">{{ $t('register.personal_info') }}</h2>
              <p class="mt-1 mb-1">
                {{ $t('register.company_representative') }}
              </p>
              <div class="form-group">
                <label class="form-label" for="company-name"
                  >{{ $t('register.full_name') }} *</label
                >
                <input
                  :class="errorFullname ? 'form-control error' : 'form-control'"
                  id="fullname"
                  type="text"
                  name="fullname"
                  :placeholder="$t('register.enter_full_name')"
                  autofocus=""
                  tabindex="10"
                  v-model="form.personal.fullname"
                  @change="validateFullname()"
                />
                <span class="error" v-if="errorFullname">
                  {{ errorFullname }}
                </span>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                  <div class="form-group">
                    <label class="form-label"
                      >{{ $t('register.country') }} *</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      placeholder="100*"
                      autofocus=""
                      tabindex="11"
                      v-model="form.personal.country"
                      disabled
                    />
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                  <div class="form-group">
                    <label class="form-label" for="mobile"
                      >{{ $t('register.phone') }} *</label
                    >
                    <input
                      :class="
                        errorMobile ? 'form-control error' : 'form-control'
                      "
                      type="text"
                      :placeholder="$t('register.enter_phone')"
                      autofocus=""
                      tabindex="12"
                      v-model="form.personal.mobile"
                      @change="validateMobile()"
                    />
                    <span class="error" v-if="errorMobile">
                      {{ errorMobile }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group mb-3">
                <label class="form-label" for="person-email"
                  >{{ $t('register.email') }} *</label
                >
                <input
                  :class="
                    errorPersonalEmail ? 'form-control error' : 'form-control'
                  "
                  id="personalEmail"
                  type="email"
                  name="personalEmail"
                  :placeholder="$t('register.enter_email')"
                  autocomplete="username"
                  autofocus=""
                  tabindex="13"
                  v-model="form.personal.email"
                  @change="validateEmail('p')"
                />
                <span class="error" v-if="errorPersonalEmail">
                  {{ errorPersonalEmail }}
                </span>
              </div>
              <div
                class="form-group"
                style="margin-right: -1rem; margin-left: -1rem"
              >
                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-checkbox tabindex="14" v-model="accept" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label style="margin-top: 0.4rem"
                      >{{ $t('register.submit') }}
                      <label class="text-primary"
                        >{{ $t('register.terms') }} &amp;
                        {{ $t('register.conditions') }}
                      </label>
                      {{ $t('register.ipi') }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </div>
              <div class="form-group mt-2">
                <button
                  class="btn btn-outline-primary float-left"
                  type="button"
                  @click="goToLogin()"
                >
                  <q-icon name="chevron_left" size="sm" /><label
                    class="d-none-custom"
                    >{{ $t('register.login') }}</label
                  >
                </button>
                <!-- check it  -->
                <button
                  class="btn btn-primary float-right"
                  type="button"
                  :disabled="!isValidToContinue"
                  @click="next"
                  tabindex="15"
                >
                  <label class="d-none-custom">{{
                    $t('register.continue')
                  }}</label>
                  <q-icon name="chevron_right" size="sm" />
                </button>
              </div>
            </div>
            <div :class="step == 2 ? 'company' : 'd-none'">
              <h2 class="text-bold mt-2" style="font-size: 20px">
                {{ $t('register.company_info') }}
              </h2>
              <p class="mt-1">{{ $t('register.contact_and_login') }}</p>
              <div class="form-group">
                <label class="form-label" for="company-name"
                  >{{ $t('register.company_name') }} *</label
                >
                <input
                  :class="
                    errorCompanyName ? 'form-control error' : 'form-control'
                  "
                  id="company-name"
                  type="text"
                  name="company-name"
                  :placeholder="$t('register.enter_company_name')"
                  autofocus=""
                  tabindex="1"
                  v-model="form.company.companyName"
                  @change="validateCompanyName()"
                />
                <span class="error" v-if="errorCompanyName">
                  {{ errorCompanyName }}
                </span>
              </div>
              <div class="form-group">
                <label class="form-label" for="company-link"
                  >{{ $t('register.company_website_address') }}
                </label>
                <input
                  :class="
                    errorCompanyLink ? 'form-control error' : 'form-control'
                  "
                  id="company-link"
                  type="text"
                  name="company-link"
                  placeholder="https://"
                  autofocus=""
                  tabindex="2"
                  v-model="form.company.companyLink"
                  @change="validateCompanyLink"
                />
                <span class="error" v-if="errorCompanyLink">
                  {{ errorCompanyLink }}
                </span>
              </div>
              <div class="form-group">
                <label class="form-label" for="industry"
                  >{{ $t('register.branch') }} *</label
                >
                <select
                  :class="
                    errorIndustry ? 'custom-select error' : 'custom-select'
                  "
                  tabindex="3"
                  v-model="form.company.industry"
                  @change="validateIndustry()"
                >
                  <option selected value="0">
                    {{ $t('register.select_branch') }}
                  </option>
                  <option
                    v-for="item in industriesI18n"
                    :key="item.id"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <span class="error" v-if="errorIndustry">
                  {{ errorIndustry }}
                </span>
              </div>
              <div class="form-group">
                <label class="form-label" for="email">{{
                  $t('register.email_login')
                }}</label>
                <input
                  :class="
                    errorCompanyEmail ? 'form-control error' : 'form-control'
                  "
                  id="email"
                  type="email"
                  name="email"
                  autocomplete="username"
                  placeholder="johndoe@gmail.com"
                  autofocus=""
                  tabindex="4"
                  v-model="form.company.email"
                  @change="validateEmail('c')"
                />
                <span class="error" v-if="errorCompanyEmail">
                  {{ errorCompanyEmail }}
                </span>
              </div>
              <p class="mt-1 mb-1">{{ $t('register.scale_organizations') }}</p>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                  <div class="form-group">
                    <label class="form-label" for="noOrders"
                      >{{ $t('register.average_order') }} *</label
                    >
                    <input
                      :class="
                        errorNoOrders ? 'form-control error' : 'form-control'
                      "
                      type="text"
                      placeholder="100*"
                      autofocus=""
                      tabindex="6"
                      v-model="form.company.noOrders"
                      :onkeypress="validateNo('o')"
                    />
                    <span class="error" v-if="errorNoOrders">
                      {{ errorNoOrders }}
                    </span>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                  <div class="form-group">
                    <label class="form-label" for="noSalesmen"
                      >{{ $t('register.number_of_salesman') }} *</label
                    >
                    <input
                      :class="
                        errorNoSalesmen ? 'form-control error' : 'form-control'
                      "
                      type="text"
                      placeholder="100*"
                      autofocus=""
                      tabindex="7"
                      v-model="form.company.noSalesmen"
                      :onkeypress="validateNo('s')"
                    />
                    <span class="error" v-if="errorNoSalesmen">
                      {{ errorNoSalesmen }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                  <div class="form-group">
                    <label class="form-label" for="noDistributors"
                      >{{ $t('register.number_of_distributors') }} *</label
                    >
                    <input
                      :class="
                        errorNoDistributors
                          ? 'form-control error'
                          : 'form-control'
                      "
                      type="text"
                      placeholder="100*"
                      autofocus=""
                      tabindex="8"
                      v-model="form.company.noDistributors"
                      :onkeypress="validateNo('d')"
                    />
                    <span class="error" v-if="errorNoDistributors">
                      {{ errorNoDistributors }}
                    </span>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                  <div class="form-group">
                    <label class="form-label" for="noRetailers"
                      >{{ $t('register.number_of_retailers') }} *</label
                    >
                    <input
                      :class="
                        errorNoRetailers ? 'form-control error' : 'form-control'
                      "
                      type="text"
                      placeholder="100*"
                      autofocus=""
                      tabindex="9"
                      v-model="form.company.noRetailers"
                      :onkeypress="validateNo('r')"
                    />
                    <span class="error" v-if="errorNoRetailers">
                      {{ errorNoRetailers }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group mt-1">
                <!-- check it  -->
                <button
                  class="btn btn-outline-primary float-left"
                  type="button"
                  @click="previous"
                >
                  <q-icon name="chevron_left" size="sm" /><label
                    class="d-none-custom"
                    >{{ $t('register.back') }}</label
                  >
                </button>
                <q-btn
                  color="primary"
                  class="btn float-right"
                  :label="$t('register.sent')"
                  no-caps
                  clickable
                  icon-right="chevron_right"
                  type="submit"
                  :disabled="!isValidToSend"
                />
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/register.js"></script>
