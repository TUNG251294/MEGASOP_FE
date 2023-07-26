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
            src="../assets/verify-email.svg"
            alt="Verify email"
          />
        </div>
      </div>

      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1 text-bold">
            {{ $t('verify.confirm_your_email_address') }} ✉️
          </h4>
          <p class="card-text mb-2">
            {{ $t('verify.account_activation_link_has_been_sent') }}:
            <b>{{ email }}</b>
          </p>
          <p class="card-text mb-2">
            {{ $t('verify.please_click') }}
          </p>
          <q-form class="auth-forgot-password-form mt-2" @submit="onSubmit">
            <button
              class="btn btn-primary btn-block"
              tabindex="2"
              type="submit"
              :disabled="timeCount > 0"
            >
              {{ $t('verify.resend') }}
              <p class="float-right">{{ timeCount }}</p>
            </button>
          </q-form>
          <p class="text-center mt-2">
            <a href="/"
              ><q-icon name="chevron_left" />
              {{ $t('verify.back_to_login') }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import { axiosInstance } from 'boot/axios'
import images from 'src/assets'
export default {
  components: {},
  data() {
    return {
      images,
      timeCount: 10,
      email: LocalStorage.getItem('ac_m_p')
    }
  },
  created: function () {
    this.countDownTimer()
  },
  computed: {},
  methods: {
    countDownTimer: function () {
      if (this.timeCount > 0) {
        setTimeout(() => {
          this.timeCount--
          this.countDownTimer()
        }, 1000)
      }
    },
    onSubmit: function () {
      this.timeCount = 30
      let inputData = {}
      inputData['account_type'] = 'CUSTOMER'
      inputData['email'] = this.email

      axiosInstance
        .post('/forgot-password', inputData)
        .then(() => {
          this.countDownTimer()
        })
        .catch(error => {
          if (error.response.data.errors[0].code == '2022') {
            Notify.create({
              message: this.$t('verify.not_found_email_message'),
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
