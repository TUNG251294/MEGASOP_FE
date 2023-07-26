<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.product_portfolio') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.product_portfolio')"
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
            <div class="card card-shadow border-0">
              <div class="card-body">
                <!-- <div class="row">
                  <h4 class="font-weight-bolder">
                    {{ $t('menu.product_portfolio') }}
                  </h4>
                </div> -->
                <div class="row justify-content-between">
                  <div class="col col-md-4">
                    <q-input
                      no-error-icon
                      hide-bottom-space
                      outlined
                      type="text"
                      v-model="searchText"
                      :placeholder="$t('category.search_by_category_name')"
                    />
                  </div>
                  <div
                    class="col col-md-8 d-flex justify-content-end align-items-center"
                  >
                    <div class="row">
                      <!-- <q-btn
                        outline
                        color="primary"
                        no-caps
                        clickable
                        label="Lịch sử cập nhật"
                        class="mr-1"
                        icon="history"
                        @click="onHistory()"
                      /> -->
                      <q-btn
                        color="primary"
                        icon="add"
                        class="rounded-50"
                        no-caps
                        clickable
                        unelevated
                        :label="$t('category.add_category_level')"
                        @click="onAdd(false)"
                      />
                    </div>
                  </div>
                </div>
                <div class="row mt-1">
                  <q-tree
                    :nodes="categories"
                    default-expand-all
                    :filter="searchText"
                    :filter-method="search"
                    node-key="id"
                    label-key="name"
                    class="col-8"
                  >
                    <template v-slot:header-root="prop">
                      <div class="row items-center">
                        <div class="mr-4 row items-center">
                          <label
                            class="size14 label-ellipsis-2-line overflow-hidden"
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
                          <q-badge
                            :color="
                              prop.node.status == 'ACTIVE'
                                ? 'success'
                                : 'orange'
                            "
                            class="ml-2 q-ml-sm"
                            style="height: 25px"
                            >{{ statusTextI18n(prop.node.status) }}</q-badge
                          >
                        </div>
                        <div>
                          <q-btn
                            flat
                            icon="delete"
                            size="sm"
                            color="danger"
                            class="rounded-50"
                            clickable
                            v-if="prop.node.children.length == 0"
                            @click="onDelete(prop.node)"
                            style="padding: 5px !important"
                          />
                          <q-btn
                            flat
                            icon="edit"
                            size="sm"
                            color="blue"
                            class="rounded-50"
                            clickable
                            @click="onUpdate(prop.node)"
                            style="padding: 5px !important"
                          />
                          <q-btn
                            flat
                            icon="add"
                            size="sm"
                            color="blue"
                            class="rounded-50"
                            clickable
                            @click="onAdd(true, '2', prop.node)"
                            style="padding: 5px !important"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:header-second="prop">
                      <div class="row items-center">
                        <div class="mr-4 row items-center">
                          <label
                            class="size14 label-ellipsis-2-line overflow-hidden"
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
                          <q-badge
                            :color="
                              prop.node.status == 'ACTIVE'
                                ? 'success'
                                : 'orange'
                            "
                            class="ml-2 q-ml-sm"
                            style="height: 25px"
                            >{{ statusTextI18n(prop.node.status) }}</q-badge
                          >
                        </div>
                        <div>
                          <q-btn
                            flat
                            icon="delete"
                            size="sm"
                            color="danger"
                            class="rounded-50"
                            clickable
                            v-if="
                              prop.node.children.length == 0 &&
                              prop.node.totalProduct == 0
                            "
                            @click="onDelete(prop.node)"
                            style="padding: 5px !important"
                          />
                          <q-btn
                            flat
                            icon="edit"
                            size="sm"
                            color="blue"
                            class="rounded-50"
                            clickable
                            @click="onUpdate(prop.node)"
                            style="padding: 5px !important"
                          />
                          <q-btn
                            flat
                            icon="add"
                            size="sm"
                            color="blue"
                            class="rounded-50"
                            clickable
                            @click="onAdd(true, '3', prop.node)"
                            style="padding: 5px !important"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:header-generic="prop">
                      <div class="row items-center">
                        <div class="mr-4 row items-center">
                          <a
                            class="text-primary"
                            @click="getProducts(prop.node.id)"
                          >
                            <label
                              class="size14 label-ellipsis-2-line overflow-hidden"
                              style="cursor: pointer"
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
                          </a>
                          <q-badge
                            :color="
                              prop.node.status == 'ACTIVE'
                                ? 'success'
                                : 'orange'
                            "
                            class="ml-2 q-ml-sm"
                            style="height: 25px"
                            >{{ statusTextI18n(prop.node.status) }}</q-badge
                          >
                        </div>
                        <div>
                          <q-btn
                            flat
                            icon="delete"
                            size="sm"
                            color="danger"
                            class="rounded-50"
                            clickable
                            v-if="prop.node.totalProduct == 0"
                            @click="onDelete(prop.node)"
                            style="padding: 5px !important"
                          />
                          <q-btn
                            flat
                            icon="edit"
                            size="sm"
                            color="blue"
                            class="rounded-50"
                            clickable
                            @click="onUpdate(prop.node)"
                            style="padding: 5px !important"
                          />
                        </div>
                      </div>
                    </template>
                  </q-tree>
                  <div class="col-6 d-none" v-if="click">
                    <q-table
                      :rows="products"
                      :columns="columnsI18n"
                      color="primary"
                      row-key="productId"
                      :rows-per-page-options="rowsPerPageOptions"
                      :rows-per-page-label="`${$t('general.rows_per_page')}: `"
                    >
                      <template v-slot:body="props">
                        <q-tr :props="props">
                          <q-td key="index" :props="props">
                            {{ props.row.index }}
                          </q-td>
                          <q-td key="productName" :props="props">
                            <a
                              href="/product-detail"
                              clickable
                              @click="goToDetail(props.row.productId)"
                            >
                              {{ props.row.productName }}
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                              >
                                {{ props.row.productName }}
                              </q-tooltip></a
                            >
                          </q-td>
                          <q-td key="numberSku" :props="props">
                            {{ props.row.numberSku }}
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
        <q-dialog
          v-model="historyModal"
          position="right"
          full-height
          persistent
          maximized
        >
          <q-card style="width: 600px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">Lịch sử cập nhật</h4>
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
                    <div class="row" v-for="arr in item.deleted" :key="arr">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar
                            color="danger"
                            text-color="white"
                            icon="delete"
                          />
                        </q-item-section>

                        <q-item-section
                          >Danh mục cấp {{ arr.level }} {{ arr.name }} đã bị xóa
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="row" v-for="arr in item.added" :key="arr">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar
                            color="primary"
                            text-color="white"
                            icon="add"
                          />
                        </q-item-section>

                        <q-item-section
                          >Danh mục cấp {{ arr.level }} {{ arr.name }} đã được
                          thêm vào
                        </q-item-section>
                      </q-item>
                    </div>
                    <div class="row" v-for="arr in item.nameUpdated" :key="arr">
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar
                            color="primary"
                            text-color="white"
                            icon="autorenew"
                          />
                        </q-item-section>

                        <q-item-section
                          >Tên danh mục cấp {{ arr.level }} {{ arr.name }} đã
                          đổi thành {{ arr.nameUpdated }}
                        </q-item-section>
                      </q-item>
                    </div>
                    <div
                      class="row"
                      v-for="arr in item.statusUpdated"
                      :key="arr"
                    >
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar
                            color="primary"
                            text-color="white"
                            icon="autorenew"
                          />
                        </q-item-section>

                        <q-item-section
                          >Danh mục cấp {{ arr.level }} {{ arr.name }} đã chuyển

                          <div>
                            từ trạng thái
                            <q-badge
                              :color="
                                arr.status == 'ACTIVE' ? 'success' : 'orange'
                              "
                              >{{ statusTextI18n(arr.status) }}</q-badge
                            >
                            sang trạng thái
                            <q-badge
                              :color="
                                arr.updateStatus == 'ACTIVE'
                                  ? 'success'
                                  : 'orange'
                              "
                              >{{ statusTextI18n(arr.updateStatus) }}</q-badge
                            >
                          </div>
                        </q-item-section>
                      </q-item>
                    </div>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-dialog>

        <!-- Add new category start -->
        <q-dialog
          v-model="addNewCategoryModal"
          position="right"
          full-height
          maximized
        >
          <q-card style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{
                  edit
                    ? $t('category.edit_category')
                    : $t('category.add_category_level')
                }}
              </h4>
              <q-space />
              <q-btn
                icon="close"
                flat
                round
                dense
                v-close-popup
                class="d-sm-flex d-none rounded-50"
                :disable="progress"
              />
            </q-card-section>
            <q-form @submit="addNewCategory()">
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col col-12">
                    <!-- <div class="mt-1">
                      <label class="form-label" for="fullname"
                        >Trạng thái *</label
                      >
                    </div>
                    <q-radio v-model="form.status" val="1" label="Hoạt động" />
                    <q-radio
                      v-model="form.status"
                      val="2"
                      label="Ngưng hoạt động"
                    /> -->
                    <div class="mt-1">
                      <label class="form-label label-md">{{
                        edit
                          ? $t('category.category_level')
                          : `${$t(
                              'category.select_the_category_level_to_add'
                            )} *`
                      }}</label>
                      <select
                        class="custom-select fs-12"
                        v-model="form.level"
                        :disabled="disableSelect"
                        @change="changeLevel()"
                      >
                        <option value="1" v-if="form.level == 1 || !edit">
                          {{ $t('category.category_level_1') }}
                        </option>
                        <option value="2">
                          {{ $t('category.category_level_2') }}
                        </option>
                        <option value="3">
                          {{ $t('category.category_level_3') }}
                        </option>
                      </select>
                    </div>
                    <div
                      class="mt-1"
                      v-if="form.level == '2' || form.level == '3'"
                    >
                      <label class="form-label label-md">
                        {{ $t('category.category_level_1') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="form.level1"
                        :disabled="disableLv1"
                        @change="changeLv()"
                      >
                        <option
                          selected
                          value="0"
                          v-if="nodesSelectLv0.length == 0"
                        >
                          {{ $t('category.select_category_level_1') }}
                        </option>
                        <option
                          :value="item.id"
                          v-for="item in nodesSelectLv0"
                          :key="item"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mt-1" v-if="form.level == '3'">
                      <label class="form-label label-md"
                        >{{ $t('category.category_level_2') }} *</label
                      >
                      <select
                        class="custom-select fs-12"
                        v-model="form.level2"
                        :disabled="disableLv2"
                      >
                        <option
                          selected
                          value="0"
                          v-if="nodesSelectLv1.length == 0"
                        >
                          {{ $t('category.select_category_level_2') }}
                        </option>
                        <option
                          :value="item.id"
                          v-for="item in nodesSelectLv1"
                          :key="item"
                        >
                          {{ item.name }}
                        </option>
                      </select>
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('category.category_name') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        dense
                        type="text"
                        v-model="form.name"
                        :placeholder="$t('category.category_name')"
                        lazy-rules
                        :rules="[
                          this.requiredCategoryName,
                          this.isValidateName
                        ]"
                      />
                      <span class="error" v-if="error.name">{{
                        error.name
                      }}</span>
                    </div>
                    <div class="mt-1">
                      <div class="d-flex">
                        <label class="form-label">{{
                          $t('category.thumbnail')
                        }}</label>
                        <q-icon color="primary" name="info">
                          <q-tooltip
                            anchor="center left"
                            self="center right"
                            :offset="[10, 10]"
                          >
                            {{ $t('category.upload_image_ratio') }}
                          </q-tooltip>
                        </q-icon>
                      </div>
                      <div
                        class="w-img-wrap mr-custom mb-1"
                        v-for="image in selectedFile"
                        :key="image.id"
                        style="width: 145px"
                      >
                        <img class="h-100 w-100" :src="image.path" />
                        <q-btn
                          icon="cancel"
                          unelevated
                          round
                          class="upload-image"
                          clickable
                          @click="removeImage(image.id)"
                        />
                      </div>

                      <div
                        class="w-dropper"
                        style="width: 145px"
                        v-if="selectedFile.length == 0"
                      >
                        <input
                          type="file"
                          @change="onFileSelected"
                          accept="image/*"
                          id="imageFile"
                        />
                        <q-icon
                          class="mb-1"
                          size="50px"
                          name="insert_photo"
                          color="primary"
                          @click="selectFile()"
                        />
                        <span class="text-center size12">{{
                          $t('category.upload_image')
                        }}</span>
                        <span class="text-center size12">
                          {{ $t('category.upload_image_size') }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>
              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn
                  style="width: 130px"
                  class="rounded-50"
                  color="danger"
                  :label="$t('general.closed')"
                  outline
                  no-caps
                  clickable
                  v-close-popup
                  :disable="progress"
                />
                <q-btn
                  style="width: 130px"
                  class="ml-50 rounded-50"
                  color="primary"
                  :label="$t('general.save')"
                  no-caps
                  clickable
                  unelevated
                  :disabled="!isValidToSend"
                  :loading="progress"
                  type="submit"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <!-- Add new category end -->

        <q-dialog v-model="deleteModal" persistent>
          <q-card style="width: 500px; padding: 10px">
            <q-card-section class="row items-center">
              <q-icon
                name="warning"
                class="text-warning"
                style="font-size: 2rem"
              />
              <span class="q-ml-sm"
                >{{ $t('category.category') }} [{{ form.name }}]
                {{ $t('category.confirm_delete_category') }}</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.closed')"
                color="secondary"
                style="width: 100px"
                no-caps
                v-close-popup
                :disable="progress"
              />
              <q-btn
                style="width: 100px"
                :label="$t('general.agree')"
                color="primary"
                no-caps
                clickable
                @click="deleteCategory()"
                :loading="progress"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>
<script src="../js/productCategory.js"></script>
