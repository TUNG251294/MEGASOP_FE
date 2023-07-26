<style lang="scss">
@import 'src/css/vue/pages/page-auth.scss';
</style>
<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0 ml-2 wrap-login">
      <a href="https://megasop.com" class="brand-logo">
        <img :src="images.iconLogoMegasop" style="w-100" />
      </a>
      <div class="d-none d-lg-flex col-lg-7 align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <img class="img-fluid" src="../assets/login-v2.svg" alt="Login" />
        </div>
      </div>
      <div class="d-flex col-lg-5 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h2 class="card-title text-bold mb-1 size24">
            {{ $t('login.welcome') }} 👋🏻
          </h2>
          <p class="card-text mb-2 size14">
            {{ $t('login.login_to_start') }}
          </p>
          <p class="text-danger" v-if="error">{{ error }}</p>
          <q-form class="auth-login-form mt-2" @submit="onSubmit">
            <div class="form-group">
              <label class="form-label" for="login-email">{{
                $t('login.email')
              }}</label>
              <input
                :class="emailError ? 'form-control error' : 'form-control'"
                id="login-email"
                type="text"
                name="login-email"
                placeholder="john@example.com"
                aria-describedby="login-email"
                autofocus=""
                tabindex="1"
                v-model="form.loginName"
                autocomplete="username"
                @change="validateEmail"
              />
              <span id="login-email-error" class="error" v-if="emailError">{{
                emailError
              }}</span>
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="login-password">{{ $t('login.password') }}</label
                ><label
                  ><a href="/forgot-password">{{
                    $t('login.forgot_password')
                  }}</a></label
                >
              </div>
              <div class="passwordWrapper">
                <input
                  :class="
                    passError
                      ? 'form-control form-control-merge error'
                      : 'form-control form-control-merge'
                  "
                  id="login-password"
                  :type="isShowPassword ? 'text' : 'password'"
                  name="login-password"
                  placeholder="············"
                  aria-describedby="login-password"
                  tabindex="2"
                  v-model="form.password"
                  autocomplete="current-password"
                  @change="validatePass"
                />
                <div class="visibilityWrapper" @click="handleShowPassword">
                  <span v-if="isShowPassword" class="material-icons-outlined">
                    visibility
                  </span>
                  <span v-else class="material-icons-outlined">
                    visibility_off
                  </span>
                </div>
              </div>
              <span id="login-pass-error" class="error" v-if="passError">{{
                passError
              }}</span>
            </div>
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  class="custom-control-input"
                  id="remember-me"
                  type="checkbox"
                  tabindex="3"
                  v-model="isRemember"
                />
                <label class="custom-control-label" for="remember-me">
                  {{ $t('login.remember_password') }}</label
                >
              </div>
            </div>
            <button
              class="btn btn-primary btn-block"
              tabindex="4"
              type="submit"
              :disabled="!isValidToSend"
            >
              {{ $t('login.login') }}
            </button>
          </q-form>
          <p class="text-center mt-2">
            <span>{{ $t('login.do_not_have_password') }}</span
            ><a href="/register"
              ><span>&nbsp;{{ $t('login.create_acc') }}</span></a
            >
          </p>
          <!-- <div class="divider my-2">
            <div class="divider-text">hoặc</div>
          </div>
          <div class="auth-footer-btn d-flex justify-content-center">
            <a class="btn btn-facebook" href="javascript:void(0)"
              ><q-icon name="fab fa-facebook-f" /></a
            ><a class="btn btn-twitter white" href="javascript:void(0)"
              ><q-icon name="fab fa-twitter" /></a
            ><a class="btn btn-google" href="javascript:void(0)"
              ><q-icon name="fab fa-google" /></a
            ><a class="btn btn-github" href="javascript:void(0)"
              ><q-icon name="fab fa-github"
            /></a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { mapActions } from 'vuex'
import images from 'src/assets'

export default {
  components: {},
  data() {
    return {
      images,
      form: {
        password: ref(''),
        loginName: ref('')
      },
      isRemember: ref(false),
      error: ref(''),
      emailError: ref(''),
      passError: ref(''),

      isShowPassword: false
    }
  },
  computed: {
    isValidPassword() {
      if (this.form.password.trim().length == 0) {
        return false
      }
      return true
    },
    isValidEmail() {
      if (this.form.loginName.trim().length == 0) {
        return false
      }
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.form.loginName)
    },
    isValidToSend() {
      return this.isValidPassword && this.isValidEmail
    }
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    validateEmail: function () {
      // console.log(self.form);
      var self = this
      if (self.form.loginName.trim().length == 0) {
        self.emailError = self.$t('login.please_enter_email')
        return
      }

      if (!self.isValidEmail) {
        self.emailError = self.$t('login.email_is_not_valid')
        return
      }

      self.emailError = ''
    },

    handleShowPassword: function () {
      this.isShowPassword = !this.isShowPassword
    },

    validatePass: function () {
      var self = this
      if (!self.isValidPassword) {
        self.passError = self.$t('login.please_enter_password')
        return
      }
      self.passError = ''
    },
    onSubmit: async function () {
      var self = this
      //  console.log(self.form);
      if (!self.isValidToSend) {
        self.error = self.$t('login.double_check_info')
        return
      }
      self.error = ''
      try {
        await self.doLogin(self.form)
        self.$router.push('/dashboard')
      } catch {
        self.error = self.$t('login.login_failed')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.passwordWrapper {
  position: relative;
  & .visibilityWrapper {
    position: absolute;
    right: 0;
    top: 0;

    height: 100%;
    width: 42px;

    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
      font-size: 22px !important;
    }
  }
}
</style>
