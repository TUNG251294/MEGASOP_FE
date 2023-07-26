import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import ImageCropper from '../components/ImageCropper.vue'

export default defineComponent({
  components: { ImageCropper },
  name: 'Thông tin tài khoản',
  data: function () {
    return {
      form: {
        info: {
          representative: '',
          email: '',
          tel: ''
        },
        pw: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        imageSrc: ''
      },
      changePersonalModal: false,
      changePasswordModal: false,
      checkOldPassword: '',

      // errorMsg
      representativeError: '',
      tellError: '',
      oldPasswordError: '',
      passwordError: '',
      confirmPasswordError: '',
      // check it
      oldPasswordType: 'password',
      visibilityOldIcon: 'visibility',
      passwordType: 'password',
      visibilityIcon: 'visibility',
      confirmPasswordType: 'password',
      visibilityConfirmIcon: 'visibility',
      showOldPassword: false,
      showPassword: false,
      showConfirmPassword: false,
      confirm: false,
      showCropper: false,
      imageSrc: '',
      selectedFile: [],
      isStaff: false
    }
  },
  computed: {
    //isValid-info
    isValidRepresentative: function () {
      if (this.form.info.fullname.trim().length == 0) {
        return false
      }
      let reg =
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪếễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9_ ]{3,255}$/
      return reg.test(this.form.info.fullname)
    },
    isValidTel: function () {
      if (this.form.info.tel.trim().length == 0) {
        return false
      }
      var reg = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return reg.test(this.form.info.tel)
    },
    isValidToSendPersonalInformation: function () {
      return this.isValidRepresentative && this.isValidTel
    },
    //isValid-pw
    isValidOldPassword: function () {
      if (this.form.pw.oldPassword.trim().length == 0) {
        return false
      }
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

      // let reg =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
      return reg.test(this.form.pw.oldPassword)
    },

    isValidConfirmPassword: function () {
      return this.form.pw.confirmPassword == this.form.pw.password
    },

    isValidPassword: function () {
      if (this.form.pw.password.trim().length == 0) {
        return false
      }
      let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

      // let reg =
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
      return reg.test(this.form.pw.password)

      // return this.form.company.password.trim().length >= 8;
    },
    isValidToSendPassword: function () {
      return (
        // this.isValidOldPassword &&
        this.isValidPassword && this.isValidConfirmPassword
      )
    }
  },
  mounted: function () {
    this.getAccountInfo()
  },
  methods: {
    validateRepresentativeError: function (event) {
      var self = this

      if (this.form.info.fullname.trim().length < 3) {
        self.representativeError = self.$t(
          'personal.please_enter_at_least_3_characters'
        )
        return
      } else if (this.form.info.fullname.trim().length > 50) {
        self.representativeError = self.representativeError = self.$t(
          'personal.please_enter_only_50_characters_at_most'
        )
        return
      }
      if (!self.isValidRepresentative) {
        self.representativeError =
          self.representativeError =
          self.representativeError =
            self.$t('personal.please_do_not_use_special_characters')
        return
      }
      self.representativeError = ''
    },

    validateTellError: function (event) {
      var self = this
      if (!self.isValidTel) {
        self.tellError = self.$t('personal.please_enter_a_valid_phone_number')
        return
      }
      self.tellError = ''
    },

    validateOldPassword: function (event) {
      var self = this
      if (!self.isValidOldPassword) {
        self.oldPasswordError = self.$t('personal.password_incorrect')
        return
      }
      self.oldPasswordError = ''
    },

    validatePassword: function (event) {
      var self = this
      if (this.form.pw.password.trim().length < 8) {
        self.passwordError = self.$t(
          'personal.please_enter_at_least_8_characters'
        )
        return
      }
      if (this.form.pw.password.trim().length > 32) {
        self.passwordError = self.$t(
          'personal.please_enter_only_32_characters_at_most'
        )
        return
      }
      if (!self.isValidPassword) {
        self.passwordError = self.$t('personal.correct_password')
        return
      }
      self.passwordError = ''
    },

    validateConfirmPassword: function (event) {
      var self = this
      if (!self.isValidConfirmPassword) {
        self.confirmPasswordError = self.$t(
          'personal.confirm_password_incorrect'
        )
        return
      }
      self.confirmPasswordError = ''
    },

    showOldPass: function () {
      var self = this
      self.showOldPassword = !self.showOldPassword
      self.oldPasswordType = self.showOldPassword ? 'text' : 'password'
      self.visibilityOldIcon = self.showOldPassword
        ? 'visibility_off'
        : 'visibility'
    },

    showPass: function () {
      var self = this
      self.showPassword = !self.showPassword
      self.passwordType = self.showPassword ? 'text' : 'password'
      self.visibilityIcon = self.showPassword ? 'visibility_off' : 'visibility'
    },

    showConfirmPass: function () {
      var self = this
      self.showConfirmPassword = !self.showConfirmPassword
      self.confirmPasswordType = self.showConfirmPassword ? 'text' : 'password'
      self.visibilityConfirmIcon = self.showConfirmPassword
        ? 'visibility_off'
        : 'visibility'
    },

    getAccountInfo: function () {
      var self = this
      self.isStaff = LocalStorage.getItem('a_st_t') != undefined
      let me = LocalStorage.getItem('ac_c_i')

      self.form.info.fullname = me.fullname
      self.form.info.email = me.email
      self.form.info.tel = self.isStaff
        ? me.mobile
        : me.tel != ''
        ? me.tel
        : me.representative_tel
      self.form.imageSrc = self.isStaff ? me.avatar : me.picture
    },

    handleSubmitPersonalInformation: function () {
      var self = this

      let inputData = {}
      inputData['fullname'] = self.form.info.fullname
      inputData['phoneNumber'] = self.form.info.tel

      axiosInstance
        .post('/profile', inputData)
        .then(() => {
          Notify.create({
            message: self.$t('personal.update_successful'),
            position: 'top',
            type: 'positive',
            timeout: 500
          })
          self.changePersonalModal = !self.changePersonalModal

          self.isStaff = LocalStorage.getItem('a_st_t') != undefined
          let me = LocalStorage.getItem('ac_c_i')

          me.fullname = self.form.info.fullname
          me.email = self.form.info.email
          if (self.isStaff) {
            me.mobile = self.form.info.tel
          } else {
            me.tel = self.form.info.tel
          }
          LocalStorage.set('ac_c_i', me)
          window.location.reload()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('personal.update_failed'),
            position: 'top',
            type: 'negative',
            timeout: 500
          })
        })
    },

    closePersonalModal: function () {
      var self = this
      self.changePersonalModal = !self.changePersonalModal
      self.getAccountInfo()
      self.representativeError = ''
      self.tellError = ''
    },

    handleSubmitChangePassword: function () {
      var self = this

      let inputData = {}
      inputData['currentPassword'] = self.form.pw.oldPassword
      inputData['newPassword'] = self.form.pw.password

      axiosInstance
        .post('/profile/password', inputData)
        .then(() => {
          Notify.create({
            message: self.$t('personal.update_password_successful'),
            position: 'top',
            type: 'positive',
            timeout: 500
          })
          self.closePasswordModal()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('personal.old_password_is_incorrect'),
            position: 'top',
            type: 'negative',
            timeout: 500
          })
        })
    },

    closePasswordModal: function () {
      var self = this
      self.changePasswordModal = !self.changePasswordModal
      self.form.pw = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      }
      self.oldPasswordError = ''
      self.passwordError = ''
      self.confirmPasswordError = ''
    },

    handleSubmitAvatar: function (croppedImage) {
      var self = this
      let inputData = {}
      inputData['avatar'] = croppedImage
      axiosInstance
        .post('/profile/avatar', inputData)
        .then(response => {
          Notify.create({
            message: self.$t('personal.update_avatar_successfully'),
            position: 'top',
            type: 'positive',
            timeout: 500
          })

          self.isStaff = LocalStorage.getItem('a_st_t') != undefined
          let me = LocalStorage.getItem('ac_c_i')
          self.form.imageSrc = response.data.data.avatar

          if (self.isStaff) {
            me.avatar = self.form.imageSrc
          } else {
            me.picture = self.form.imageSrc
          }

          LocalStorage.set('ac_c_i', me)
          window.location.reload()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('personal.avatar_update_failed'),
            position: 'top',
            type: 'negative',
            timeout: 500
          })
        })
    },

    // handle Image
    handleUpload: function () {
      document.getElementById('image-upload').click()
    },
    onFileSelected: function (event) {
      var self = this
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return false
      }

      for (var i = 0; i < files.length; i++) {
        let file = files.item(i)
        self.createImage(file)
      }
    },
    createImage: function (file) {
      var self = this
      let reader = new FileReader()
      reader.onload = e => {
        let dataURI = e.target.result
        if (dataURI) {
          self.selectedFile.push({
            id: self.uuidv4(),
            path: dataURI,
            file: file
          })
          self.imageSrc = dataURI
          self.showCropper = true
        }
      }
      reader.readAsDataURL(file)
    },
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
    getFullnameLabel: function () {
      return this.isStaff
        ? this.$t('personal.full_name')
        : this.$t('personal.company_name')
    },
    loadErrorImage: function () {
      var self = this
      self.form.imageSrc = 'icons/favicon-96x96.png'
    }
  }
})
