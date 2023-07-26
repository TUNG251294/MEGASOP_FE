
export default {
  name: 'Breadcrumb',
  components: {},
  props: [],
  data () {
    return {
      breadcrumbList: []
    }
  },
  computed: {

  },
  mounted () { 
    this.updateList() 
  },
  watch: {
    '$route' () {
      this.updateList()
    },
    '$i18n.locale' (newVal, oldVal) {
      this.updateList()
    }
  },
  methods: {
    updateList () {
      this.breadcrumbList = this.$router.currentRoute.value.meta.breadcrumbs
      this.breadcrumbList = this.breadcrumbList.map((breadcrumb, idx) => ({
        ...breadcrumb,
        label: breadcrumb.text ? this.$t(breadcrumb.text) : ''
      }))
    }
  }
}


