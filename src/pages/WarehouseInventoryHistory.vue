<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('inventory_list.inventory_history') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  label="Danh sách tồn kho"
                  to="/warehouse-inventory"
                />
                <q-breadcrumbs-el
                  :label="$t('inventory_list.inventory_history')"
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
                    {{ $t('inventory_list.inventory_history') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="fromDate" class="label-md">{{ $t('promotions.from') }}</label>
                      <q-input
                        filled
                        v-model="fromDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              style="width: 300px; height: 400px"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                no-unset
                                v-model="fromDate"
                                style="width: 300px; height: 400px"
                                :options="optionsFromDate"
                                mask="DD/MM/YYYY"
                                :title="$t('promotions.from')"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    :label="$t('general.closed')"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="toDate" class="label-md">{{ $t('promotions.to') }}</label>
                      <q-input
                        filled
                        v-model="toDate"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              style="width: 300px; height: 400px"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                no-unset
                                v-model="toDate"
                                style="width: 300px; height: 400px"
                                :options="optionsToDate"
                                mask="DD/MM/YYYY"
                                :title="$t('promotions.to')"
                              >
                                <div class="row items-center justify-end">
                                  <q-btn
                                    v-close-popup
                                    :label="$t('general.closed')"
                                    color="primary"
                                    flat
                                  />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="" class="label-md">{{ $t('inventory_list.warehouse') }}</label>
                      <select class="custom-select fs-12" v-model="warehouseId">
                        <option selected value="0">
                          {{ $t('order_list.choose_a_warehouse') }}
                        </option>
                        <option
                          v-for="item in warehouses"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-md-1 pr-1">
                    <div class="mb-1 ml-n75">
                      <label for="">&nbsp;</label>
                      <q-btn
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchHistory()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                <div class="row mt-1">
                  <q-table
                    :rows="histories"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    class="w-100"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    @request="onRequest"
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
                            :placeholder="$t('inventory_list.search_by_product_name')"
                            @change="filterInventory()"
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr class="cursor-pointer" :props="props">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="sku" :props="props">
                          {{ props.row.sku }}
                        </q-td>
                        <q-td key="productVariationName" :props="props">
                          {{ props.row.productVariationName }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.productVariationName }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="unitName" :props="props">
                          {{ props.row.unitName }}
                        </q-td>
                        <q-td key="warehouse_id" :props="props">
                          {{
                            warehouses.filter(
                              item => item.id == props.row.warehouse_id
                            )[0].name
                          }}
                        </q-td>
                        <q-td key="amountAtStartDate" :props="props">
                          {{ props.row.amountAtStartDate }}
                        </q-td>
                        <q-td key="amountImportInPeriod" :props="props">
                          {{ props.row.amountImportInPeriod }}
                        </q-td>
                        <q-td key="amountExportInPeriod" :props="props">
                          {{ props.row.amountExportInPeriod }}
                        </q-td>
                        <q-td key="inventory_into" :props="props">
                          {{ props.row.inventory_into }}
                        </q-td>
                        <q-td key="amountAtEndDate" :props="props">{{
                          props.row.amountAtEndDate
                        }}</q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/warehouseInventoryHistory.js"></script>
