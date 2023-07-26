<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-md-4">
            <!-- Thông tin đại lý -->
            <q-card class="card-shadow">
              <q-card-section>
                <h5 class="title-sm text-black-500 mb-0">{{ $t('retailers.retailer_information')}}</h5>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row mx-n50">
                  <div class="col-md-6 px-50 mb-1">
                    <label class="text-black-400 fs-10">{{ $t('retailers.retailer_name_col') }}</label>
                    <q-select
                      outlined
                      v-model="form.retailerId"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      map-options
                      :options="form.filteredRetailers"
                      option-value="id"
                      option-label="name"
                      @filter="retailerFilterNameFn"
                      @update:model-value="onChangeRetailer()"
                      emit-value
                      :placeholder="$t('order_create.options.placeholder.enter_retailer_name')"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            {{ $t('general.no_results') }}
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-6 px-50 mb-1">
                    <label class="text-black-400 fs-10">{{ $t('retailers.retailer_code_col') }}</label>
                    <q-input outlined v-model="form.retailerCode" readonly />
                  </div>
                  <div class="col-md-6 px-50">
                    <label class="text-black-400 fs-10">{{ $t('retailers.phone_number') }}</label>
                    <q-select
                      outlined
                      v-model="form.retailerId"
                      @update:model-value="onChangeRetailer()"
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      map-options
                      :options="form.filteredRetailers"
                      option-value="id"
                      option-label="mobile"
                      @filter="retailerFilterMobileFn"
                      emit-value
                      :placeholder="$t('order_create.options.placeholder.enter_retailer_phone')"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            {{ $t('general.no_results') }}
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-6 px-50">
                    <label class="text-black-400 fs-10">{{ $t('retailers.address') }}</label>
                    <q-input outlined v-model="form.retailerAddress" readonly />
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <!-- Thông tin đại lý -->
            
            <!-- CTKM -->
            <template v-if="promotionLoaded && promotions.length > 0">
              <q-expansion-item
                v-for="promotion in promotionsLoaded()"
                :key="promotion.id"
                class="card-shadow bg-white rounded-50 mt-75"
                group="promotion"
                @click="getPromotionDetail(promotion.id)"
              >
                <template v-slot:header>
                  <q-item-section class="w-50">
                    <span class="title-sm text-black-400 fs-11">{{ promotion.name}}</span>
                  </q-item-section>
                    
                  <q-item-section side class="w-50">
                    <span class="title-sm text-black-400 fs-11">{{ promotion.startDate }} - {{ promotion.endDate }}</span>
                  </q-item-section>
                </template>
                <q-separator />
                <q-card>
                  <q-card-section>
                    <p>{{ $t('order_create.formality') }}: {{ conditionFormat[promotion.conditionFormatId] }}</p>

                    <!-- Hạn mức -->
                    <q-card 
                      v-for="(item, index) in limitations" 
                      :key="index"
                      class="no-shadow border mt-75"
                    >
                      <q-card-section>
                        <h5 class="title-xs text-black-500 mb-0">
                          {{ $t('promotions_retailer.limit') }}
                          {{ index + 1 }}
                        </h5>
                      </q-card-section>
                      <q-separator />

                      <!-- Nhóm sản phẩm thuộc hạn mức -->
                      <q-card-section 
                        v-if="promotion.conditionFormatId != 3"
                        :class="`condition_format_${promotion.conditionFormatId}`"
                      >
                        <q-card
                          v-for="(ite, idx) in item.promotionLimitationItems"
                          :key="idx"
                          class="no-shadow border"
                          :class="idx == item.promotionLimitationItems.length - 1 ? '' : 'mb-75'"
                        >
                          <q-card-section
                            class="row items-center justify-between"
                          >
                            <div class="col col-md-6">
                              <div class="flex items-center">
                                <h5 class="title-xs text-black-500 mb-0 mr-50">
                                  {{ $t('order_create.group') }} {{ idx + 1 }}
                                </h5>
                                <!-- Khoảng xét thưởng -->
                                <label 
                                  v-if="
                                    promotion.conditionFormatId == 1 &&
                                    (promotion.conditionComparitionType == 2 ||
                                      promotion.conditionComparitionType == 0)
                                  "
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  ({{ $t('order_create.buy_from') }} {{ ite.conditionRangeFrom }} - {{ ite.conditionRangeTo }})
                                </label>
                                <label 
                                  v-if="
                                    promotion.conditionFormatId != 1 &&
                                    (promotion.conditionComparitionType == 2 ||
                                      promotion.conditionComparitionType == 0)
                                  "
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  ({{ $t('order_create.buy_from') }} {{
                                    Number(ite.conditionRangeFrom).toLocaleString(
                                      'en-US'
                                    )
                                  }}đ - {{
                                    Number(ite.conditionRangeTo).toLocaleString(
                                      'en-US'
                                    )
                                  }}đ)
                                </label>
                                <!-- Khoảng xét thưởng -->

                                <!-- Mức xét thưởng -->
                                <label
                                  v-if="
                                    promotion.rewardFormatId == 1 &&
                                    promotion.conditionFormatId == 1 &&
                                    promotion.conditionComparitionType == 1
                                  "
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  ({{ $t('order_create.buy_from') }} {{ ite.conditionFixValue }})
                                </label>
                                <label
                                  v-if="
                                    promotion.rewardFormatId == 1 &&
                                    promotion.conditionFormatId != 1 &&
                                    promotion.conditionComparitionType == 1
                                  "
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  ({{ $t('order_create.buy_from') }} {{
                                    Number(ite.conditionFixValue).toLocaleString(
                                      'en-US'
                                    )
                                  }}đ)
                                </label>
                                <!-- Mức xét thưởng -->
                              </div>
                            </div>
                            <div class="col col-md-6">
                              <div
                                class="flex items-center justify-end"
                                v-if="promotion.rewardFormatId == 1"
                              >
                                <label 
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  {{ $t('promotions.product_giveaway') }}
                                </label>
                              </div>
                              <div
                                class="flex items-center justify-end"
                                v-if="promotion.rewardFormatId == 2"
                              >
                                <label 
                                  v-if="promotion.conditionFormatId != 3"
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  -{{ Number(ite.rewardValue).toLocaleString('en-US') }}đ 
                                  {{ $t('promotions.for_each_order') }}
                                </label>
                              </div>
                              <div
                                class="flex items-center justify-end"
                                v-if="promotion.rewardFormatId == 3"
                              >
                                <label 
                                  v-if="promotion.conditionFormatId != 3"
                                  class="title-xs fs-10 text-black-500 mb-0"
                                >
                                  -{{ ite.rewardPercent }}%
                                  {{ $t('promotions.for_each_order') }}
                                </label>
                              </div>
                            </div>
                          </q-card-section>
                          <q-separator/>
                          <q-card-section>
                            <div v-for="(catIte, catIdx) in categories" :key="catIdx">
                              <div v-if="catIdx == idx">
                                <q-tree
                                  id="groups"
                                  dense
                                  no-connectors
                                  :nodes="catIte"
                                  default-expand-all
                                  node-key="id"
                                  label-key="name"
                                  class="w-100"
                                >
                                  <template v-slot:body-story>
                                  </template>
                                </q-tree>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-card-section>
                      <q-card-section 
                        v-if="promotion.conditionFormatId == 3"
                        class="condition_format_3"
                      >
                        <div 
                          v-for="(ite, idx) in item.promotionLimitationItems"
                          :key="idx"
                        >
                          <div
                            v-if="
                              promotion.conditionFormatId != 1 &&
                              (promotion.conditionComparitionType == 2 ||
                                promotion.conditionComparitionType == 0)
                            "
                          >
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0"
                            >
                              {{ $t('promotions_end_user.approximately_buying_from') }}
                            </label>
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0 mx-25"
                            >
                              {{ Number(ite.conditionRangeFrom).toLocaleString('en-US') }}đ
                            </label>
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0"
                            > 
                              {{ $t('promotions.to_v2') }} 
                            </label>
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0 mx-25"
                            >
                              {{ Number(ite.conditionRangeTo).toLocaleString('en-US') }}đ
                            </label>
                          </div>
                          <div
                            v-if="promotion.rewardFormatId == 2"
                          >
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0"
                            >
                              {{ $t('promotions.reduce') }}
                              {{ Number(ite.rewardValue).toLocaleString('en-US') }}đ 
                              {{ $t('promotions.for_order') }}
                            </label>
                          </div>
                          <div
                            v-if="promotion.rewardFormatId == 3"
                          >
                            <label 
                              class="title-xs fs-10 text-black-500 mb-0"
                            >
                              {{ $t('promotions.reduce') }}
                              {{ ite.rewardPercent }}%
                              {{ $t('promotions.for_order') }}
                            </label>
                          </div>
                        </div>
                      </q-card-section>
                      <!-- Nhóm sản phẩm thuộc hạn mức -->

                    </q-card>
                    <!-- Hạn mức -->
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <div 
                v-if="promotions.length > promotionsLength" 
                class='text-right my-75'
              >
                <q-btn
                  v-if="btnShowMore"
                  :label="$t('general.show_more')"
                  class="label-md rounded-50"
                  color="primary"
                  flat
                  outlined
                  no-caps
                  unelevated
                  @click="showMorePromotions" 
                />
                <q-btn
                  v-if="!btnShowMore"
                  :label="$t('general.show_less')"
                  class="label-md rounded-50"
                  color="primary"
                  flat
                  outlined
                  no-caps
                  unelevated
                  @click="showLessPromotions" 
                />
              </div>
            </template>
            <!-- CTKM -->
          </div>
          <div class="col-md-8 pl-md-0">
            <!-- Thông tin đơn hàng -->
            <q-card class="card-shadow">
              <q-card-section>
                <h5 class="title-sm text-black-500 mb-0">{{ $t('order_create.order_information') }}</h5>
              </q-card-section>
              <q-separator /> 
              <q-card-section class="p-0">
                <q-table
                  style="max-height: 400px;"
                  :columns="columnsI18n"
                  :rows="form.rows"
                  color="primary"
                  row-key="id"
                  :hide-pagination="true"
                  :rows-per-page-options="[0]"
                  hide-bottom
                  id="orders"
                  square
                >
                  <template v-slot:top v-if="form.retailerId">
                    <div 
                      class="position-relative my-50 mx-1 w-50"
                    >
                      <q-input 
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        placeholder="Tìm kiếm và thêm vào đơn hàng" 
                        v-model="searchText" 
                        @keyup="getSuggestions()"
                        @focus="isSearching = true"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                      <q-list
                        v-if="isSearching && searchResults.length > 0"
                        class="search-result absolute bg-white z-top w-100 border border-top-0"
                      >
                        <q-item 
                          clickable
                          v-for="(result,idx) in searchResults"
                          :key="idx"
                          @click="addProduct(result.id)"
                        >
                          <q-item-section avatar>
                            <q-avatar square>
                              <img :src="result.image">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <div class="title-sm">{{ result.name }}</div>
                            <div class="title-xs">{{ result.sku }}</div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="index">
                        {{ props.rowIndex + 1 }}
                      </q-td>
                      <q-td key="sku">
                        {{ props.row.sku }}
                      </q-td>
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ props.row.name }}
                        </q-tooltip>
                      </q-td>
                      <q-td key="unitName">
                        {{ props.row.unitName }}
                      </q-td>
                      <q-td key="inventoryNumber">
                        {{
                          Number(props.row.inventoryNumber).toLocaleString('en-US')
                        }}
                      </q-td>
                      <q-td key="amount">
                        <q-input 
                          outlined 
                          v-model="props.row.qty" 
                          class="text-right" 
                          @change="updateAmount(props.row)"
                          @keypress="isNumber($event)"
                        />
                      </q-td>
                      <q-td key="unitPrice" class="text-right">
                        {{
                          Number(props.row.price).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td key="finalCost" class="text-right">
                        {{
                          Number(props.row.finalCost).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td key="action" :props="props">
                        <q-btn
                          outline
                          round
                          color="danger"
                          icon="cancel"
                          size="sm"
                          clickable
                          @click="removeProduct(props.row.id)"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
            <!-- Thông tin đơn hàng -->

            <!-- Thông tin quà tặng -->
            <q-card class="card-shadow mt-1">
              <q-card-section>
                <h5 class="title-sm text-black-500 mb-0">{{ $t('order_create.reward_information') }}</h5>
              </q-card-section>
              <q-separator /> 
              <q-card-section class="p-0">
                <q-table
                  v-if="rewardItems.length > 0"
                  :columns="rewardColumnsI18n"
                  :rows="rewardItems"
                  color="primary"
                  row-key="id"
                  class="w-100 "
                  square
                  :rows-per-page-options="[0]"
                  :hide-pagination="true"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td width="5%">{{ props.rowIndex +1 }}</q-td>
                      <q-td width="5%">{{ props.row.sku }}</q-td>
                      <q-td key="productSkuName" :props="props">
                        {{ props.row.productVariationName }}
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ props.row.productVariationName }}
                        </q-tooltip>
                      </q-td>
                      <q-td width="15%">{{ props.row.unitName }}</q-td>
                      <q-td width="15%" class="text-right">{{ props.row.amount }}</q-td>
                    </q-tr>
                  </template>
                </q-table>
                <div class="w-75 mx-auto py-2">
                  <p 
                    v-if="form.rows.length == 0"
                    class="body-md mb-0 text-center"
                  >
                    {{ $t('order_create.text_notif.list_reward_empty_first') }} <br/> 
                    {{ $t('order_create.text_notif.list_reward_empty_last') }}
                  </p>
                </div>
              </q-card-section>
              <q-card-section
                v-if="form.rows.length > 0"
              >
                <div class="row">
                  <div class="col-6"></div>
                  <div class="col-6">
                    <div class="flex items-center justify-between mb-50">
                      <label class="title-sm mb-0">{{ $t('order_list.temporary_total_money') }}</label>
                      <label class="title-sm mb-0 text-right">{{ Number(subTotal).toLocaleString('en-US') }}đ</label>
                    </div> 
                    <div class="flex items-center justify-between mb-50">
                      <label class="title-sm mb-0">{{ $t('order_list.total_discount') }}</label>
                      <label class="title-sm mb-0 text-right">-{{ Number(discount).toLocaleString('en-US') }}đ</label>
                    </div> 
                    <div class="flex items-center justify-between mb-50">
                      <label class="title-sm mb-0">{{ $t('order_list.delivery_fee') }}</label>
                      <label class="title-sm mb-0 text-right">{{ Number(shippingFee).toLocaleString('en-US') }}đ</label>
                    </div> 
                    <div class="flex items-center justify-between mb-50">
                      <label class="title-sm mb-0">{{ $t('order_list.vat_fee') }}</label>
                      <label class="title-sm mb-0 text-right">{{ Number(vatFee).toLocaleString('en-US') }}%</label>
                    </div> 
                    <div class="flex items-center justify-between">
                      <label class="title-sm mb-0">{{ $t('order_list.total_money') }}</label>
                      <label class="title-sm mb-0 text-right">{{ Number(total).toLocaleString('en-US') }}đ</label>
                    </div> 
                  </div>
                </div>                 
              </q-card-section>
            </q-card>
            <!-- Thông tin quà tặng -->

            <div class="my-75 text-right">
              <q-btn
                class="label-lg bg-white rounded-50"
                :label="$t('order_create.buttons.cancel')"
                color="danger"
                outline
                no-caps
                clickable
                size="md"
                @click="cancelCreate()"
                style="width: 150px"
              />
              <q-btn
                class="label-lg ml-1 rounded-50"
                :label="$t('order_create.buttons.save')"
                color="primary"
                unelevated
                clickable
                no-caps
                size="md"
                @click="handleSubmit"
                style="width: 150px"
              />
            </div>
          </div>
        </div>
          
      </div>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import { Notify } from 'quasar'

export default {
  name: 'Order create',
  components: {},
  props: [],
  data () {
    return {
      form: {
        retailerId: null,
        retailerPhone: null,
        retailerName: null,
        retailerAddress: '-',
        retailerCode: '-',
        retailers: [],
        filteredRetailers: [],
        rows: []
      },
      btnShowMore: true,
      promotionLoaded: false,
      promotions: [],
      promotionsLength: 3,
      promotion: [],
      limitations: [],
      categories: [],

      conditionFormat: {
        1: this.$t('promotions_retailer.number_of_products'),
        2: this.$t('promotions_retailer.product_sales'),
        3: this.$t('promotions.order_value')
      },

      searchResults: [],
      searchText: '',
      isSearching: false,

      rewardItems: [],

      subTotal: 0,
      discount: 0,
      vatFee: 0,
      shippingFee: 0,
      total: 0,
    }
  },
  computed: {
    columnsI18n () {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
        },
        {
          name: 'sku',
          label: this.$t('products.sku_code_col'),
          align: 'left',
          field: 'sku',
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          label: this.$t('products.version_name_col'),
          align: 'left',
          field: 'name',
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
          sortable: true,
        },
        {
          name: 'inventoryNumber',
          label: this.$t('order_list.inventory_number'),
          align: 'left',
          field: 'inventoryNumber',
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'amount',
          label: this.$t('import.amount_col'),
          align: 'right',
          field: 'amount',
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'unitPrice',
          label: this.$t('order_list.unit_price'),
          align: 'right',
          field: 'unitPrice',
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'finalCost',
          label: this.$t('order_list.total'),
          align: 'right',
          field: 'finalCost',
          format: val => `${val}`,
          sortable: true,
        },
        {
          name: 'action',
          label: '',
          align: 'left',
          field: 'action',
          format: val => `${val}`,
          sortable: true
        }
      ]
    },
    rewardColumnsI18n () {
      return [
        {
          name: 'index',
          label: this.$t('products.id_col'),
          align: 'center',
          field: 'index',
          sortable: true,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'productSkuCode',
          label: this.$t('products.sku_code_col'),
          align: 'left',
          field: 'productSkuCode',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'productSkuName',
          label: this.$t('products.sku_name_col'),
          align: 'left',
          field: 'productSkuName',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder',
          classes: 'extend-ellipsis'
        },
        {
          name: 'unitId',
          label: this.$t('stock.unit_col'),
          align: 'left',
          field: 'unitId',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        },
        {
          name: 'unitAmount',
          label: this.$t('promotions.amount'),
          align: 'right',
          field: 'unitAmount',
          format: val => `${val}`,
          headerClasses: 'font-weight-bolder'
        }
      ]
    }
  },
  mounted() {
    this.getRetailers()
  },
  methods: {
    getRetailers() {
      let self = this

      axiosInstance.get('/retailers').then(response => {
        if (response.data.data.count != 0) {
          self.form.retailers = response.data.data.retailers
          self.form.filteredRetailers = self.form.retailers
        }
      })
    },

    retailerFilterNameFn (val, update) {
      let self = this

      if (val == '') {
        update(() => {
          self.form.filteredRetailers = self.form.retailers
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        self.form.filteredRetailers = self.form.retailers.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    retailerFilterMobileFn (val, update) {
      let self = this

      if (val == '') {
        update(() => {
          self.form.filteredRetailers = self.form.retailers
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        self.form.filteredRetailers = self.form.retailers.filter(
          v => v.mobile.toLowerCase().indexOf(needle) > -1
        )
      })
    },

    onChangeRetailer () {
      let self = this
      let selected = self.form.retailers.filter(
        v => v.id == self.form.retailerId
      )
      self.form.retailerCode = selected[0].retailerCode
      self.form.retailerAddress = selected[0].fullAddress

      this.getPromotionsByRetailer(self.form.retailerId)
      this.checkPromotion()
    },

    showMorePromotions () {
      let self = this

      if (self.promotionsLength > self.promotions.length) return
      self.promotionsLength = self.promotions.length
      self.btnShowMore = false
    },

    showLessPromotions () {
      let self = this
      self.promotionsLength = 3
      self.btnShowMore = true
    },

    getPromotionsByRetailer (retailerId) {
      let self = this

      axiosInstance.get('/promotions/retailer/' + retailerId).then(response => {
        self.promotionLoaded = true
        self.promotions = response.data.data.promotions
      })
    },

    promotionsLoaded() {
      let self = this
      return self.promotions.slice(0, self.promotionsLength)
    },

    getPromotionDetail (promotionId) {
      let self = this

      axiosInstance.get('/promotions/' + promotionId).then(response => {
        self.promotion = response.data.data.promotion
        self.limitations = self.promotion.promotionLimitation

        self.categories = []
        self.getCategories(promotionId, self.promotion.promotionGroups)
      })
    },

    getCategories (promotionId, promotionGroups) {
      var self = this

      axiosInstance.get('/category/' + promotionId).then(response => {
        let categories = response.data.data.categories
        let nodesLv0 = categories.filter(category => category.level == 0)
        nodesLv0 = nodesLv0.map(obj => ({ ...obj, children: [] }))
        let nodesLv1 = categories.filter(category => category.level == 1)
        nodesLv1 = nodesLv1.map(obj => ({ ...obj, children: [] }))
        let nodesLv2 = categories.filter(category => category.level == 2)
        nodesLv2 = nodesLv2.map(obj => ({ ...obj, children: [] }))

        promotionGroups.forEach(element => {
          let nodeLv0s = []
          let nodeLv1s = []
          let nodeLv2s = []
          element.promotionProductGroupDetails.forEach(group => {
            group['body'] = 'story'
            group['name'] = group.productVariationName

            if (group.categoryIdLv2 == 0 && group.categoryIdLv1 == 0) {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv0 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                nodeLv0['children'].push(group)
                nodeLv0s.push(nodeLv0)
              } else {
                nl0['children'].push(group)
              }
            } else if (group.categoryIdLv2 == 0) {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv1 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              let nl1 = nodeLv1s.find(item => item.id == group.categoryIdLv1)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
                nodeLv1s.push(nodeLv1)
                nodeLv0['children'].push(nodeLv1)
                nodeLv0s.push(nodeLv0)
              } else if (nl1 == undefined) {
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
                nodeLv1s.push(nodeLv1)
                nl0['children'].push(nodeLv1)
              } else {
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(group)
              }
            } else {
              group['id'] =
                self.randomstring(5) +
                group.categoryIdLv2 +
                self.randomstring(5)
              let nl0 = nodeLv0s.find(item => item.id == group.categoryIdLv0)
              let nl1 = nodeLv1s.find(item => item.id == group.categoryIdLv1)
              let nl2 = nodeLv2s.find(item => item.id == group.categoryIdLv2)
              if (nl0 == undefined) {
                let nodeLv0 = nodesLv0.find(
                  item => item.id == group.categoryIdLv0
                )
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )

                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                nodeLv1['children'].push(nodeLv2)
                nodeLv1s.push(nodeLv1)
                nodeLv0['children'].push(nodeLv1)
                nodeLv0s.push(nodeLv0)
              } else if (nl1 == undefined) {
                let nodeLv1 = nodesLv1.find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                nodeLv1['children'].push(nodeLv2)
                nodeLv1s.push(nodeLv1)
                nl0['children'].push(nodeLv1)
              } else if (nl2 == undefined) {
                let nodeLv2 = nodesLv2.find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
                nodeLv2s.push(nodeLv2)
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                nodeLv1['children'].push(nodeLv2)
              } else {
                let nodeLv1 = nl0['children'].find(
                  item => item.id == group.categoryIdLv1
                )
                let nodeLv2 = nodeLv1['children'].find(
                  item => item.id == group.categoryIdLv2
                )
                nodeLv2['children'].push(group)
              }
            }
          })
          self.categories.push(nodeLv0s)
          nodeLv0s = []
          nodeLv1s = []
          nodeLv2s = []
          nodesLv0 = nodesLv0.map(obj => ({ ...obj, children: [] }))
          nodesLv1 = nodesLv1.map(obj => ({ ...obj, children: [] }))
          nodesLv2 = nodesLv2.map(obj => ({ ...obj, children: [] }))
        })
      })
    },

    randomstring (L) {
      var s = ''
      var randomchar = function () {
        var n = Math.floor(Math.random() * 62)
        if (n < 10) return n //1-10
        if (n < 36) return String.fromCharCode(n + 55) //A-Z
        return String.fromCharCode(n + 61) //a-z
      }
      while (s.length < L) s += randomchar()
      return s
    },

    getSuggestions () {
      let self = this

      if (self.searchText != '' && self.searchText.length >= 2) {
        axiosInstance.get(`/productVariations/search?keyword=${self.searchText}&status=1`)
        .then(response => {
          self.searchResultsDisplay = true
          self.searchResults = response.data.data.productVariationDtos
        })
        .catch(error => {
          console.log(error)
        })
      } else {
        self.searchResultsDisplay = false
        self.searchResults = []
      }
    },

    addProduct (skuId) {
      let self = this

      var arr = JSON.parse(JSON.stringify(self.form.rows))
      var isFound = arr.some(ele => {
        if (ele.id == skuId) return true
      })

      if (isFound) {
        Notify.create({
          message: self.$t('order_create.text_notif.product_is_exists'),
          type: 'negative',
          position: 'top'
        })
        return
      }

      var objects = JSON.parse(JSON.stringify(self.searchResults))
      var selected = objects.filter(item => {
        return item.id == skuId
      })

      axiosInstance
        .get(`productVariation/${skuId}/numberOfProductVariationsInStocks`)
        .then(response => {
          // console.log(response)
          selected[0]['inventoryNumber'] = response.data.data.numberOfProductVariationsInStocks
          self.form.rows.push(selected[0])
          self.isSearching = false

          self.form.rows = self.form.rows.map(item => {
            return {
              ...item,
              qty: item.qty ? item.qty : item.minOrder,
              finalCost: (item.qty ? item.qty : item.minOrder) * item.price
            }
          })
          // console.log(self.form.rows)
          self.checkPromotion()
        })
        .catch(error => {
          console.log(error)
        })

      
    },

    removeProduct (rowId) {
      let self = this
      self.form.rows = self.form.rows.filter(item => {
        return item.id != rowId
      })

      if (self.form.rows.length == 0) {
        self.subTotal= 0
        self.discount= 0
        self.vatFee= 0
        self.shippingFee= 0
        self.total= 0

        self.rewardItems = []
      }

      self.checkPromotion()
    },

    isNumber (event) {
      event = event ? event : window.event
      if (event.target.value.length >= 5) {
        event.preventDefault()
        return
      }
      var charCode = event.which ? event.which : event.keyCode
      if (charCode < 48 || charCode > 57) {
        event.preventDefault()
      } else {
        return true
      }
    },

    updateAmount (row) {
      let self = this

      if (row.qty <= row.minOrder) {
        row.qty = row.minOrder
      }

      row.finalCost = row.qty * row.price
      self.checkPromotion()
    },

    checkPromotion () {
      let self = this
      let obj = {}
      obj.retailerId = self.form.retailerId
      obj.items = self.form.rows.map(item => {
        return {
          productVariationId: item.id,
          amount: item.qty
        }
      })

      if (obj.items.length == 0) return

      axiosInstance.post(
        '/orders/sellin/promotion/check', 
        obj,
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
        )
        .then(response => {
          self.rewardItems = response.data.data.items
          self.discount = response.data.data.discount

          self.subTotal = self.form.rows.reduce((acc, currentVal) => {
            return acc + currentVal.finalCost
          }, 0)
          
          self.vatFee = self.vatFee * 100 / self.subTotal
          self.total = self.subTotal - (self.shippingFee + self.discount) + self.vatFee
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleSubmit() {
      let self = this
      var dataSubmit = {}
      
      if (self.form.rows.length == 0) {
        Notify.create({
          message: self.$t('order_create.text_notif.order_is_empty'),
          type: 'negative',
          position: 'top'
        })
        return
      }

      dataSubmit.retailerId = self.form.retailerId
      dataSubmit.items = self.form.rows.map(item => {
        return {
          productVariationId: item.id,
          amount: parseInt(item.qty)
        }
      })

      axiosInstance.post('/orders/sellin', dataSubmit, {
        headers: {
            'Content-type': 'application/json'
          }
      })
      .then(response => {
        // console.log('success',response)
        Notify.create({
          message: self.$t('order_create.text_notif.create_order_done'),
          type: 'positive',
          position: 'top'
        })
        self.$router.push('/orders')
      })
      .catch(error => {
        // console.log('error',error)
        Notify.create({
          message: self.$t('order_create.text_notif.create_order_done'),
          type: 'negative',
          position: 'top'
        })
      })
    },

    cancelCreate () {
      this.$router.push('/orders')
    },
  },
}
</script>

<style lang="scss" scoped>
.q-field {
  &.row {
    margin-bottom: 0;
  }
  &.text-right {
    :deep(input) {
      text-align: right;
    }
  }

  &--auto-height {
    :deep(.q-field__control),
    :deep(.q-field__native) {
      min-height: unset;
    }
  }

  &--outlined {
    &.q-field--readonly {
      :deep(.q-field__control) {
        background-color: #e9ecef;

        &:before {
          border-style: solid
        }
      }
    }
  }
}
.q-tree {
  :deep(.q-tree__node-header) {
    color: #2a2a2a;

    &:hover {
      background-color: #e6f3f8;
    }
  }

  :deep(.q-tree__node-header-content) {
    font-size: 10px;
    line-height: 1rem;
    letter-spacing:0.2px;
    padding: 0.5rem 0;
    border-bottom: 1px dashed #eaeaea;
  }
}
</style>
