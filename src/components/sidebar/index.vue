<template>
  <q-drawer
    :class="`sidebar ${miniState ? 'sidebar-toggler' : ''}`"
    v-model="drawer"
    show-if-above
    persistent
    :mini="miniState"
    :width="274"
    :mini-width="80"
    :breakpoint="514"
  >
    <!-- MAIN SIDEBAR START -->
    <div class="main-sidebar">
      <!-- Sidebar Brand Start -->
      <div class="sidebar-brand-box">
        <!-- <q-btn unelevated :ripple="false" class="sidebar-brand w-100"> -->
        <div class="sidebar-brand">
          <div
            class="d-flex items-center justify-between w-100 mr-2"
            :class="miniState ? 'column' : ''"
          >
            <div class="sidebar-brand-name">
              <div class="d-flex items-center w-100">
                <div
                  class="sidebar-brand-logo"
                  :class="`${miniState ? '' : 'mr-1'}`"
                >
                  <img :src="images.iconLogoMegasop" class="img-fluid" />
                </div>
                <h1 v-if="!miniState" class="mb-0 text-h6 text-bold ellipsis">
                  MEGASOP
                </h1>
              </div>
            </div>
            <div class="sidebar-toggle-box d-none">
              <q-btn
                flat
                unelevated
                padding="none"
                :icon="miniState ? 'chevron_right' : 'chevron_left'"
                :ripple="false"
                @click="sidebarToggler"
              >
                <q-tooltip
                  anchor="center right"
                  self="center left"
                  :offset="[10, 10]"
                >
                  {{
                    miniState
                      ? $t('menu.expand_button')
                      : $t('menu.collapse_button')
                  }}
                </q-tooltip>
              </q-btn>
            </div>
          </div>
          <!-- <q-menu transition-show="scale" transition-hide="scale">
              <div class="sidebar-brand-dropdown">
                <q-item class="d-flex justify-between items-center profile-box">
                  <div class="profileInfo d-flex items-center mr-1 flex-wrap">
                    <div class="profileImg mr-1">
                      <img :src="avatar" alt="Avatar" @error="loadErrorImage" class="img-fit" />
                    </div>
                    <div class="profileData">
                      <h5 class="text-subtitle2 text-bold">{{ fullname }}</h5>
                    </div>
                  </div>
                </q-item>
              </div>

              <div class="column bg-layoutcolor text-secondary profile-menu">
                <q-item
                  clickable
                  @click="goToInfomation()"
                  class="d-flex justify-between items-center"
                >
                  <q-item-label style="font-size:14px;">{{
                    $t('header.personal_info')
                  }}</q-item-label>
                  <q-icon name="account_circle" />
                </q-item>
                <q-item
                  clickable
                  @click="logout"
                  class="d-flex justify-between items-center"
                >
                  <q-item-label style="font-size:14px;">{{
                    $t('header.logout')
                  }}</q-item-label>
                  <q-icon name="exit_to_app" />
                </q-item>
              </div>
            </q-menu> -->
        </div>
        <!-- </q-btn> -->
      </div>
      <!-- Sidebar Brand End -->

      <!-- Sidebar Menu Start -->
      <div class="sidebar-menu">
        <EssentialLink
          :title="$t('menu.account')"
          icon="user"
          size="24"
          link="/account"
          :miniState="miniState"
        />

        <q-separator
          class="text-dark-separator"
          style="margin: 0 0.5rem 0.5rem 0.5rem"
        />
        <!-- <EssentialLink
            title="Plan &amp; Pricing"
            icon="panorama_fish_eye"
            link="/plan-pricing"
          /> -->

        <EssentialLink
          :title="$t('menu.operational_dashboard')"
          icon="dashboard"
          size="24"
          link="/dashboard"
          :miniState="miniState"
        />

        <EssentialLink
          :title="$t('menu.order_list')"
          icon="assignment"
          size="24"
          link="/orders"
          :miniState="miniState"
        />

        <!-- Quản trị Kho hàng -->
        <template v-if="miniState">
          <q-item
            clickable
            v-ripple
            :class="`accordionShortCut${
              isActiveAccordionWarehouse ? '__active' : ''
            }`"
          >
            <q-item-section avatar @click="openWarehouseAccordion">
              <svg-icon name="box" size="24" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="size13">{{
                $t('menu.warehouse_management')
              }}</q-item-label>
            </q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              {{ $t('menu.warehouse_management') }}
            </q-tooltip>
          </q-item>
        </template>
        <q-expansion-item
          v-else
          v-model="expandedWarehouse"
          :content-inset-level="0.5"
          :class="`accordionWrapper${
            isActiveAccordionWarehouse && !expandedWarehouse ? '__active' : ''
          }`"
          group="has_sub"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <svg-icon name="box" size="24" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="size13">{{
                $t('menu.warehouse_management')
              }}</q-item-label>
            </q-item-section>
          </template>

          <EssentialLink
            :title="$t('menu.list_of_warehouses')"
            link="/warehouses"
          />
          <EssentialLink
            :title="$t('menu.warehouse_received')"
            link="/warehouse-receipt"
          />
          <EssentialLink
            :title="$t('menu.import_history')"
            link="/warehouse-import-history"
          />
          <EssentialLink
            :title="$t('menu.export_history')"
            link="/warehouse-export-history"
          />
          <EssentialLink
            :title="$t('menu.inventory_list')"
            link="/warehouse-inventory"
          />
        </q-expansion-item>

        <!-- Quản trị sản phẩm -->
        <template v-if="miniState">
          <q-item
            clickable
            v-ripple
            :class="`accordionShortCut${
              isActiveAccordionProduct ? '__active' : ''
            }`"
          >
            <q-item-section avatar @click="openProductAccordion">
              <svg-icon name="deploy_code" size="24" />
            </q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              {{ $t('menu.product_management') }}
            </q-tooltip>
          </q-item>
        </template>
        <q-expansion-item
          v-else
          v-model="expandedProduct"
          :content-inset-level="0.5"
          :class="`accordionWrapper${
            isActiveAccordionProduct && !expandedProduct ? '__active' : ''
          }`"
          group="has_sub"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <svg-icon name="deploy_code" size="24" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="size13">{{
                $t('menu.product_management')
              }}</q-item-label>
            </q-item-section>
          </template>

          <EssentialLink
            :title="$t('menu.product_portfolio')"
            link="/product-category"
          />
          <EssentialLink
            :title="$t('menu.attribute_list')"
            link="/product-attributes"
          />
          <EssentialLink :title="$t('menu.list_of_product')" link="/products" />
        </q-expansion-item>

        <!-- Quản trị đại lý -->
        <template v-if="miniState">
          <q-item
            clickable
            v-ripple
            :class="`accordionShortCut${
              isActiveAccordionRetailer ? '__active' : ''
            }`"
          >
            <q-item-section avatar @click="openRetailerAccordion">
              <svg-icon name="storefront" size="24" />
            </q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              {{ $t('menu.retailer_management') }}
            </q-tooltip>
          </q-item>
        </template>
        <q-expansion-item
          v-else
          v-model="expandedRetailer"
          :content-inset-level="0.5"
          :class="`accordionWrapper${
            isActiveAccordionRetailer && !expandedRetailer ? '__active' : ''
          }`"
          group="has_sub"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <svg-icon name="storefront" size="24" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="size13">{{
                $t('menu.retailer_management')
              }}</q-item-label>
            </q-item-section>
          </template>

          <EssentialLink :title="$t('menu.retailer_list')" link="/retailers" />
        </q-expansion-item>

        <EssentialLink
          :title="$t('menu.list_of_employee')"
          icon="users"
          size="24"
          link="/staffs"
          v-if="isCustomer"
          :miniState="miniState"
        />

        <!-- <EssentialLink
            title="Salesmen"
            icon="fas fa-user-tie"
            link="/salesmen"
          /> -->
        <!-- <EssentialLink title="Route" icon="moving" link="/route" /> -->

        <EssentialLink
          :title="$t('menu.promotions')"
          icon="sale"
          size="24"
          link="/promotions"
          :miniState="miniState"
        />

        <!-- Quản lý công nợ -->
        <template v-if="miniState">
          <q-item
            clickable
            v-ripple
            :class="`accordionShortCut${
              isActiveAccordionDebt ? '__active' : ''
            }`"
          >
            <q-item-section avatar @click="openDebtAccordion">
              <q-icon name="account_balance" size="sm" />
            </q-item-section>
            <q-tooltip
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
            >
              {{ $t('menu.debt_management') }}
            </q-tooltip>
          </q-item>
        </template>
        <q-expansion-item
          v-else
          v-model="expandedDebt"
          :content-inset-level="0.5"
          :class="`accordionWrapper${
            isActiveAccordionDebt && !expandedDebt ? '__active' : ''
          }`"
          group="has_sub"
        >
          <template v-slot:header>
            <q-item-section avatar>
              <q-icon name="account_balance" size="sm" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="size13">{{
                $t('menu.debt_management')
              }}</q-item-label>
            </q-item-section>
          </template>
          <EssentialLink :title="$t('debt.menu.debt_list')" link="/debt" />
          <EssentialLink
            :title="$t('debt.menu.debt_orders')"
            link="/debt-orders"
          />
          <EssentialLink
            :title="$t('debt.menu.payment_transactions')"
            link="/debt-payment-transactions"
          />
          <EssentialLink
            :title="$t('debt.menu.debt_adjustments')"
            link="/debt-adjustments"
          />
          <EssentialLink
            :title="$t('debt.menu.debt_book_closure')"
            link="/debt-book-closure"
          />
        </q-expansion-item>

        <EssentialLink
          :title="$t('menu.setting')"
          icon="settings"
          size="24"
          link="/setting"
          :miniState="miniState"
        />

        <!-- HDSD -->
        <q-item
          clickable
          v-ripple
          href="https://ipicorp.atlassian.net/wiki/spaces/MKB1/pages"
          target="_blank"
          class="active essentialItem"
        >
          <q-item-section avatar>
            <q-icon name="article" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="size13">{{
              $t('header.user_manual')
            }}</q-item-label>
          </q-item-section>

          <q-tooltip
            v-if="miniState"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
          >
            {{ $t('header.user_manual') }}
          </q-tooltip>
        </q-item>
      </div>
      <!-- Sidebar Menu End -->
    </div>
    <!-- MAIN SIDEBAR END -->

    <!-- Sidebar Toggler -->
    <div
      class="text-center d-flex justify-between items-center fixed sidebarTogglerBox"
    >
      <q-btn
        flat
        unelevated
        padding="none"
        :icon="miniState ? 'chevron_right' : 'chevron_left'"
        :ripple="false"
        @click="sidebarToggler"
      >
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">
          {{
            miniState ? $t('menu.expand_button') : $t('menu.collapse_button')
          }}
        </q-tooltip>
      </q-btn>
    </div>
    <!-- Sidebar Toggler -->
  </q-drawer>
</template>
<script src="./sidebar.js"></script>
<style src="./sidebar.scss" scoped lang="scss"></style>
<style scoped lang="scss">
/* Thêm kiểu sau để làm cho văn bản xuống dòng và hiển thị trên nhiều dòng */
.sidebar-menu .size13,
.sidebar-menu .essential-link-text,
.sidebar-menu .essential-link-text span {
  white-space: normal;
}
</style>
