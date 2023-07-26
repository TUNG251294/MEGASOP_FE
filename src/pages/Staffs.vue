<template>
  <q-page class="flex">
    <div class="content-wrapper w-100">
      <!-- <div class="content-header">
        <div class="content-header-left mb-2">
          <div class="row breadcrumbs-top">
            <div class="col-12">
              <h3 class="content-header-title float-left pr-2 mb-0">
                {{ $t('menu.list_of_employee') }}
              </h3>
              <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right" color="secondary" />
                </template>
                <q-breadcrumbs-el icon="home" />
                <q-breadcrumbs-el
                  :label="$t('menu.list_of_employee')"
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
                    {{ $t('menu.list_of_employee') }}
                  </h4>
                </div> -->
                <div class="row items-end justify-start">
                  <div class="col col-md-3 pr-1">
                    <div class="form-group">
                      <label for="region" class="label-md">{{ $t('general.status') }}</label>
                      <select class="custom-select fs-12" v-model="status">
                        <option value="-1" selected>
                          {{ $t('general.select_status') }}
                        </option>
                        <option value="1">{{ $t('general.active') }}</option>
                        <option value="0">{{ $t('general.inactive') }}</option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-md-1 pr-1">
                    <div class="mb-1 ml-n75">
                      <label for="" class="mb-0">&nbsp;</label>
                      <q-btn
                        color="primary"
                        icon="filter_alt"
                        flat
                        round
                        outline
                        no-caps
                        clickable
                        @click="searchStaff()"
                      />
                    </div>
                  </div>
                </div>
                <q-separator />
                <div class="row mt-2">
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
                    :rows="staffs"
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
                            :placeholder="$t('employee.list.search_by_name')"
                            @change="filterStaffs()"
                            @focus="is_focusInputSearch = true"
                            @blur="is_focusInputSearch = false"
                          >
                            <template v-slot:append>
                              <q-icon name="search" />
                            </template>
                          </q-input>
                        </div>
                        <div class="col col-md-3 text-right">
                          <q-btn
                            class="rounded-50"
                            unelevated
                            no-caps
                            color="primary"
                            icon="add"
                            :label="$t('general.create')"
                            @click="onAddStaff()"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="index" :props="props"
                          >{{ props.row.index }}
                        </q-td>
                        <q-td key="fullname" :props="props" auto-width>
                          <div class="row">
                            <q-item-section avatar>
                              <q-avatar>
                                <img
                                  :src="
                                    props.row.avatar
                                      ? props.row.avatar
                                      : 'icons/favicon-96x96.png'
                                  "
                                />
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              {{ props.row.fullname }}
                              <q-tooltip
                                anchor="top middle"
                                self="bottom middle"
                                :offset="[10, 10]"
                              >
                                {{ props.row.fullname }}
                              </q-tooltip>
                            </q-item-section>
                          </div>
                        </q-td>
                        <q-td key="email" :props="props" auto-width
                          >{{ props.row.email }}
                        </q-td>
                        <q-td key="mobile" :props="props"
                          >{{ props.row.mobile }}
                        </q-td>
                        <q-td key="address" :props="props"
                          >{{ props.row.address }}
                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            {{ props.row.address }}
                          </q-tooltip>
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
                        <q-td key="action" :props="props">
                          <q-btn
                            flat
                            icon="far fa-edit"
                            size="sm"
                            color="primary"
                            clickable
                            @click="onDetail(props.row)"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ $t('employee.list.edit_tooltip') }}
                            </q-tooltip>
                          </q-btn>
                          <q-btn
                            flat
                            icon="refresh"
                            size="sm"
                            color="primary"
                            clickable
                            @click="onRefresh(props.row)"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{ $t('employee.list.reset_password_tooltip') }}
                            </q-tooltip>
                          </q-btn>
                          <q-btn
                            flat
                            :icon="
                              props.row.status == 'ACTIVE'
                                ? 'lock'
                                : 'lock_open'
                            "
                            size="sm"
                            :color="
                              props.row.status == 'ACTIVE'
                                ? 'danger'
                                : 'primary'
                            "
                            clickable
                            @click="onLockOrUnlock(props.row)"
                          >
                            <q-tooltip
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[10, 10]"
                            >
                              {{
                                props.row.status == 'ACTIVE'
                                  ? $t('employee.list.lock_acc')
                                  : $t('employee.list.unlock_acc')
                              }}
                            </q-tooltip>
                          </q-btn>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-dialog v-model="modal" position="right" maximized full-height>
          <q-card class="card card-shadow border-0" style="width: 400px">
            <q-card-section class="row items-center q-pb-none">
              <h4 class="text-weight-bolder mb-0">
                {{
                  edit
                    ? $t('employee.create.edit_employee')
                    : $t('employee.create.create_a_employee')
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
            <q-form @submit="addOrUpdateStaff()">
              <q-card-section class="q-pt-none">
                <div class="row">
                  <div class="col col-12">
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('employee.create.full_name') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        :placeholder="$t('employee.create.enter_employee_name')"
                        autofocus=""
                        tabindex="1"
                        v-model="form.fullname"
                        lazy-rules
                        :rules="[this.requiredFullname]"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('employee.create.email') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        :placeholder="$t('employee.create.enter_the_email')"
                        autofocus=""
                        tabindex="2"
                        v-model="form.email"
                        lazy-rules
                        :rules="[this.requiredEmail]"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('employee.create.phone_number') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        :placeholder="
                          $t('employee.create.enter_the_phone_number')
                        "
                        autofocus=""
                        tabindex="3"
                        v-model="form.mobile"
                        lazy-rules
                        :rules="[this.requiredMobile]"
                      />
                    </div>
                    <div class="mt-1">
                      <label class="form-label label-md"
                        >{{ $t('employee.create.address') }} *</label
                      >
                      <q-input
                        no-error-icon
                        hide-bottom-space
                        outlined
                        type="text"
                        :placeholder="$t('employee.create.enter_address')"
                        autofocus=""
                        tabindex="4"
                        v-model="form.address"
                        lazy-rules
                        :rules="[this.requiredAddress]"
                      />
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
                          >{{ $t('employee.create.choose_your_avatar') }}</label
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
                            class="btn btn-primary m-0 rounded-pill px-3"
                          >
                            <q-icon
                              name="cloud_upload"
                              size="20px"
                              class="mr-1"
                            />{{
                              $t('employee.create.select_a_picture')
                            }}</label
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
                  v-if="edit"
                  color="primary"
                  :label="$t('general.edit')"
                  class="rounded-50"
                  no-caps
                  clickable
                  unelevated
                  :loading="progress"
                  :disabled="!isValidToSend"
                  type="submit"
                  style="width:130px"
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
                  :disabled="!isValidToSend"
                  type="submit"
                  style="width:130px"
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="resetModal" persistent>
          <q-card class="card card-shadow border-0">
            <q-card-section class="row items-center">
              <q-avatar
                icon="notifications_active"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm"
                >{{ $t('employee.list.confirm_reset_password') }} [{{
                  form.fullname
                }}]?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.cancel')"
                class="rounded-50"
                color="danger"
                v-close-popup
                unelevated
                no-caps
                outline
                :disable="progress"
                style="width:130px"
              />
              <q-btn
                :label="$t('general.agree')"
                class="rounded-50"
                color="primary"
                clickable
                unelevated
                no-caps
                :loading="progress"
                @click="resetPassword(form.id)"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="lockOrUnlockModal" persistent>
          <q-card class="card card-shadow border-0">
            <q-card-section class="row items-center">
              <q-avatar
                icon="notifications_active"
                color="primary"
                text-color="white"
              />
              <span class="q-ml-sm">
                {{
                  form.action === 'lock'
                    ? $t('employee.list.confirm_lock_acc')
                    : $t('employee.list.confirm_unlock_acc')
                }}
                [{{ form.fullname }}]?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                :label="$t('general.cancel')"
                class="rounded-50"
                color="danger"
                v-close-popup
                unelevated
                no-caps
                outline
                :disable="progress"
                style="width:130px"
              />
              <q-btn
                :label="$t('general.agree')"
                class="rounded-50"
                color="primary"
                clickable
                unelevated
                no-caps
                :loading="progress"
                @click="lockOrUnlockStaff(form.id)"
                style="width:130px"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script src="../js/staffs.js"></script>
