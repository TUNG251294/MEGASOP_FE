<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('products.edit_product') }}
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
                  to="/product-detail"
                />
                <q-breadcrumbs-el
                  :label="$t('products.edit_product')"
                  style="color: #2a2a2a"
                />
              </q-breadcrumbs>
            </div>
          </div>
        </div>
      </div> -->
      <div class="content-body">
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
                <div class="text-h6 mb-1">
                  <q-input
                    class="my-input mb-1"
                    outlined
                    :placeholder="$t('products.enter_product_name')"
                    v-model="productInfo.name"
                    autocomplete="username"
                  ></q-input>
                </div>
                <div class="label-md">{{ $t('products.attribute') }}</div>
                <div class="row">
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
                <div class="label-md mt-1">
                  {{ $t('products.category') }}
                </div>
                <q-tree
                  :nodes="nodes"
                  node-key="id"
                  label-key="name"
                  tick-strategy="leaf"
                  default-expand-all
                  v-model:ticked="categroyIds"
                  id="categories"
                  @update:ticked="selectedNode()"
                >
                  <template v-slot:header-node="prop">
                    <div class="row items-center">
                      <label
                        class="label-ellipsis overflow-hidden mb-0"
                        style="font-size: 1rem !important"
                      >
                        {{ prop.node.name }}
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                        >
                          {{ prop.node.name }}
                        </q-tooltip>
                      </label>
                    </div>
                  </template>
                  <template v-slot:header-leaf="prop">
                    <div class="row items-center">
                      <div class="row items-center mr-5">
                        <label
                          class="label-ellipsis overflow-hidden mb-0"
                          style="
                            font-size: 1rem !important;
                            width: 100px !important;
                          "
                        >
                          {{ prop.node.name }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ prop.node.name }}
                          </q-tooltip>
                        </label>
                      </div>
                      <div>
                        <q-toggle
                          v-if="
                            mainCate.length > 0 &&
                            categroyIds.includes(prop.node.id)
                          "
                          v-model="
                            mainCate.find(item => item.id == prop.node.id)
                              .isMain
                          "
                          @update:model-value="changeMainCate(prop.node.id)"
                          :disable="
                            mainCate.find(item => item.id == prop.node.id)
                              .isMain
                          "
                        />
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
                <h6 class=" font-weight-bolder mb-0">
                  {{ $t('products.sku_information') }}
                </h6>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-table
                  :rows="rows"
                  row-key="id"
                  :columns="columnsI18n"
                  color="primary"
                  hide-bottom
                  :visible-colums="visibleColumns"
                  :rows-per-page-options="rowsPerPageOptions"
                  :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                >
                  <template v-slot:top-right>
                    <div class="float-right mb-1">
                      <q-btn
                        :label="$t('products.add_version')"
                        icon="add"
                        color="primary"
                        class="rounded-50"
                        clickable
                        no-caps
                        unelevated
                        :disabled="
                          productInfo.name == '' || categroyIds.length == 0
                        "
                        @click="onNewClickAction()"
                      />
                    </div>
                  </template>
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="sku" :props="props">{{ props.row.sku }} </q-td>
                      <q-td key="name" :props="props">
                        {{ props.row.name }}
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
                          minUnits.filter(
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
                      <q-td key="action" :props="props"
                        ><q-btn
                          flat
                          round
                          color="primary"
                          icon="far fa-edit"
                          clickable
                          @click="editSku(props.row.id)"
                        />
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row mx-n1">
          <div class="col-12 d-flex justify-content-end">
            <q-btn
              class="mb-1"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              v-if="!variationChange"
              clickable
              @click="cancelEdit()"
              style="width: 130px"
            />
            <q-btn
              :class="!variationChange ? 'ml-50 mb-1' : 'mb-1'"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              :disabled="productInfo.name == '' || categroyIds.length == 0"
              @click="saveInfo()"
              style="width: 130px"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/productEdit.js"></script>
