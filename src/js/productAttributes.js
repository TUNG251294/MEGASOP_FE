import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Danh sách thuộc tính',
  data: function () {
    return {
      searchText: '',
      attributes: [],
      initAttributes: [],
      attributeTypes: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'index',
        descending: false
      },
      statuses: {
        ACTIVE: 1,
        INACTIVE: 0
      },
      form: {
        id: 0,
        status: -1,
        attributeTypeId: 0,
        value: ''
      },
      addAttrform: {
        id: 0,
        status: -1,
        attributeTypeId: 0,
        value: ''
      },
      addForm: {
        status: '1',
        code: '',
        name: '',
        values: [{ value: '' }]
      },
      modal: false,
      edit: false,
      progress: false,
      confirm: false,
      addModal: false,
      isSearch: false,
      isGet: false,
      isFilter: false,
      is_focusInputSearch: false,
      dataLoading: true
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('attributes.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'attributeType',
          label: this.$t('attributes.attribute_type_col'),
          align: 'left',
          field: 'attributeType.name',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'value',
          label: this.$t('attributes.attribute_value_col'),
          align: 'left',
          field: 'value',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'numberOfProduct',
          label: this.$t('attributes.the_number_of_products_col'),
          align: 'right',
          field: 'numberOfProduct',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'status',
          label: this.$t('attributes.status_col'),
          align: 'center',
          field: 'status',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        // {
        //   name: 'action',
        //   label: this.$t('attributes.action_col'),
        //   align: 'center',
        //   field: 'action',
        //   sortable: true,
        //   headerClasses: 'font-weight-bolder'
        // }
      ]
    },
    isValidToSend: function () {
      return (
        this.addAttrform.status != -1 &&
        this.addAttrform.attributeTypeId != 0 &&
        this.addAttrform.value.trim() != ''
      )
    },
    isValidToAdd: function () {
      return (
        // this.addForm.code.trim() != "" &&
        this.addForm.name.trim() != '' &&
        !(
          this.addForm.values.find(item => item.value.trim() == '') != undefined
        )
      )
    }
  },
  mounted: function () {
    this.getAttributes()
    this.getAttributeTypes()
  },
  methods: {
    getAttributes: function () {
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
        .get('/attribute/search?segment=' + segment + '&offset=' + offset)
        .then(response => {
          self.dataLoading = false
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.attributes = response.data.data.attributes.map(
              (obj, index) => ({ ...obj, index: segment + index + 1 })
            )
            self.initAttributes = response.data.data.attributes
            self.attributes = response.data.data.attributes
          } else {
            self.initAttributes = []
            self.attributes = []
          }
        })
    },
    getAttributeTypes: function () {
      var self = this
      axiosInstance.get('/attribute-type/list').then(response => {
        self.attributeTypes = response.data.data.attributeTypes
      })
    },
    searchAttributes: function () {
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
      let url = '/attribute/search?segment=' + segment + '&offset=' + offset
      url += self.form.status != -1 ? '&status=' + self.form.status : ''
      url +=
        self.form.attributeTypeId != 0
          ? '&attributeTypeId=' + self.form.attributeTypeId
          : ''
      axiosInstance
        .get(url)
        .then(response => {
          self.pagination.rowsNumber = response.data.data.count
          if (self.pagination.rowsNumber != 0) {
            response.data.data.attributes = response.data.data.attributes.map(
              (obj, index) => ({ ...obj, index: segment + index + 1 })
            )
            self.initAttributes = response.data.data.attributes
            self.attributes = response.data.data.attributes
          } else {
            self.initAttributes = []
            self.attributes = []
          }
        })
        .catch(() => {})
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
            self.searchAttributes()
          } else if (self.isGet) {
            self.getAttributes()
          } else {
            self.filterAttributes()
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
      self.attributes.sort(sortFn)
    },
    onNewAttribute: function () {
      var self = this
      self.addAttrform.id = 0
      self.addAttrform.status = -1
      self.addAttrform.attributeTypeId = 0
      self.addAttrform.value = ''
      self.edit = false
      self.modal = true
    },
    onEditAttribute: function (row) {
      var self = this
      self.addAttrform.id = row.id
      self.addAttrform.status = self.statuses[row.status]
      self.addAttrform.attributeTypeId = row.attributeType.id
      self.addAttrform.value = row.value
      self.edit = true
      self.modal = true
    },
    addOrUpdateAttribute: function () {
      var self = this
      self.progress = true
      let inputData = {}
      inputData['attributeTypeId'] = self.addAttrform.attributeTypeId
      inputData['status'] = self.addAttrform.status
      inputData['value'] = self.addAttrform.value
      if (self.edit) {
        inputData['id'] = self.addAttrform.id
        self.editAttribute(inputData)
      } else {
        self.addNewAttribute(inputData)
      }
    },
    editAttribute: function (inputData) {
      var self = this
      axiosInstance
        .put('/attribute', inputData)
        .then(() => {
          self.progress = false
          self.modal = false
          Notify.create({
            message: self.$t('attributes.updated_attribute_successful'),
            type: 'positive',
            position: 'top'
          })
          self.getAttributes()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('attributes.updated_attribute_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    addNewAttribute: function (inputData) {
      var self = this
      axiosInstance
        .post('/attribute', inputData)
        .then(() => {
          self.progress = false
          self.modal = false
          Notify.create({
            message: self.$t('attributes.create_attribute_successful'),
            type: 'positive',
            position: 'top'
          })
          self.getAttributes()
        })
        .catch(error => {
          self.progress = false
          let message = ''
          let errorCode = error.response.data.errors[0].code
          if (errorCode == '1402') {
            message = self.$t('attributes.exists_attribute')
          } else {
            message = self.$t('attributes.create_attribute_failed')
          }
          Notify.create({
            message: message,
            type: 'negative',
            position: 'top'
          })
        })
    },
    onDelete: function (row) {
      var self = this
      self.confirm = true
      self.form.id = row.id
      self.form.value = row.value
      self.form.nameAttributeType = row.attributeType.name
    },
    deleteAttribute: function (id) {
      var self = this
      self.progress = true
      axiosInstance
        .delete('/attribute?id=' + id)
        .then(() => {
          self.progress = false
          self.confirm = false
          Notify.create({
            message: self.$t('attributes.delete_attribute_successful'),
            type: 'positive',
            position: 'top'
          })
          self.getAttributes()
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('attributes.delete_attribute_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    onAddAttribute: function () {
      var self = this
      self.addModal = true
      self.addForm.status = '1'
      self.addForm.name = ''
      self.addForm.values = [{ value: '' }]
    },
    removeValue: function (index) {
      this.addForm.values.splice(index, 1)
    },
    addValue: function () {
      this.addForm.values.push({ value: '' })
    },
    onAddNewAttribute: function () {
      let values = this.addForm.values.map(item => item.value)
      let inputData = {}
      inputData['name'] = this.addForm.name
      inputData['values'] = values
      inputData['status'] = parseInt(this.addForm.status)
      this.progress = true
      axiosInstance
        .post('/attribute-type', inputData)
        .then(() => {
          this.progress = false
          Notify.create({
            message: this.$t('attributes.create_new_attribute_successful'),
            type: 'positive',
            position: 'top'
          })
          this.getAttributes()
          this.getAttributeTypes()
          this.addModal = false
        })
        .catch(() => {
          this.progress = false
          Notify.create({
            message: this.$t('attributes.create_new_attribute_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    filterAttributes: function () {
      var self = this
      if (self.searchText.trim() == '') {
        self.getAttributes()
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

      let url = '/attribute/search?segment=' + segment + '&offset=' + offset
      url += '&keyword=' + self.searchText.trim()
      axiosInstance.get(url).then(response => {
        self.pagination.rowsNumber = response.data.data.count
        if (self.pagination.rowsNumber != 0) {
          response.data.data.attributes = response.data.data.attributes.map(
            (obj, index) => ({ ...obj, index: segment + index + 1 })
          )
          self.initAttributes = response.data.data.attributes
          self.attributes = response.data.data.attributes
        } else {
          self.initAttributes = []
          self.attributes = []
        }
      })
    }
  }
})
