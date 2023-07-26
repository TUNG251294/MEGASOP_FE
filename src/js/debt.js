import { mapActions, mapState } from 'vuex'
import { defineComponent } from 'vue'
import { date, Notify } from 'quasar'
import { Constants } from 'boot/Constants'
import { axiosInstance } from 'boot/axios'
import * as XLSX from 'xlsx'
import * as _ from 'lodash'
export default defineComponent({
  name: 'debt',
  data() {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      debt: [],
      interest: 0,
      years: 0,
      total: 0,
      monthly: 0,
      modal: false,
      modalDebt:false,
      activateModal: false,
      uploadFile: false,
      fileName: '',
      canUpload: false,
      progress: false,
      failureList: [],
      staff: [],
      rows: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'name',
        descending: false
      },
      selected: [],
      searchText: '',
      is_focusInputSearch: false,
      isTooltipVisible: false,
      tooltipContent: '',

      // data excel
      dataExcel: [],
      headerExcel: [],
      errorsRetailerCode: {
        checkRetailerCodes: [],
        required: [],
        duplicate: []
      },
      errorMessages: {
        debtLimit: [],
        debtTerm: [],
        beginningDebt: [],
        overdraftLimit: [],
        dataPassValidate: false
      },
      status: -1,
      //statuses object
      statuses: {
        ACTIVE: 1,
        INACTIVE: 0
      },
      retailerCodes: [],
      filteredRetailers: [],
      form: [
        {
          id: 0,
          retailerCode: '',
          name: '',
          mobie: '',
          address: '',
          paymentPeriod: '',
          initialBalance: '',
          initialBalanceCheck: 'null',
          overdraftCredit: '',
          creditLimit: ''
        }
      ]
    }
  },
  // create() lifecycle hook
  created() {},
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'left',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'retailerCode',
          label: this.$t('debt.retailer_code'),
          align: 'left',
          field: 'retailerCode',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'name',
          label: this.$t('debt.retailer_name'),
          align: 'left',
          field: 'name',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'mobie',
          label: this.$t('debt.retailer_phone'),
          align: 'left',
          field: 'mobie',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'creditLimit',
          label: this.$t('debt.debt_limit'),
          align: 'right',
          field: 'creditLimit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'overDraftCredit',
          label: this.$t('debt.overdraft_limit'),
          align: 'right',
          field: 'overDraftCredit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'paymentPeriod',
          label: this.$t('debt.debt_term'),
          align: 'right',
          field: 'paymentPeriod',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'initialBalance',
          label: this.$t('debt.beginning_debt'),
          align: 'right',
          field: 'initialBalance',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'createTime',
          label: this.$t('debt.imported_time'),
          align: 'right',
          field: 'createTime',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },

    isValidToSend: function () {
      return this.isValidateRetailerCode && this.isValidateDebtTerm
    },
    isValidateRetailerCode: function () {
      const validRetailerCodes = this.form.filter(
        item => item.retailerCode && item.retailerCode != ''
      )
      const allRetailerCodesValid =
        validRetailerCodes.length === this.form.length &&
        validRetailerCodes.every(item => item.retailerCode != '')

      // console.log('allRetailerCodesValid', allRetailerCodesValid)
      return allRetailerCodesValid
    },
    isValidateDebtLimit: function () {
      const validDebtLimits = this.form.filter(item => {
        return item.debtLimit && item.debtLimit != ''
      })
      console.log('validDebtLimits', validDebtLimits)
      const allDebtLimitsValid =
        validDebtLimits.length === this.form.length &&
        validDebtLimits.every(item => item.debtLimit != '')
      return allDebtLimitsValid
    },
    isValidateDebtTerm: function () {
      const validDebtTerms = this.form.filter(
        item => item.paymentPeriod && item.paymentPeriod >= 0
      )
      const allDebtTermsValid =
        validDebtTerms.length === this.form.length &&
        validDebtTerms.every(item => item.paymentPeriod >= 0)
      return allDebtTermsValid
    },
    isValidateOverdraftLimit: function () {
      const validOverdraftLimit = this.form.filter(
        item => item.overdraftLimit && item.overdraftLimit != ''
      )
      const allDebtTermsValid =
        validOverdraftLimit.length === this.form.length &&
        validOverdraftLimit.every(item => item.overdraftLimit != '')
      console.log('allDebtTermsValid', allDebtTermsValid)
      return allDebtTermsValid
    }
  },
  mounted: function () {
    var self = this
    self.getDebts()
    self.getRetailerCodes()
  },
  // methods
  methods: {
    optionsToDate: function (toDateStr) {
      var self = this
      let dt = date.extractDate(toDateStr, 'YYYY/MM/DD')
      return (
        dt <= Date.now() && dt >= date.extractDate(self.fromDate, 'DD/MM/YYYY')
      )
    },
    optionsFromDate: function (fromDateStr) {
      let dt = date.extractDate(fromDateStr, 'YYYY/MM/DD')
      return dt <= Date.now()
    },
    checkDisableSelect: function (item, form) {
      const rs = form.find(x => x.retailerCode?.id === item?.id)
      if (rs) {
        return true
      }
      return false
    },
    validateRetailerCode: function (value) {
      var self = this
      if (
        self.form.filter(
          item => item.retailerCode.retailerCode === value.retailerCode
        ).length > 1
      ) {
        //self.form = self.form.filter(item => item.id !== value.id)
        return this.$t('debt.validate.retailer_code_not_duplicate')
      }

      if (!value) {
        return this.$t('debt.validate.retailer_code_required')
      }
    },
    //required debtLimit
    validateDebtLimit: function (value) {
      if (value === '') {
        return this.$t('debt.validate.please_enter_debt_limit')
      } else if (value < 0) {
        console.log(!value)
        return this.$t('debt.validate.min_debt_limit')
      }
    },
    // required debtTerm
    requiredDebtTerm: function (value) {
      if (value < 0) {
        return 'Kỳ hạn nợ phải lớn hơn hoặc bằng 0'
      }
    },
    validateOverdraftLimit: function (value) {
      if (value === '') {
        return this.$t('debt.validate.please_enter_overdraft_limit')
      } else if (value < 0) {
        return this.$t('debt.validate.min_debt_overdraft_limit')
      }
    },
    getDebts: function () {
      var self = this
      if (!self.isGet) {
        self.pagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      self.searchText = ''
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let url =
        '/retailer/initial/credits/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerInitialCreditForms =
              response.data.data.retailerInitialCreditForms.map(
                (obj, index) => ({
                  ...obj,
                  index: segment + index + 1
                })
              )
            self.rows = response.data.data.retailerInitialCreditForms
            self.initRetailers = self.rows
          }
        })
        .catch(error => {
          self.rows = []
        })
    },
    getRetailerCodes: function () {
      var self = this
      let url = '/retailer/payments/active-inactive'
      axiosInstance
        .get(url)
        .then(response => {
          self.retailerCodes = response.data.data.retailerActive
        })
        .catch(error => {
          self.retailerCodes = []
        })
    },
    searchDebts: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isFilter = false
        self.isGet = false
      }
      self.searchText = ''
      let url =
        '/retailer/initial/credits/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (this.fromDate != '') {
        url +=
          '&fromDate=' +
          date.formatDate(
            date.extractDate(self.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }

      if (this.toDate != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }

      if (self.status != -1) {
        url += '&status=' + parseInt(self.status)
      }
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          response.data.data.retailerInitialCreditForms =
            response.data.data.retailerInitialCreditForms.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.retailerInitialCreditForms
          self.initRetailers = response.data.data.retailerInitialCreditForms
        })
        .catch(error => {
          console.log(error)
          self.rows = []
        })
    },
    filterDebts: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebts()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let url =
        '/retailer/initial/credits/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          response.data.data.retailerInitialCreditForms =
            response.data.data.retailerInitialCreditForms.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.retailerInitialCreditForms
        })
        .catch(error => {
          console.log(error)
          self.rows = []
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
          if (self.searchText.trim() != '') {
            self.filterDebts()
            return
          }
          if (self.isSearch) {
            self.searchDebts()
          } else {
            self.getDebts()
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
      self.rows.sort(sortFn)
    },

    getCountRetailers: function () {
      var self = this
      axiosInstance.get('/retailers/summary').then(response => {
        self.summary = response.data.data
      })
    },

    addFieldDebt: function () {
      var self = this
      self.form.push({
        id: self.form.length + 1,
        retailerCode: '',
        name: '',
        mobie: '',
        fullAddress: '',
        paymentPeriod: '',
        initialBalance: '',
        initialBalanceCheck: 'null',
        overdraftCredit: '',
        creditLimit: ''
      })
    },
    deleteFieldDebt: function (index) {
      var self = this;
      if (self.form.length > 1) {
        self.form.splice(index, 1);
      }
    },
    //addDebt

    addDebt: function () {
      var self = this
    },
    retailerFilterNameFn(val, update) {
      let self = this

      if (val == '') {
        update(() => {
          self.filteredRetailers = self.retailerCodes
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        self.filteredRetailers = self.retailerCodes.filter(
          v => v.retailerCode.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    onNew: function () {
      var self = this
      self.form = [
        {
          id: 0,
          retailerCode: '',
          mobie: '',
          name: '',
          fullAddress: '',
          initialBalance: '',
          initialBalanceCheck: 'null',
          paymentPeriod: '',
          overdraftLimit: ''
        }
      ]
      self.modal = true
    },
    
    // onChange retailercode
    onChangeRetailerCode: function (val, id) {
      var self = this
      const idChild = val?.id
      const item = self.retailerCodes.find(item => item?.id === idChild)
      self.form[id].name = item?.name || ''
      self.form[id].mobie = item?.mobile || ''
      self.form[id].fullAddress = item?.fullAddress || ''
      if (""+ item?.initialBalance === 'null'){
        self.form[id].initialBalance = ""
      }else{
        self.form[id].initialBalance = ""+ item?.initialBalance || ''
      }
      self.form[id].initialBalanceCheck = "" +item?.initialBalance || ''
      console.log("initialBalanceCheck " + self.form[id].initialBalanceCheck)
      console.log(self.form[id])
      console.log(item?.initialBalance)

    },
    onSubmit: function () {
      
      var self = this
      self.progress = true
      const dataConver = self.form.map(item => {
        return {
          ...item,
          creditLimit: item.creditLimit
            ? item.creditLimit.replaceAll(',', '')
            : '',
          initialBalance: item.initialBalance
            ? item.initialBalance.replaceAll(',', '')
            : '',
          overdraftCredit: item.overdraftCredit
            ? item.overdraftCredit.replaceAll(',', '')
            : '',
          retailerCode: item.retailerCode?.retailerCode || '',
          paymentPeriod: item?.paymentPeriod || '0'
        }
      })

      const inputData = [...dataConver]
      const dataSubmit = {
        RetailerInitialCredits: [...inputData]
      }
      axiosInstance
        .post('/retailer/initial/credits', dataSubmit)
        .then(response => {
          if (
            response?.data?.data?.successful > 0 &&
            response?.data?.data?.failure > 0
          ) {
            
            self.progress = false
            Notify.create({
              message:
                `${self.$t('Thêm mới thành công: ')}` +
                response?.data?.data?.successful +
                `${self.$t('Thêm mới thất bại: ')}` +
                response?.data?.data?.failure,
              type: 'negative',
              position: 'top',
              timeout: 5000
            })
            // self.getRetailerCodes()
          } else if (response?.data?.data?.failure > 0) {
            self.progress = false
            Notify.create({
              message:
                `${self.$t('Thêm mới thất bại')}` +
                response?.data?.data?.failure,
              type: 'negative',
              position: 'top',
              timeout: 5000
            })
          } else if (response?.data?.data?.successful > 0) {
            self.progress = false
            self.modal = false
            self.$q.notify({
              message: 'Thêm mới thành công',
              color: 'success',
              icon: 'done',
              position: 'top'
            })
            self.getDebts()
            self.getRetailerCodes()
          } else {
            self.progress = false
            self.$q.notify({
              message: 'Thêm mới thất bại',
              color: 'danger',
              position: 'top'
            })
          }
        })
        .catch(() => {
          self.progress = false
          self.$q.notify({
            message: 'Thêm mới thất bại',
            color: 'danger',
            position: 'top'
          })
        })
    },
    openFieldDebt: function () {
      this.modal = false
      this.progress = false
      this.modalDebt = true
    },
    // hidemodal
    hideModal: function () {
      this.fileName = ''
      this.uploadFile = false
      this.canUpload = false
    },
    downloadTemplate: function () {
      axiosInstance
        .get('/retailers/import/ticket/items/template/download', {
          responseType: 'blob'
        })
        .then(response => {
          return response.data.arrayBuffer()
        })
        .then(ab => {
          const byteArray = new Uint8Array(ab)
          const a = window.document.createElement('a')
          a.href = window.URL.createObjectURL(
            new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
          )
          a.download = `template_${new Date().getTime()}.xlsx`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
    },
    onFileSelected: function (event) {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        this.canUpload = false
        return false
      }
      let file = files.item(0)
      const reader = new FileReader()
      var checkValidAll = true
      reader.onload = e => {
        const data = e.target.result
        const workbook = XLSX.read(data, { type: 'array' })

        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: ''
        })
        const lengthSelect = jsonData.length
        for (let i = 0; i < lengthSelect; i++) {
          let checkValidRow = this.validateImportLine(jsonData[i])
          if (checkValidRow) {
            for (let j = i + 1; j < lengthSelect; j++) {
              if (this.validateImportLine(jsonData[j])) {
                // check duplicate Retailer Code import
                if (jsonData[j][1] == jsonData[i][1]) {
                  checkValidAll = false
                  Notify.create({
                    message: `${this.$t(
                      'debt.validate.import_file_duplicate_retailer'
                    )} ${jsonData[j][1]}`,
                    type: 'negative',
                    position: 'top',
                    actions: [
                      {
                        label: `${this.$t(
                          'debt.validate.import_file_dismiss'
                        )}`,
                        color: 'white',
                        handler: () => {
                          /* ... */
                        }
                      }
                    ],
                    timeout: 5000
                  })
                }
              }
            }
          }
        }

        if (checkValidAll) {
          this.fileName = file.name
          this.canUpload = true
          this.upload(file)
        }
      }
      reader.readAsArrayBuffer(file)
    },
    validateImportLine: function (jsonRow) {
      if (
        jsonRow[0] != '' &&
        jsonRow[1] != '' &&
        jsonRow[2] != '' &&
        Number(jsonRow[2] >= 0)
      ) {
        return true
      }
      return false
    },
    upload: function (file) {
      var self = this
      self.progress = true

      let formData = new FormData()
      formData.append('file', file)
      axiosInstance
        .post('/retailers/import/ticket/items/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          self.progress = false
          let failureList = response.data.data.failureList
          let retailers = response.data.data.successList

          if (failureList.length > 0 && retailers.length > 0) {
            const ids = failureList.map(item => item?.errorLine).join(', ')
            let message = ''
            failureList.forEach(element => {
              message += `<p>${self.$t(
                'debt.validate.import_file_wrong_line1'
              )} ${element.errorLine} ${self.$t(
                'debt.validate.import_file_wrong_mess1'
              )} ${element.error == '[công nợ đầu kì đã tồn tại]' ? '[công nợ đầu kì chỉ được nhập 1 lần]' : ''}</p>`
            })
            Notify.create({
              message: message,
              type: 'negative',
              position: 'top',
              html: true,
              actions: [
                {
                  label: `${this.$t('debt.validate.import_file_dismiss')}`,
                  color: 'white',
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            })
          } else if (failureList.length > 0) {
            const ids = failureList.map(item => item?.errorLine).join(', ')
            let message = ''
            failureList.forEach(element => {
              message += `<p>${self.$t(
                'debt.validate.import_file_wrong_line1'
              )} ${element.errorLine} ${self.$t(
                'debt.validate.import_file_wrong_mess1'
              )} ${element.error == '[công nợ đầu kì đã tồn tại]' ? '[công nợ đầu kì chỉ được nhập 1 lần]' : ''}</p>`
            })
            Notify.create({
              message: message,
              type: 'negative',
              position: 'top',
              html: true,
              timeout: 5000,
              actions: [
                {
                  label: `${this.$t('debt.validate.import_file_dismiss')}`,
                  color: 'white',
                  handler: () => {
                    /* ... */
                  }
                }
              ]
            })
          } else if (retailers.length > 0) {
            Notify.create({
              message: self.$t('Import thành công'),
              type: 'positive',
              position: 'top'
            })
            self.getDebts()
          }

          self.hideModal()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('stock.import_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    // formatNumber: function (number) {
    //   if (!number) {
    //     return ''
    //   }
    //   const index = number.indexOf('0')
    //   if (index === 0 && number.length > 1) {
    //     return ''
    //   }

    //   const formatValue = number.replace(/[^0-9]/g, '')
    //   return formatValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // },
    formatNumber: function (number) {
      if (number != '' && typeof number !== 'undefined') {
        number = number.toString().replace(/[^0-9.]/g, '')
        console.log(
          Number(number).toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
        )
        return Number(number).toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2
        })
      } else {
        return ''
      }
    },
    checkDataImport: function () {
      const self = this
      const rows = self.dataExcel
      const columnData = rows.map(row => row[0])
      const duplicates = columnData.reduce((acc, item, index) => {
        if (columnData.indexOf(item) !== index && !acc.includes(index)) {
          acc.push(item)
        }
        return acc
      }, [])

      const errors = rows.reduce(
        (acc, row, i) => {
          const retailerCode = row[0]
          const debtLimit = row[1]
          const overdraftLimit = row[2]
          const debtTerm = row[3]
          const beginningDebt = row[4]
          const rowNum = i + 2

          if (typeof retailerCode === 'string' && retailerCode.trim()) {
            if (
              !self.retailerCodes.find(
                rc => rc.name === retailerCode && rc.status === 1
              )
            ) {
              acc.retailerCodes.push(rowNum)
            }
          } else {
            acc.required.push(rowNum)
          }

          if (debtLimit != null) {
            if (typeof debtLimit !== 'number' || debtLimit < 0) {
              acc.debtLimit.push(rowNum)
            }
          }

          if (overdraftLimit != null) {
            if (typeof overdraftLimit !== 'number' || overdraftLimit < 0) {
              acc.overdraftLimit.push(rowNum)
            }
          }

          if (debtTerm != null) {
            if (typeof debtTerm !== 'number' || debtTerm < 0) {
              acc.debtTerm.push(rowNum)
            }
          }

          if (beginningDebt != null) {
            if (typeof beginningDebt !== 'number' || beginningDebt < 0) {
              acc.beginningDebt.push(rowNum)
            }
          }

          return acc
        },
        {
          retailerCodes: [],
          required: [],
          debtLimit: [],
          overdraftLimit: [],
          debtTerm: [],
          beginningDebt: []
        }
      )
      const dataErrors = { ...errors, duplicates: duplicates }
      this.showErrors(dataErrors)
      console.log('errorMessage', dataErrors)
    },
    submitImport: function () {
      var self = this
      const rows = self.dataExcel
      self.progress = true
      setTimeout(() => {
        self.hideModal()
        ;(self.progress = false), (self.errorMessages.dataPassValidate = false)
        self.$router.go()
        Notify.create({
          message: `${this.$t('debt.noti.importSuccess')}`,
          color: 'success',
          position: 'top',
          timeout: 2000
        })
      }, 2000)
    },
    showErrors: function (errors) {
      this.progress = true
      const totalErrors = [
        ...errors.debtLimit,
        ...errors.overdraftLimit,
        ...errors.debtTerm,
        ...errors.beginningDebt
      ]
      const errorsRetailerCode = [...errors.retailerCodes, ...errors.required]
      const errorDuplicateRetailerCode = [...errors.duplicates]
      console.log('erros', errors)
      const removeDuplicate = Array.from(new Set(totalErrors))
      if (
        removeDuplicate.length === 0 &&
        errorsRetailerCode.length === 0 &&
        errorDuplicateRetailerCode.length === 0
      ) {
        this.errorMessages.dataPassValidate = true
        setTimeout(() => {
          this.progress = false
        }, 1000)
        Notify.create({
          message: `${this.$t('debt.noti.dataPassValidate')}`,
          color: 'success',
          position: 'top',
          timeout: 2000
        })
      }
      if (
        errorsRetailerCode.length > 0 ||
        errorDuplicateRetailerCode.length > 0 ||
        removeDuplicate.length > 0
      ) {
        let message = ''
        this.errorMessages.dataPassValidate = false
        const indexErrors = removeDuplicate.join(', ')
        const indexErrorRCode = errorsRetailerCode.join(', ')
        const duplicateRName = errorDuplicateRetailerCode.join(', ')
        if (indexErrors !== '') {
          message += `${this.$t('debt.noti.record')} ${indexErrors} ${this.$t(
            'debt.noti.formatError'
          )} `
        }
        if (indexErrorRCode !== '') {
          message += `${this.$t(
            'debt.noti.retailer_is_valid'
          )} ${indexErrorRCode} ${this.$t('debt.noti.is_not_valid')} `
        }
        if (duplicateRName !== '') {
          message += `${this.$t(
            'debt.noti.duplicate_retailerCode'
          )} "${duplicateRName}"`
        }
        this.errorMessages.dataPassValidate = false
        setTimeout(() => {
          this.progress = false
          this.hideModal()
        }, 1000)

        this.$q.notify({
          message: message,
          type: 'negative',
          position: 'top',
          actions: [
            {
              icon: 'close',
              color: 'white',
              handler: () => {
                setTimeout(() => {
                  this.$router.go()
                }, 1000)
              }
            }
          ],
          timeout: 0
        })
      }
    },
    showTooltip(content) {
      this.tooltipContent = content
      this.isTooltipVisible = true
    },
    hideTooltip() {
      this.isTooltipVisible = false
    }
  }
})
