import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Chi tiết phiếu nhập kho',
  data: function () {
    return {
      ticketInfo: {},
      warehouses: [],
      rows: [],

      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      isCustomer: false
    }
  },
  created: function () {
    let customer = LocalStorage.getItem('a_st_t')
    if (customer == null) {
      this.isCustomer = true
    }
  },
  mounted: function () {
    this.getWarehouses()
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('stock.id_col'),
          align: 'center',
          field: 'index',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'sku',
          label: this.$t('stock.product_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'productVariationName',
          label: this.$t('stock.product_name_col'),
          align: 'left',
          field: 'productVariationName',
          format: val => `${val}`,
          sortable: true,
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitName',
          label: this.$t('stock.unit_col'),
          align: 'left',
          field: 'unitName',
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'amount',
          label: this.$t('stock.amount_col'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: false
        }
      ]
    }
  },
  methods: {
    getWarehouseImportTicketDetail: function () {
      var self = this
      let ticketId = LocalStorage.getItem('wh_ip_t_i')
      if (ticketId == null || ticketId == '') {
        self.$router.push('/warehouse-receipt')
        return
      }
      axiosInstance
        .get(
          '/warehouse/import/ticket/detail?warehouseImportTicketId=' + ticketId
        )
        .then(response => {
          self.ticketInfo = response.data.data.warehouseImpTicketDto
          self.ticketInfo['warehouseName'] = self.warehouses.filter(
            item => item.id == self.ticketInfo.warehouseId
          )[0].name
          self.ticketInfo['warehouseCode'] = self.warehouses.filter(
            item => item.id == self.ticketInfo.warehouseId
          )[0].code
          self.ticketInfo.warehouseImportTicketItems =
            self.ticketInfo.warehouseImportTicketItems.map((obj, index) => ({
              ...obj,
              index: index + 1
            }))
          self.rows = self.ticketInfo.warehouseImportTicketItems
        })
    },
    getWarehouses: function () {
      var self = this
      axiosInstance.get('/warehouses').then(response => {
        self.warehouses = response.data.data.warehouses
        self.getWarehouseImportTicketDetail()
      })
    },
    goBack: function () {
      LocalStorage.remove(Constants.WAREHOUSE_IMPORT_TICKET_ID)
      this.$router.push('/warehouse-receipt')
    },
    editWarehouse: function () {
      this.$router.push('/warehouse-receipt-edit')
    },
    cancelImport: function () {
      var self = this
      let ticketId = LocalStorage.getItem('wh_ip_t_i')
      if (ticketId == null || ticketId == '') {
        self.$router.push('/warehouse-receipt')
        return
      }
      axiosInstance
        .get(
          '/warehouse/import/tickets/reject?warehouseImportTicketId=' + ticketId
        )
        .then(() => {
          Notify.create({
            message: self.$t('stock.cancel_successful'),
            position: 'top',
            type: 'positive'
          })
          self.goBack()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('stock.cancel_failed'),
            position: 'top',
            type: 'negative'
          })
        })
    },
    acceptImport: function () {
      var self = this
      let ticketId = LocalStorage.getItem('wh_ip_t_i')
      if (ticketId == null || ticketId == '') {
        self.$router.push('/warehouse-receipt')
        return
      }
      axiosInstance
        .get(
          '/warehouse/import/tickets/accept?warehouseImportTicketId=' + ticketId
        )
        .then(() => {
          Notify.create({
            message: self.$t('stock.approve_successful'),
            position: 'top',
            type: 'positive'
          })
          self.goBack()
        })
        .catch(() => {
          Notify.create({
            message: self.$t('stock.approve_failed'),
            position: 'top',
            type: 'negative'
          })
        })
    }
  }
})
