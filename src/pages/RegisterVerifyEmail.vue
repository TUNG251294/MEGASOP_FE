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
            src="../assets/verify-email.svg"
            alt="Verify email"
          />
        </div>
      </div>

      <div class="d-flex col-lg-5 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1 text-bold">
            {{ $t('thankYou.thank_you_for_the_information') }}
          </h4>
          <p class="card-text mb-2">
            {{ $t('thankYou.please_check_email') }}
          </p>
          <p class="card-text mb-2">
            {{ $t('thankYou.read_information') }}
            <a
              href="https://megasop.com"
              target="_blank"
              rel="noopener noreferrer"
              >https://megasop.com</a
            >.
          </p>
          <p class="card-text mb-2">
            {{ $t('thankYou.contact_number_text') }} <b>0931 58 18 81</b>.
          </p>
          <!-- <q-form class="auth-forgot-password-form mt-2" @submit="onSubmit">
            <button
              class="btn btn-primary btn-block"
              tabindex="2"
              type="submit"
              :disabled="timeCount > 0"
            >
              Gửi lại
              <p class="float-right">{{ timeCount }}</p>
            </button>
          </q-form> -->
          <p class="text-center mt-2">
            <a href="/"
              ><q-icon name="chevron_left" />
              {{ $t('thankYou.back_to_login') }}</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LocalStorage } from 'quasar'
import images from 'src/assets'
export default {
  components: {},
  data() {
    return {
      images,
      timeCount: 30,
      email: ''
    }
  },
  created: function () {
    // this.countDownTimer();
  },
  mounted: function () {
    // this.getEmail();
  },
  methods: {
    getEmail: function () {
      let email = LocalStorage.getItem('ua_e_t')
      if (email == null || email == '') {
        this.$router.push('/')
        return
      }
      this.email = email
    },
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
      this.countDownTimer()
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
