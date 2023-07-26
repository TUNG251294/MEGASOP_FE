<template>
    <q-page class="flex">
        <div class="content-wrapper w-100">
            <!-- <div class="content-header">
                <div class="content-header-left mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                        <h3 class="content-header-title float-left pr-2 mb-0">
                            {{ $t('retailers.retailer_details') }}
                        </h3>
                        <q-breadcrumbs class="text-brown d-sm-flex d-none pl-2">
                            <template v-slot:separator>
                            <q-icon size="1.5em" name="chevron_right" color="secondary" />
                            </template>

                            <q-breadcrumbs-el icon="home" />
                            <q-breadcrumbs-el
                            :label="$t('retailers.retailer_list')"
                            to="/retailers"
                            />
                            <q-breadcrumbs-el
                            :label="$t('retailers.retailer_details')"
                            style="color: #2a2a2a"
                            />
                        </q-breadcrumbs>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="content-body">
                <div class="row mx-n1">
                    <div class="col-lg-4 col-sm-12 col-12 mb-1 d-flex">
                        <div class="card card-shadow border-0 w-100">
                            <div class="card-body">
                                <div class="row">
                                    <span class="avatar avatar-center" id="display-area">
                                        <span class="avatar-img">
                                            <img id="retailerAvatar" :src="form.imageSrc != ''
                                                    ? form.imageSrc
                                                    : 'icons/favicon-96x96.png'
                                                " alt="Avatar" class="rounded" @click="handleUpload()" />
                                            <input id="image-upload" class="d-none" type="file" @change="onFileSelected"
                                                accept="image/*" />
                                        </span>
                                    </span>
                                </div>
                                <div class="center text-center">
                                    <h6 class="mt-1 text-weight-bold">{{ retailerInfo.name }}</h6>
                                    <q-separator inset size="2px" />
                                    <h6 class="mt-1 mb-1 text-weight-bold"></h6>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.retailer_name') }}:
                                    </span>
                                    <span>{{ retailerInfo.name }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.retailer_code') }}:
                                    </span>
                                    <span>{{ retailerInfo.retailerCode }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.bod') }}:
                                    </span>
                                    <span>{{ retailerInfo.birthday }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.create_date') }}:
                                    </span>
                                    <span>{{ retailerInfo.createdDate }}</span>
                                </div>
                                <div class="row mt-3">
                                    <h4 class="text-weight-bold">
                                        {{ $t('retailers.details.detail') }}
                                    </h4>
                                </div>
                                <q-separator size="2px" class="text-dark w-100 mb-1" />
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.status') }}:
                                    </span>
                                    <span><q-badge color="success" v-if="retailerInfo.status === 'ACTIVE'">
                                            {{ $t('general.active') }}
                                        </q-badge>
                                        <q-badge color="danger" v-if="retailerInfo.status === 'INACTIVE'">
                                            {{ $t('general.inactive') }}
                                        </q-badge>
                                        <q-badge color="warning" v-if="retailerInfo.status === 'STATUS_TWO'">
                                            {{ $t('general.waiting_for_approval') }}
                                        </q-badge></span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.agent') }}:
                                    </span>
                                    <span>{{ retailerInfo.retailerSign }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.card_id') }}:
                                    </span>
                                    <span>{{ retailerInfo.retailerIdCard }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.email') }}:
                                    </span>
                                    <span>{{ retailerInfo.email }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.phone') }}:
                                    </span>
                                    <span>{{ retailerInfo.mobile }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.address') }}:
                                    </span>
                                    <span>{{ address }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.ward') }}:
                                    </span>
                                    <span>{{ ward }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.district') }}:
                                    </span>
                                    <span>{{ district }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.city') }}:
                                    </span>
                                    <span>{{ city }}</span>
                                </div>
                                <div class="row mt-3">
                                    <h4 class="text-weight-bold">
                                        {{ $t('retailers.details.invoice_information') }}
                                    </h4>
                                </div>
                                <q-separator size="2px" class="text-dark w-100 mb-1" />
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.payment_agent_name') }}:
                                    </span>
                                    <span>{{ retailerInvoiceInfo.retailerInvoiceName }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.address_invoice') }}:
                                    </span>
                                    <span>{{ retailerInvoiceInfo.addressText }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.tax_code') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.taxNo == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.taxNo
                                    }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.phone_invoice') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.tel == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.tel
                                    }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.bank_invoice') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.bankName == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.bankName
                                    }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.branch_invoice') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.bankBranch == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.bankBranch
                                    }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.bank_account_number') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.bankAccountNo == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.bankAccountNo
                                    }}</span>
                                </div>
                                <div class="row mb-1">
                                    <span class="text-bold mr-1">{{ $t('retailers.details.bank_account_name') }}:
                                    </span>
                                    <span>{{
                                        retailerInvoiceInfo.bankAccountName == ''
                                        ? 'N/A'
                                        : retailerInvoiceInfo.bankAccountName
                                    }}</span>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-xs-12">
                                        <div class="text-center">
                                            <button class="btn btn-primary mr-1 mb-1" @click="onDetail()"
                                                style="min-width: 100px" :disable="progress">
                                                {{ $t('general.edit') }}
                                            </button>
                                            <button class="btn btn-outline-primary mb-1"
                                                v-if="retailerInfo.status === 'STATUS_TWO'" style="min-width: 120px"
                                                @click="changeStatusRetailer()" :loading="progress">
                                                {{ $t('general.approve') }}
                                            </button>
                                            <button class="btn btn-outline-danger mb-1"
                                                v-if="retailerInfo.status === 'ACTIVE'" @click="changeStatusRetailer()"
                                                :loading="progress">
                                                {{ $t('general.pause') }}
                                            </button>
                                            <button class="btn btn-outline-success mb-1"
                                                v-if="retailerInfo.status === 'INACTIVE'" @click="changeStatusRetailer()"
                                                :loading="progress">
                                                {{ $t('general.activated') }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-sm-12 col-12 mb-1 d-lex">
                        <div class="row">
                            <q-tabs v-model="tab" no-caps inline-label class="mb-1">
                                <q-tab name="overview" :label="$t('retailers.details.general')" />
                                <q-tab name="sellin" :label="$t('retailers.details.sellin')" />
                                <q-tab name="sellout" :label="$t('retailers.details.sellout')" />
                                <q-tab name="debt" :label="$t('debt.detail.debt')" />
                            </q-tabs>
                            <q-separator size="2px" class="text-dark w-100 mb-1" />
                            <!-- Ẩn fiter ngày -->
                            <div class="row mb-2" v-if="tab !== 'debt'">
                                <div class="col-lg-4 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="fromDate">{{ $t('general.from_date') }}</label>
                                        <q-input filled v-model="fromDate" mask="##/##/####" :rules="['##/##/####']"
                                            class="form-control">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy style="width: 300px; height: 400px"
                                                        transition-show="scale" transition-hide="scale">
                                                        <q-date no-unset v-model="fromDate"
                                                            style="width: 300px; height: 400px" :options="optionsFromDate"
                                                            mask="DD/MM/YYYY" :title="$t('general.from_date')">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup :label="$t('general.closed')"
                                                                    color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="toDate">{{ $t('general.to_date') }}</label>
                                        <q-input filled v-model="toDate" mask="##/##/####" :rules="['##/##/####']"
                                            class="form-control">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy style="width: 300px; height: 400px"
                                                        transition-show="scale" transition-hide="scale">
                                                        <q-date no-unset v-model="toDate"
                                                            style="width: 300px; height: 400px" :options="optionsToDate"
                                                            mask="DD/MM/YYYY" :title="$t('general.to_date')">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup :label="$t('general.closed')"
                                                                    color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="">&nbsp;</label>
                                        <q-btn flat round color="primary" icon="filter_alt" class="form-control"
                                            style="border: none; width: 0; background: none" clickable
                                            @click="searchGeneral()" />
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-2" v-if="tab == 'debt'">
                                <div class="col-lg-4 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="fromDate">{{ $t('general.from_date') }}</label>
                                        <q-input filled v-model="fromDateDebt" mask="##/##/####" :rules="['##/##/####']"
                                            class="form-control" readonly>
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy style="width: 300px; height: 400px"
                                                        transition-show="scale" transition-hide="scale">
                                                        <q-date no-unset v-model="fromDateDebt"
                                                            style="width: 300px; height: 400px" :options="optionsFromDate"
                                                            mask="DD/MM/YYYY" :title="$t('general.from_date')">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup :label="$t('general.closed')"
                                                                    color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="toDate">{{ $t('general.to_date') }}</label>
                                        <q-input filled v-model="toDateDebt" mask="##/##/####" :rules="['##/##/####']"
                                            class="form-control" readonly>
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy style="width: 300px; height: 400px"
                                                        transition-show="scale" transition-hide="scale">
                                                        <q-date no-unset v-model="toDateDebt"
                                                            style="width: 300px; height: 400px" :options="optionsToDate"
                                                            mask="DD/MM/YYYY" :title="$t('general.to_date')">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup :label="$t('general.closed')"
                                                                    color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-sm-6 col-12 no-pl">
                                    <div class="form-group">
                                        <label for="">&nbsp;</label>
                                        <q-btn flat round color="primary" icon="filter_alt" class="form-control"
                                            style="border: none; width: 0; background: none" clickable
                                            @click="searchDebt()" />
                                    </div>
                                </div>

                                <!-- <q-separator size="2px" class="text-dark w-100 mb-1" /> -->

                            </div>

                            <q-tab-panels v-model="tab" animated class="w-100">
                                <q-tab-panel name="overview">
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card card-shadow border-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-6">
                                                            <h5 class="float-left text-weight-bold">
                                                                {{ $t('retailers.details.sellin') }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellins.numberOfOrder }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.number_of_sellin_orders'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="18px" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellins.totalCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.sellin_value') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellins.distribution }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.date_order') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellins.meanCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.average_order_value'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card card-shadow border-0">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-6">
                                                            <h5 class="float-left text-weight-bold">
                                                                {{ $t('retailers.details.sellout') }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.numberOfOrder }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.number_of_orders_sold'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="18px" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.totalCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.sellout_value') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.distribution }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.date_order') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.meanCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.average_order_value'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.numberOfVoucher || 0 }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.usage_voucher_quantity'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.totalCostOfVoucher || 0
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.total_value_usage_voucher'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-6">
                                                            <h5 class="float-left text-weight-bold">
                                                                {{ $t('debt.detail.debt') }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(debtRetailerOverview.creditLimit).toLocaleString('en-US')
                                                                            || 0 }} đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('debt.detail.debt_limit') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="18px" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                debtRetailerOverview.overdraftCredit
                                                                            ).toLocaleString('en-US') || 0
                                                                        }} đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('debt.detail.overdraft_limit') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(debtRetailerOverview.availableLimit).toLocaleString('en-US')
                                                                            || 0 }} đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t('debt.detail.debt_availabilty_limit')
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-danger"
                                                                            size="sm" style="
                                                                                            font-size: 1rem;
                                                                                            background-color: #FFCCCC;
                                                                                            padding: 1rem;
                                                                                            border-radius: 50%;
                                                                                            " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0" style="color: red">
                                                                        {{
                                                                            Number(
                                                                                debtRetailerOverview?.finalDebt
                                                                            ).toLocaleString('en-US') || 0
                                                                        }} đ

                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0" style="color: red">
                                                                        {{ $t('debt.detail.debt_end_of_term') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-tab-panel>
                                <q-tab-panel name="sellin">
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-6">
                                                            <h5 class="float-left text-weight-bold">
                                                                {{ $t('retailers.details.sales_sellin_info') }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellins.numberOfOrder }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.number_of_sellin_orders'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="18px" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellins.totalCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.sellin_value') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellins.distribution }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.date_order') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellins.meanCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.average_order_value'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col col-12">
                                            <div class="card card-shadow border-0">
                                                <div class="card-body">
                                                    <q-table :rows="sellinRows" :columns="sellinColumnsI18n" color="primary"
                                                        row-key="id" :title="$t('retailers.details.sellin_order_history')
                                                            " :rows-per-page-options="rowsSellinPerPageOptions" v-model:pagination="sellinPagination"
                                                        @request="onSellinRequest">
                                                        >
                                                        <template v-slot:body="props">
                                                            <q-tr :props="props" @click="props.selected = true">
                                                                <q-td key="id" :props="props">{{ props.row.id }}
                                                                </q-td>
                                                                <q-td key="orderCode" :props="props">
                                                                    {{ props.row.orderCode }}
                                                                </q-td>
                                                                <q-td key="orderDate" :props="props">
                                                                    {{ props.row.orderDate }}
                                                                </q-td>
                                                                <q-td key="finalCost" :props="props">
                                                                    {{
                                                                        Number(props.row.finalCost).toLocaleString(
                                                                            'en-US'
                                                                        )
                                                                    }}đ
                                                                </q-td>
                                                                <q-td key="orderStatus" :props="props">
                                                                    <q-badge :color="colorStatus[props.row.orderStatus]">
                                                                        {{ labelStatus[props.row.orderStatus] }}
                                                                    </q-badge>
                                                                </q-td>
                                                            </q-tr>
                                                        </template>
                                                    </q-table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-tab-panel>
                                <q-tab-panel name="sellout">
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <div class="row">
                                                        <div class="col col-sm-6">
                                                            <h5 class="float-left text-weight-bold">
                                                                {{ $t('retailers.details.sales_sellout_info') }}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div class="row mt-1">
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.numberOfOrder }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.number_of_orders_sold'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="18px" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.totalCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.sellout_value') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.distribution }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{ $t('retailers.details.date_order') }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.meanCostOrder
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.average_order_value'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="inventory_2" class="text-primary"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #7367f01f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{ sellouts.numberOfVoucher || 0 }}
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.usage_voucher_quantity'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1">
                                                            <div class="media">
                                                                <div class="avatar bg-light-primary mr-1">
                                                                    <div class="avatar-content">
                                                                        <q-icon name="attach_money" class="text-success"
                                                                            size="sm" style="
                                                  font-size: 1rem;
                                                  background-color: #28c76f1f;
                                                  padding: 1rem;
                                                  border-radius: 50%;
                                                " />
                                                                    </div>
                                                                </div>
                                                                <div class="media-body my-auto">
                                                                    <p class="font-weight-bolder mb-0">
                                                                        {{
                                                                            Number(
                                                                                sellouts.totalCostOfVoucher || 0
                                                                            ).toLocaleString('en-US')
                                                                        }}
                                                                        đ
                                                                    </p>
                                                                    <p class="card-text font-small-3 mb-0">
                                                                        {{
                                                                            $t(
                                                                                'retailers.details.total_value_usage_voucher'
                                                                            )
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-2">
                                        <div class="col col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                    <q-table :rows="selloutRows" :columns="columnsI18n" color="primary"
                                                        row-key="id" :title="$t('retailers.details.sellout_order_history')
                                                            " :rows-per-page-options="rowsSelloutPerPageOptions" v-model:pagination="selloutPagination"
                                                        @request="onSelloutRequest">
                                                        >
                                                        <template v-slot:body="props">
                                                            <q-tr :props="props" @click="props.selected = true">
                                                                <q-td key="id" :props="props">{{ props.row.id }}
                                                                </q-td>
                                                                <q-td key="orderCode" :props="props">
                                                                    {{ props.row.orderCode }}
                                                                </q-td>
                                                                <q-td key="consumerName" :props="props">
                                                                    {{ props.row.consumerName }}
                                                                </q-td>
                                                                <q-td key="orderDate" :props="props">
                                                                    {{ props.row.orderDate }}
                                                                </q-td>

                                                                <q-td key="orderStatus" :props="props">

                                                                    <q-badge :color="colorStatus[props.row.orderStatus]">
                                                                        {{ labelStatus[props.row.orderStatus] }}
                                                                    </q-badge>
                                                                </q-td>
                                                                <q-td key="orderCost" :props="props">
                                                                    {{
                                                                        Number(props.row.orderCost).toLocaleString(
                                                                            'en-US'
                                                                        )
                                                                    }}đ
                                                                </q-td>
                                                                <q-td key="voucherCode" :props="props">
                                                                    {{ props.row.voucherCode || 'N/A' }}
                                                                </q-td>
                                                                <q-td key="voucherRedeem" :props="props">
                                                                    {{
                                                                        Number(
                                                                            props.row.voucherRedeem ||
                                                                            0 + props.row.promotionRedeem ||
                                                                            0
                                                                        ).toLocaleString('en-US')
                                                                    }}đ
                                                                </q-td>
                                                                <q-td key="finalCost" :props="props">
                                                                    {{
                                                                        Number(
                                                                            props.row.finalCost || 0
                                                                        ).toLocaleString('en-US')
                                                                    }}đ
                                                                </q-td>
                                                            </q-tr>
                                                        </template>
                                                    </q-table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-tab-panel>
                                <q-tab-panel name="debt">
                                    <div class="row mb-2">
                                        <div class="col col-12">
                                            <div class="card">
                                                <div class="card-body">
                                                <div class="row">
                                                    <div class="col col-sm-6">
                                                    <h5 class="float-left text-weight-bold">
                                                        {{ $t('debt.detail.debt') }}
                                                    </h5>
                                                    </div>
                                                </div>
                                                <div class="row mt-1">
                                                    <div
                                                    class="col-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                    >
                                                    <div class="row">
                                                        <div
                                                        class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                        >
                                                        <div class="media">
                                                            <div class="avatar bg-light-primary mr-1">
                                                            <div class="avatar-content">
                                                                <q-icon
                                                                name="attach_money"
                                                                class="text-success"
                                                                size="sm"
                                                                style="
                                                                    font-size: 1rem;
                                                                    background-color: #28c76f1f;
                                                                    padding: 1rem;
                                                                    border-radius: 50%;
                                                                "
                                                                />
                                                            </div>
                                                            </div>
                                                            <div class="media-body my-auto">
                                                            <p class="font-weight-bolder mb-0">
                                                                {{
                                                                Number(
                                                                    debtRetailer.creditLimit
                                                                ).toLocaleString('en-US') || 0
                                                                }}
                                                                đ
                                                            </p>
                                                            <p class="card-text font-small-3 mb-0">
                                                                {{ $t('debt.detail.debt_limit') }}
                                                            </p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div
                                                        class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                        >
                                                        <div class="media">
                                                            <div class="avatar bg-light-primary mr-1">
                                                            <div class="avatar-content">
                                                                <q-icon
                                                                name="attach_money"
                                                                class="text-success"
                                                                size="18px"
                                                                style="
                                                                    font-size: 1rem;
                                                                    background-color: #28c76f1f;
                                                                    padding: 1rem;
                                                                    border-radius: 50%;
                                                                "
                                                                />
                                                            </div>
                                                            </div>
                                                            <div class="media-body my-auto">
                                                            <p class="font-weight-bolder mb-0">
                                                                {{
                                                                Number(
                                                                    debtRetailer.overdraftCredit
                                                                ).toLocaleString('en-US') || 0
                                                                }}
                                                                đ
                                                            </p>
                                                            <p class="card-text font-small-3 mb-0">
                                                                {{ $t('debt.detail.overdraft_limit') }}
                                                            </p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div
                                                        class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                        >
                                                        <div class="media">
                                                            <div class="avatar bg-light-primary mr-1">
                                                            <div class="avatar-content">
                                                                <q-icon
                                                                name="attach_money"
                                                                class="text-success"
                                                                size="sm"
                                                                style="
                                                                    font-size: 1rem;
                                                                    background-color: #28c76f1f;
                                                                    padding: 1rem;
                                                                    border-radius: 50%;
                                                                "
                                                                />
                                                            </div>
                                                            </div>
                                                            <div class="media-body my-auto">
                                                            <p class="font-weight-bolder mb-0">
                                                                {{
                                                                Number(
                                                                    debtRetailer.availableLimit
                                                                ).toLocaleString('en-US') || 0
                                                                }}
                                                                đ
                                                            </p>
                                                            <p class="card-text font-small-3 mb-0">
                                                                {{
                                                                $t(
                                                                    'debt.detail.debt_availabilty_limit'
                                                                )
                                                                }}
                                                            </p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                        <div
                                                        class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                        >
                                                        <div class="media">
                                                            <div class="avatar bg-light-primary mr-1">
                                                            <div class="avatar-content">
                                                                <q-icon
                                                                name="attach_money"
                                                                class="text-danger"
                                                                size="sm"
                                                                style="
                                                                    font-size: 1rem;
                                                                    background-color: #FFCCCC;
                                                                    padding: 1rem;
                                                                    border-radius: 50%;
                                                                "
                                                                />
                                                            </div>
                                                            </div>
                                                            <div class="media-body my-auto">
                                                            <p class="font-weight-bolder mb-0" style="color: red">
                                                                {{
                                                                Number(
                                                                    debtRetailer.finalDebt
                                                                ).toLocaleString('en-US') || 0
                                                                }}
                                                                đ
                                                            </p>
                                                            <p
                                                                class="card-text font-small-3 mb-0"
                                                                style="color: red"
                                                            >
                                                                {{ $t('debt.detail.debt_end_of_term') }}
                                                            </p>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div
                                                    class="col-6 col-sm-6 col-xs-12 col-12 col mb-1 d-flex flex-column justify-content-center align-items-start"
                                                    >
                                                    <div
                                                        class="col-md-6 col-sm-6 col-xs-12 col-12 col mb-1"
                                                    >
                                                        <div class="media" style="margin-top: 10px">
                                                        <div class="avatar bg-light-primary mr-1">
                                                            <div class="avatar-content">
                                                                <q-icon
                                                                name="calendar_month"
                                                                class="text-primary"
                                                                size="sm"
                                                                style="
                                                                    font-size: 1rem;
                                                                    background-color: #BFEFFF;
                                                                    padding: 1rem;
                                                                    border-radius: 50%;
                                                                "
                                                                />
                                                            </div>
                                                            </div>
                                                        <div class="media-body my-auto">
                                                            <p
                                                            class="card-text font-weight-bolder mb-0"
                                                            >
                                                            {{ $t('debt.debt_term') }}
                                                            </p>
                                                            <p class="font-small-3 mb-0">
                                                            {{ debtRetailer.paymentPeriod || 0}} ngày
                                                            </p>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <q-tabs v-model="tabDebt" no-caps inline-label class="mb-1">
                                            <q-tab name="debt-order" :label="$t('debt.detail.detail_debt_order')" />
                                            <q-tab name="debt-history" :label="$t('debt.detail.history_update_debt')" />
                                        </q-tabs>
                                    </div>
                                    <div class="row mt-2">
                                        <q-tab-panels v-model="tabDebt" animated class="w-100">
                                            <q-tab-panel name="debt-order">
                                                <div class="col col-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-lg-6 col-sm-6 col-12 no-pl font-weight-bolder">
                                                                    {{ $t('debt.detail.detail_debt_order') }}
                                                                </div>
                                                            </div>
                                                        <q-separator class="mt-1"/>
                                                            <div class="row">
                                                                <div
                                                                    :class="`col col-md-${
                                                                    is_focusInputSearch ? '5' : '4'
                                                                    } pt-1 pb-1`"
                                                                    style="transition: all 0.3s ease-in-out"
                                                                >
                                                                    <q-input
                                                                    class="search_datatable"
                                                                    no-error-icon
                                                                    hide-bottom-space
                                                                    outlined
                                                                    type="text"
                                                                    :title="$t('debt.search_by_order_code_a_name')"
                                                                    v-model="searchText"
                                                                    :placeholder="$t('debt.search_by_order_code_a_name')"
                                                                    @change="getDebtOrders()"
                                                                    @focus="is_focusInputSearch = true"
                                                                    @blur="is_focusInputSearch = false"
                                                                    style="background-color: #fff;"
                                                                    >
                                                                    <template v-slot:append>
                                                                        <q-icon name="search" />
                                                                    </template>
                                                                    </q-input>
                                                                </div>
                                                            </div>
                                                            <q-table :rows="debtOrderRows" :columns="debtOrderColumnsI18n"
                                                                color="primary" row-key="id"
                                                                :rows-per-page-options="rowsDebtOrderPerPageOptions"
                                                                v-model:pagination="debtOrderPagination"
                                                                @request="onDebtOrderRequest">
                                                                >
                                                                <template v-slot:body="props">
                                                                    <q-tr :props="props" @click="props.selected = true">
                                                                        <q-td key="index" :props="props">{{ props.row.index
                                                                        }}
                                                                        </q-td>
                                                                        <q-td key="retailerCode" :props="props">
                                                                            {{ retailerCode }}
                                                                        </q-td>
                                                                        <q-td
                                                                            key="orderCode"
                                                                            :props="props"
                                                                            class="column-orderCode"
                                                                            :title="props.row.orderCode"
                                                                        >
                                                                            <div
                                                                            class="text-ellipsis"
                                                                            @mouseover="showTooltip(props.row.orderCode)"
                                                                            @mouseleave="hideTooltip"
                                                                            >
                                                                            {{ props.row.orderCode }}
                                                                            </div>
                                                                        </q-td>
                                                                        <q-td key="typeOfDebt" :props="props"
                                                                            :style="props.row.typeOfDebt === 'Trong hạn' ? `color:#28c76f ;` : (props.row.typeOfDebt === 'Đến hạn' ? `color:#cddc39 ;` : `color:red ;`)">
                                                                            {{ props.row.typeOfDebt }}
                                                                        </q-td>
                                                                        <q-td
                                                                            key="orderer"
                                                                            :props="props"
                                                                            class="column-orderer"
                                                                            :title="props.row.orderer"
                                                                        >
                                                                            <div
                                                                            class="text-ellipsis"
                                                                            @mouseover="showTooltip(props.row.orderer)"
                                                                            @mouseleave="hideTooltip"
                                                                            >
                                                                            {{ props.row.orderer }}
                                                                            </div>
                                                                        </q-td>
                                                                        <q-td key="debtDay" :props="props">
                                                                            {{ props.row.debtDay }}
                                                                        </q-td>
                                                                        <q-td key="outOfDate" :props="props">
                                                                            {{ props.row.outOfDate }}
                                                                        </q-td>
                                                                        <q-td key="finalCost" :props="props">
                                                                            {{
                                                                                Number(
                                                                                    props.row.finalCost || 0
                                                                                ).toLocaleString('en-US')
                                                                            }}đ
                                                                        </q-td>
                                                                        <q-td key="paid" :props="props">
                                                                            {{
                                                                                Number(
                                                                                    props.row.paid || 0
                                                                                ).toLocaleString('en-US')
                                                                            }}đ
                                                                        </q-td>
                                                                        <q-td key="orderStatus" :props="props">
                                                                            <q-chip
                                                                                :class="`title-xs text-${textColorStatus[props?.row?.orderStatus]} bg-${bgColorStatus[props?.row?.orderStatus]} my-0`"
                                                                            >
                                                                                {{ labelStatusI18n[props?.row?.orderStatus] }}
                                                                            </q-chip>
                                                                        </q-td>
                                                                    </q-tr>
                                                                </template>
                                                            </q-table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </q-tab-panel>
                                            <q-tab-panel name="debt-history">
                                                <div class="col col-12">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <div class="row">
                                                                <div class="col-lg-6 col-sm-6 col-12 no-pl font-weight-bolder">
                                                                    {{ $t('debt.detail.history_update_debt') }}
                                                                </div>
                                                            </div>
                                                        <q-separator class="mt-1"/>
                                                            <div class="pt-1">
                                                                <q-table :rows="debtHistoryRows"
                                                                    :columns="debtHistoryColumnI18n" color="primary"
                                                                    :rows-per-page-options="rowsDebtOrderPerPageOptions
                                                                        " v-model:pagination="debtHistoryPagination" @request="onDebtHistoryRequest">
                                                                    >
                                                                    <template v-slot:body="props">
                                                                        <q-tr :props="props" @click="props.selected = true">
                                                                            <q-td key="index" :props="props">{{ props.row.index
                                                                            }}
                                                                            </q-td>
                                                                            <q-td key="createTime" :props="props">
                                                                                {{ props.row.createTime }}
                                                                            </q-td>
                                                                            <q-td key="creditLimit" :props="props">
                                                                                {{
                                                                                    Number(
                                                                                        props.row.creditLimit
                                                                                    ).toLocaleString('en-US')
                                                                                }}đ
                                                                            </q-td>
                                                                            <q-td key="finalDebt" :props="props">
                                                                                {{
                                                                                    Number(
                                                                                        props.row.finalDebt
                                                                                    ).toLocaleString('en-US')
                                                                                }}đ
                                                                            </q-td>
                                                                            <q-td key="overdraftCredit" :props="props">
                                                                                {{
                                                                                    Number(
                                                                                        props.row.overdraftCredit
                                                                                    ).toLocaleString('en-US')
                                                                                }}đ
                                                                            </q-td>
                                                                            <q-td key="paymentPeriod" :props="props">
                                                                                {{ props.row.paymentPeriod }}
                                                                            </q-td>
                                                                        </q-tr>
                                                                    </template>
                                                                </q-table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </q-tab-panel>
                                        </q-tab-panels>
                                    </div>
                                </q-tab-panel>
                            </q-tab-panels>
                        </div>
                    </div>
                </div>
                <q-dialog v-model="modal" persistent>
                    <q-card style="width: 1000px; max-width: 80vw; height: 800px">
                        <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6 text-weight-bold">
                                {{ $t('retailers.edit_retailer') }}
                            </div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup class="d-sm-flex d-none"
                                :disable="progress" />
                        </q-card-section>
                        <q-form @submit="updateRetailer()">
                            <q-card-section class="q-pt-none">
                                <div class="row mt-1">
                                    <div class="no-pl col-md-6 col-sm-12 col-12">
                                        <h4 class="text-weight-bold">
                                            {{ $t('retailers.retailer_information') }}
                                        </h4>
                                        <div class="form-group mt-1">
                                            <label class="form-label" for="signName">{{
                                                $t('retailers.agent')
                                            }}</label>
                                            <input class="form-control" type="text"
                                                :placeholder="$t('retailers.enter_agent_name')" autofocus="" tabindex="1"
                                                v-model="form.info.retailerSign" />
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="fullname">{{
                                                $t('retailers.retailer_name')
                                            }}</label>
                                            <input class="form-control" type="text"
                                                :placeholder="$t('retailers.enter_retailer_name')" autofocus="" tabindex="2"
                                                v-model="form.info.fullName" />
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="fullname">{{
                                                        $t('retailers.id_card')
                                                    }}</label>
                                                    <input class="form-control" type="text"
                                                        :placeholder="$t('retailers.enter_id_card')" autofocus=""
                                                        tabindex="3" v-model="form.info.retailerIdCard" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="dateOfBirth">{{
                                                        $t('retailers.bod')
                                                    }}</label>
                                                    <q-input filled v-model="form.info.birthday" mask="##/##/####"
                                                        :rules="['##/##/####']" class="form-control" tabindex="4">
                                                        <template v-slot:append>
                                                            <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy style="width: 300px; height: 400px"
                                                                    transition-show="scale" transition-hide="scale">
                                                                    <q-date v-model="form.info.birthday"
                                                                        style="width: 300px; height: 400px"
                                                                        :options="optionsFromDate" mask="DD/MM/YYYY"
                                                                        :title="$t('retailers.bod')">
                                                                        <div class="row items-center justify-end">
                                                                            <q-btn v-close-popup
                                                                                :label="$t('general.closed')"
                                                                                color="primary" flat />
                                                                        </div>
                                                                    </q-date>
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="email">{{
                                                        $t('retailers.email')
                                                    }}</label>
                                                    <input class="form-control" type="email"
                                                        :placeholder="$t('retailers.enter_email')" autofocus="" tabindex="5"
                                                        v-model="form.info.email" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="contact">{{
                                                        $t('retailers.details.phone')
                                                    }}</label>
                                                    <input class="form-control" type="text"
                                                        :placeholder="$t('retailers.enter_phone_number')" autofocus=""
                                                        tabindex="6" v-model="form.info.mobile" disabled />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="address">{{
                                                        $t('retailers.address')
                                                    }}</label>
                                                    <input class="form-control" type="text"
                                                        :placeholder="$t('retailers.enter_address')" autofocus=""
                                                        tabindex="7" v-model="form.info.address" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="city">{{
                                                        $t('retailers.province_city')
                                                    }}</label>
                                                    <select class="custom-select" tabindex="8" v-model="form.info.cityId"
                                                        @change="onChangeCity()">
                                                        <option selected value="0">
                                                            {{ $t('retailers.select_province_city') }}
                                                        </option>
                                                        <option v-for="item in form.cities" :key="item.id" :value="item.id">
                                                            {{ item.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="district">{{
                                                        $t('retailers.district')
                                                    }}</label>
                                                    <select class="custom-select" tabindex="9"
                                                        v-model="form.info.districtId" @change="getWards()">
                                                        <option selected value="0">
                                                            {{ $t('retailers.select_district') }}
                                                        </option>
                                                        <option v-for="item in form.districts" :key="item.id"
                                                            :value="item.id">
                                                            {{ item.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="ward">{{
                                                        $t('retailers.ward')
                                                    }}</label>
                                                    <select class="custom-select" tabindex="10" v-model="form.info.wardId">
                                                        <option selected value="0">
                                                            {{ $t('retailers.select_ward') }}
                                                        </option>
                                                        <option v-for="item in form.wards" :key="item.id" :value="item.id">
                                                            {{ item.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                <label class="form-label" for="status"
                                                    >Trạng thái</label
                                                >
                                                <select
                                                    class="custom-select"
                                                    tabindex="11"
                                                    v-model="form.info.status"
                                                >
                                                    <option selected value="-1">Chọn trạng thái</option>
                                                    <option value="0">Ngừng hoạt động</option>
                                                    <option value="1">Hoạt động</option>
                                                </select>
                                                </div>
                                            </div>
                                        </div> -->
                                    </div>
                                    <div class="no-pr col-md-6 col-sm-12 col-12">
                                        <h4 class="text-weight-bold">
                                            {{ $t('retailers.details.invoice_information') }}
                                        </h4>
                                        <div class="form-group mt-1">
                                            <label class="form-label" for="company">{{
                                                $t('retailers.details.payment_agent_name')
                                            }}</label>
                                            <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_payment_agent_name')
                                                    " autofocus="" tabindex="11" v-model="form.info.retailerInvoice.retailerInvoiceName" />
                                        </div>
                                        <div class="form-group mt-1">
                                            <label class="form-label" for="invoiceAddress">{{
                                                $t('retailers.details.address_invoice')
                                            }}</label>

                                            <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_address_invoice')
                                                    " autofocus="" tabindex="12" v-model="form.info.retailerInvoice.addressText" />
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="tax">{{
                                                        $t('retailers.details.tax_code')
                                                    }}</label>
                                                    <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_tax_code')
                                                            " autofocus="" tabindex="13" v-model="form.info.retailerInvoice.taxNo" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="phone">{{
                                                        $t('retailers.details.phone_invoice')
                                                    }}</label>
                                                    <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_phone_invoice')
                                                            " autofocus="" tabindex="14" v-model="form.info.retailerInvoice.tel" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="bank">{{
                                                        $t('retailers.details.bank_invoice_name')
                                                    }}</label>
                                                    <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_bank_invoice_name')
                                                            " autofocus="" tabindex="15" v-model="form.info.retailerInvoice.bankName" />
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                                <div class="form-group">
                                                    <label class="form-label" for="brand">{{
                                                        $t('retailers.details.bank_branch_invoice')
                                                    }}</label>
                                                    <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_bank_branch_invoice')
                                                            " autofocus="" tabindex="16" v-model="form.info.retailerInvoice.bankBranch" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6 col-sm-12 no-pl">
                                                <div class="form-group">
                                                    <label class="form-label" for="bankAccount">{{
                                                        $t('retailers.details.bank_account_number')
                                                    }}</label>
                                                    <input class="form-control" type="text" :placeholder="$t('retailers.details.enter_bank_account_number')
                                                            " autofocus="" tabindex="17" v-model="form.info.retailerInvoice.bankAccountNo" />
                                                </div>
                                            </div>
                                        <div class="col-lg-6 col-md-6 col-sm-12 no-pr">
                                            <div class="form-group">
                                                <label class="form-label" for="name">{{
                                                                                                    $t('retailers.details.bank_account_name')
                                                                                                    }}</label>
                                                <input class="form-control" type="text" :placeholder="
                                                                            $t('retailers.details.enter_bank_account_name')
                                                                          " autofocus="" tabindex="18" v-model="form.info.retailerInvoice.bankAccountName" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </q-card-section>

                        <q-card-actions align="center" class="bg-white text-teal">
                            <q-btn no-caps :label="$t('general.cancel')" v-close-popup outline color="danger"
                                class="rounded-50" :disable="progress" style="min-width: 130px" />
                            <q-btn no-caps unelevated :label="$t('general.save')" color="primary" type="submit"
                                class="rounded-50" :loading="progress" style="min-width: 130px" />
                        </q-card-actions>
                    </q-form>
                </q-card>
            </q-dialog>
            <q-popup-proxy v-model="showCropper" anchor="center middle" self="center left" transition-show="scale"
                transition-hide="scale" target="#display-area" style="width: 300px">
                <image-cropper v-on:destroy="finishCropper" :imageSrc="imageSrc" />
            </q-popup-proxy>
        </div>
    </div>
</q-page></template>

<script src="../js/retailerDetail.js"></script>