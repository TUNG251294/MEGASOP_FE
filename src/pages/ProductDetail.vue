<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('products.detail_product') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('products.product_list')"
                  to="/products"
                />
                <q-breadcrumbs-el
                  :label="$t('products.detail_product')"
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
              class="mr-1 mb-1 rounded-50"
              icon="far fa-edit"
              :label="$t('general.edit')"
              color="primary"
              no-caps
              clickable
              unelevated
              @click="editProduct()"
            />
          </div>
        </div>
        <div class="row mx-n1">
          <div class="d-flex col-md-4 col-sm-12 mb-1">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section>
                <h6 class="font-weight-bolder mb-0">
                  {{ $t('products.product_information') }}
                </h6>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <div class="label-md">
                  {{ $t('products.product_name') }}
                </div>
                <div class="mb-1 font-weight-bolder">
                  {{ productInfo.name }}
                </div>
                <div class="label-md">{{ $t('products.attribute') }}</div>
                <div class="row mb-1">
                  <div
                    v-for="item in attributeTypes"
                    :key="item.id"
                    class="float-left mr-1"
                  >
                    <q-chip outline square color="primary" text-color="white">
                      {{ item.name }}
                    </q-chip>
                  </div>
                </div>
                <div class="label-md">{{ $t('products.category') }}</div>
                <q-tree
                  :nodes="categories"
                  default-expand-all
                  node-key="id"
                  label-key="name"
                  id="categories"
                >
                  <template v-slot:header-leaf="prop">
                    <div class="row items-center">
                      <div class="mr-5">
                        <div
                          class="label-ellipsis"
                          style="width: 100px !important"
                        >
                          {{ prop.node.name }}
                        </div>
                      </div>
                      <div v-if="prop.node.id == productInfo.mainCateId">
                        <!-- <q-chip
                          outline
                          square
                          color="primary"
                          text-color="white"
                        >
                          Main
                        </q-chip> -->
                      </div>
                    </div>
                  </template>
                </q-tree>
              </q-card-section>
            </q-card>
          </div>
          <div class="d-flex col-md-8 col-sm-12 mb-1 pl-md-0">
            <q-card class="w-100 card card-shadow border-0">
              <q-card-section>
                <h6 class="font-weight-bolder mb-0">
                  {{ $t('products.sku_information') }}
                </h6>
              </q-card-section>
              <q-separator />
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
                    <q-tr :props="props" @click="editSku(props.row.id)">
                      <q-td key="sku" :props="props">{{ props.row.sku }} </q-td>
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ props.row.name }}
                        </q-tooltip>
                      </q-td>
                      <q-td
                        v-for="item in attributeTypes"
                        :key="item.name"
                        :props="props"
                        >{{ props.row[item.name] }}</q-td
                      >
                      <q-td key="incomePrice" :props="props">
                        {{
                          Number(props.row.incomePrice).toLocaleString('en-US')
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
                      <q-td key="unitId" :props="props"
                        >{{
                          minUnitsI18n.filter(
                            item => item.id == props.row.unitId
                          )[0].name
                        }}
                      </q-td>
                      <q-td key="minOrder" :props="props"
                        >{{ props.row.minOrder }}
                      </q-td>
                      <q-td key="orderInc" :props="props"
                        >{{ props.row.orderInc }}
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
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/productDetail.js"></script>
