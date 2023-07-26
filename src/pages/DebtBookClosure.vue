<template>
  <q-page class="flex">
    <div :class="progress ? 'loading-spinner' : 'd-none'">
      <div class="loading-center">
        <q-spinner-hourglass color="primary" size="2em" />
      </div>
    </div>
    <div
      :class="
        progress
          ? 'content-wrapper w-100 loading-opacity'
          : 'content-wrapper w-100'
      "
    >
      <div class="content-body">
        <div class="row mx-n1">
          <div class="col-sm-12">
            <div class="card border-0 card-shadow">
              <div class="card-body">
                <q-table
                  :rows="debtBookClosures"
                  :columns="columnsI18n"
                  color="primary"
                  row-key="id"
                  selection="multiple"
                  v-model:selected="selected"
                  :rows-per-page-options="rowsPerPageOptions"
                  v-model:pagination="pagination"
                  @request="onRequest"
                >
                  <template v-slot:top>
                    <div class="row justify-between w-100 mt-1">
                      <div
                        :class="`col col-md-${
                          is_focusInputSearch ? '5' : '3'
                        } pr-1`"
                        style="transition: all 0.3s ease-in-out"
                      >
                        <q-input
                          no-error-icon
                          hide-bottom-space
                          outlined
                          type="text"
                          v-model="searchText"
                          @change="filterDebtBookClosures()"
                          :placeholder="
                            $t('debt.search_by_retailer_code_a_name')
                          "
                          :title="$t('debt.search_by_retailer_code_a_name')"
                          @focus="is_focusInputSearch = true"
                          @blur="is_focusInputSearch = false"
                          class="search_datatable"
                        >
                          <template v-slot:append>
                            <q-icon name="search" />
                          </template>
                        </q-input>
                      </div>
                      <div class="col col-md-6 text-right">
                        <q-btn
                          class="mr-1 rounded-50"
                          color="primary"
                          :label="$t('debt.book_closure')"
                          :disable="selected.length === 0"
                          no-caps
                          clickable
                          @click="onSubmit"
                        />
                        <q-btn
                          class="mr-1 rounded-50"
                          :label="$t('debt.history_book_closure')"
                          color="primary"
                          no-caps
                          clickable
                          @click="$router.push('/debt-history-book-closure')"
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
                        key="retailerCode"
                        :props="props"
                        @click="goToDetailRetailer(props.row)"
                        style="cursor: pointer; color: #018abe"
                      >
                        {{ props.row.retailerCode }}
                      </q-td>
                      <q-td
                        key="name"
                        :props="props"
                        class="column-name"
                        :title="props.row.retailerName"
                      >
                        <div
                          class="text-ellipsis"
                          @mouseover="showTooltip(props.row.retailerName)"
                          @mouseleave="hideTooltip"
                        >
                          {{ props.row.retailerName }}
                        </div>
                      </q-td>
                      <q-td key="accountBalance" :props="props">
                        {{
                          Number(props.row.accountBalance).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="accountReceivable" :props="props">
                        {{
                          Number(props.row.createLimit).toLocaleString('en-US')
                        }}đ
                      </q-td>
                      <q-td key="overDraftCredit" :props="props">
                        {{
                          Number(props.row.overDraftCredit).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="availabilityLimit" :props="props">
                        {{
                          Number(props.row.availableCredit).toLocaleString(
                            'en-US'
                          )
                        }}đ
                      </q-td>
                      <q-td key="debtTerm" :props="props">
                        {{ props.row.paymentPeriod }}
                      </q-td>
                      <q-td key="debtEndOfTerm" :props="props">
                        {{
                          Number(props.row.accountReceivable).toLocaleString(
                            'en-US'
                          )
                        }}đ
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
  </q-page>
</template>

<script src="../js/debtBookClosure"></script>
