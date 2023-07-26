<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="`content-wrapper w-100${progress ? ' loading-opacity' : ''}`"
    >
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('promotions.promotion_detail_title') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.promotions')"
                  to="/promotions"
                />
                <q-breadcrumbs-el
                  :label="$t('promotions.promotion_detail_title')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
        <div class="row mx-n50 justify-end">
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.cancelled')"
              color="danger"
              outline
              no-caps
              clickable
              v-if="promotion.promotionState == 'NEW'"
              @click="confirm = true"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.paused')"
              color="danger"
              outline
              no-caps
              clickable
              v-if="promotion.promotionState == 'RUNNING'"
              @click="
                switchStatus(promotion.promotionState, PROMOTION_ACTION.PAUSE)
              "
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.report')"
              color="primary"
              outline
              no-caps
              clickable
              v-if="
                ['APPROVED', 'RUNNING', 'FINISH', 'PENDING', 'PAUSE'].includes(
                  promotion.promotionState
                )
              "
              @click="goToReport()"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.update_history')"
              color="primary"
              outline
              no-caps
              clickable
              @click="onHistory()"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('general.edit')"
              color="primary"
              outline
              no-caps
              clickable
              v-if="
                ['NEW', 'RUNNING'].includes(promotion.promotionState) ||
                (promotion.promotionState == 'PENDING' && !isApproved)
              "
              @click="goToEditPage()"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.end')"
              color="primary"
              outline
              no-caps
              clickable
              v-if="promotion.promotionState == 'RUNNING'"
              @click="forceFinish()"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50"
              :label="$t('general.approve')"
              color="primary"
              no-caps
              clickable
              unelevated
              v-if="promotion.promotionState == 'NEW'"
              @click="
                switchStatus(
                  promotion.promotionState,
                  PROMOTION_ACTION.APPROVE,
                  true
                )
              "
              :disabled="!isApproved"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.rerun')"
              color="primary"
              outline
              no-caps
              clickable
              v-if="['PENDING', 'PAUSE'].includes(promotion.promotionState)"
              @click="
                switchStatus(
                  promotion.promotionState,
                  PROMOTION_ACTION.RERUN,
                  true
                )
              "
              :disabled="!isApproved"
            />
            <q-btn
              class="mr-50 mb-1 rounded-50 bg-white"
              :label="$t('promotions.pending')"
              color="primary"
              outline
              no-caps
              clickable
              v-if="promotion.promotionState == 'APPROVED'"
              @click="
                switchStatus(promotion.promotionState, PROMOTION_ACTION.PENDING)
              "
            />
        </div>
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <div class="flex items-center justify-between mb-1">
                  <div class="row">
                    <h6 class="mr-1 mb-0 font-weight-bolder">{{
                      $t('promotions_end_user.promotion_information')
                    }}</h6>
                    <q-badge
                      class="size14 text-primary text-weight-bolder promotion-subject"
                    >
                      {{
                        promotion.subjectType == 'RETAILER'
                          ? $t('promotions.retailer')
                          : $t('promotions.consumer')
                      }}</q-badge
                    >
                  </div>
                  <q-badge
                    :class="
                      'size14 text-weight-bolder ' +
                      stateColor[promotion.promotionState]
                    "
                  >
                    {{ promotionStateI18n[promotion.promotionState] }}</q-badge
                  >
                </div>
                <q-separator />
                <div class="row mt-1">
                  <div class="col-md-3 col-sm-6">
                    <q-img
                      style="border-radius: 8px; height: 160px"
                      :src="promotion.banner"
                    />
                  </div>
                  <div class="col-md-3 col-sm-6">
                    <div class="row form-group justify-content-between">
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.promotion_id') }}:
                      </label>
                      <label>{{ promotion.promotionCode }}</label>
                    </div>
                    <div
                      class="row form-group justify-content-between"
                      v-if="promotion.subjectType != 'RETAILER'"
                    >
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.early_application_date') }}:
                      </label>
                      <label>{{ promotion.preparationDate }}</label>
                    </div>
                    <div
                      class="row form-group form-group justify-content-between"
                    >
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.start_day') }}:
                      </label>
                      <label>{{ promotion.startDate }}</label>
                    </div>
                    <div class="row form-group justify-content-between">
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.end_day') }}:
                      </label>
                      <label>{{ promotion.endDate }}</label>
                    </div>
                  </div>
                  <div class="col-md-6 col-sm-12">
                    <div class="row form-group justify-content-between">
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.promotion_name') }}:
                      </label>
                      <label>{{ promotion.name }}</label>
                    </div>
                    <div
                      :class="
                        description.length > 58
                          ? 'row justify-content-between'
                          : 'row form-group justify-content-between'
                      "
                    >
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.describe') }}:
                      </label>
                      <label
                        :class="description.length > 58 ? 'extend-content' : ''"
                        v-html="description"
                      ></label>
                    </div>
                    <div
                      class="row form-group justify-content-end"
                      v-if="description != null && description.length > 58"
                    >
                      <a
                        class="text-primary"
                        style="font-size: 12px"
                        @click="viewDetail('d')"
                        >{{ $t('promotions.see_detail') }}</a
                      >
                    </div>
                    <div
                      class="row justify-content-between"
                      v-if="locations != null"
                    >
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.area_of_application') }}:
                      </label>
                      <label
                        :class="
                          locations.length > 58 && !showLocation
                            ? 'extend-content'
                            : ''
                        "
                        >{{ locations }}</label
                      >
                    </div>
                    <div
                      class="row justify-content-end"
                      v-if="
                        locations != null &&
                        locations.length > 58 &&
                        !showLocation
                      "
                    >
                      <a
                        class="text-primary"
                        style="font-size: 12px"
                        @click="viewDetail('l')"
                        >{{ $t('promotions.see_detail') }}</a
                      >
                    </div>
                    <div class="row justify-content-end" v-if="showLocation">
                      <a
                        class="text-primary"
                        style="font-size: 12px"
                        @click="viewDetail('ll')"
                        >{{ $t('promotions.show_less') }}</a
                      >
                    </div>
                    <div
                      class="row justify-content-between"
                      v-if="retailers != null && retailers != ''"
                    >
                      <label class="text-weight-bolder"
                        >{{ $t('promotions.agent_apply') }}:
                      </label>
                      <label
                        :class="
                          retailers.length > 58 && !showRetailers
                            ? 'extend-content'
                            : ''
                        "
                        >{{ retailers }}</label
                      >
                    </div>
                    <div
                      class="row justify-content-end"
                      v-if="
                        retailers != null &&
                        retailers.length > 58 &&
                        !showRetailers
                      "
                    >
                      <a
                        class="text-primary"
                        style="font-size: 12px"
                        @click="viewDetail('r')"
                        >{{ $t('promotions.see_detail') }}</a
                      >
                    </div>
                    <div class="row justify-content-end" v-if="showRetailers">
                      <a
                        class="text-primary"
                        style="font-size: 12px"
                        @click="viewDetail('rl')"
                        >{{ $t('promotions.show_less') }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-1 mx-n1">
          <div class="col-md-4" v-if="promotion.conditionFormatId != 3">
            <div class="card card-shadow border-0">
              <div class="card-body">
                <h6 class="text-weight-bolder">{{
                  $t('promotions_end_user.product_categories')
                }}</h6>
                <q-separator />
                <q-list
                  bordered
                  separator
                  class="mt-1 mb-2"
                  v-for="(item, index) in categories"
                  :key="index"
                >
                  <q-item>
                    <q-item-section>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <label class="label-md text-weight-bolder mb-0"
                          >{{ $t('promotions_retailer.product_group') }}
                          {{ index + 1 }}</label
                        >
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <div class="row w-100">
                        <q-tree
                          id="groups"
                          dense
                          no-connectors
                          :nodes="item"
                          default-expand-all
                          node-key="id"
                          label-key="name"
                          class="w-100"
                        >
                          <template v-slot:body-story>
                            <q-separator />
                          </template>
                        </q-tree>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
          <div
            :class="promotion.conditionFormatId != 3 ? 'col-md-8 mb-1 pl-md-0' : 'col-md-12 mb-1'"
          >
            <q-card class="card card-shadow border-0 w-100">
              <q-card-section>
                <div class="flex items-center justify-between">
                  <h6 class="text-weight-bolder mb-0">
                    {{ $t('promotions_retailer.constitution') }}
                  </h6>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="row mx-n1">
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_retailer.condition_apply')
                    }}</label>
                    <p for="">
                      <!-- {{ conditionFormat[promotion.conditionFormatId] }} -->
                      {{ conditionFormatText(promotion.conditionFormatId)}}
                    </p>
                  </div>
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_retailer.bonus_type')
                    }}</label>
                    <p for="">
                      <!-- {{ rewardFormat[promotion.rewardFormatId] }} -->
                      {{ rewardFormatText(promotion.rewardFormatId) }}
                    </p>
                  </div>
                  <div class="col-4">
                    <label for="region" class="text-weight-bolder">{{
                      $t('promotions_retailer.reward_type')
                    }}</label>
                    <p for="">
                      <!-- {{ types[promotion.conditionComparitionType] }} -->
                      {{ bonusTypeFormatText(promotion.conditionComparitionType) }}
                    </p>
                  </div>
                </div>
              </q-card-section>
              <q-card-section>
                <div
                  class="row mb-1"
                  v-for="(item, index) in limitations"
                  :key="index"
                >
                  <q-list bordered separator class="w-100">
                    <q-item class="w-100">
                      <q-item-section>
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          <label class="text-weight-bolder"
                            >{{ $t('promotions_retailer.limit') }}
                            {{ index + 1 }}</label
                          >
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item
                      :class="
                        promotion.conditionFormatId != 3 ? 'mb-0' : 'mb-2'
                      "
                      v-for="(it, ind) in item.promotionLimitationItems"
                      :key="ind"
                    >
                      <q-item-section>
                        <div class="row">
                          <div class="w-100 d-flex justify-content-between">
                            <div
                              class="row"
                              v-if="
                                promotion.conditionFormatId == 1 &&
                                (promotion.conditionComparitionType == 2 ||
                                  promotion.conditionComparitionType == 0)
                              "
                            >
                              <label
                                >{{
                                  $t(
                                    'promotions_end_user.approximately_buying_from'
                                  )
                                }}
                              </label>
                              <label class="text-weight-bolder ml-1 mr-1">
                                {{ it.conditionRangeFrom }}</label
                              >
                              <label> {{ $t('promotions.to_v2') }} </label>
                              <label class="text-weight-bolder ml-1 mr-1">
                                {{ it.conditionRangeTo }}</label
                              >
                              <label>
                                {{ $t('promotions_retailer.product') }}
                              </label>
                            </div>
                            <div
                              class="row"
                              v-if="
                                promotion.conditionFormatId != 1 &&
                                (promotion.conditionComparitionType == 2 ||
                                  promotion.conditionComparitionType == 0)
                              "
                            >
                              <label
                                >{{
                                  $t(
                                    'promotions_end_user.approximately_buying_from'
                                  )
                                }}
                              </label>
                              <label class="text-weight-bolder ml-1 mr-1">
                                {{
                                  Number(it.conditionRangeFrom).toLocaleString(
                                    'en-US'
                                  )
                                }}đ</label
                              >
                              <label> {{ $t('promotions.to_v2') }} </label>
                              <label class="text-weight-bolder ml-1 mr-1">
                                {{
                                  Number(it.conditionRangeTo).toLocaleString(
                                    'en-US'
                                  )
                                }}đ</label
                              >
                            </div>
                            <div
                              class="row"
                              v-if="
                                promotion.rewardFormatId == 1 &&
                                promotion.conditionFormatId == 1 &&
                                promotion.conditionComparitionType == 1
                              "
                            >
                              <label
                                >{{
                                  $t(
                                    'promotions_retailer.bonus_level_when_buying_from'
                                  )
                                }}
                              </label>
                              <label class="text-weight-bolder ml-1 mr-1">
                                {{ it.conditionFixValue }}</label
                              >
                              <label>
                                {{ $t('promotions_retailer.product') }}
                              </label>
                            </div>
                            <div
                              class="row"
                              v-if="
                                promotion.rewardFormatId == 1 &&
                                promotion.conditionFormatId != 1 &&
                                promotion.conditionComparitionType == 1
                              "
                            >
                              <label
                                >{{
                                  $t(
                                    'promotions_retailer.bonus_level_when_buying_from'
                                  )
                                }}
                              </label>
                              <label class="text-weight-bolder ml-1 mr-1"
                                >{{
                                  Number(it.conditionFixValue).toLocaleString(
                                    'en-US'
                                  )
                                }}đ</label
                              >
                            </div>
                            <div
                              class="row"
                              v-if="promotion.conditionFormatId != 3"
                            >
                              <q-badge
                                class="size12 text-primary text-weight-bolder promotion-subject"
                              >
                                {{ $t('promotions_retailer.product_group') }}
                                {{ ind + 1 }}</q-badge
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="row mt-2 w-100"
                          v-if="promotion.rewardFormatId == 1"
                        >
                          <q-table
                            :columns="rewardColumnsI18n"
                            color="primary"
                            row-key="id"
                            class="w-100"
                            :rows="it.promotionLimitationItemRewardProducts"
                            hide-bottom
                          >
                            <template v-slot:body="props">
                              <q-tr class="cursor-pointer" :props="props">
                                <q-td
                                  key="productVariationName"
                                  :props="props"
                                  style="
                                    white-space: break-spaces !important;
                                    width: 300px !important;
                                  "
                                  >{{ props.row.productVariationName }}
                                </q-td>
                                <q-td key="unitAmount" :props="props">
                                  {{ props.row.unitAmount }}
                                </q-td>
                                <q-td key="unitId" :props="props"
                                  >{{ getUnitName(props.row.unitId) }}
                                </q-td>
                              </q-tr>
                            </template>
                          </q-table>
                        </div>
                        <!-- loai thuong -->
                        <!-- giam gia tri -->
                        <div
                          class="row mt-1 w-100"
                          v-if="promotion.rewardFormatId == 2"
                        >
                          <!-- dieu kien thuong -->
                          <!-- gia tri dh -->
                          <label v-if="promotion.conditionFormatId == 3">
                            {{ $t('promotions.reduce') }}
                            {{
                              Number(it.rewardValue).toLocaleString('en-US')
                            }}đ {{ $t('promotions.for_order') }}
                          </label>
                          <!-- sl sp || doanh so sp -->
                          <label v-if="promotion.conditionFormatId != 3">
                            {{ $t('promotions.reduce') }}
                            {{
                              Number(it.rewardValue).toLocaleString('en-US')
                            }}đ {{ $t('promotions.for_each_order') }}
                          </label>
                        </div>
                        
                        <!-- giam phan tram -->
                        <div
                          class="row mt-1 w-100"
                          v-if="promotion.rewardFormatId == 3"
                        >
                          <label v-if="promotion.conditionFormatId == 3">
                            {{ $t('promotions.reduce') }}
                            {{ it.rewardPercent }}%
                            {{ $t('promotions.for_order') }}
                          </label>
                          <label v-if="promotion.conditionFormatId != 3">
                            {{ $t('promotions.reduce') }}
                            {{ it.rewardPercent }}%
                            {{ $t('promotions.for_each_order') }}
                          </label>
                        </div>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-dialog
          v-model="updateHistoryModal"
          position="right"
          full-height
          persistent
          maximized
        >
          <q-card style="width: 600px">
            <q-card-section class="row items-center">
              <h6 class=" text-weight-bolder mb-0">
                {{ $t('promotions.update_history') }}
              </h6>
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
              <q-list
                bordered
                separator
                class="mb-1"
                v-for="(item, index) in histories"
                :key="index"
              >
                <q-item>
                  <q-item-section>
                    <div
                      class="d-flex justify-content-between align-items-center text-weight-bolder"
                    >
                      <label>{{ item.date }}</label>
                      <label>{{ item.actor }}</label>
                    </div>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <div class="row">
                      <div
                        class="col-6"
                        v-if="
                          item.oldPreparationDate != null &&
                          item.oldPreparationDate != ''
                        "
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.old_early_application_date') }}:
                          </label>
                          <label>{{ item.oldPreparationDate }}</label>
                        </div>
                      </div>
                      <div
                        class="col-6"
                        v-if="
                          item.newPreparationDate != null &&
                          item.newPreparationDate != ''
                        "
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.new_early_application_date') }}:
                          </label>
                          <label>{{ item.newPreparationDate }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-6"
                        v-if="
                          item.oldStartDate != null && item.oldStartDate != ''
                        "
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.old_start_date') }}:
                          </label>
                          <label>{{ item.oldStartDate }}</label>
                        </div>
                      </div>
                      <div
                        class="col-6"
                        v-if="
                          item.newStartDate != null && item.newStartDate != ''
                        "
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.new_start_date') }}:
                          </label>
                          <label>{{ item.newStartDate }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-6"
                        v-if="item.oldEndDate != null && item.oldEndDate != ''"
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.old_end_date') }}:
                          </label>
                          <label>{{ item.oldEndDate }}</label>
                        </div>
                      </div>
                      <div
                        class="col-6"
                        v-if="item.newEndDate != null && item.newEndDate != ''"
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.new_end_date') }}:
                          </label>
                          <label>{{ item.newEndDate }}</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div
                        class="col-6"
                        v-if="item.oldStatus != null && item.oldStatus != ''"
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.old_status') }}:
                          </label>
                          <label>{{
                            promotionStateI18n[item.oldStatus]
                          }}</label>
                        </div>
                      </div>
                      <div
                        class="col-6"
                        v-if="item.newStatus != null && item.newStatus != ''"
                      >
                        <div class="row justify-content-between">
                          <label class="text-weight-bolder"
                            >{{ $t('promotions.new_status') }}:
                          </label>
                          <label>{{
                            promotionStateI18n[item.newStatus]
                          }}</label>
                        </div>
                      </div>
                    </div>
                    <div
                      class="row"
                      v-if="item.description != null && item.description != ''"
                    >
                      <div class="col-4">
                        <label class="text-weight-bolder"
                          >{{ $t('promotions.note') }}:</label
                        >
                      </div>
                      <div class="col-8">
                        <label>{{ item.description }}</label>
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="detailModal" position="right" full-height persistent>
          <q-card style="width: 600px">
            <q-card-section class="row items-center q-pb-none">
              <div class="text-h6 text-weight-bolder">
                {{ $t('promotions.promotion_detail_desc_title') }}
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
            <q-card-section
              class="q-pt-none"
              v-html="description"
            ></q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-icon name="warning" color="warning" size="3rem" />
              <span class="q-ml-sm"
                >{{ $t('promotions.confirm_delete_promotion') }}?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.closed')"
                color="secondary"
                v-close-popup
                no-caps
                outline
              />
              <q-btn
                :label="$t('general.agree')"
                color="primary"
                no-caps
                @click="forceFinish()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/promotionDetail.js"></script>
