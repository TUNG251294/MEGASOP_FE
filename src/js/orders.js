import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { date, LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'
import SvgIcon from 'components/SvgIcon.vue'

export default defineComponent({
  name: 'Đơn hàng sellin',
  components: {
    SvgIcon
  },
  data: function () {
    return {
      fromDate: date.formatDate(
        date.subtractFromDate(Date.now(), { days: 7 }),
        'DD/MM/YYYY'
      ),
      inforUser: {
        companyName: '',
        tel: ''
      },
      currentDay: date.formatDate(Date.now(), 'DD'),
      currentMonth: date.formatDate(Date.now(), 'MM'),
      currentYear: date.formatDate(Date.now(), 'YYYY'),
      toDate: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      date: date.formatDate(Date.now(), 'DD/MM/YYYY'),
      dateHour: date.formatDate(Date.now(), 'DD/MM/YYYY HH:mm'),
      orders: [],
      initOrders: [],
      selected: [],
      modal: false,
      order: {},
      // orderStatus: ['FINISH', 'CANCELED', 'NEW', 'APPROVED', 'DELIVERED', 'RETURN'],
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
      colorStatus: {
        FINISH: 'success',
        CANCELED: 'danger',
        NEW: 'warning',
        APPROVED: 'lime',
        DELIVERED: 'blue',
        RETURN: 'indigo'
      },

      statusValue: '0',

      cancelation: false,
      searchText: '',

      cancelReason: '0',
      reason: '',
      result: false,

      resultOption: '0',
      resultReason: '',
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'orderCode',
        descending: false,
      },
      retailerAddress: '',
      minUnits: [],
      delivery: false,
      warehouses: [],
      warehouseId: 0,
      compareItems: [],
      isValidToDelivery: false,
      progress: false,
      isSearch: false,
      isGet: false,
      isFilter: false,
      skuArr: [],
      expand: false,
      orderCount: {},
      is_focusInputSearch: false,
      pageNumbers: 1,
      dataLoading: true
    }
  },
  mounted: async function () {
    await this.getMinUnits()
    await this.getWarehouses()
    await this.getOrderCount()
    await this.getOrders()
    await this.getCompanyInformation()

    if (this.$route?.query?.id) {
      await this.onDetailByNotification()
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
    optionsI18n: function () {
      return [
        {
          label: this.$t('order_list.product_is_out_of_stock'),
          value: '1',
          color: 'primary'
        },
        {
          label: this.$t('order_list.customer_request'),
          value: '2',
          color: 'primary'
        },
        {
          label: this.$t('order_list.another_reason'),
          value: '3',
          color: 'primary'
        }
      ]
    },
    resultOptionsI18n: function () {
      return [
        {
          label: this.$t('order_list.all_orders_have_been_delivered'),
          value: '1',
          color: 'primary'
        },
        {
          label: this.$t('order_list.the_order_has_been_returned'),
          value: '2',
          color: 'primary'
        }
      ]
    },
    columnsI18n: function () {
      return [
        {
          name: 'orderCode',
          label: this.$t('order_list.order_code'),
          align: 'left',
          field: 'orderCode',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'retailerInvoiceName',
          label: this.$t('order_list.name_of_customer'),
          align: 'left',
          field: 'retailerInvoiceName',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'tel',
          label: this.$t('order_list.phone_number'),
          align: 'left',
          field: 'tel',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderDate',
          label: this.$t('order_list.order_creation_time'),
          align: 'left',
          field: 'orderDate',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'finalCost',
          label: this.$t('order_list.total_amount'),
          align: 'left',
          field: 'finalCost',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderCreator',
          label: this.$t('order_list.order_creator'),
          align: 'left',
          field: 'orderCreator',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'orderStatus',
          label: this.$t('order_list.status'),
          align: 'left',
          field: 'orderStatus',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    skuColumnsI18n: function () {
      return [
        {
          name: 'sku',
          label: this.$t('sku.sku_code'),
          align: 'left',
          field: 'sku',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'productName',
          label: this.$t('sku.sku_name'),
          align: 'left',
          field: 'productName',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitId',
          label: this.$t('inventory_list.unit'),
          align: 'left',
          field: 'unitId',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'totalAmount',
          label: this.$t('promotions.amount'),
          align: 'right',
          field: 'totalAmount',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'unitPrice',
          label: this.$t('order_list.unit_price'),
          align: 'right',
          field: 'unitPrice',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        // {
        //   name: "totalCost",
        //   label: "Thành tiền",
        //   align: "right",
        //   field: "totalCost",
        //   sortable: true,
        //   headerClasses: "text-uppercase font-weight-bolder",
        // },
        // {
        //   name: "discount",
        //   label: "Chiết khấu",
        //   align: "right",
        //   field: "discount",
        //   sortable: true,
        //   headerClasses: "text-uppercase font-weight-bolder",
        // },
        {
          name: 'finalCost',
          label: this.$t('order_list.total'),
          align: 'right',
          field: 'finalCost',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        }
      ]
    },
    deliveryColumnsI18n: function () {
      return [
        {
          name: 'productVariationName',
          label: this.$t('sku.sku_name'),
          align: 'left',
          field: 'productVariationName',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'countInOrder',
          label: this.$t('promotions.amount'),
          align: 'right',
          field: 'countInOrder',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'countInWarehouse',
          label: this.$t('order_list.inventory_number'),
          align: 'right',
          field: 'countInWarehouse',
          sortable: true,
          headerClasses: 'text-uppercase font-weight-bolder'
        },
        {
          name: 'available',
          label: '',
          align: 'center',
          field: 'available'
        }
      ]
    }
  },
  methods: {
    printOrders: function () {
      const mywindow = window.open('', 'PRINT', 'height=1080,width=1920')

      mywindow.document.write(
        `</head><body>
            <style>
              body * {
                font-family:  'Times New Roman', 'serif';
                font-size:14px;
              }
              .footer {
                // font-size: 14px;
                text-align: center;
                width:100%;
                flex-direction: row;
              }
              header {
                // font-size: 14px;
                text-align: right;
                margin-right:20px;
                width:94%;
                
              }
              .content {position:relative;min-height:100vh}
              @media print{
                .orderPrintContainer {
                    display: block;
                    color-adjust: exact;  
                    -webkit-print-color-adjust: exact; 
                  }
                .orderPrintWrapper {
                  padding: 0px 24px 16px 16px;
                  clear: both;
                  page-break-after: always;
                  page-break-before: always; 
                  position: relative;    
                  color-adjust: exact;  
                  -webkit-print-color-adjust: exact; 
                }
                .header > div:first-child > p {
                  margin: 0.5rem 0;
                }
                .printHeader {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                }
                .printHeader > div:first-of-type {
                  display: flex;
                  flex-direction:column;
                }
                .printHeader > div:first-of-type > p{
                  padding-bottom:0;
                  margin-bottom:0;
                  margin-top:0.5rem;
                }
                .printHeader .dayRequire {
                  margin-bottom:100px;
                
                }
                .logoWrapper {
                  // display: block;
                  // width: 320px;
                  // height: 80px;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0.1;
                  transform: rotate(315deg);
                }
                .logoWrapper img {
                  display: block;
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                }  
                .deliveryNote {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }  
                .deliveryNote > p {
                  padding-bottom:0;
                  margin-bottom:0;
                }
                .deliveryNote > p:first-of-type {
                  font-weight:600;
                  font-size:24px;
                  margin:2rem 0 1.5rem;
                }
                .summaryInfoList {
                  display: flex;
                  flex-direction: column;
                  align-items: start;
                  justify-content: start;
                }
                .summaryInfoItem {
                  display: flex;
                  align-items: flex-start;
                }
                .summaryInfoItem > p {
                  margin-bottom:0;
                  padding-bottom:0;
                  margin-top:0.5rem;
                }
                .summaryInfoItem > p:first-child {
                  min-width: 100px;
                }
            
                .orderTable {
                  border-collapse: collapse;
                  width: 100%;
                  text-align: center;
                  page-break-inside:auto;
                  margin-top:24px;
                }
                .orderTable tr {
                  page-break-inside:avoid;
                   page-break-after:auto;
                }
                .orderTable th {
                  border: 1px solid #c7d5ed;
                  background-color: #e6f0f8;
                  padding:4px 8px;
                  white-space:nowrap;
                }
                .orderTable td {
                  border: 1px solid #c7d5ed;
                  padding:4px 8px;
                }
                .paymentTable {
                             
                  border-collapse: collapse;
                   width: 100%;            
                  page-break-inside:avoid;
                  margin-top:1rem;
                }
                .paymentTable tr {
                  /*border: 1px solid #c7d5ed;*/
                  page-break-inside:avoid; 
                  page-break-after:auto;
                }
                .paymentTable tr td {       
                  width: calc(100% / 3);
                  padding:4px 8px;
                }
                .paymentTable tr td:first-child {
                  width: 60%;
                }
                .paymentTable tr td:last-of-type {
                  width: 40%;
                  font-weight: 600;
                  text-align: right;
                }
                .paymentTable .promotionItem{
                  padding-left:42px;
                  width:50%;
                }
                .item{
                  word-wrap: break-word;
                }
                .signList {
                  display: flex;
                  justify-content: space-around;
                  page-break-inside:avoid;
                  align-items: center;
                  margin-top:16px;
                  height:70px;
                }
                .signItem {
                  with:33.33%;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                }
                .signItem p {
                  margin: 0px;
                  padding: 0px;
                }
                .signItem p:first-of-type {
                  font-weight:600;
                }
                .header{
                  min-height: 40px;
                  margin-bottom:20px;
                }
                .footer, .footer-space {
                  height: 20px;         
                }
                .header {
                  position: absolute;
                  top: 0;
                }
                .footer {
                  position: fixed;
                  bottom: 0;            
                }
              }
            </style> `
      )

      mywindow.document.write(
        document.querySelector('.orderPrintContainer').innerHTML
      )

      mywindow.document.write(`</body></html>`)

      mywindow.document.close() // necessary for IE >= 10
      mywindow.focus() // necessary for IE >= 10*/

      setTimeout(function () {
        mywindow.print()
        mywindow.close()
      }, 500)

      return true
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

    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
      })
    },

    getMinUnits: function () {
      var self = this
      axiosInstance.get('/units').then(response => {
        self.minUnits = response.data.data.units
      })
    },

    getOrderCount: function () {
      var self = this
      axiosInstance
        .get(
          '/orders/sellin/count?fromDate=' +
            date.formatDate(Date.now(), 'YYYY-MM-DD')
        )
        .then(response => {
          self.orderCount = response.data.data
        })
        .catch(() => {})
    },

    getOrders: function () {
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
      let url =
        '/orders/sellin/search?retailerId=-1&segment=' +
        segment +
        '&offset=' +
        offset

      let dateSearch = this.$route.query.date
      if (undefined !== dateSearch && '' !== dateSearch) {
        self.fromDate = dateSearch

        url +=
          '&fromDate=' +
          date.formatDate(
            date.extractDate(dateSearch, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          ) +
          '&toDate=' +
          date.formatDate(
            date.extractDate(self.toDate, 'DD/MM/YYYY'),
            'YYYY-MM-DD'
          )
      }

      let statusSearch = this.$route.query.status
      if (undefined !== statusSearch && '' !== statusSearch) {
        self.statusValue = statusSearch

        url += '&status=' + self.statusValue
      }

      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          self.selected = []
          self.progress = false
          self.dataLoading = false
          if (self.pagination.rowsNumber != 0) {
            response.data.data.OrderSellins =
              response.data.data.OrderSellins.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.orders = response.data.data.OrderSellins
            self.initOrders = response.data.data.OrderSellins

            if (self.orders) {
              self.pagesNumber = Math.ceil(self.pagination.rowsNumber / self.pagination.rowsPerPage)
            }
          } else {
            self.orders = []
            self.initOrders = []
          }
        })
        .catch(err => {
          self.progress = false
        })
    },

    onRequest: function (props) {
      var self = this
      let { page, rowsPerPage, sortBy, descending } = props.pagination
      if (self.pagination.sortBy == sortBy) {
        if (
          (self.pagination.page != page ||
            self.pagination.rowsPerPage != rowsPerPage) &&
          self.pagination.descending == descending
        ) {
          self.pagination.page = page
          self.pagination.rowsPerPage = rowsPerPage
          if (self.isSearch) {
            self.search()
          } else if (self.isGet) {
            self.getOrders()
          } else {
            self.filterOrders()
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
      } else {
        if (self.pagination.descending != descending) {
          self.pagination.descending = descending
        } else {
          self.pagination.descending = !descending
        }
      }

      let sortFn
      switch (self.pagination.sortBy) {
        case 'finalCost':
          sortFn = self.pagination.descending
            ? (a, b) => b.finalCost - a.finalCost
            : (a, b) => a.finalCost - b.finalCost
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
      self.orders.sort(sortFn)
    },

    onDetail: function (row) {
      var self = this
      // let retailerId = LocalStorage.getItem(Constants.RETAILER_ID);
      self.order = row
      if (self.order.rewardItems.length > 0) {
        self.order.sellinItems = self.order.sellinItems.map(obj => ({
          ...obj,
          isReward: false
        }))
        self.order.rewardItems = self.order.rewardItems.map(obj => ({
          ...obj,
          isReward: true
        }))
        self.order.sellinItems = self.order.sellinItems.concat(
          self.order.rewardItems
        )
        // self.order.rewardItems = []
      } else {
        self.order.sellinItems = self.order.sellinItems.map(obj => ({
          ...obj,
          isReward: false
        }))
      }
      self.modal = true
      self.retailerAddress = row.invoiceAddress
      // if (retailerId == null || retailerId == "" || retailerId != row.retailerId) {
      //   LocalStorage.set(Constants.RETAILER_ID, row.retailerId);
      //   self.getRetailerDetail(row.retailerId);
      // }
    },

    onDetailByNotification: function () {
      let reqId = this.$route.query.id
      if (reqId) {
        axiosInstance
          .get('/orders/sellin/' + reqId)
          .then(response => {
            this.onDetail(response.data.data.order)
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    getRetailerDetail: function (id) {
      var self = this
      axiosInstance.get('/retailers/' + id).then(response => {
        self.retailerAddress = response.data.data.retailer.address
      })
    },

    cancelOrder: function () {
      var self = this
      self.cancelation = true
      self.result = false
      // self.modal = false
      self.reason = ''
      self.cancelReason = '0'
    },

    confirmCancelOrder: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['orderSellinId'] = self.order.id
      inputData['retailerId'] = self.order.retailerId
      if (self.order.orderStatus == 'NEW') {
        inputData['cancelType'] =
          self.cancelReason == 1
            ? 'STOCK_EMPTY'
            : self.cancelReason == 2
            ? 'CUSTOMER_REQUEST'
            : 'OTHER'
      } else if (self.order.orderStatus == 'APPROVED') {
        inputData['cancelType'] = 'CANCEL_APPROVED_ORDER'
      } else {
        inputData['cancelType'] = 'OTHER'
      }

      if (
        ((self.cancelReason == '0' || self.cancelReason == 3) &&
          self.order.orderStatus == 'NEW') ||
        self.order.orderStatus == 'APPROVED'
      ) {
        inputData['reason'] = self.reason
      } else {
        let reason = self.optionsI18n.filter(
          item => item.value == self.cancelReason
        )[0]
        inputData['reason'] = reason.label
      }
      axiosInstance
        .put('/orders/sellin/state/canceled', inputData)
        .then(() => {
          self.cancelation = false
          self.modal = false
          Notify.create({
            message: `${this.$t('order_list.order')} ${
              self.order.orderCode
            } ${this.$t('order_list.canceled_successfully')}!`,
            type: 'positive',
            position: 'top'
          })
          self.getOrders()
          self.getOrderCount()
        })
        .catch(err => {
          self.progress = false
        })
    },

    cancelCancelOrder: function () {
      var self = this
      self.cancelation = false
      self.modal = true
    },

    confirmOrder: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['orderSellinId'] = self.order.id
      inputData['retailerId'] = self.order.retailerId
      axiosInstance
        .post('/orders/sellin/state/approved', inputData)
        .then(() => {
          self.modal = false
          Notify.create({
            message: `${this.$t('order_list.order')} ${
              self.order.orderCode
            } ${this.$t('order_list.confirmed_successfully')}!`,
            type: 'positive',
            position: 'top'
          })
          self.getOrders()
          self.getOrderCount()
        })
        .catch(error => {
          if (error.response.data.errors[0].code == '1902' || error.response.data.errors[0].code == '1901') {
            Notify.create({
              message: `${this.$t(
                'order_list.not_enough_stock_for_the_order'
              )} ${self.order.orderCode}!`,
              type: 'negative',
              position: 'top'
            })
          }
          self.progress = false
        })
    },

    deliveryOrder: function () {
      var self = this
      self.delivery = true
      self.cancelation = false
      self.result = false
      // self.modal = false
      self.warehouseId = 0
      self.initCompare()
    },

    cancelDeliveryOrder: function () {
      var self = this
      self.delivery = false
      // self.modal = true
      self.cancelation = false
      self.result = false
    },

    cancelResult: function () {
      var self = this
      self.cancelation = false
      self.result = false
      // self.modal = true
    },

    compareToWarehouse: function () {
      var self = this
      if (self.warehouseId == 0) {
        self.initCompare()
        return
      }
      axiosInstance
        .get(
          '/orders/sellin/' +
            self.order.id +
            '/compareToWarehouse?warehouseId=' +
            self.warehouseId
        )
        .then(response => {
          self.compareItems = response.data.data.items
          if (self.compareItems.length == 0) {
            self.initCompare()
          } else {
            self.compareAmount()
          }
        })
    },

    initCompare: function () {
      var self = this
      self.compareItems = []
      // self.order.sellinItems.forEach((element) => {
      //   let item = {};
      //   item["productVariationName"] = element.productName;
      //   item["countInOrder"] = element.totalAmount;
      //   item["countInWarehouse"] = 0;
      //   item["available"] = false;
      //   self.compareItems.push(item);
      // });
      self.isValidToDelivery = false
    },

    compareAmount: function () {
      var self = this
      self.isValidToDelivery = true
      self.compareItems.forEach(item => {
        if (item.countInOrder <= item.countInWarehouse) {
          item['available'] = true
        } else {
          item['available'] = false
          self.isValidToDelivery = false
        }
      })
    },

    confirmDeliveryOrder: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['orderSellinId'] = self.order.id
      inputData['retailerId'] = self.order.retailerId
      inputData['warehouseId'] = self.warehouseId
      axiosInstance
        .put('/orders/sellin/state/delivered', inputData)
        .then(() => {
          self.delivery = false
          self.modal = false

          Notify.create({
            message: `${this.$t('order_list.order')} ${
              self.order.orderCode
            } ${this.$t('order_list.being_delivered')}!`,
            type: 'positive',
            position: 'top'
          })
          self.getOrders()
          self.getOrderCount()
        })
        .catch(() => {
          self.progress = false
        })
    },

    finishOrder: function () {
      var self = this
      self.cancelation = false
      self.result = true
      // self.modal = false
      self.resultOption = '0'
      self.resultReason = ''
      self.warehouseId = 0
    },

    confirmFinishOrder: function () {
      var self = this
      if (self.resultOption == 1) {
        self.finish()
      } else {
        self.returnOrder()
      }
    },

    finish: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['orderSellinId'] = self.order.id
      inputData['retailerId'] = self.order.retailerId
      axiosInstance
        .post('/orders/sellin/state/finish', inputData)
        .then(() => {
          self.modal = false
          self.result = false
          Notify.create({
            message: `${this.$t('order_list.order')} ${
              self.order.orderCode
            } ${this.$t('order_list.have_been_delivered')}!`,
            type: 'positive',
            position: 'top'
          })
          self.getOrders()
          self.getOrderCount()
        })
        .catch(() => {
          self.progress = false
        })
    },

    returnOrder: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['orderSellinId'] = self.order.id
      inputData['retailerId'] = self.order.retailerId
      inputData['reason'] = self.resultReason
      inputData['warehouseId'] = self.warehouseId
      axiosInstance
        .post('/orders/sellin/state/return', inputData)
        .then(() => {
          self.modal = false
          self.result = false
          Notify.create({
            message: `${this.$t('order_list.order')} ${
              self.order.orderCode
            } ${this.$t('order_list.be_returned')}!`,
            type: 'warning',
            position: 'top'
          })
          self.getOrders()
          self.getOrderCount()
        })
        .catch(() => {
          self.progress = false
        })
    },

    search: function () {
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
        '/orders/sellin/search?retailerId=-1&segment=' +
        segment +
        '&offset=' +
        offset +
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
      if (self.statusValue != 0) {
        url += '&status=' + self.statusValue
      }
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          self.selected = []
          self.progress = false
          if (self.pagination.rowsNumber != 0) {
            response.data.data.OrderSellins =
              response.data.data.OrderSellins.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.orders = response.data.data.OrderSellins
            self.initOrders = response.data.data.OrderSellins
          } else {
            self.orders = []
            self.initOrders = []
          }
        })
        .catch(() => {
          self.progress = false
        })
    },

    filterOrders: function () {
      var self = this
      if (!self.isFilter) {
        self.pagination.page = 1
        self.isSearch = false
        self.isGet = false
        self.isFilter = true
      }
      if (self.searchText.trim() == '') {
        self.getOrders()
        return
      }
      let segment = (self.pagination.page - 1) * self.pagination.rowsPerPage
      let offset = self.pagination.rowsPerPage
      let url =
        '/orders/sellin/search?retailerId=-1&segment=' +
        segment +
        '&offset=' +
        offset
      url += '&keyWord=' + self.searchText.trim()
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          self.selected = []
          self.progress = false
          if (self.pagination.rowsNumber != 0) {
            response.data.data.OrderSellins =
              response.data.data.OrderSellins.map((obj, index) => ({
                ...obj,
                index: segment + index + 1
              }))
            self.orders = response.data.data.OrderSellins
            self.initOrders = response.data.data.OrderSellins
          } else {
            self.orders = []
            self.initOrders = []
          }
        })
        .catch(() => {
          self.progress = false
        })
    },

    toggleExpanded: function () {
      this.expand = !this.expand
    },

    getCompanyInformation: function () {
      var self = this
      axiosInstance.get('/me').then(response => {
        self.inforUser.companyName = response.data.data.customer.fullname
        self.inforUser.tel = response.data.data.customer.representative_tel
      })
    },

    hideModal() {
      let self = this

      self.cancelation = false
      self.delivery = false
      self.result = false
      self.resultOption = '0'
      self.resultReason = ''
      self.warehouseId = 0
      self.order.sellinItems = self.order.sellinItems.filter(item => {
        return item.isReward == false
      })
    }
  }
})
