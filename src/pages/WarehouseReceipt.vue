<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.warehouse_received') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.warehouse_received')"
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
                    {{ $t('menu.warehouse_received') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="fromDate">{{
                        $t('general.from_date')
                      }}</label>
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
                                :title="$t('general.from_date')"
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
                      <label for="toDate">{{ $t('general.to_date') }}</label>
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
                                :title="$t('general.to_date')"
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
                      <label for="">{{ $t('stock.warehouse') }}</label>
                      <select class="custom-select fs-12" v-model="warehouseId">
                        <option selected value="0">
                          {{ $t('stock.select_warehouse') }}
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
                    <div class="mb-1" style="margin-left:-0.75rem">
                      <label for="">&nbsp;</label>
                      <q-btn
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchWarehouseReceipts()"
                      />
                    </div>
                  </div>
                  <div class="col col-md-2 text-right">
                    <div class="mb-1">
                      <label for="">&nbsp;</label>
                      <q-btn
                        icon="add"
                        color="primary"
                        :label="$t('general.create')"
                        class="rounded-50"
                        no-caps
                        clickable
                        unelevated
                        :disabled="warehouses.length == 0"
                        @click="createReceipt"
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
                    v-else
                    :rows="rows"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    class="w-100"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
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
                            :placeholder="$t('stock.search_by_received_code')"
                            @change="filterTickets()"
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
                      <q-tr class="cursor-pointer" :props="props" @click="goToDetail(props.row.id)">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="importDate" :props="props">
                          {{ props.row.importDate }}
                        </q-td>
                        <q-td key="importTicketCode" :props="props">
                          <a
                            href="/warehouse-receipt-detail"
                            clickable
                            @click="goToDetail(props.row.id)"
                            >{{ props.row.importTicketCode }}</a
                          >
                        </q-td>
                        <q-td key="warehouseId" :props="props">
                          {{
                            warehouses.filter(
                              item => item.id == props.row.warehouseId
                            )[0].name
                          }}
                        </q-td>
                        <q-td key="importPerson" :props="props">
                          {{ props.row.importPerson }}
                        </q-td>
                        <q-td key="description" :props="props">
                          {{ props.row.description }}
                        </q-td>
                        <q-td key="status" :props="props">
                          <q-badge
                            color="success"
                            v-if="props.row.status == 'ACTIVE'"
                          >
                            {{ $t('general.completed') }}
                          </q-badge>
                          <q-badge
                            color="warning"
                            v-if="props.row.status == 'INACTIVE'"
                          >
                            {{ $t('general.waiting_for_approval') }}
                          </q-badge>
                          <q-badge
                            color="danger"
                            v-if="props.row.status == 'STATUS_TWO'"
                          >
                            {{ $t('general.cancelled') }}
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
      </div>
    </div>
  </q-page>
</template>

<script src="../js/warehouseReceipt.js"></script>
