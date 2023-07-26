<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.attribute_list') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.attribute_list')"
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
            <div class="card">
              <div class="card-body">
                <!-- <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('menu.attribute_list') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="status" class="label-md">{{ $t('general.status') }} </label>
                      <select class="custom-select fs-12" v-model="form.status">
                        <option selected value="-1">
                          {{ $t('general.select_status') }}
                        </option>
                        <option value="0">{{ $t('general.inactive') }}</option>
                        <option value="1">{{ $t('general.active') }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="status" class="label-md">{{
                        $t('attributes.attribute_type')
                      }}</label>
                      <select
                        class="custom-select fs-12"
                        v-model="form.attributeTypeId"
                      >
                        <option value="0">
                          {{ $t('attributes.select_attribute_type') }}
                        </option>
                        <option
                          v-for="item in attributeTypes"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-md-3 pr-1">
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
                        @click="searchAttributes()"
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
                    :rows="attributes"
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
                            :placeholder="$t('attributes.search_by_attribute_name')"
                            @change="filterAttributes()"
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
                            class="mr-50 bg-white rounded-50"
                            outline
                            :label="$t('attributes.add_attribute_value')"
                            no-caps
                            @click="onNewAttribute()"
                          />
                          <q-btn
                            color="primary"
                            class="rounded-50"
                            icon="add"
                            :label="$t('attributes.create_attribute_type')"
                            no-caps
                            unelevated
                            @click="onAddAttribute()"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr @click="onEditAttribute(props.row)">
                        <q-td key="index" :props="props">
                          {{ props.row.index }}
                        </q-td>
                        <q-td key="attributeType" :props="props">
                          {{ props.row.attributeType.name }}
                        </q-td>
                        <q-td key="value" :props="props">
                          <a
                            class="text-primary"
                            @click="onEditAttribute(props.row)"
                            >{{ props.row.value }}</a
                          >
                        </q-td>
                        <q-td key="numberOfProduct" :props="props">
                          {{
                            props.row.numberOfProduct
                              ? props.row.numberOfProduct
                              : 0
                          }}
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
                        <q-td key="action" :props="props">
                          <!-- <q-btn
                            flat
                            icon="delete"
                            size="sm"
                            color="danger"
                            clickable
                            @click="onDelete(props.row)"
                            v-if="
                              !props.row.numberOfProduct ||
                              props.row.numberOfProduct == 0
                            "
                          /> -->
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="modal" position="right"  maximized>
          <q-card style="width: 500px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="font-weight-bolder mb-0">
                {{
                  edit
                    ? $t('attributes.attribute_information')
                    : $t('attributes.create_new_attribute')
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
            <q-form @submit="addOrUpdateAttribute()">
              <q-card-section class="q-pt-none">
                <div class="row mt-0">
                  <div class="col col-12">
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('attributes.attribute_type') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="addAttrform.attributeTypeId"
                      >
                        <option value="0">
                          {{ $t('attributes.select_attribute_type') }}
                        </option>
                        <option
                          v-for="item in attributeTypes"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('attributes.status_type') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="addAttrform.status"
                      >
                        <option selected value="-1">
                          {{ $t('general.select_status') }}
                        </option>
                        <option value="0">
                          {{ $t('general.inactive') }}
                        </option>
                        <option value="1">
                          {{ $t('general.active') }}
                        </option>
                      </select>
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('attributes.attribute_value_col') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        :placeholder="$t('attributes.enter_attribute_value')"
                        autofocus=""
                        v-model="addAttrform.value"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn
                  no-caps
                  :label="$t('general.closed')"
                  v-close-popup
                  outline
                  color="danger"
                  :disable="progress"
                  style="width: 130px"
                  class="rounded-50"
                />
                <q-btn
                  v-if="edit"
                  color="primary"
                  :label="$t('general.edit')"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  :disabled="!isValidToSend"
                  type="submit"
                  style="width: 130px"
                  class="ml-50 rounded-50"
                />
                <q-btn
                  v-if="!edit"
                  color="primary"
                  :label="$t('general.create')"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  :disabled="!isValidToSend"
                  type="submit"
                  style="width: 130px"
                  class="ml-50 rounded-50"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirm" >
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="notifications_active"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm"
                >{{ $t('attributes.confirm_delete_attribute') }}
                <i>{{ form.nameAttributeType }}</i> [{{ form.value }}]</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.cancel')"
                color="secondary"
                class="rounded-50"
                v-close-popup
              />
              <q-btn
                :label="$t('general.agree')"
                color="primary"
                class="ml-50 rounded-50"
                clickable
                :loading="progress"
                @click="deleteAttribute(form.id)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="addModal" position="right" full-height  maximized>
          <q-card style="width: 500px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{ $t('attributes.create_new_attribute') }}
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
            <q-form @submit="onAddNewAttribute()">
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col col-12">
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('general.status') }} *</label
                      >
                    </div>
                    <div>
                      <q-radio
                        v-model="addForm.status"
                        val="1"
                        :label="$t('general.active')"
                        class="fs-12"
                      />
                      <q-radio
                        v-model="addForm.status"
                        val="0"
                        :label="$t('general.inactive')"
                        class="fs-12"
                      />
                    </div>
                    <!-- <div class="mt-1">
                      <label class="form-label size14"
                        >Mã loại thuộc tính *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        placeholder="Nhập vào mã loại thuộc tính"
                        autofocus=""
                        v-model="addForm.code"
                      />
                    </div> -->
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('attributes.attribute_type_name') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        class="mb-2"
                        outlined
                        type="text"
                        :placeholder="
                          $t('attributes.enter_the_attribute_type_name')
                        "
                        autofocus=""
                        v-model="addForm.name"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label size14">{{
                        $t('attributes.attribute_value_list')
                      }}</label>
                    </div>
                  </div>
                  <div
                    v-for="(input, index) in addForm.values"
                    :key="`input-${index}`"
                    :style="`${addForm.values.length > 1 ? 'width:120px' : 'width:100%'}`"
                    :class="`mr-${addForm.values.length > 1 ? '2' : '0'}`"
                  >
                    <q-input
                      outlined
                      class="h6"
                      :placeholder="
                          $t('attributes.enter_attribute_value')
                        "
                      v-model="input.value"
                      @keydown.enter="addValue()"
                    >
                      <template v-slot:append>
                        <q-icon
                          name="close"
                          @click="removeValue(index)"
                          class="cursor-pointer"
                          v-show="addForm.values.length > 1"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn
                  no-caps
                  :label="$t('general.closed')"
                  v-close-popup
                  outline
                  color="danger"
                  :disable="progress"
                  style="width: 130px"
                  class="rounded-50"
                />
                <q-btn
                  color="primary"
                  :label="$t('general.save')"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  :disabled="!isValidToAdd"
                  type="submit"
                  style="width: 130px"
                  class="ml-50 rounded-50"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/productAttributes.js"></script>
