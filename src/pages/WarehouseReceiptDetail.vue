<template>
  <q-page v-if="warehouses" class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('stock.warehouse_received_detail') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('stock.warehouse_received')"
                  to="/warehouse-receipt"
                />
                <q-breadcrumbs-el
                  :label="$t('stock.warehouse_received_detail')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col col-12 d-flex justify-content-end">
            <q-btn
              v-if="ticketInfo.status == 'INACTIVE' && isCustomer"
              class="mr-50 mb-1 bg-white rounded-50"
              style="width: 130px"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              clickable
              unelevated
              @click="cancelImport()"
            />
            <q-btn
              v-if="ticketInfo.status == 'INACTIVE' && isCustomer"
              class="mr-50 mb-1 bg-white rounded-50"
              style="width: 130px"
              :label="$t('general.edit')"
              color="primary"
              outline
              no-caps
              clickable
              unelevated
              @click="editWarehouse()"
            />
            <q-btn
              v-if="ticketInfo.status == 'INACTIVE' && isCustomer"
              class="mr-1 mb-1 rounded-50"
              style="width: 130px"
              :label="$t('stock.import_btn')"
              color="primary"
              no-caps
              clickable
              unelevated
              @click="acceptImport()"
            />
          </div>
        </div>
        <div class="row mx-n1">
          <div class="d-flex col-md-4 col-sm-12 mb-1">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section class="pb-0">
                <h6 class="text-weight-bolder mb-0">
                  {{ $t('stock.warehouse_received_information') }}
                </h6>
              </q-card-section>
              <q-card-section>
                <div class="label-md">
                  {{ $t('stock.received_code_col') }}
                </div>
                <div class="mb-1 font-weight-bolder">
                  {{ ticketInfo.importTicketCode }}
                </div>
                <div class="label-md">
                  {{ $t('stock.warehouse_name') }}
                </div>
                <div class="mb-1 font-weight-bolder">
                  {{ ticketInfo.warehouseName }}
                </div>
                <div class="label-md">
                  {{ $t('stock.warehouse_code') }}
                </div>
                <div class="mb-1 font-weight-bolder">
                  {{ ticketInfo.warehouseCode }}
                </div>
                <div class="label-md">{{ $t('stock.status_col') }}</div>
                <div class="mb-1 font-weight-bolder">
                  {{
                    ticketInfo.status == 'ACTIVE'
                      ? $t('stock.imported')
                      : ticketInfo.status == 'INACTIVE'
                      ? $t('stock.wait_for_import')
                      : $t('stock.cancelled')
                  }}
                </div>
                <div class="label-md">
                  {{ $t('stock.import_time_col') }}
                </div>
                <div class="mb-1 font-weight-bolder">
                  {{ ticketInfo.importDate }}
                </div>
                <div class="label-md">{{ $t('stock.note_col') }}</div>
                <div class="mb-1">
                  {{ ticketInfo.description || '-' }}
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-8 col-sm-12 pl-md-0 mb-1">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section class="pb-0">
                <div class="d-flex justify-content-between">
                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('stock.imported_products') }}
                  </h6>
                </div>
              </q-card-section>
              <q-card-section>
                <q-table
                  :rows="rows"
                  :columns="columnsI18n"
                  color="primary"
                  row-key="id"
                  :rows-per-page-options="rowsPerPageOptions"
                  :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                >
                  <template v-slot:body="props">
                    <q-tr>
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
                      <q-td key="amount" :props="props">
                        {{ props.row.amount }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <!-- <div class="row mt-2">
          <div class="col-12 d-flex justify-content-end">
            <q-btn
              style="width: 130px"
              class="mb-1"
              :label="$t('general.back')"
              color="primary"
              outline
              no-caps
              clickable
              @click="goBack()"
            />
          </div>
        </div> -->
      </div>
    </div>
  </q-page>
</template>

<script src="../js/warehouseReceiptDetail.js"></script>
