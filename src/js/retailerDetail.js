import { defineComponent } from 'vue'
import { Chart, registerables } from 'chart.js'
import { date, LocalStorage, Notify } from 'quasar'
import { axiosInstance } from 'boot/axios'
import { Constants } from 'boot/Constants'
import ImageCropper from '../components/ImageCropper.vue'
import SvgIcon from '../components/SvgIcon.vue'

Chart.register(...registerables)

export default defineComponent({
  components: { ImageCropper, SvgIcon },
  name: 'RetailerDetail',
  data: function () {
    return {
      tab: 'overview',
      tabDebt: 'debt-order',
      debtOrderRows: [],
      debtHistoryRows: [],
      rows: [],
      sellinRows: [],
      selloutRows: [],
      modal: false,
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      fromDateDebt: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDateDebt: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      retailerInfo: {},
      retailerInvoiceInfo: {},
      searchText: '',
      address: '',
      ward: '',
      district: '',
      city: '',
      form: {
        wards: [],
        districts: [],
        cities: [],
        address: '',
        imageSrc: '',
        info: {
          address: '',
          birthday: date.formatDate(Date.now(), 'DD/MM/YYYY'),
          cityId: 0,
          districtId: 0,
          email: '',
          fullName: '',
          mobile: '',
          id: 0,
          retailerInvoice: {
            addressText: '',
            bankAccountName: '',
            bankAccountNo: '',
            bankBranch: '',
            bankName: '',
            id: 0,
            retailerInvoiceName: '',
            taxNo: '',
            tel: '',
            telExt: ''
          },
          retailerSign: '',
          retailerIdCard: '',
          status: 0,
          wardId: 0
        }
      },
      is_focusInputSearch:false,
      isTooltipVisible: false,
      tooltipContent: '',
      cityChange: false,
      selectedFile: [],
      showCropper: false,
      imageSrc: '',
      retailerCode: '',
      sellinPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
      },
      rowsSellinPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      selloutPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
      },
      rowsSelloutPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      debtOrderPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
      },
      rowsDebtOrderPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      debtHistoryPagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'id',
        descending: false
      },
      rowsdebtHistoryPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      textColorStatus: {
        FINISH: 'green-500',
        CANCELED: 'red-500',
        NEW: 'yellow-500',
        APPROVED: 'blue-500',
        DELIVERED: 'primarya-500',
        RETURN: 'red-500',
      },
      bgColorStatus: {
        FINISH: 'green-200',
        CANCELED: 'red-200',
        NEW: 'orange-200',
        APPROVED: 'blue-200',
        DELIVERED: 'primarya-200',
        RETURN: 'red-200',
      },
      classStatus: {
        FINISH: 'text-success',
        CANCELED: 'text-danger',
        NEW: 'text-warning',
        APPROVED: 'text-lime',
        DELIVERED: 'text-blue',
        RETURN: 'text-indigo'
      },
      colorStatusDebt: {
        FINISH: 'success',
        CANCELED: 'danger',
        NEW: 'warning',
        APPROVED: 'lime',
        DELIVERED: 'blue',
        RETURN: 'indigo'
      },

      colorStatus: {
        FINISH: 'success',
        CANCELED: 'danger',
        NEW: 'warning',
        APPROVED: 'lime',
        DELIVERED: 'blue',
        RETURN: 'indigo'
      },
      labelStatus: {
        FINISH: this.$t('retailers.details.finish_status'),
        CANCELED: this.$t('retailers.details.cancelled_status'),
        NEW: this.$t('retailers.details.new_status'),
        APPROVED: this.$t('retailers.details.approve_status'),
        DELIVERED: this.$t('retailers.details.delivered_status'),
        RETURN: this.$t('retailers.details.returned_status')
      },
      progress: false,
      sellins: {},
      sellouts: {},
      debtRetailer : {},
      debtRetailerOverview : {}

    }
  },
  computed: {
    labelStatusI18n: function () {
      return {
        NEW: this.$t('order_list.to_pay'),
        APPROVED: this.$t('order_list.confirmed'),
        CANCELED: this.$t('order_list.canceled'),
        RETURN: this.$t('order_list.refunded'),
        DELIVERED: this.$t('order_list.delivered'),
        FINISH: this.$t('order_list.completed'),
      }
    },
    statusesI18n: function () {
      return [
        {
          name: this.$t('order_list.completed'),
          value: 'FINISH'
        },
        {
          name: this.$t('order_list.canceled'),
          value: 'CANCELED'
        },
        {
          name: this.$t('order_list.to_pay'),
          value: 'NEW'
        },
        {
          name: this.$t('order_list.confirmed'),
          value: 'APPROVED'
        },
        {
          name: this.$t('order_list.delivered'),
          value: 'DELIVERED'
        },
        {
          name: this.$t('order_list.refunded'),
          value: 'RETURN'
        }
      ]
    },
    columnsI18n: function () {
      return [
        {
          name: 'id',
          label: this.$t('retailers.details.id_col'),
          align: 'left',
          field: 'id',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderCode',
          align: 'left',
          label: this.$t('retailers.details.order_code_col'),
          field: 'orderCode',
          sortable: true,
          format: val => `${val}`,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'consumerName',
          label: this.$t('retailers.details.orderer'),
          field: 'consumerName',
          align: 'left',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderDate',
          label: this.$t('retailers.details.order_date_col'),
          field: 'orderDate',
          align: 'right',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderStatus',
          label: this.$t('retailers.details.status_col'),
          align: 'center',
          field: 'orderStatus',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderCost',
          label: this.$t('retailers.details.total_col'),
          field: 'orderCost',
          align: 'right',
          sortable: true,
          headerStyle: 'font-weight: bold'
        },

        {
          name: 'voucherCode',
          label: this.$t('retailers.details.voucher_code_col'),
          field: 'voucherCode',
          align: 'left',
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'voucherRedeem',
          label: this.$t('retailers.details.total_discount_col'),
          field: 'voucherRedeem',
          align: 'right',
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'finalCost',
          label: this.$t('retailers.details.final_cost'),
          field: 'finalCost',
          align: 'right',
          sortable: true,
          headerStyle: 'font-weight: bold'
        }
      ]
    },
    sellinColumnsI18n: function () {
      return [
        {
          name: 'id',
          label: this.$t('retailers.details.id_col'),
          align: 'left',
          field: 'id',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderCode',
          align: 'left',
          label: this.$t('retailers.details.order_code_col'),
          field: 'orderCode',
          sortable: true,
          format: val => `${val}`,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderDate',
          label: this.$t('retailers.details.order_date_col'),
          field: 'orderDate',
          align: 'right',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'finalCost',
          label: this.$t('retailers.details.total_col'),
          field: 'finalCost',
          align: 'right',
          sortable: true,
          headerStyle: 'font-weight: bold'
        },
        {
          name: 'orderStatus',
          label: this.$t('retailers.details.status_col'),
          align: 'center',
          field: 'orderStatus',
          format: val => `${val}`,
          sortable: true,
          headerStyle: 'font-weight: bold'
        }
      ]
    },

    isValidMobileFormat: function () {
      // let regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      var regex = /^0(3|5|7|8|9)+([0-9]{8})$/
      return regex.test(this.form.info.mobile) || this.$t('personal.please_enter_a_valid_phone_number')
    },
    debtOrderColumnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('retailers.details.id_col'),
          align: 'left',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'retailerCode',
          align: 'left',
          label: this.$t('debt.retailer_code_col'),
          field: 'retailerCode',
          sortable: true,
          format: val => `${val}`,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'orderCode',
          align: 'left',
          label: this.$t('retailers.details.order_code_col'),
          field: 'orderCode',
          sortable: true,
          format: val => `${val}`,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'typeOfDebt',
          label: this.$t('debt.debt_type'),
          align: 'left',
          field: 'typeOfDebt',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },

        {
          name: 'orderer',
          label: this.$t('debt.orderer'),
          field: 'orderer',
          align: 'left',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'debtDay',
          label: this.$t('debt.date_debt'),
          field: 'debtDay',
          align: 'right',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'outOfDate',
          label: this.$t('debt.out_date_debt'),
          field: 'outOfDate',
          align: 'right',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'finalCost',
          label: this.$t('debt.total_debt'),
          align: 'right',
          field: 'finalCost',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          // đã thanh toán
          name: 'paid',
          label: this.$t('debt.debt_paid'),
          align: 'right',
          field: 'paid',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'orderStatus',
          label: this.$t('debt.status_col'),
          align: 'left',
          field: 'orderStatus',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        }
      ]
    },

    debtHistoryColumnI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('retailers.details.id_col'),
          align: 'left',
          field: 'index',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'createTime',
          align: 'right',
          label: this.$t('debt.date_update_col'),
          field: 'createTime',
          sortable: true,
          format: val => `${val}`,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'creditLimit',
          label: this.$t('debt.debt_limit_col'),
          field: 'creditLimit',
          align: 'right',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'finalDebt',
          label: this.$t('debt.debt_end_of_term_col'),
          field: 'finalDebt',
          align: 'right',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'overdraftCredit',
          label: this.$t('debt.overdraft_limit_col'),
          align: 'right',
          field: 'overdraftCredit',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        },
        {
          name: 'paymentPeriod',
          label: this.$t('debt.debt_term_col'),
          align: 'right',
          field: 'paymentPeriod',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'        
        }
      ]
    },

    invoiceAddress() {
      let ward = this.form.wards.filter(w => w.id == this.form.info.wardId)[0]
      let wardText = ward != undefined ? ', ' + ward.name : ''
      let district =
        ward != undefined
          ? ward.district
          : this.form.districts.filter(d => d.id == this.form.info.districtId)
      let districtText = ward != undefined ? ', ' + district.name : ''
      let city =
        district != undefined
          ? district.city
          : this.form.cities.filter(c => c.id == this.form.info.cityId)
      let cityText = city != undefined ? ', ' + city.name : ''

      return this.form.info.address + wardText + districtText + cityText
    }
  },
  mounted: function () {
    var self = this
    // self.drawTheChart();
    self.getRetailerDetail()
    self.getRetailerInvoiceDetail()
    self.getCities()
    self.searchGeneral()
    self.searchDebt()
    //self.getRetailerDetailDebt()
  },
  methods: {
    requiredPhone(val) {
      return (val && val.length > 0) || this.$t('employee.create.please_enter_the_phone_number')
    },
    requiredPhoneFormat(val) {
      var regex = /^0(3|5|7|8|9)+([0-9]{8})$/
      // var regex = /^(?!.*(03|05|07|08|09).*\1)[0-9]{8,10}$/
      return regex.test(val) || this.$t('personal.please_enter_a_valid_phone_number')
    },
    validateMobileNumber () {
      var regex = /^(03|07|08|09|01[2|6|8|9])+([0-9]{8})$/
      if (!regex.test(this.form.info.mobile)) {
        this.$q.notify({
          color: 'negative',
          message: this.$t('personal.please_enter_a_valid_phone_number'),
          position: 'top'
        });
      }
      // return (
      //   (regex.test(val)) ||
      //   this.$t('personal.please_enter_a_valid_phone_number')
      // )
    },
    validateNumber (event) {
      const regex = /^[0-9]+$/;
      const key = String.fromCharCode(event.keyCode);
      if (!regex.test(key)) {
        event.preventDefault();
      }
    },
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
    drawTheChart: function () {
      // console.log(document.getElementById("chartReport"));
      // document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';
      // var ctx = document.getElementById("myChart").getContext("2d");
      // var myChart = new Chart(ctx, {
      //   type: "radar",
      //   data: {
      //     labels: [
      //       "Inventory",
      //       "Retailer",
      //       "Loyalty",
      //       "Scales force",
      //       "Debt",
      //       "Sales",
      //     ],
      //     datasets: [
      //       {
      //         label: "",
      //         data: [65, 59, 90, 81, 56, 40],
      //         fill: true,
      //         backgroundColor: "rgba(255, 99, 132, 0.2)",
      //         borderColor: "rgb(255, 99, 132)",
      //         pointBackgroundColor: "rgb(255, 99, 132)",
      //         pointBorderColor: "#fff",
      //         pointHoverBackgroundColor: "#fff",
      //         pointHoverBorderColor: "rgb(255, 99, 132)",
      //       },
      //     ],
      //   },
      //   options: {
      //     elements: {
      //       line: {
      //         borderWidth: 3,
      //       },
      //     },
      //     scales: {
      //       r: {
      //         angleLines: {
      //           display: false,
      //         },
      //         suggestedMin: 50,
      //         suggestedMax: 100,
      //       },
      //     },
      //   },
      // });
    },
    getRetailerDetail: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      axiosInstance.get('/retailers/' + retailerId).then(response => {
        self.retailerCode = response.data.data.retailer?.retailerCode
        // LocalStorage.set(Constants.RETAILER_CODE, self.retailerCode)
        self.retailerInfo = response.data.data.retailer

        let address = self.retailerInfo.fullAddress.split(',')
        self.address = address[0]
        self.ward = address[1]
        self.district = address[2]
        self.city = address[3]
        self.form.imageSrc = self.retailerInfo.image
      })
    },
    getDebtOrders: function () {
      var self = this
      let retailerCode = LocalStorage.getItem(Constants.RETAILER_CODE)
      if (!self.isGet) {
        self.debtOrderPagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      let segment = (self.debtOrderPagination.page - 1) * self.debtOrderPagination.rowsPerPage
      let url =
        '/debt/detail/search?segment=' +
        (self.debtOrderPagination.page - 1) *self.debtOrderPagination.rowsPerPage +
        '&offset=' +
        self.debtOrderPagination.rowsPerPage +
        '&keyWord=' + retailerCode
      if (this.fromDateDebt != '') {
        url += '&fromDate=' +
          date.formatDate(
            date.extractDate(self.fromDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      if (this.searchText.trim() != '') {
        url += '&orderCode=' + self.searchText
      }
      if (this.toDateDebt != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.debtOrderPagination.rowsNumber = response.data.data.count
          if (self.debtOrderPagination.rowsNumber != 0) {
            response.data.data.OrderSellins =
              response.data.data.OrderSellins.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            // self.debtOrderRows = response.data.data.OrderSellins
          }
          self.debtOrderRows = response.data.data.OrderSellins
        })
        .catch(error => {
          console.log(error)
          self.debtOrderRows = []
        })
    },
    // getRetailerDetailDebt: function () {
    //   var self = this
    //   let retailerCode = LocalStorage.getItem(Constants.RETAILER_CODE)
    //   if (retailerCode == null) {
    //     self.$router.push('/retailers')
    //     return
    //   }
    //   axiosInstance.get('/debt/detail?retailerCode=' + retailerCode).then(response => {
    //     // self.retailerInfo = response.data.data.retailer
    //     console.log('response',response)
    //     self.debtRetailer = response?.data?.data?.DebtDetail || { }

    //   })
    // },
    getRetailerInvoiceDetail: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      axiosInstance
        .get('/retailers/' + retailerId + '/invoiceInfo')
        .then(response => {
          self.retailerInvoiceInfo = response.data.data.info
          self.retailerInvoiceInfo.addressText =
            self.retailerInvoiceInfo.addressText.replace(/,/g, ', ')
        })
    },
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
    finishCropper: function (croppedImage) {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      let inputData = {}
      inputData['subjectId'] = retailerId
      inputData['avatar'] = croppedImage
      axiosInstance
        .post('/retailers/changeAvatar', inputData)
        .then(() => {
          Notify.create({
            message: self.$t('retailers.update_avatar_successful'),
            position: 'top',
            type: 'positive'
          })
          self.getRetailerDetail()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('retailers.update_avatar_failed'),
            position: 'top',
            type: 'negative'
          })
        })
    },
    getCities: function () {
      var self = this
      axiosInstance.get('/cities').then(response => {
        self.form.cities = response.data.data.cities
      })
    },
    onChangeCity: function () {
      this.cityChange = true
      this.getDistricts()
    },
    getDistricts: function () {
      var self = this
      self.form.districts = []
      axiosInstance
        .get('/districts?cityId=' + self.form.info.cityId)
        .then(response => {
          self.form.districts = response.data.data.districts
          if (self.cityChange) {
            self.form.info.districtId = self.form.districts[0].id
            self.getWards()
            self.cityChange = false
          }
        })
    },
    getWards: function () {
      var self = this
      self.form.wards = []
      axiosInstance
        .get('/wards?districtId=' + self.form.info.districtId)
        .then(response => {
          self.form.wards = response.data.data.wards
          self.form.info.wardId = self.form.wards[0].id
        })
    },
    changeStatusRetailer: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      let message =
        self.retailerInfo.status === 'ACTIVE'
          ? self.$t('retailers.paused_retailer_successful')
          : self.retailerInfo.status === 'STATUS_TWO'
          ? self.$t('retailers.approved_retailer_successful')
          : self.$t('retailers.activated_retailer_successful')
      axiosInstance
        .put('/retailers/' + retailerId + '/changeStatus')
        .then(() => {
          self.progress = false
          Notify.create({
            message: message,
            position: 'top',
            type: 'positive'
          })
          self.getRetailerDetail()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            //      message: self.$t('retailers.update_retailer_failed'),
            message: self.$t('retailers.exceeded_the_limit'),
            position: 'top',
            type: 'negative'
          })
        })
    },
    onDetail: function () {
      var self = this
      self.modal = true
      let dates = self.retailerInfo.birthday.split('/')
      let birthday = date.buildDate({
        year: dates[2],
        month: dates[1],
        date: dates[0]
      })

      self.form.info.address = self.retailerInfo.address
      self.form.info.birthday = date.formatDate(birthday, 'DD/MM/YYYY')
      self.form.info.cityId = self.retailerInfo.cityId
      self.form.info.districtId = self.retailerInfo.districtId
      self.form.info.email = self.retailerInfo.email
      self.form.info.fullName = self.retailerInfo.name
      self.form.info.id = self.retailerInfo.id
      self.form.info.mobile = self.retailerInfo.mobile
      self.form.info.retailerIdCard = self.retailerInfo.retailerIdCard
      self.form.info.retailerInvoice.id = self.retailerInvoiceInfo.id
      self.form.info.retailerInvoice.addressText =
        self.retailerInvoiceInfo.addressText
      self.form.info.retailerInvoice.bankAccountName =
        self.retailerInvoiceInfo.bankAccountName
      self.form.info.retailerInvoice.bankAccountNo =
        self.retailerInvoiceInfo.bankAccountNo
      self.form.info.retailerInvoice.bankBranch =
        self.retailerInvoiceInfo.bankBranch
      self.form.info.retailerInvoice.bankName =
        self.retailerInvoiceInfo.bankName
      self.form.info.retailerInvoice.retailerId = self.retailerInfo.id
      self.form.info.retailerInvoice.retailerInvoiceName =
        self.retailerInvoiceInfo.retailerInvoiceName
      self.form.info.retailerInvoice.taxNo = self.retailerInvoiceInfo.taxNo
      self.form.info.retailerInvoice.tel = self.retailerInvoiceInfo.tel
      self.form.info.retailerInvoice.telExt = ''
      self.form.info.retailerSign = self.retailerInfo.retailerSign
      self.form.info.status =
        self.retailerInfo.status == 'ACTIVE'
          ? 1
          : self.retailerInfo.status == 'STATUS_TWO'
          ? 2
          : 0
      self.form.info.wardId = self.retailerInfo.wardId
      self.getDistricts()
      self.getWards()
    },
    checkIdCard: function (idCard) {
      let reg9 = /^[\d]{9}$/
      let reg12 = /^[\d]{12}$/
      return reg9.test(idCard) || reg12.test(idCard)
    },
    updateRetailer: function () {
      var self = this
      if (!self.checkIdCard(self.form.info.retailerIdCard)) {
        Notify.create({
          message: self.$t('retailers.incorrect_card_id'),
          position: 'top',
          type: 'negative'
        })
        return
      }
      let inputData = {}
      self.progress = true
      inputData['address'] = self.form.info.address
      inputData['birthday'] = date.formatDate(
        date.extractDate(self.form.info.birthday, 'DD/MM/YYYY'),
        'YYYY-MM-DD'
      )
      inputData['cityId'] = self.form.info.cityId
      inputData['districtId'] = self.form.info.districtId
      inputData['email'] = self.form.info.email
      inputData['retailerIdCard'] = self.form.info.retailerIdCard
      inputData['fullname'] = self.form.info.fullName
      inputData['id'] = self.form.info.id
      self.form.info.retailerInvoice.retailerInvoiceName =
        self.form.info.retailerInvoice.retailerInvoiceName
      self.form.info.retailerInvoice.addressText =
        self.form.info.retailerInvoice.addressText
      inputData['retailerInvoice'] = self.form.info.retailerInvoice
      inputData['retailerSign'] = self.form.info.retailerSign
      inputData['status'] = self.form.info.status
      inputData['wardId'] = self.form.info.wardId
      axiosInstance
        .put('/retailers', inputData)
        .then(() => {
          self.progress = false
          self.modal = false
          Notify.create({
            message: self.$t('retailers.update_retailer_successful'),
            position: 'top',
            type: 'positive'
          })
          self.getRetailerDetail()
          self.getRetailerInvoiceDetail()
        })
        .catch(errors => {
          self.progress = false
          let message = self.$t('retailers.update_retailer_failed')
          if (errors.response.data.errors[0].code == '1202') {
            message = self.$t('retailers.incorrect_email')
          }
          Notify.create({
            message: message,
            position: 'top',
            type: 'negative'
          })
        })
    },
    searchGeneral: function () {
      var self = this
      self.getTotalOrdersCount()
      self.getSellinOrders()
      self.getTotalDebtOrderOverview()
      self.getSelloutOrders()
    },
    searchDebt: function () {
      var self = this
      self.getDebtOrders()
      self.getDebtHistory()
      self.getTotalDebtOrder()

    },
    getTotalOrdersCount: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      let url =
        '/retailers/' +
        retailerId +
        '/search?fromDate=' +
        date.formatDate(
          date.extractDate(self.fromDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        ) +
        '&toDate=' +
        date.formatDate(
          date.extractDate(self.toDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        )
      axiosInstance
        .get(url)
        .then(response => {
          self.sellins = response.data.data.retailerSellin
          self.sellouts = response.data.data.retailerSellout
        })
        .catch(() => {})
    },
    getTotalDebtOrderOverview:function (){
      var self = this
      let retailerCode = LocalStorage.getItem(Constants.RETAILER_CODE)
      if (retailerCode == null) {
        self.$router.push('/retailers')
        return
      }
      let url ='/debt/detail?retailerCode=' + retailerCode
      if (this.fromDate != '') {
        url += '&fromDate=' +
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
      axiosInstance
        .get(url)
        .then(response => {
          self.debtRetailerOverview = response?.data?.data?.DebtDetail || { }
        })
        .catch(() => {})
    },
    getTotalDebtOrder:function (){
      var self = this
      let retailerCode = LocalStorage.getItem(Constants.RETAILER_CODE)
      if (retailerCode == null) {
        self.$router.push('/retailers')
        return
      }
      let url ='/debt/detail?retailerCode=' + retailerCode
      if (this.fromDateDebt != '') {
        url += '&fromDate=' +
          date.formatDate(
            date.extractDate(self.fromDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      if (this.toDateDebt != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.debtRetailer = response?.data?.data?.DebtDetail || { }
        })
        .catch(() => {})
    },
    onSellinRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.sellinPagination.sortBy == sortBy) {
        if (
          (self.sellinPagination.page != page ||
            self.sellinPagination.rowsPerPage != rowsPerPage) &&
          self.sellinPagination.descending == descending
        ) {
          self.sellinPagination.page = page
          self.sellinPagination.rowsPerPage = rowsPerPage
          self.getSellinOrders()
        } else {
          if (self.sellinPagination.descending != descending) {
            self.sellinPagination.descending = descending
          } else {
            self.sellinPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.sellinPagination.sortBy = sortBy
      } else {
        if (self.sellinPagination.descending != descending) {
          self.sellinPagination.descending = descending
        } else {
          self.sellinPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.sellinPagination.sortBy) {
        case 'finalCost':
          sortFn = self.sellinPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.sellinPagination.descending
            ? (a, b) =>
                a[self.sellinPagination.sortBy] >
                b[self.sellinPagination.sortBy]
                  ? -1
                  : a[self.sellinPagination.sortBy] <
                    b[self.sellinPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.sellinPagination.sortBy] >
                b[self.sellinPagination.sortBy]
                  ? 1
                  : a[self.sellinPagination.sortBy] <
                    b[self.sellinPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.sellinRows.sort(sortFn)
    },
    getSellinOrders: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      let url =
        '/orders/sellin/retailer/search?retailerId=' +
        retailerId +
        '&segment=' +
        (self.sellinPagination.page - 1) * self.sellinPagination.rowsPerPage +
        '&offset=' +
        self.sellinPagination.rowsPerPage +
        '&fromDate=' +
        date.formatDate(
          date.extractDate(self.fromDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        ) +
        '&toDate=' +
        date.formatDate(
          date.extractDate(self.toDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        )
      axiosInstance
        .get(url)
        .then(response => {
          self.sellinRows = response.data.data.orderSellins
          self.sellinPagination.rowsNumber = response.data.data.count
        })
        .catch(() => {})
    },
    onSelloutRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.selloutPagination.sortBy == sortBy) {
        if (
          (self.selloutPagination.page != page ||
            self.selloutPagination.rowsPerPage != rowsPerPage) &&
          self.selloutPagination.descending == descending
        ) {
          self.selloutPagination.page = page
          self.selloutPagination.rowsPerPage = rowsPerPage
          self.getSelloutOrders()
        } else {
          if (self.selloutPagination.descending != descending) {
            self.selloutPagination.descending = descending
          } else {
            self.selloutPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.selloutPagination.sortBy = sortBy
      } else {
        if (self.selloutPagination.descending != descending) {
          self.selloutPagination.descending = descending
        } else {
          self.selloutPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.selloutPagination.sortBy) {
        case 'finalCost':
          sortFn = self.selloutPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.selloutPagination.descending
            ? (a, b) =>
                a[self.selloutPagination.sortBy] >
                b[self.selloutPagination.sortBy]
                  ? -1
                  : a[self.selloutPagination.sortBy] <
                    b[self.selloutPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.selloutPagination.sortBy] >
                b[self.selloutPagination.sortBy]
                  ? 1
                  : a[self.selloutPagination.sortBy] <
                    b[self.selloutPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.selloutRows.sort(sortFn)
    },
    onDebtOrderRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.debtOrderPagination.sortBy == sortBy) {
        if (
          (self.debtOrderPagination.page != page ||
            self.debtOrderPagination.rowsPerPage != rowsPerPage) &&
          self.debtOrderPagination.descending == descending
        ) {
          self.debtOrderPagination.page = page
          self.debtOrderPagination.rowsPerPage = rowsPerPage
          self.getDebtOrders()
        } else {
          if (self.debtOrderPagination.descending != descending) {
            self.debtOrderPagination.descending = descending
          } else {
            self.debtOrderPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.debtOrderPagination.sortBy = sortBy
      } else {
        if (self.debtOrderPagination.descending != descending) {
          self.debtOrderPagination.descending = descending
        } else {
          self.debtOrderPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.debtOrderPagination.sortBy) {
        case 'finalCost':
          sortFn = self.debtOrderPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.debtOrderPagination.descending
            ? (a, b) =>
                a[self.debtOrderPagination.sortBy] >
                b[self.debtOrderPagination.sortBy]
                  ? -1
                  : a[self.debtOrderPagination.sortBy] <
                    b[self.debtOrderPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.debtOrderPagination.sortBy] >
                b[self.debtOrderPagination.sortBy]
                  ? 1
                  : a[self.debtOrderPagination.sortBy] <
                    b[self.debtOrderPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.debtOrderRows.sort(sortFn)
    },
    onDebtHistoryRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.debtHistoryPagination.sortBy == sortBy) {
        if (
          (self.debtHistoryPagination.page != page ||
            self.debtHistoryPagination.rowsPerPage != rowsPerPage) &&
          self.debtHistoryPagination.descending == descending
        ) {
          self.debtHistoryPagination.page = page
          self.debtHistoryPagination.rowsPerPage = rowsPerPage
          self.getDebtHistory()
        } else {
          if (self.debtHistoryPagination.descending != descending) {
            self.debtHistoryPagination.descending = descending
          } else {
            self.debtHistoryPagination.descending = !descending
          }
        }
      }
      if (sortBy) {
        self.debtHistoryPagination.sortBy = sortBy
      } else {
        if (self.debtHistoryPagination.descending != descending) {
          self.debtHistoryPagination.descending = descending
        } else {
          self.debtHistoryPagination.descending = !descending
        }
      }

      let sortFn
      switch (self.debtHistoryPagination.sortBy) {
        case 'finalCost':
          sortFn = self.debtHistoryPagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
          break

        default:
          sortFn = self.debtHistoryPagination.descending
            ? (a, b) =>
                a[self.debtHistoryPagination.sortBy] >
                b[self.debtHistoryPagination.sortBy]
                  ? -1
                  : a[self.debtHistoryPagination.sortBy] <
                    b[self.debtHistoryPagination.sortBy]
                  ? 1
                  : 0
            : (a, b) =>
                a[self.debtHistoryPagination.sortBy] >
                b[self.debtHistoryPagination.sortBy]
                  ? 1
                  : a[self.debtHistoryPagination.sortBy] <
                    b[self.debtHistoryPagination.sortBy]
                  ? -1
                  : 0
          break
      }
      self.debtHistoryRows.sort(sortFn)
    },
    getDebtHistory: function () {
      var self = this
      let retailerCode = LocalStorage.getItem(Constants.RETAILER_CODE)
      if (!self.isGet) {
        self.pagination.page = 1
        self.isFilter = false
        self.isSearch = false
        self.isGet = true
      }
      self.searchText = ''
      let segment = (self.debtHistoryPagination.page - 1) * self.debtHistoryPagination.rowsPerPage
      let url =
        '/debt/detail/initial/credit?segment=' +
        (self.debtHistoryPagination.page - 1) *self.debtHistoryPagination.rowsPerPage +
        '&offset=' +
        self.debtHistoryPagination.rowsPerPage +
        '&keyWord=' + retailerCode
      if (this.fromDateDebt != '') {
        url += '&fromDate=' +
          date.formatDate(
            date.extractDate(self.fromDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }

      if (this.toDateDebt != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDateDebt, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.debtHistoryPagination.rowsNumber = response.data.data.count
          if (self.debtHistoryPagination.rowsNumber != 0) {
            response.data.data.DebtUpdateHistory =
              response.data.data.DebtUpdateHistory.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
          }
          self.debtHistoryRows = response.data.data.DebtUpdateHistory
        })
        .catch(error => {
          console.log(error)
          self.debtHistoryRows = []
        })
    },
    getSelloutOrders: function () {
      var self = this
      let retailerId = LocalStorage.getItem(Constants.RETAILER_ID)
      if (retailerId == null) {
        self.$router.push('/retailers')
        return
      }
      let url =
        '/orders/sellout/retailer/search?retailerId=' +
        retailerId +
        '&segment=' +
        (self.selloutPagination.page - 1) * self.selloutPagination.rowsPerPage +
        '&offset=' +
        self.selloutPagination.rowsPerPage +
        '&fromDate=' +
        date.formatDate(
          date.extractDate(self.fromDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        ) +
        '&toDate=' +
        date.formatDate(
          date.extractDate(self.toDate, 'DD/MM/YYYY'),
          'YYYY-MM-DD'
        )
      axiosInstance
        .get(url)
        .then(response => {
          self.selloutRows = response.data.data.orderSellouts
          self.selloutPagination.rowsNumber = response.data.data.count
        })
        .catch(() => {})
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
