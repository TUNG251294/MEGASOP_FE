<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.list_of_product') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.list_of_product')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <!-- <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('menu.list_of_product') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="status" class="label-md">{{ $t('general.status') }}</label>
                      <select class="custom-select fs-12" v-model="form.status">
                          <option selected value="-1">
                            {{ $t('general.select_status') }}
                          </option>
                          <option value="0">{{ $t('general.inactive') }}</option>
                          <option value="1">{{ $t('general.active') }}</option>
                        </select>
                    </div>
                  </div>
                  <div class="col col-md-1 pr-1">
                    <div class="mb-1 ml-n75">
                      <label for="" class="mb-0">&nbsp;</label>
                      <q-btn
                        class=""
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchProducts()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                <div class="row mt-1">
                  <q-markup-table v-if="dataLoading">
                    <thead>
                      <tr>
                        <th 
                          v-for="(th, idx) in columnsI18n" 
                          :key="idx"
                          :class="`text-${th.align}`"
                          :style="idx == 0 ? 'width:150px' : ''"
                        >
                          <q-skeleton animation="blink" type="text" />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="n in rowsPerPageOptions[0]" :key="n">
                        <td 
                          v-for="(td, idx) in columnsI18n" 
                          :key="idx"
                          :class="`text-${td.align}`"
                        >
                          <q-skeleton animation="blink" type="text" />
                        </td>
                      </tr>
                    </tbody>
                  </q-markup-table>
                  <q-table
                    :rows="rows"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    selection="multiple"
                    v-model:selected="selected"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    :visible-columns="visibleColumns"
                    @request="onRequest"
                    hide-no-data
                  >
                    <template v-slot:top>
                      <div class="row justify-between w-100">
                        <div :class="`col col-md-${is_focusInputSearch ? '5' : '3'} pr-1`" style="transition: all .3s ease-in-out">
                          <q-input
                            class="search_datatable"
                            no-error-icon
                            hide-bottom-space
                            outlined
                            type="text"
                            v-model="searchText"
                            :placeholder="$t('products.search_by_product_name')"
                            @change="filterProducts()"
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col col-md-6 text-right">
                          <q-btn
                            color="primary"
                            icon="add"
                            :label="$t('general.create')"
                            no-caps
                            unelevated
                            class="mr-50 rounded-50"
                            @click="addNewProduct()"
                          />
                          <!--q-btn
                            outline
                            color="primary"
                            label="Thay đổi trạng thái"
                            no-caps
                            @click="changeStatus()"
                            class="mr-1"
                          /-->
                          <q-btn
                            color="primary"
                            icon="grid_view"
                            padding="5px"
                            class="rounded-50"
                            unelevated
                            @click="showCols"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr @click="goToDetail(props.row.productId)">
                        <q-td>
                          <q-checkbox
                            v-model="props.selected"
                            @click="props.selected = !props.selected"
                          />
                        </q-td>
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="sku" :props="props"
                          >{{ props.row.sku }}
                        </q-td>
                        <q-td key="name" :props="props">
                          <a
                            href="/product-detail"
                            clickable
                            @click="goToDetail(props.row.productId)"
                          >
                            {{ props.row.name }}
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ props.row.name }}
                            </q-tooltip></a
                          >
                        </q-td>
                        <!-- <q-td key="brandName" :props="props">
                          {{ props.row.brandName }}
                        </q-td> -->
                        <q-td key="categoryLv0" :props="props">
                          {{
                            props.row.categoryLv0 != null
                              ? props.row.categoryLv0
                              : ''
                          }}
                        </q-td>
                        <q-td key="categoryLv1" :props="props">
                          {{
                            props.row.categoryLv1 != null
                              ? props.row.categoryLv1
                              : ''
                          }}
                        </q-td>
                        <q-td key="categoryLv2" :props="props">
                          {{
                            props.row.categoryLv2 != null
                              ? props.row.categoryLv2
                              : ''
                          }}
                        </q-td>
                        <q-td key="incomePrice" :props="props">
                          {{
                            Number(props.row.incomePrice).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="price" :props="props">
                          {{ Number(props.row.price).toLocaleString('en-US') }}đ
                        </q-td>
                        <q-td key="virtualPrice" :props="props">
                          {{
                            Number(props.row.virtualPrice).toLocaleString(
                              'en-US'
                            )
                          }}đ
                        </q-td>
                        <q-td key="status" :props="props">
                          <q-badge
                            color="success"
                            v-if="props.row.status === 'ACTIVE'"
                          >
                            {{ $t('general.active') }}
                          </q-badge>
                          <q-badge
                            color="danger"
                            v-if="props.row.status === 'INACTIVE'"
                          >
                            {{ $t('general.inactive') }}
                          </q-badge>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="showColumns" position="right" full-height maximized>
          <q-card style="width: 480px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ $t('products.show_column') }}</div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
              />
            </q-card-section>
            <q-card-section class="q-pt-none">
              <div class="row mt-1">
                <div class="col col-12">
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="index"
                    :label="$t('products.id_col')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="sku"
                    :label="$t('products.sku_code_col')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="name"
                    :label="$t('products.version_name_col')"
                  />
                  <!-- <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="brandName"
                    label="Thương hiệu"
                  /> -->
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="incomePrice"
                    :label="$t('products.purchase_price_col')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="price"
                    :label="$t('products.sales_price_col')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="virtualPrice"
                    :label="$t('products.brick_price_col')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="status"
                    :label="$t('products.status_col')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/products.js"></script>
