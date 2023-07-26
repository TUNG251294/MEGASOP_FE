import { defineComponent } from 'vue'
import { date, Notify } from 'quasar'
import { axiosInstance } from 'src/boot/axios'
import { Constants } from 'src/boot/Constants'
import * as XLSX from 'xlsx'
export default defineComponent({
  name: 'debtHistoryBookClosure',
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
      is_focusInputSearch: false,
      monthly: 0,
      modal: false,
      activateModal: false,
      uploadFile: false,
      fileName: '',
      canUpload: false,
      progress: false,
      failureList: [],
      staff: [],
      rows: [],
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
          name: 'creditLimit',
          label: this.$t('debt.credit_limit'),
          align: 'right',
          field: 'creditLimit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'overdraftCredit',
          label: this.$t('debt.overdraft_limit'),
          align: 'right',
          field: 'overdraftCredit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'availableCredit',
          label: this.$t('debt.availability_limit'),
          align: 'right',
          field: 'availableCredit',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'accountReceivable',
          label: this.$t('debt.debt_end_of_term_col'),
          align: 'right',
          field: 'accountReceivable',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'bookDate',
          label: this.$t('debt.book_closure_date'),
          align: 'right',
          field: 'bookDate',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'createBy',
          label: this.$t('debt.book_closure_user'),
          align: 'left',
          field: 'createBy',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    }
  },
  mounted: function () {
    var self = this;
    self.getDebtHistoryBookClosures();
  },
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
    exportExcel() {
      console.log(this.pagination.rowsPerPage)
      console.log(this.pagination.page)
      console.log('text' , this.searchText)
      let url = '/retailer/books/history/export?segment='+(this.pagination.page - 1)+'&offset='+(this.pagination.rowsPerPage)
      if (this.searchText != '') {
        url += '&keyWord=' + this.searchText
      }
      if (this.fromDate != '') {
        url += '&fromDate=' +
          date.formatDate(
            date.extractDate(this.fromDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      if (this.toDate != '') {
        url +=
          '&toDate=' +
          date.formatDate(
            date.extractDate(this.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }
      axiosInstance({
        method: 'get',
        url,
        responseType: 'blob'
      })
        .then(response => {
          const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'Lich_su_chot_so.xlsx');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.error('Download error:', error);
        });
    },
    getDebtHistoryBookClosures: function () {
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
        '/retailer/books/search/history?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
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
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerBookHistory =
              response.data.data.retailerBookHistory.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.rows = response.data.data.retailerBookHistory
            self.initRetailers = self.rows
          }
        })
        .catch(error => {
          self.rows = []
        })
    },
    searchDebtHistoryBookClosures: function () {
      var self = this
      if (!self.isSearch) {
        self.pagination.page = 1
        self.isSearch = true
        self.isFilter = false
        self.isGet = false
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      console.log(segment)
      let url =
        '/retailer/books/search/history?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
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
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.retailerBookHistory =
              response.data.data.retailerBookHistory.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
          }
          self.rows = response.data.data.retailerBookHistory
          self.initRetailers = response.data.data.retailerBookHistory
        })
        .catch(error => {
          console.log(error)
          self.rows = []
        })
    },
    filterDebtHistoryBookClosures: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getDebtHistoryBookClosures()
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
        '/retailer/books/search/history?segment=' +
        (self.pagination.page - 1) * self.pagination.rowsPerPage +
        '&offset=' +
        self.pagination.rowsPerPage
      if (self.searchText.trim() != '') {
        url += '&keyWord=' + self.searchText
      }
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
          self.pagination.rowsNumber = response.data.data.count
          response.data.data.retailerBookHistory =
            response.data.data.retailerBookHistory.map((obj, index) => ({
              ...obj,
              index: segment + index + 1
            }))
          self.rows = response.data.data.retailerBookHistory
          self.initRetailers = response.data.data.retailerBookHistory
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
            self.filterDebtHistoryBookClosures()
            return
          }
          if (self.isSearch) {
            self.searchDebtHistoryBookClosures()
          } else {
            self.getDebtHistoryBookClosures()
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
    showTooltip(content) {
      this.tooltipContent = content
      this.isTooltipVisible = true
    },
    hideTooltip() {
      this.isTooltipVisible = false
    }
  }
})
