<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.retailer_list') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>

                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.retailer_list')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n50">
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.TotalUsers }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.total_retailer')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user"
                    class="text-primary"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(1, 138, 190, 0.135927);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.InactiveUsers }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.inactive')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user-times"
                    class="text-danger"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(234, 84, 85, 0.12);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.ActiveUsers }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.active')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user-check"
                    class="text-success"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(40, 199, 111, 0.12);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.PendingUsers }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.waiting_for_approval')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user-cog"
                    class="text-warning"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(255, 159, 67, 0.12);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.HaveOrders }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.number_of_retailer_with_orders_per_day')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user-tag"
                    class="text-success"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(40, 199, 111, 0.12);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0">
              <div class="card-body pl-1 pr-1">
                <div class="float-left">
                  <h3 class="font-weight-bolder mb-0 text-left">
                    {{ summary.HaveFirstOrders }}
                  </h3>
                  <label class="card-text">{{
                    $t('retailers.number_of_retailers_with_first_order')
                  }}</label>
                </div>
                <div class="float-right">
                  <q-icon
                    name="fas fa-user-tag"
                    class="text-success"
                    size="sm"
                    style="
                      font-size: 1rem;
                      background-color: rgba(40, 199, 111, 0.12);
                      padding: 1rem;
                      border-radius: 50%;
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-12">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <!-- <div class="row mb-1">
                  <h4 class="text-weight-bold">
                    {{ $t('menu.retailer_list') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start mx-n50">
                  <div class="col-md-2-4 col-12 px-50">
                    <div class="form-group">
                      <label for="city" class="label-md">{{
                        $t('retailers.province_city')
                      }}</label>
                      <select class="custom-select fs-12" v-model="cityId">
                        <option value="0">
                          {{ $t('retailers.select_province_city') }}
                        </option>
                        <option
                          v-for="item in cities"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2-4 col-12 px-50">
                    <div class="form-group">
                      <label for="status" class="label-md">{{ $t('general.status') }}</label>
                      <select class="custom-select fs-12" v-model="status">
                        <option selected value="-1">
                          {{ $t('general.select_status') }}
                        </option>
                        <option value="2">
                          {{ $t('general.waiting_for_approval') }}
                        </option>
                        <option value="1">
                          {{ $t('general.active') }}
                        </option>
                        <option value="0">
                          {{ $t('general.inactive') }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-2-4 col-12 px-50">
                    <div class="form-group">
                      <label for="fromDate" class="label-md">{{
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
                  <div class="col-md-2-4 col-12 px-50">
                    <div class="form-group">
                      <label for="toDate" class="label-md">{{ $t('general.to_date') }}</label>
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
                  <div class="col-md-2-4 col-12 px-50">
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
                        @click="searchRetailer()"
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
                    :visible-columns="visibleColumns"
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
                            :placeholder="$t('retailers.search_by_name')"
                            @change="filterRetailer()"
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
                            :label="$t('retailers.add_retailer')"
                            class="mr-50 rounded-50"
                            no-caps
                            unelevated
                            @click="onAddRetailer"
                          />
                          <!-- <q-btn
                            outline
                            color="primary"
                            icon-right="archive"
                            :label="$t('retailers.export_excel')"
                            no-caps
                            @click="exportTable"
                            class="mr-1"
                          /> -->
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
                      <div class="col col-12">
                        <div v-if="showColumns" class="col">
                          <q-toggle
                            v-model="visibleColumns"
                            val="name"
                            :label="$t('retailers.retailer_name_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="retailerCode"
                            :label="$t('retailers.retailer_code_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="mobile"
                            :label="$t('retailers.phone_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="cityId"
                            :label="$t('retailers.city_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="numberOfOrderSellin"
                            :label="$t('retailers.order_sellin_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="totalCostOrderSellin"
                            :label="$t('retailers.order_value_sellin_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="numberOfOrderSellout"
                            :label="$t('retailers.order_sellout_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="totalCostOrderSellout"
                            :label="$t('retailers.order_value_sellout_col')"
                          />
                          <q-toggle
                            v-model="visibleColumns"
                            val="status"
                            :label="$t('retailers.status_col')"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr
                        :props="props"
                        @click="props.selected = !props.selected"
                      >
                        <q-td>
                          <q-checkbox v-model="props.selected" />
                        </q-td>
                        <q-td
                          key="name"
                          :props="props"
                          @click="goToDetail(props.row.id, props.row.retailerCode)"
                        >
                          <a>{{ props.row.name }}</a>
                        </q-td>
                        <q-td key="retailerCode" :props="props">
                          {{ props.row.retailerCode }}
                        </q-td>
                        <q-td key="createdDate" :props="props">
                          {{ props.row.createdDate }}
                        </q-td>
                        <q-td key="mobile" :props="props">
                          {{ props.row.mobile }}
                        </q-td>
                        <q-td key="cityId" :props="props">
                          {{
                            !props.row.cityId
                              ? 'N/A'
                              : cities?.find(
                                  item => item.id === props.row.cityId
                                )?.name
                          }}

                        </q-td>
                        <q-td key="numberOfOrderSellin" :props="props">
                          {{
                            props.row.numberOfOrderSellin
                              ? props.row.numberOfOrderSellin
                              : 0
                          }}
                        </q-td>
                        <q-td key="totalCostOrderSellin" :props="props">
                          {{
                            props.row.totalCostOrderSellin
                              ? Number(
                                  props.row.totalCostOrderSellin
                                ).toLocaleString('en-US')
                              : 0
                          }}đ
                        </q-td>
                        <q-td key="numberOfOrderSellout" :props="props">
                          {{
                            props.row.numberOfOrderSellout
                              ? props.row.numberOfOrderSellout
                              : 0
                          }}
                        </q-td>
                        <q-td key="totalCostOrderSellout" :props="props">
                          {{
                            props.row.totalCostOrderSellout
                              ? Number(
                                  props.row.totalCostOrderSellout
                                ).toLocaleString('en-US')
                              : 0
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
                          <q-badge
                            color="warning"
                            v-if="props.row.status === 'STATUS_TWO'"
                          >
                            {{ $t('general.waiting_for_approval') }}
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
        <q-dialog v-model="modal" position="right" full-height  maximized>
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <h6 class="text-weight-bold mb-0">
                {{ $t('retailers.create_a_new_retailer') }}
              </h6>
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
            <q-form @submit="addNewRetailer()">
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col col-12">
                    <div class="mt-1">
                      <label class="form-label label-md" for="fullname"
                        >{{ $t('retailers.retailer_name') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        :placeholder="$t('retailers.enter_retailer_name')"
                        autofocus=""
                        tabindex="1"
                        v-model="form.fullName"
                        lazy-rules
                        :rules="[this.requiredFullName]"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md" for="dateOfBirth"
                        >{{ $t('retailers.bod') }} *</label
                      >
                      <q-input
                        filled
                        v-model="form.birthday"
                        mask="##/##/####"
                        :rules="['##/##/####']"
                        class="form-control"
                        tabindex="2"
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
                                v-model="form.birthday"
                                style="width: 300px; height: 400px"
                                mask="DD/MM/YYYY"
                                :title="$t('retailers.bod')"
                                :options="optionsBirthday"
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
                    <div class="mt-1">
                      <label class="form-label label-md" for="signname"
                        >{{ $t('retailers.agent') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        lazy-rules
                        :rules="[this.requiredSignName]"
                        type="text"
                        :placeholder="$t('retailers.enter_agent_name')"
                        autofocus=""
                        tabindex="3"
                        v-model="form.name"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md" for="cmnd"
                        >{{ $t('retailers.id_card') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        lazy-rules
                        :rules="[this.requiredIdCard]"
                        type="text"
                        :placeholder="$t('retailers.enter_id_card')"
                        autofocus=""
                        tabindex="4"
                        v-model="form.idCard"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md" for="email"
                        >{{ $t('retailers.email') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        lazy-rules
                        :rules="[this.requiredEmail, this.isValidateEmail]"
                        type="email"
                        :placeholder="$t('retailers.enter_email')"
                        autofocus=""
                        tabindex="5"
                        v-model="form.email"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md" for="phone"
                        >{{ $t('retailers.phone_log_in') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        lazy-rules
                        :rules="[this.requiredMobile, this.isValidateMobile]"
                        type="text"
                        :placeholder="$t('retailers.enter_phone_number')"
                        autofocus=""
                        tabindex="6"
                        v-model="form.mobile"
                      />
                    </div>
                    <div class="mt-1 label-md">
                      <label class="form-label" for="address"
                        >{{ $t('retailers.address') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        lazy-rules
                        :rules="[this.requiredAddress]"
                        type="text"
                        :placeholder="$t('retailers.enter_address')"
                        autofocus=""
                        tabindex="7"
                        v-model="form.address"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md" for="city"
                        >{{ $t('retailers.province_city') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        tabindex="8"
                        @change="onChangeCity"
                        v-model="form.cityId"
                      >
                        <option selected>
                          {{ $t('retailers.select_province_city') }}
                        </option>
                        <option
                          v-for="item in cities"
                          :value="item.id"
                          :key="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class=" mt-1">
                      <label class="form-label label-md" for="fullname">
                        {{ $t('retailers.district') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        tabindex="9"
                        @change="getWards"
                        v-model="form.districtId"
                      >
                        <option selected>
                          {{ $t('retailers.select_district') }}
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
                    <div class=" mt-1">
                      <label class="form-label label-md" for="ward"
                        >{{ $t('retailers.ward') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        tabindex="10"
                        v-model="form.wardId"
                      >
                        <option selected>
                          {{ $t('retailers.select_ward') }}
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
                    <div class="row mt-1">
                      <div class="input-group rounded-pill bg-white">
                        <input
                          id="upload"
                          @change="onFileSelected"
                          type="file"
                          accept="image/*"
                          :class="
                            form.avatar == ''
                              ? 'form-control border-0'
                              : 'd-none'
                          "
                        />
                        <label
                          id="upload-label"
                          for="upload"
                          :class="
                            form.avatar == ''
                              ? 'font-weight-light text-muted'
                              : 'd-none'
                          "
                          >{{ $t('retailers.select_avatar') }}</label
                        >
                        <div
                          :class="
                            form.avatar != ''
                              ? 'd-flex align-items-center image-area mr-1'
                              : 'd-none'
                          "
                        >
                          <img
                            id="imageResult"
                            :src="form.avatar"
                            style="width: 100px; height: 100px"
                          />
                        </div>
                        <div
                          class="input-group-append d-flex align-items-center"
                        >
                          <label
                            for="upload"
                            class="btn btn-primary m-0 rounded-pill px-4"
                          >
                            <q-icon
                              name="cloud_upload"
                              size="20px"
                              class="mr-1"
                            />{{ $t('retailers.select_picture') }}</label
                          >
                        </div>
                      </div>
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
                  :disable="progress"
                  style="width:130px"
                />
                <q-btn
                  no-caps
                  unevelated
                  :label="$t('general.create')"
                  class="rounded-50"
                  color="primary"
                  type="submit"
                  :loading="progress"
                  :disabled="!isValidToSend"
                  style="width:130px"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/retailers.js"></script>
