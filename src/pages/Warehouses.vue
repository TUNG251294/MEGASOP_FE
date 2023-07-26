<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.list_of_warehouses') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.list_of_warehouses')"
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
            <div class="card border-0 card-shadow">
              <div class="card-body">
                <!-- <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('menu.list_of_warehouses') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="region">{{ $t('general.status') }}</label>
                      <select class="custom-select fs-12 " v-model="status">
                        <option value="-1" selected>
                          {{ $t('general.select_status') }}
                        </option>
                        <option
                          v-for="item in types"
                          :key="item.code"
                          :value="statuses[item.code]"
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
                        @click="searchWarehouses()"
                      />
                    </div>
                  </div>
                  <!-- <div class="col-md-4">
                    <label for="region">Loại kho</label>
                    <select class="custom-select" v-model="warehouseType">
                      <option value="0" selected>Chọn loại kho</option>
                      <option
                        v-for="type in warehouseTypes"
                        :key="type.id"
                        :value="type.id"
                      >
                        {{ type.name }}
                      </option>
                    </select>
                  </div> -->
                  <div class="col col-md-3"></div>
                  <div class="col col-md-3"></div>
                  <div class="col col-md-2 text-right">
                    <div class="mb-1">
                      <label for="" class="d-none">&nbsp;</label>
                      <q-btn
                        class="d-none"
                        color="primary"
                        :label="$t('general.active')"
                        outline
                        no-caps
                        clickable
                        @click="onActive"
                      />
                      <label for="">&nbsp;</label>
                      <q-btn
                        color="primary"
                        :label="$t('general.create')"
                        icon="add"
                        class="rounded-50"
                        no-caps
                        clickable
                        unelevated
                        @click="onNew"
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
                    :rows="warehouses"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
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
                            :placeholder="$t('warehouses.search_by_warehouse_name')"
                            @change="filterWarehouses()"
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
                      <q-tr :props="props" @click="onDetail(props.row.id)">
                        <q-td key="index" :props="props"
                          >{{ props.row.index }}
                        </q-td>
                        <q-td key="code" :props="props"
                          >{{ props.row.code }}
                        </q-td>
                        <q-td key="name" :props="props"
                          >{{ props.row.name }}
                        </q-td>
                        <q-td key="warehouseTypeId" :props="props"
                          >{{
                            warehouseTypes.filter(
                              item => item.id == props.row.warehouseTypeId
                            )[0].name
                          }}
                        </q-td>
                        <q-td class="warehouse" key="addressText" :props="props"
                          >{{ props.row.addressText }}
                        </q-td>
                        <q-td key="status" :props="props">
                          <q-badge
                            color="success"
                            v-if="props.row.status == 'ACTIVE'"
                          >
                            {{ $t('general.active') }}
                          </q-badge>
                          <q-badge
                            color="danger"
                            v-if="props.row.status == 'INACTIVE'"
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
        <q-dialog v-model="modal" position="right" full-height maximized>
          <q-card style="width: 500px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{
                  edit
                    ? $t('warehouses.warehouse_info')
                    : $t('warehouses.create_a_new_warehouse')
                }}
              </h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none"
                :disable="progress"
              />
            </q-card-section>
            <q-form @submit="addOrUpdateWarehouse()">
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col col-12">
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('warehouses.warehouse_name_col') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-0"
                        outlined
                        type="text"
                        :placeholder="$t('warehouses.enter_warehouse_name')"
                        autofocus=""
                        tabindex="1"
                        v-model="form.warehouseName"
                        lazy-rules
                        :rules="[this.requiredWarehouseName]"
                        :input-style="{fontSize:'1rem'}"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('warehouses.warehouse_code_col') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-0"
                        outlined
                        type="text"
                        :placeholder="$t('warehouses.enter_warehouse_code')"
                        autofocus=""
                        tabindex="2"
                        v-model="form.warehouseCode"
                        lazy-rules
                        :rules="[this.requiredWarehouseCode]"
                        :disable="edit"
                        :input-style="{fontSize:'1rem'}"
                      />
                    </div>
                    <div class="mt-1">
                      <div class="row justify-between mx-n1">
                        <div class="col-md-6 pr-md-50">
                          <label class="form-label label-md"
                            >{{ $t('warehouses.warehouse_type') }} *</label
                          >
                          <select
                            class="custom-select fs-12"
                            v-model="form.warehouseTypeId"
                            tabindex="3"
                            disabled
                          >
                            <option
                              v-for="i in warehouseTypes"
                              :key="i.id"
                              :value="i.id"
                            >
                              {{ i.name }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6 pl-md-50">
                          <label class="form-label label-md"
                            >{{ $t('warehouses.province_city') }} *</label
                          >
                          <select
                            tabindex="4"
                            class="custom-select fs-12 w-100"
                            @change="onChangeCity"
                            v-model="form.cityId"
                            :disabled="edit"
                          >
                            <option selected>
                              {{ $t('warehouses.select_province_city') }}
                            </option>
                            <option
                              v-for="item in form.cities"
                              :value="item.id"
                              :key="item.id"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mt-1">
                      <div class="row justify-between mx-n1">
                        <div class="col-md-6 pr-md-50">
                          <label class="form-label label-md"
                            >{{ $t('warehouses.district') }} *</label
                          >
                          <select
                            tabindex="5"
                            class="custom-select fs-12"
                            @change="getWards"
                            v-model="form.districtId"
                            :disabled="edit"
                          >
                            <option selected>
                              {{ $t('warehouses.select_district') }}
                            </option>
                            <option
                              v-for="item in form.districts"
                              :key="item.id"
                              :value="item.id"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6 pl-md-50">
                          <label class="form-label label-md">
                            {{ $t('warehouses.ward') }} *</label
                          >
                          <select
                            class="custom-select fs-12"
                            tabindex="6"
                            v-model="form.wardId"
                            :disabled="edit"
                          >
                            <option selected>
                              {{ $t('warehouses.select_ward') }}
                            </option>
                            <option
                              v-for="item in form.wards"
                              :key="item.id"
                              :value="item.id"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('warehouses.address') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-0"
                        outlined
                        type="text"
                        :placeholder="$t('warehouses.enter_address')"
                        autofocus=""
                        tabindex="7"
                        v-model="form.address"
                        lazy-rules
                        :rules="[this.requiredAddress]"
                        :disable="edit"
                        :input-style="{fontSize:'1rem'}"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn
                  no-caps
                  :label="$t('general.cancel')"
                  class="bg-white rounded-50"
                  v-close-popup
                  outline
                  color="danger"
                  :disable="progress"
                  style="width: 130px"
                />
                <q-btn
                  v-if="edit"
                  color="primary"
                  :label="$t('general.edit')"
                  class="rounded-50"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  @click="progress = true"
                  type="submit"
                  :disabled="!isValidToSend"
                  style="width: 130px"
                />
                <q-btn
                  v-if="!edit"
                  color="primary"
                  :label="$t('general.create')"
                  class="rounded-50"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  @click="progress = true"
                  type="submit"
                  :disabled="!isValidToSend"
                  style="width: 130px"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="activateModal"
          position="right"
          maximized
          full-height
        >
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6">
                {{ $t('warehouses.enable_warehouses_status') }}
              </div>
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
                  <div class="form-group mt-1">
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="active" val="Active" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ $t('general.active') }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="active" val="Inactive" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{
                          $t('general.inactive')
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                no-caps
                :label="$t('general.closed')"
                class="rounded-50"
                v-close-popup
                outline
                color="danger"
                style="width: 130px"
              />
              <q-btn
                color="primary"
                :label="$t('general.confirmed')"
                class="rounded-50"
                outline
                no-caps
                clickable
                unelevated
                style="width: 130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/warehouses.js"></script>
