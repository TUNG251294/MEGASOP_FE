import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Danh sách nhân viên',
  data: function () {
    return {
      staffs: [],
      initStaffs: [],

      status: -1,
      form: {
        id: 0,
        customerId: 0,
        fullname: '',
        email: '',
        mobile: '',
        address: '',
        avatar: ''
      },
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      isSearch: false,
      isGet: false,
      isFilter: false,
      progress: false,
      edit: false,
      modal: false,
      searchText: '',
      resetModal: false,
      lockOrUnlockModal: false,
      action: '',
      is_focusInputSearch: false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('employee.list.ordinal_number'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'fullname',
          label: this.$t('employee.list.full_name'),
          align: 'left',
          field: 'fullname',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'email',
          label: this.$t('employee.list.email'),
          align: 'left',
          field: 'email',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'mobile',
          label: this.$t('employee.list.phone'),
          align: 'left',
          field: 'mobile',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'address',
          label: this.$t('employee.list.address'),
          align: 'left',
          field: 'address',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'status',
          label: this.$t('employee.list.status'),
          align: 'center',
          field: 'status',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'action',
          label: this.$t('employee.list.action'),
          align: 'center',
          field: 'action',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    isValidToSend: function () {
      return (
        this.isValidFullName &&
        this.isValidEmail &&
        this.isValidMobile &&
        this.isValidAddress &&
        this.isValidAvatar
      )
    },
    isValidFullName: function () {
      return this.form.fullname.trim().length > 0
    },
    isValidEmail: function () {
      let reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return this.form.email.trim().length > 0 && reg.test(this.form.email)
    },
    isValidMobile: function () {
      let regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return this.form.mobile.trim().length > 0 && regex.test(this.form.mobile)
    },
    isValidAddress: function () {
      return this.form.address.trim().length > 0
    },
    isValidAvatar: function () {
      let reg = /data:image\/([a-zA-Z]*);base64,([^\"]*)/
      let regex = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/
      return (
        this.form.avatar.trim().length > 0 &&
        (reg.test(this.form.avatar) || regex.test(this.form.avatar))
      )
    }
  },
  mounted: function () {
    this.getStaffs()
  },
  methods: {
    getStaffs: function () {
      let me = LocalStorage.getItem('ac_c_i')
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = true
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      axiosInstance
        .get('/customer/staff/search?segment=' + segment + '&offset=' + offset)
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.staffs = response.data.data.staffs.map(
              (obj, index) => ({
                ...obj,
                index: segment + index + 1
              })
            )
            self.staffs = response.data.data.staffs
            self.initStaffs = response.data.data.staffs
          } else {
            self.staffs = []
            self.initStaffs = []
          }
        })
    },
    searchStaff: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isGet = false
        self.isFilter = false
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/customer/staff/search?segment=' + segment + '&offset=' + offset
      url += self.status != -1 ? '&status=' + self.status : ''
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.staffs = response.data.data.staffs.map(
            (obj, index) => ({
              ...obj,
              index: segment + index + 1
            })
          )
          self.staffs = response.data.data.staffs
          self.initStaffs = response.data.data.staffs
        } else {
          self.staffs = []
          self.initStaffs = []
        }
      })
    },
    filterStaffs: function () {
      var self = this

      if (self.searchText.trim() == '') {
        self.getStaffs()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/customer/staff/search?segment=' +
        segment +
        '&offset=' +
        offset +
        '&keyword=' +
        self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.staffs = response.data.data.staffs.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.staffs = response.data.data.staffs
          self.initStaffs = response.data.data.staffs
        } else {
          self.staffs = []
          self.initStaffs = []
        }
      })
    },
    onRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.pagination.sortBy == sortBy || !sortBy) {
        if (
          (self.pagination.page != page ||
            self.pagination.rowsPerPage != rowsPerPage) &&
          self.pagination.descending == descending
        ) {
          self.pagination.page = page
          self.pagination.rowsPerPage = rowsPerPage
          if (self.isSearch) {
            self.searchStaff()
          } else if (self.isGet) {
            self.getStaffs()
          } else {
            self.filterStaffs()
          }
        } else {
          if (self.pagination.descending != descending) {
            self.pagination.descending = descending
          } else {
            self.pagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.pagination.sortBy = sortBy
      }

      let sortFn
      switch (self.pagination.sortBy) {
        case 'id':
          sortFn = self.pagination.descending
            ? (a, b) => b.id - a.id
            : (a, b) => a.id - b.id
          break

        default:
          sortFn = self.pagination.descending
            ? (a, b) =>
                a[self.pagination.sortBy] > b[self.pagination.sortBy]
                  ? -1
                  : a[self.pagination.sortBy] < b[self.pagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.pagination.sortBy] > b[self.pagination.sortBy]
                  ? 1
                  : a[self.pagination.sortBy] < b[self.pagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.staffs.sort(sortFn)
    },
    addOrUpdateStaff: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['fullname'] = self.form.fullname
      inputData['email'] = self.form.email
      inputData['mobile'] = self.form.mobile
      inputData['address'] = self.form.address
      inputData['avatar'] = self.form.avatar
      if (self.edit) {
        inputData['id'] = self.form.id
        self.editStaff(inputData)
      } else {
        self.addStaff(inputData)
      }
    },
    editStaff: function (inputData) {
      var self = this
      axiosInstance
        .put('/customer/staff', inputData)
        .then(() => {
          self.progress = false
          self.modal = false
          Notify.create({
            message: self.$t('employee.create.update_successful'),
            type: 'positive',
            position: 'top'
          })
          self.getStaffs()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('employee.create.update_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    addStaff: function (inputData) {
      var self = this
      axiosInstance
        .post('/customer/staff', inputData)
        .then(() => {
          self.progress = false
          self.modal = false
          Notify.create({
            message: self.$t('employee.create.create_successful'),
            type: 'positive',
            position: 'top'
          })
          self.getStaffs()
        })
        .catch(error => {
          self.progress = false
          let message = ''
          switch (error.response.data.errors[0].code) {
            case '1402':
              message = `${self.$t('employee.create.email')} ${
                self.form.email
              } ${self.$t('employee.create.exist_email')}`
              break
            default:
              message = self.$t('employee.create.exceeded_the_limit')
              break
          }
          Notify.create({
            message: message,
            type: 'negative',
            position: 'top'
          })
        })
    },
    requiredFullname: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('employee.create.please_enter_the_full_name')
      )
    },
    requiredEmail: function (val) {
      var reg =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return (
        (val && val.length > 0 && reg.test(val)) ||
        this.$t('employee.create.please_enter_the_email')
      )
    },
    requiredMobile: function (val) {
      var regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      return (
        (val && val.length > 0 && regex.test(val)) ||
        this.$t('employee.create.please_enter_the_phone_number')
      )
    },
    requiredAddress: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('employee.create.please_enter_the_address')
      )
    },
    onAddStaff: function () {
      var self = this
      self.form.fullname = ''
      self.form.email = ''
      self.form.mobile = ''
      self.form.address = ''
      self.form.avatar = ''
      self.form.id = 0
      self.edit = false
      self.modal = true
      self.resetModal = false
    },
    onDetail: function (row) {
      var self = this
      self.edit = true
      self.modal = true
      self.resetModal = false
      self.form.id = row.id
      self.form.fullname = row.fullname
      self.form.email = row.email
      self.form.mobile = row.mobile
      self.form.address = row.address
      self.form.avatar = row.avatar
    },
    onFileSelected: function (event) {
      var self = this
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return false
      }

      let file = files.item(0)
      let reader = new FileReader()
      reader.onload = e => {
        let dataURI = e.target.result
        if (dataURI) {
          self.form.avatar = dataURI
        }
      }
      reader.readAsDataURL(file)
    },
    onRefresh: function (row) {
      var self = this
      self.edit = false
      self.modal = false
      self.resetModal = true
      self.form.id = row.id
      self.form.fullname = row.fullname
    },
    resetPassword: function () {
      var self = this
      self.progress = true
      axiosInstance
        .get('/customer/staff/' + self.form.id + '/resetPassword')
        .then(() => {
          self.progress = false
          self.resetModal = false
          Notify.create({
            message: `${self.$t(
              'employee.list.reset_password_notification'
            )} [${self.form.fullname}] ${self.$t(
              'employee.list.successfully'
            )}!`,
            type: 'positive',
            position: 'top'
          })
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: `${self.$t(
              'employee.list.reset_password_notification'
            )} [${self.form.fullname}] ${self.$t('employee.list.failed')}!`,
            type: 'negative',
            position: 'top'
          })
        })
    },
    onLockOrUnlock: function (row) {
      var self = this
      self.form.id = row.id
      self.form.action = row.status == 'ACTIVE' ? 'lock' : 'unlock'
      self.form.fullname = row.fullname
      self.lockOrUnlockModal = true
    },
    lockOrUnlockStaff: function (id) {
      var self = this
      self.progress = true
      let url = '/customer/staff/' + id + '/' + self.form.action
      let message =
        self.form.action == 'lock'
          ? `${self.$t('employee.list.lock_acc_notification')} [${
              self.form.fullname
            }]`
          : `${self.$t('employee.list.unlock_acc_notification')} [${
              self.form.fullname
            }]`
      axiosInstance
        .get(url)
        .then(() => {
          self.progress = false
          self.lockOrUnlockModal = false
          Notify.create({
            message: `${message} ${self.$t('employee.list.successfully')}!`,
            type: 'positive',
            position: 'top'
          })
          self.getStaffs()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: `${message} ${self.$t('employee.list.failed')}!`,
            type: 'negative',
            position: 'top'
          })
        })
    }
  }
})
