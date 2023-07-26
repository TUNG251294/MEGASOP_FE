<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0 wrap-login">
      <a href="javascript:void(0);" class="brand-logo">
        <img :src="images.iconLogoMegasop" />
      </a>
      <div class="d-none d-lg-flex col-lg-7 align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <img
            class="img-fluid"
            src="../assets/forgot-password-v2.svg"
            alt="Forgot password"
          />
        </div>
      </div>

      <div class="d-flex col-lg-5 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1 text-bold size24">
            {{ $t('forgot_pass.forgot_password') }} 🔑
          </h4>
          <p class="card-text mb-2">
            {{ $t('forgot_pass.introduce') }}
          </p>
          <p class="text-danger" v-if="error">{{ error }}</p>
          <q-form class="auth-forgot-password-form mt-2" @submit="onSubmit">
            <div class="form-group">
              <label class="form-label" for="forgot-password-email">
                {{ $t('forgot_pass.email') }}</label
              >
              <input
                :class="emailError ? 'form-control error' : 'form-control'"
                id="forgot-password-email"
                type="text"
                name="forgot-password-email"
                placeholder="john@example.com"
                aria-describedby="forgot-password-email"
                autofocus=""
                tabindex="1"
                v-model="email"
                @change="validateEmail"
                autocomplete="username"
              />
              <span id="login-email-error" class="error" v-if="emailError">{{
                emailError
              }}</span>
            </div>
            <button
              class="btn btn-primary btn-block"
              tabindex="2"
              :disabled="!isValidEmail || progress"
              type="submit"
            >
              {{ $t('forgot_pass.sent') }}
            </button>
          </q-form>
          <p class="text-center mt-2">
            <a href="/"
              ><q-icon name="chevron_left" />{{ $t('forgot_pass.back') }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import images from 'src/assets'

export default {
  components: {},
  data() {
    return {
      images,
      email: ref(''),
      error: ref(''),
      emailError: ref(''),
      progress: false
    }
  },
  computed: {
    isValidEmail() {
      if (this.email.trim().length == 0) {
        return false
      }
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.email)
    }
  },
  methods: {
    validateEmail: function () {
      var self = this
      if (self.email.trim().length == 0) {
        self.emailError = self.$t('forgot_pass.please_enter_email')
        return
      }

      if (!self.isValidEmail) {
        self.emailError = self.$t('forgot_pass.email_incorrect')
        return
      }

      self.emailError = ''
    },

    onSubmit: function () {
      var self = this
      if (!self.isValidEmail) {
        self.error = self.$t('forgot_pass.email_incorrect')
        return
      }
      self.error = ''
      let inputData = {}
      inputData['account_type'] = 'CUSTOMER'
      inputData['email'] = self.email
      self.progress = true
      axiosInstance
        .post('/forgot-password', inputData)
        .then(() => {
          self.progress = false
          LocalStorage.set('ac_m_p', self.email)
          self.$router.push('/verify-email')
        })
        .catch(error => {
          self.progress = false
          if (error.response.data.errors[0].code == '2022') {
            Notify.create({
              message: self.$t('forgot_pass.email_exists'),
              type: 'negative',
              position: 'top'
            })
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
