import { defineComponent } from 'vue'
import { axiosInstance } from 'boot/axios'
import { LocalStorage, Notify } from 'quasar'
import { Constants } from 'boot/Constants'

export default defineComponent({
  name: 'Danh mục sản phẩm',
  data: function () {
    return {
      form: {
        status: '1',
        level: '1',
        name: '',
        image: '',
        level1: '0',
        level2: '0',
        id: 0
      },
      error: {
        name: ''
      },

      categories: [],
      initCategories: [],
      rowsPerPageOptions: Constants.ROW_PER_PAGE_OPTIONS,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0,
        sortBy: 'desc',
        descending: false
      },
      isSearch: false,
      searchText: '',
      historyModal: false,
      addNewCategoryModal: false,
      products: [],
      statuses: {
        ACTIVE: this.$t('general.active'),
        INACTIVE: this.$t('general.inactive')
      },
      selectedFile: [],
      click: false,
      histories: [],
      nodesLv0: [],
      nodesLv1: [],
      nodesSelectLv1: [],
      nodesSelectLv0: [],
      disableSelect: false,
      disableLv1: false,
      disableLv2: false,
      progress: false,
      deleteModal: false,
      edit: false
    }
  },
  computed: {
    columnsI18n: function () {
      return [
        {
          name: 'index',
          label: this.$t('category.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'productName',
          label: this.$t('category.product_name'),
          align: 'left',
          field: 'productName',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'numberSku',
          label: this.$t('category.sku_number'),
          align: 'right',
          field: 'numberSku',
          format: val => `${val}`,
          sortable: true,
          headerClasses: 'font-weight-bolder'
        }
      ]
    },
    isValidToSend: function () {
      return this.isValidName && this.isValidImage && this.isValidSelect
    },
    isValidName: function () {
      return (
        this.form.name.trim().length > 0 && this.form.name.trim().length <= 36
      )
    },
    isValidImage: function () {
      return this.selectedFile.length > 0
    },
    isValidSelect: function () {
      return (
        this.form.level == '1' ||
        (this.form.level == '2' &&
          this.form.level1 != '0' &&
          this.form.level1 != null) ||
        (this.form.level == '3' &&
          this.form.level1 != '0' &&
          this.form.level2 != '0' &&
          this.form.level1 != null &&
          this.form.level1 != null)
      )
    }
  },
  mounted: function () {
    this.getCategories()
    // this.getUpdateHistory();
    // this.getProducts();
  },
  methods: {
    statusTextI18n(status) {
      let text = ''
      switch (status) {
        case 'ACTIVE':
          text = this.$t('general.active')
          break
        
        case 'INACTIVE':
          text = this.$t('general.inactive')
          break
      }
      return text
    },
    getCategories: function () {
      var self = this
      axiosInstance.get('/categories/all').then(response => {
        let categories = response.data.data.categories
        let nodesLv0 = categories.filter(category => category.level == 0)
        self.nodesLv0 = categories.filter(category => category.level == 0)
        let nodesLv1 = categories.filter(category => category.level == 1)
        self.nodesLv1 = categories.filter(category => category.level == 1)
        let nodesLv2 = categories.filter(category => category.level == 2)

        nodesLv1.forEach(item => {
          item['children'] = []
          nodesLv2.forEach(tmp => {
            if (tmp.parentIdLv1 == item.id) {
              tmp['header'] = 'generic'
              item['children'].push(tmp)
            }
          })
        })

        nodesLv0.forEach(item => {
          item['children'] = []
          nodesLv1.forEach(tmp => {
            if (tmp.children.length == 0 && tmp.totalProduct != 0) {
              tmp['header'] = 'generic'
            } else {
              tmp['header'] = 'second'
            }
            if (tmp.parentIdLv0 == item.id) {
              item['children'].push(tmp)
            }
          })
          if (item.children.length == 0 && item.totalProduct != 0) {
            item['header'] = 'generic'
          } else {
            item['header'] = 'root'
          }
        })
        self.categories = nodesLv0
      })
    },
    search: function (node, filter) {
      const filt = filter.toLowerCase()
      return node.name && node.name.toLowerCase().indexOf(filt) > -1
    },
    onRequest: function (props) {},
    getProducts: function (id) {
      var self = this
      axiosInstance
        .get('/productCategory/' + id + '/products')
        .then(response => {
          self.click = true
          self.pagination.rowsNumber = response.data.data.products.length
          if (self.pagination.rowsNumber != 0) {
            self.products = response.data.data.products.map((obj, index) => ({
              ...obj,
              index: index + 1
            }))
          } else {
            self.products = []
          }
        })
    },
    onAdd: function (onCate, level = 0, node = 0) {
      var self = this
      self.addNewCategoryModal = true
      self.edit = false
      self.form.name = ''
      self.form.image = ''
      self.form.status = '1'
      self.selectedFile = []
      if (!onCate) {
        self.nodesSelectLv0 = self.nodesLv0.filter(
          item => item.totalProduct == 0
        )
        self.form.level = '1'
        self.form.level1 = '0'
        self.form.level2 = '0'
        self.disableLv1 = false
        self.disableLv2 = false
        self.disableSelect = false
      } else {
        self.disableSelect = true
        self.nodesSelectLv0 = self.nodesLv0.filter(
          item => item.totalProduct == 0
        )
        self.nodesSelectLv1 = self.nodesLv1.filter(
          item => item.totalProduct == 0
        )
        switch (level) {
          case '2':
            self.form.level = '2'
            self.form.level1 = node.id
            self.disableLv1 = true
            break

          default:
            self.form.level = '3'
            self.form.level1 = node.parentIdLv0
            self.form.level2 = node.id
            self.disableLv1 = true
            self.disableLv2 = true
            break
        }
      }
    },
    selectFile: function () {
      document.getElementById('imageFile').click()
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
        }
      }
      reader.readAsDataURL(file)
    },
    removeImage: function (imageId) {
      var self = this
      self.selectedFile = self.selectedFile.filter(element => {
        return element.id != imageId
      })
    },
    uuidv4: function () {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      )
    },
    addNewCategory: function () {
      var self = this
      if (self.edit) {
        self.updateCategory()
        return
      }
      self.progress = true
      let formData = new FormData()
      self.selectedFile.forEach(item => {
        formData.append('files[]', item.file)
      })

      formData.append('name', self.form.name)
      formData.append('level', parseInt(self.form.level))
      formData.append('parentIdLv0', parseInt(self.form.level1))
      formData.append('parentIdLv1', parseInt(self.form.level2))
      formData.append('status', parseInt(self.form.status))

      axiosInstance
        .post('category', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          self.progress = false
          Notify.create({
            message: self.$t('category.create_category_successful'),
            type: 'positive',
            position: 'top'
          })
          self.addNewCategoryModal = false
          self.getCategories()
          self.error.name = ''
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('category.create_category_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    updateCategory: function () {
      var self = this
      self.progress = true
      let formData = new FormData()
      self.selectedFile.forEach(item => {
        formData.append('files[]', item.file)
      })

      formData.append('name', self.form.name)
      formData.append('level', parseInt(self.form.level))
      formData.append('parentIdLv0', parseInt(self.form.level1))
      formData.append('parentIdLv1', parseInt(self.form.level2))
      formData.append('status', parseInt(self.form.status))

      axiosInstance
        .post('category/' + self.form.id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          self.progress = false
          Notify.create({
            message: self.$t('category.update_category_successful'),
            type: 'positive',
            position: 'top'
          })
          self.addNewCategoryModal = false
          self.getCategories()
          self.error.name = ''
        })
        .catch(() => {
          self.progress = false
          Notify.create({
            message: self.$t('category.update_category_failed'),
            type: 'negative',
            position: 'top'
          })
        })
    },
    onHistory: function () {
      this.historyModal = true
    },
    getUpdateHistory: function () {
      var self = this
      axiosInstance
        .get('/category/histories')
        .then(response => {
          self.histories = response.data.data.histories
        })
        .catch(() => {
          self.histories = [
            {
              date: '17/02/2022 - 10:03',
              actor: 'system',
              deleted: [
                {
                  level: 3,
                  name: 'Giày đi bộ'
                },
                {
                  level: 3,
                  name: 'Giày chạy bộ'
                }
              ],
              added: [
                {
                  level: 3,
                  name: 'Giày chạy bộ'
                },
                {
                  level: 2,
                  name: 'Phụ kiện'
                }
              ],
              nameUpdated: [
                {
                  level: 3,
                  name: 'Giày đi bộ',
                  updateName: 'Giày chạy bộ'
                }
              ],
              statusUpdated: [
                {
                  level: 3,
                  name: 'Giày đi bộ',
                  status: 'INACTIVE',
                  updateStatus: 'ACTIVE'
                }
              ]
            }
          ]
        })
    },
    onDelete: function (node) {
      this.deleteModal = true
      this.form.name = node.name
      this.form.id = node.id
    },
    deleteCategory: function () {
      this.progress = true
      axiosInstance
        .delete('/category/' + this.form.id)
        .then(() => {
          this.progress = false
          Notify.create({
            message: `${this.$t('category.delete_category')} ${
              this.form.name
            } ${this.$t('category.successful')}`,
            type: 'positive',
            position: 'top'
          })
          this.getCategories()
          this.deleteModal = false
        })
        .catch(() => {
          this.progress = false
          Notify.create({
            message: `${this.$t('category.delete_category')} ${
              this.form.name
            } ${this.$t('category.failed')}`,
            type: 'negative',
            position: 'top'
          })
        })
    },
    changeLevel: function () {
      var self = this
      if (self.form.level == '2') {
        self.nodesSelectLv0 = self.nodesLv0.filter(
          item => item.totalProduct == 0
        )
        self.form.level1 = self.nodesSelectLv0[0].id
      } else if (self.form.level == '3') {
        self.nodesSelectLv0 = self.edit
          ? self.nodesLv0.filter(
              item => item.id == self.form.level1 && item.totalProduct == 0
            )
          : self.nodesLv0
        self.form.level1 = self.nodesSelectLv0[0].id
        self.changeLv()
      }
    },
    changeLv: function () {
      var self = this
      self.nodesSelectLv1 = self.nodesLv1.filter(
        item =>
          item.parentIdLv0 == parseInt(self.form.level1) &&
          item.totalProduct == 0 &&
          item.id != self.form.id
      )
      if (self.form.level == '3') {
        if (self.nodesSelectLv1.length == 0) {
          self.form.level = '2'
          Notify.create({
            message: self.$t('category.not_found_lv2'),
            type: 'negative',
            position: 'top'
          })
        } else {
          self.form.level2 = self.nodesSelectLv1[0].id
        }
      }
    },
    onUpdate: function (node) {
      var self = this
      self.addNewCategoryModal = true
      self.edit = true
      self.form.name = node.name
      self.form.status = node.status == 'ACTIVE' ? '1' : '0'
      self.form.level = node.level + 1
      self.disableSelect = false
      self.disableLv1 = false
      self.disableLv2 = false
      self.form.id = node.id
      if (self.selectedFile.length > 0) {
        self.selectedFile = []
      }
      self.selectedFile.push({ path: node.image })
      switch (self.form.level) {
        case 1:
          self.disableSelect = true
          self.form.level1 = '0'
          self.form.level2 = '0'
          break
        case 2:
          self.form.level1 = node.parentIdLv0
          self.nodesSelectLv0 = self.nodesLv0.filter(
            item => item.totalProduct == 0
          )
          break
        default:
          self.form.level1 = node.parentIdLv0
          self.nodesSelectLv0 = self.nodesLv0.filter(
            item => item.totalProduct == 0
          )
          self.nodesSelectLv1 = self.nodesLv1.filter(
            item =>
              item.parentIdLv0 == parseInt(self.form.level1) &&
              item.totalProduct == 0
          )
          self.form.level2 = node.parentIdLv1
          break
      }
    },
    goToDetail: function (productId) {
      LocalStorage.set('pd_id', productId)
    },
    requiredCategoryName: function (val) {
      return (
        (val && val.length > 0) ||
        this.$t('category.please_enter_category_name')
      )
    },
    isValidateName: function (val) {
      return (
        (val && val.length > 0 && val.length <= 36) ||
        this.$t('category.please_enter_category_name_max_36')
      )
    }
  }
})
