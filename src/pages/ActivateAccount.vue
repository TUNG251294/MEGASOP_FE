<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0">
      <a href="javascript:void(0);" class="brand-logo">
        <img src="../assets/Logo_Megasop_Text.png" />
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
          <h4 class="card-title mb-1 text-bold">Verify your email ✉️</h4>
          <p class="card-text mb-2">
            A password change request has been sent to your email address:
            <b>hello@pixinvent.com </b>
          </p>
          <p class="card-text mb-2">
            Please follow the instruction inside to continue.
          </p>
          <q-form class="auth-forgot-password-form mt-2" @submit="onSubmit">
            <button
              class="btn btn-primary btn-block"
              tabindex="2"
              type="submit"
            >
              Resend
              <p class="float-right">30</p>
            </button>
          </q-form>
          <p class="text-center mt-2">
            <a href="/"><q-icon name="chevron_left" /> Back to login</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    onSubmit: function () {
      var self = this
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
