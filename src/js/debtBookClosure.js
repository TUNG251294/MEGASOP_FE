import { defineComponent } from 'vue'
import { date, Notify, LocalStorage } from 'quasar'
import { axiosInstance } from 'src/boot/axios'
import { Constants } from 'src/boot/Constants'
export default defineComponent({
  name: 'debtBookClosure',
  data() {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      debtBookClosures: [],
      interest: 0,
      years: 0,
      total: 0,
      monthly: 0,
      is_focusInputSearch: false,
      modal: false,
      activateModal: false,
      uploadFile: false,
      fileName: '',
      canUpload: false,
      progress: false,
      failureList: [],
      staff: [],
      isTooltipVisible: false,
      tooltipContent: '',

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
      form: [
        {
          id: 0,
          retailerCode: '',
          retailerPhone: '',
          retailerName: '',
          retailerAddress: '',
          debtLimit: '',
          debtTerm: '',
          overdraftLimit: ''
        }
      ]
    }
  },
  computed: {
    columnsI18n: function () {
      return [
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
          name: 'accountBalance',
          label: this.$t('debt.value_overdraft'),
          align: 'right',
          field: 'accountBalance',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'accountReceivable',
          label: this.$t('debt.credit_limit'),
          align: 'right',
          field: 'accountReceivable',
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
          name: 'availabilityLimit',
          label: this.$t('debt.availability_limit'),
          align: 'right',
          field: 'availabilityLimit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'debtTerm',
          label: this.$t('debt.debt_term'),
          align: 'right',
          field: 'debtTerm',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'debtEndOfTerm',
          label: this.$t('debt.debt_end_of_term_col'),
          align: 'right',
          field: 'debtEndOfTerm',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    var self = this
    self.getDebtBookClosures()
  },
  methods: {
    onNew: function () {},
    goToDetailRetailer: function (item) {
      // console.log('id',id)
      LocalStorage.set('rt_i_pt', item?.id)
      LocalStorage.set('rt_c_pt', item?.retailerCode)
      this.$router.push('/retailer-detail')
    },
    getDebtBookClosures: function () {
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
        '/retailer/books/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
        self.selected = []
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerBook =
              response.data.data.retailerBook.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.debtBookClosures = response.data.data.retailerBook
          }
        })
        .catch(error => {
          self.debtBookClosures = []
        })
    },

    filterDebtBookClosures: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebtBookClosures()
        return
      }
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isFilter = true
        self.isSearch = false
        self.isGet = false
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let url =
        '/retailer/books/search?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyword=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          console.log(url)
          console.log(response)
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerBook =
              response.data.data?.retailerBook != 'failing'
                ? response.data.data?.retailerBook?.map((obj, index) => ({
                    ...obj,
                    index: segment + index + 1
                  }))
                : []
            self.debtBookClosures = response.data.data.retailerBook
          }
        })
        .catch(error => {
          console.log(error)
          self.debtBookClosures = []
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
            self.filterDebtBookClosures()
            return
          }
          if (self.isSearch) {
            self.getDebtBookClosures()
          } else {
            self.getDebtBookClosures()
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
      self.debtBookClosures.sort(sortFn)
    },
    onSubmit: function () {
      var self = this
      self.progress = true
      const inputData = self.selected.map(item => {
        return {
          accountBalance: item?.accountBalance || 0,
          accountReceivable: item?.accountReceivable || 0,
          availableCredit: item?.availableCredit || 0,
          createLimit: item?.createLimit || 0,
          overDraftCredit: item?.overDraftCredit || 0,
          paymentPeriod: item?.paymentPeriod || 0,
          retailerCode: item?.retailerCode || 0,
          retailerName: item?.retailerName || 0
        }
      })
      axiosInstance
        .post('/retailer/books/create', [...inputData])
        .then(response => {
          if (response?.data?.data?.retailerBook[0]?.id) {
            self.progress = false
            self.modal = false
            self.$q.notify({
              color: 'positive',
              message: 'Chốt sổ thành công',
              icon: 'check_circle',
              position: 'top'
            })
            self.getDebtBookClosures()
          } else {
            self.progress = false
            self.$q.notify({
              color: 'danger',
              message: 'Chốt sổ thất bại',
              icon: 'check_circle',
              position: 'top'
            })
          }
        })
        .catch(e => {
          self.progress = false
          self.$q.notify({
            color: 'danger',
            message: 'Chốt sổ thất bại',
            icon: 'check_circle',
            position: 'top'
          })
        })
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
