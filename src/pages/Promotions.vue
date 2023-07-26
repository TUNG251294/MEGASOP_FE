<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.promotions') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.promotions')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n50">
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{ stats.PROMOTION_RETAILER_COUNT }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t(
                          'promotions.number_of_retailer_promotions_running'
                        )
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="local_play"
                        class="text-success"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2fcf5;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{ stats.PROMOTION_CONSUMER_COUNT }}
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t('promotions.number_of_user_promotions_running')
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="local_play"
                        class="text-success"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2fcf5;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{
                        Number(
                          stats.PROMOTION_RETAILER_TOTAL_COST
                        ).toLocaleString('en-US')
                      }}đ
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t(
                          'promotions.total_sales_retailer_promotions_running'
                        )
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="attach_money"
                        class="text-primary"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2f9fc;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{
                        Number(
                          stats.PROMOTION_CONSUMER_TOTAL_COST
                        ).toLocaleString('en-US')
                      }}đ
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t('promotions.total_sales_user_promotions_running')
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="attach_money"
                        class="text-primary"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2f9fc;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{
                        Number(
                          stats.PROMOTION_RETAILER_DISCOUNT
                        ).toLocaleString('en-US')
                      }}đ
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t(
                          'promotions.total_discount_retailer_promotion_running'
                        )
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="card_giftcard"
                        class="text-primary"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2f8ff;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex col-lg-3 col-sm-6 col-12 mb-1 px-50">
            <div class="card card-shadow border-0 w-100">
              <div class="card-body">
                <div class="media">
                  <div class="media-body my-auto">
                    <p
                      class="font-weight-bolder mb-0 fs-18"
                    >
                      {{
                        Number(
                          stats.PROMOTION_CONSUMER_DISCOUNT
                        ).toLocaleString('en-US')
                      }}đ
                    </p>
                    <p class="card-text font-small-3 mb-0">
                      {{
                        $t(
                          'promotions.total_discount_user_promotion_running'
                        )
                      }}
                    </p>
                  </div>
                  <div class="avatar bg-light-primary">
                    <div class="avatar-content">
                      <q-icon
                        name="card_giftcard"
                        class="text-primary"
                        size="sm"
                        style="
                          font-size: 2rem;
                          background-color: #f2f8ff;
                          padding: 8px;
                          border-radius: 50%;
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <!-- <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('promotions.promotions_list') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start mx-n50">
                  <div class="col-12 col-md-3 px-50">
                      <div class="form-group">
                        <label for="fromDate" class="lebel-md"> {{ $t('promotions.from') }}</label>
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
                  <div class="col-12 col-md-3 px-50">
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
                  <div class="col-12 col-md-3 px-50">
                    <div class="form-group">
                      <label for="" class="label-md">{{ $t('promotions.status') }}</label>
                      <select class="custom-select fs-12" v-model="status">
                        <option selected value="-1">
                          {{ $t('promotions.select_status') }}
                        </option>
                        <option
                          v-for="item in statuses"
                          :key="item"
                          :value="item"
                        >
                          {{ promotionStateI18n[item] }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-12 col-md-3 px-50">
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
                        @click="searchPromotion()"
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
                    :rows="promotions"
                    :columns="columnsI18n"
                    color="primary"
                    row-key="id"
                    :visible-columns="visibleColumns"
                    :rows-per-page-options="rowsPerPageOptions"
                    :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    v-model:pagination="pagination"
                    @request="onRequest"
                    binary-state-sort
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
                            :placeholder="$t('promotions.search_by_promotion_name_id')"
                            @change="filterPromotions()"
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
                            :label="$t('promotions_end_user.create_promotion')"
                            class="mr-50 rounded-50"
                            no-caps
                            unelevated
                            @click="onNew"
                          />
                          <q-btn
                            color="primary"
                            icon="grid_view"
                            padding="5px"
                            class="rounded-50"
                            unelevated
                            no-caps
                            clickable
                            @click="showColumns = true"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props" @click="goToDetail(props.row.id)">
                        <q-td key="index" :props="props"
                          >{{ props.row.index }}
                        </q-td>
                        <q-td key="promotionCode" :props="props"
                          >{{ props.row.promotionCode }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.promotionCode }}
                          </q-tooltip>
                        </q-td>
                        <q-td key="name" :props="props"
                          ><a
                            @click="goToDetail(props.row.id)"
                            class="text-primary"
                            >{{ props.row.name }}
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ props.row.name }}
                            </q-tooltip>
                          </a>
                        </q-td>
                        <q-td key="preparationDate" :props="props"
                          >{{
                            props.row.preparationDate != null
                              ? props.row.preparationDate.split(' ')[0]
                              : ''
                          }}
                        </q-td>
                        <q-td key="startDate" :props="props"
                          >{{ props.row.startDate }}
                        </q-td>
                        <q-td key="endDate" :props="props"
                          >{{ props.row.endDate }}
                        </q-td>
                        <q-td key="subjectType" :props="props"
                          >{{ applicableTypeI18n[props.row.subjectType] }}
                        </q-td>
                        <q-td key="conditionFormatId" :props="props"
                          >{{
                            conditionTypeI18n.filter(
                              item => item.id == props.row.conditionFormatId
                            )[0].name
                          }}
                        </q-td>
                        <q-td key="rewardFormatId" :props="props"
                          >{{
                            rewardTypeI18n.filter(
                              item => item.id == props.row.rewardFormatId
                            )[0].name
                          }}
                        </q-td>
                        <q-td key="promotionState" :props="props">
                          <q-badge
                            :class="
                              'size14 text-weight-bolder ' +
                              stateColor[props.row.promotionState]
                            "
                          >
                            {{
                              promotionStateI18n[props.row.promotionState]
                            }}</q-badge
                          >
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
          <q-card class="card card-shadow border-0" style="min-width: 480px; max-width: 520px !important">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">{{ $t('promotions.show_columns') }}</h4>
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
                    :label="$t('promotions.ordinal_number')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="promotionCode"
                    :label="$t('promotions.promotion_id')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="name"
                    :label="$t('promotions.promotion_name')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="preparationDate"
                    :label="$t('promotions.early_application_date')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="startDate"
                    :label="$t('promotions.start_day')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="endDate"
                    :label="$t('promotions.end_day')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="subjectType"
                    :label="$t('promotions.subjects_of_application')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="conditionFormatId"
                    :label="$t('promotions.condition_type')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="rewardFormatId"
                    :label="$t('promotions.bonus_type')"
                  />
                  <q-toggle
                    class="col col-6"
                    v-model="visibleColumns"
                    val="promotionState"
                    :label="$t('promotions.status')"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="modal"
          persistent
          transition-show="scale"
          transition-hide="scale"
        >
          <q-card style="width: 300px">
            <q-card-section>
              <h4 class="text-center text-weight-bolder">
                {{ $t('promotions.select_object') }}
              </h4>
            </q-card-section>

            <q-card-section class="q-pt-none container">
              <div class="row">
                <div class="text-h6 text-weight-bolder">
                  <q-radio
                    v-model="subjectType"
                    val="1"
                    :label="$t('promotions.consumer')"
                  />
                </div>
              </div>
              <div class="row">
                <div class="text-h6 text-weight-bolder">
                  <q-radio
                    v-model="subjectType"
                    val="2"
                    :label="$t('promotions.retailer')"
                  />
                </div>
              </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn
                :label="$t('general.cancel')"
                class="rounded-50"
                color="danger"
                outline
                no-caps
                clickable
                v-close-popup
                style="width: 130px"
              />
              <q-btn
                :label="$t('general.confirmed')"
                class="rounded-50"
                color="primary"
                no-caps
                clickable
                unelevated
                @click="confirm()"
                style="width: 130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/promotions.js"></script>
