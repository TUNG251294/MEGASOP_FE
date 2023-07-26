<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="`content-wrapper w-100 ${progress ? 'loading-opacity' : ''}`"
    >
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('stock.edit_warehouse_received_title') }}
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
                  :label="$t('stock.edit_warehouse_received_title')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n1">
          <div class="d-flex col-md-4 col-sm-12">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section class="pb-0">
                <h6 class="text-weight-bolder mb-0">
                  {{ $t('stock.warehouse_received_information') }}
                </h6>
              </q-card-section>
              <q-card-section>
                <div class="label-md">
                  {{ $t('stock.warehouse_name') }}
                </div>
                <div class="text-h6 mb-1">
                  <select
                    class="form-control"
                    v-model="form.warehouseId"
                    :placeholder="$t('stock.select_warehouse_name')"
                    @change="changeWarehouse()"
                  >
                    <option
                      v-for="item in warehouses"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
                <div class="label-md">
                  {{ $t('stock.warehouse_code') }}
                </div>
                <div class="mb-1">{{ form.warehouseCode }}</div>
                <div class="label-md">{{ $t('stock.note') }}</div>
                <div class="text-h6 mb-1">
                  <textarea
                    class="form-control"
                    :placeholder="$t('stock.enter_note')"
                    cols="28"
                    rows="5"
                    v-model="form.description"
                  ></textarea>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-8 col-sm-12 pl-md-0">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section class="pb-0">
                <div class="d-flex justify-content-between">
                  <h6 class="text-weight-bolder">
                    {{ $t('stock.imported_product') }}
                  </h6>
                  <div class="row">
                    <q-btn
                      class="mr-50 mb-1 rounded-50"
                      :label="$t('stock.export_template')"
                      color="primary"
                      no-caps
                      outline
                      clickable
                      @click="downloadTemplate()"
                    />
                    <q-btn
                      class="mb-1 rounded-50"
                      :label="$t('stock.import_file')"
                      color="primary"
                      outline
                      no-caps
                      clickable
                      @click="uploadFile = true"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <q-table
                  :columns="columnsI18n"
                  color="primary"
                  row-key="id"
                  class="w-100"
                  :rows="warehouseImportTicketItems"
                  :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                >
                  <template v-slot:body="props">
                    <q-tr class="cursor-pointer" :props="props">
                      <q-td key="sku" :props="props">
                        {{ props.row.product.sku }}
                      </q-td>
                      <q-td key="productVariationName" :props="props">
                        {{ props.row.product.productVariationName }}
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ props.row.product.productVariationName }}
                        </q-tooltip>
                      </q-td>
                      <q-td key="unitName" :props="props">
                        {{ props.row.product.unitName }}
                      </q-td>
                      <q-td key="amount" :props="props">
                        <input
                          style="width: 60px"
                          class="pt-0 pb-0 text-right"
                          v-model.lazy="props.row.product.amount"
                          @change="changeAmount(props.row.product)"
                        />
                      </q-td>
                      <q-td key="action" :props="props">
                        <q-btn
                          outline
                          round
                          color="danger"
                          icon="cancel"
                          size="sm"
                          clickable
                          @click="removeProduct(props.row.product)"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                  <template v-slot:bottom-row>
                    <q-tr>
                      <q-td colspan="100%" class="text-center">
                        <q-btn
                          class="bg-white rounded-50"
                          :label="$t('stock.add_product')"
                          color="primary"
                          no-caps
                          outline
                          icon="add"
                          @click="onAdd()"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
                <a
                  class="text-primary"
                  @click="exportErrorList()"
                  v-if="failureList.length > 0 && failureList.length <= 10"
                  >{{ $t('stock.import_error') }}</a
                >
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row mt-2 mx-n1">
          <div class="col-12 d-flex justify-content-end">
            <q-btn
              style="width: 130px"
              class="mb-1 rounded-50"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              clickable
              @click="cancel()"
            />
            <q-btn
              style="width: 130px"
              class="ml-50 mb-1 rounded-50"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              :disabled="warehouseItemCount == 0"
              @click="saveInfo()"
            />
          </div>
        </div>
        <q-dialog v-model="persistent" persistent full-width>
          <q-card class="card card-shadow border-0">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bold">{{ $t('stock.choose_product') }}</h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                class="d-sm-flex d-none"
                @click="cancelImport()"
              />
            </q-card-section>
            <q-card-section>
              <div class="row mx-n1">
                <div class="col-md-4 col-sm-4">
                  <q-input
                    class="my-input mb-1"
                    outlined
                    :placeholder="$t('stock.search_product')"
                    stack-label
                    v-model="searchText"
                    tabindex="1"
                    @change="filterProduct(true)"
                  >
                    <template v-slot:append>
                      <q-btn round dense flat icon="search" /> </template
                  ></q-input>
                  <q-tree :nodes="categories" node-key="id" label-key="name">
                    <template v-slot:header-generic="prop">
                      <div class="row items-center">
                        <a
                          class="btn text-primary"
                          style="padding: 0"
                          @click="getProductByCategory(prop.node)"
                          >{{ prop.node.name }}</a
                        >
                      </div>
                    </template>
                  </q-tree>
                </div>
                <div class="col-md-8 col-sm-8 border-left">
                  <q-table
                    :columns="addColumnsI18n"
                    color="primary"
                    row-key="id"
                    :rows="rows"
                    :rows-per-page-options="rowsPerPageOptions"
                    v-model:pagination="pagination"
                    hide-no-data
                    style="height: 500px"
                    @request="onRequest"
                  >
                    <template v-slot:top-left>
                      
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
                        <q-td key="amount" :props="props">
                          <input
                            style="width: 60px"
                            class="input_qty pt-0 pb-0 text-right"
                            v-model="props.row.amount"
                            @keydown="onKeydown"
                          />
                        </q-td>
                        <q-td key="action" :props="props">
                          <q-btn
                            outline
                            round
                            color="success"
                            icon="add"
                            size="sm"
                            clickable
                            @click="addProduct(props.row)"
                          />
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                  <div class="row justify-content-end">
                    <q-btn
                      style="width: 130px"
                      class="rounded-50"
                      :label="$t('general.cancel')"
                      color="danger"
                      outline
                      no-caps
                      @click="cancelImport()"
                    />
                    <q-btn
                      style="width: 130px"
                      class="ml-50 rounded-50"
                      :label="$t('general.save')"
                      color="primary"
                      no-caps
                      unelevated
                      @click="importProducts()"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="uploadFile"
          persistent
          :class="progress ? 'loading-opacity' : ''"
        >
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">{{ $t('stock.choose_file') }}</div>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                @click="hideModal()"
              />
            </q-card-section>
            <q-card-section>
              <div class="dropper w-100">
                <input type="file" @change="onFileSelected" accept=".xlsx" />
                <q-icon
                  class="mb-1"
                  size="30px"
                  name="description"
                  color="primary"
                />
                <span class="text-center size12">{{
                  fileName == '' ? 'File Upload' : fileName
                }}</span>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/warehouseReceiptEdit.js"></script>
