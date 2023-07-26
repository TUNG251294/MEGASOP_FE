<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('products.create_product') }}
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
                  :label="$t('products.create_product')"
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
                <!-- <div class="text-subtitle2">Loại sản phẩm</div>
                <div class="text-h6 mb-1">
                  <select
                    class="form-control"
                    v-model="productInfo.type"
                    placeholder="Chọn loại sản phẩm"
                  >
                    <option value="0">Sản phẩm dùng để mua bán</option>
                    <option value="1">Sản phẩm dùng làm quà tặng</option>
                  </select>
                </div> -->
                <div class="mb-1">
                  <div class="label-md mb-25">
                    {{ $t('products.product_name') }}
                  </div>
                  <q-input
                    class="my-input"
                    outlined
                    :placeholder="$t('products.enter_product_name')"
                    v-model="productInfo.name"
                    autocomplete="username"
                    :rules="[this.requiredProductName, this.isValidProductName]"
                    no-error-icon
                    hide-bottom-space
                  />
                </div>
                <!-- <div class="text-subtitle2">Thương hiệu</div>
                <div class="text-h6 mb-1">
                  <select
                    class="form-control"
                    v-model="productInfo.brandId"
                    placeholder="Chọn thương hiệu"
                  >
                    <option
                      v-for="item in brands"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div> -->
                <div class="mb-1">
                  <div class="label-md mb-25">{{ $t('products.attribute') }}</div>
                  <q-list
                    bordered
                    class="rounded-borders mb-1"
                    v-if="productInfo.id == 0"
                  >
                    <q-expansion-item
                      v-model="expandedType"
                      :label="$t('products.select_attribute')"
                      class="fs-12"
                    >
                      <q-card>
                        <q-scroll-area style="height: 300px; max-width: 700px">
                          <q-list>
                            <q-item
                              tag="label"
                              v-ripple
                              v-for="item in attributeTypes"
                              :key="item.id"
                            >
                              <q-item-section>
                                <q-item-label class="fs-12">{{ item.name }}</q-item-label>
                              </q-item-section>
                              <q-item-section side top>
                                <q-checkbox
                                  size="2rem"
                                  :val="item.id"
                                  v-model="typesSelection"
                                  @click="clickType()"
                                ></q-checkbox>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-scroll-area>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
                
                
                <div class="row">
                  <div
                    v-for="item in productInfo.attributeTypes"
                    :key="item.id"
                    class="float-left mr-1"
                  >
                    <q-chip
                      outline
                      square
                      removable
                      color="primary"
                      text-color="white"
                      @remove="removeType(item.id)"
                      v-if="
                        typesSelection.includes(item.id) && productInfo.id == 0
                      "
                    >
                      {{ item.name }}
                    </q-chip>
                    <q-chip
                      outline
                      square
                      color="primary"
                      text-color="white"
                      v-if="
                        typesSelection.includes(item.id) && productInfo.id > 0
                      "
                    >
                      {{ item.name }}
                    </q-chip>
                  </div>
                </div>
                <div class="text-subtitle2">{{ $t('products.category') }}</div>
                <q-tree
                  :nodes="nodes"
                  node-key="id"
                  label-key="name"
                  tick-strategy="leaf"
                  v-model:ticked="productInfo.categroyIds"
                  default-expand-all
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
                            productInfo.categroyIds.includes(prop.node.id)
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
                <h6 class="font-weight-bolder mb-0">
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
                  :visible-columns="visibleColumns"
                  :rows-per-page-options="rowsPerPageOptions"
                  :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                >
                  <template v-slot:top-right>
                    <div class="float-right mb-1">
                      <q-btn
                        no-caps
                        :label="$t('products.add_version')"
                        icon="add"
                        color="primary"
                        class="rounded-50"
                        clickable
                        unelevated
                        :disabled="
                          productInfo.name == '' ||
                          productInfo.categroyIds.length == 0 ||
                          typesSelection.length == 0
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
                        v-show="attributeTypes.length > 0"
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
        <div class="row">
          <div class="col-12 d-flex justify-content-end">
            <q-btn
              class="mb-1 rounded-50 bg-white"
              :label="$t('general.cancel')"
              color="danger"
              outline
              no-caps
              v-if="productInfo.id == 0"
              clickable
              @click="cancelCreate()"
              style="width: 130px"
            />
            <q-btn
              :class="`mb-1 ${productInfo.id == 0 ? 'ml-50' : ''} rounded-50`"
              :label="$t('general.save')"
              color="primary"
              no-caps
              clickable
              unelevated
              :disabled="rows.length == 0"
              @click="saveInfo()"
              style="width: 130px"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/productCreate.js"></script>
