import { ref } from 'vue'
import { LocalStorage } from 'quasar'
import EssentialLink from 'components/EssentialLink.vue'
import SvgIcon from 'components/SvgIcon.vue'
import images from 'src/assets'

export default {
  name: 'sidebar',
  components: {
    EssentialLink,
    SvgIcon
  },
  props: [],
  setup: function () {
    const miniState = ref(LocalStorage.getItem('isExpanded') === 'true')

    return {
      drawer: ref(false),
      miniState,

      drawerClick() {
        miniState.value = !miniState.value
      }
    }
  },
  data () {
    return {
      images,
      isCustomer: true,
      // toggle: true,

      expandedWarehouse: false,
      expandedProduct: false,
      expandedRetailer: false,
      expandedDebt: false,

      debtPathList: [
        '/debt',
        '/debt-orders',
        '/debt-payment-transactions',
        '/debt-adjustments',
        '/debt-book-closure'
      ],
      warehousePathList: [
        '/warehouses',
        '/warehouse-receipt',
        '/warehouse-import-history',
        '/warehouse-export-history',
        '/warehouse-inventory'
      ],
      productPathList: [
        '/product-category',
        '/product-attributes',
        '/products'
      ],
      retailerPathList: ['/retailers']
    }
  },
  computed: {
    currentRoutePath() {
      return this.$route.path
    },
    isActiveAccordionWarehouse: function () {
      return this.warehousePathList.some(e => e === this.currentRoutePath)
    },
    isActiveAccordionDebt: function () {
      return this.debtPathList.some(e => e === this.currentRoutePath)
    },
    isActiveAccordionRetailer: function () {
      return this.retailerPathList.some(e => e === this.currentRoutePath)
    },
    isActiveAccordionProduct: function () {
      return this.productPathList.some(e => e === this.currentRoutePath)
    }
  },
  mounted () {
    this.isCustomer = LocalStorage.getItem('a_st_t') == null

    if (LocalStorage.getItem('manual_hide_sidebar') != null) {
      this.toggle = LocalStorage.getItem('manual_hide_sidebar')
    }
    if (LocalStorage.getItem('isExpanded') != null) {
      this.miniState = LocalStorage.getItem('isExpanded')
    }
  },
  methods: {
    onChangeToggle: function (newToggleValue) {
      LocalStorage.set('manual_hide_sidebar', newToggleValue)
    },
    sidebarToggler: function() {
      this.drawerClick()
      LocalStorage.set('isExpanded', this.miniState)
    },
    mouseOverDrawer: function () {
      // if (this.toggle) this.miniState = false
    },
    mouseLeaveDrawer: function () {
      // if (this.toggle) this.miniState = true
    },
    openWarehouseAccordion: function () {
      this.expandedProduct =  false
      this.expandedRetailer = false
      this.expandedDebt = false
      this.expandedWarehouse = true
      this.drawerClick()
    },
    openDebtAccordion: function () {
      this.expandedWarehouse = false
      this.expandedProduct =  false
      this.expandedRetailer = false
      this.expandedDebt = true
      this.drawerClick()
    },
    openProductAccordion: function () {
      this.expandedRetailer = false
      this.expandedDebt = false
      this.expandedWarehouse = false
      this.expandedProduct = true
      this.drawerClick()
    },
    openRetailerAccordion: function () {
      this.expandedDebt = false
      this.expandedWarehouse = false
      this.expandedProduct = false
      this.expandedRetailer = true
      this.drawerClick()
    },
  }
}


