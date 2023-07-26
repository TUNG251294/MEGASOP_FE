<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0 wrap-login">
      <a href="javascript:void(0);" class="brand-logo">
        <img :src="images.iconLogoMegasop" />
      </a>
      <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <img
            class="img-fluid"
            src="../assets/reset-password-v2.svg"
            alt="Reset password"
          />
        </div>
      </div>

      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1 text-bold">
            {{ $t('resetPassword.change_password_title') }} 🔐
          </h4>
          <p class="card-text mb-2">
            {{ $t('resetPassword.new_password_different_old_password') }}
          </p>
          <p class="text-danger" v-if="error">{{ error }}</p>
          <q-form class="auth-forgot-password-form mt-2" @submit="onSubmit">
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="reset-password-new">{{
                  $t('resetPassword.new_password')
                }}</label>
              </div>
              <div class="input-group input-group-merge form-password-toggle">
                <input
                  :class="
                    errorPassword
                      ? 'form-control form-control-merge error'
                      : 'form-control form-control-merge'
                  "
                  id="reset-password-new"
                  type="password"
                  name="reset-password-new"
                  placeholder="············"
                  aria-describedby="reset-password-new"
                  autofocus=""
                  tabindex="1"
                  v-model="password"
                  v-if="!showPassword"
                  @change="validatePassword()"
                />
                <input
                  :class="
                    errorPassword
                      ? 'form-control form-control-merge error'
                      : 'form-control form-control-merge'
                  "
                  id="reset-password-new"
                  type="text"
                  name="reset-password-new"
                  placeholder="············"
                  aria-describedby="reset-password-new"
                  autofocus=""
                  tabindex="1"
                  v-model="password"
                  v-if="showPassword"
                  @change="validatePassword()"
                />
                <div class="input-group-append">
                  <span class="input-group-text cursor-pointer"
                    ><q-icon
                      name="visibility"
                      @click="showPass"
                      v-if="!showPassword" /><q-icon
                      name="visibility_off"
                      @click="showPass"
                      v-if="showPassword"
                  /></span>
                </div>
              </div>
              <span id="pass-error" class="error" v-if="errorPassword">{{
                errorPassword
              }}</span>
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="reset-password-confirm">{{
                  $t('resetPassword.confirm_new_password')
                }}</label>
              </div>
              <div class="input-group input-group-merge form-password-toggle">
                <input
                  :class="
                    errorConfirmPassword
                      ? 'form-control form-control-merge error'
                      : 'form-control form-control-merge'
                  "
                  id="reset-password-confirm"
                  type="password"
                  name="reset-password-confirm"
                  placeholder="············"
                  aria-describedby="reset-password-confirm"
                  tabindex="2"
                  v-model="confirmPassword"
                  v-if="!showConfirmPassword"
                  @change="validateConfirmPassword()"
                />
                <input
                  :class="
                    errorConfirmPassword
                      ? 'form-control form-control-merge error'
                      : 'form-control form-control-merge'
                  "
                  id="reset-password-confirm"
                  type="text"
                  name="reset-password-confirm"
                  placeholder="············"
                  aria-describedby="reset-password-confirm"
                  tabindex="2"
                  v-model="confirmPassword"
                  v-if="showConfirmPassword"
                  @change="validateConfirmPassword()"
                />
                <div class="input-group-append">
                  <span class="input-group-text cursor-pointer"
                    ><q-icon
                      name="visibility"
                      @click="showConfirmPass"
                      v-if="!showConfirmPassword" /><q-icon
                      name="visibility_off"
                      @click="showConfirmPass"
                      v-if="showConfirmPassword"
                  /></span>
                </div>
              </div>
              <span
                id="confirm-pass-error"
                class="error"
                v-if="errorConfirmPassword"
                >{{ errorConfirmPassword }}</span
              >
            </div>
            <button
              class="btn btn-primary btn-block"
              tabindex="3"
              :disabled="!isValidToSend || progress"
            >
              {{ $t('resetPassword.set_new_password') }}
            </button>
          </q-form>
          <p class="text-center mt-2">
            <a href="/"
              ><q-icon name="chevron_left" />
              {{ $t('resetPassword.back_to_login') }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import { Notify } from 'quasar'
import images from 'src/assets'

export default {
  components: {},
  data() {
    return {
      images,
      showPassword: false,
      showConfirmPassword: false,
      errorConfirmPassword: '',
      errorPassword: '',
      password: '',
      confirmPassword: '',
      key: null,
      error: '',
      progress: false
    }
  },
  created: function () {
    this.key = this.$route.params.key
    axiosInstance
      .get('/reset-password/check?reset_password_key=' + this.key)
      .catch(() => {
        this.$router.push('/')
      })
  },
  mounted: function () {},
  computed: {
    isValidComfirmPassword: function () {
      return this.confirmPassword == this.password
    },
    isValidPassword: function () {
      return this.password.trim().length >= 8
    },
    isValidToSend: function () {
      return this.isValidPassword && this.isValidComfirmPassword
    }
  },
  methods: {
    showPass: function () {
      this.showPassword = !this.showPassword
    },
    showConfirmPass: function () {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    validatePassword: function () {
      var self = this
      if (!self.isValidPassword) {
        self.errorPassword = this.$t('resetPassword.more_than_eight_character')
        return
      }
      self.errorPassword = ''
    },
    validateConfirmPassword: function () {
      var self = this
      if (!self.isValidComfirmPassword) {
        self.errorConfirmPassword = this.$t(
          'resetPassword.please_confirm_password'
        )
        return
      }
      self.errorConfirmPassword = ''
    },
    onSubmit: function () {
      var self = this
      let inputData = {}
      inputData['reset_password_key'] = self.key
      inputData['new_password'] = self.password
      self.progress = true
      axiosInstance
        .post('/reset-password', inputData)
        .then(() => {
          self.progress = false
          Notify.create({
            message: this.$t('resetPassword.update_password_success'),
            type: 'positive',
            position: 'top'
          })
          self.$router.push('/')
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: this.$t('resetPassword.update_password_fail'),
            type: 'negative',
            position: 'top'
          })
        })
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
