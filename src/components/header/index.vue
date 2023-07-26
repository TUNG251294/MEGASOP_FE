<template>
  <q-header unelevated class="header position-absolute">
    <q-toolbar class="bg-white text-primary justify-between">
      <!-- NAVBAR LEFT START -->
      <div class="navbar-left float-left d-flex align-items-center">
        <Breadcrumb />
      </div>
      <!-- NAVBAR LEFT END -->

      <!-- NAVBAR RIGHT START -->
      <div class="page-header-right float-right d-flex align-items-center">
        <!-- Language Switch Start -->
        <q-btn round unelevated class="flag-btn mr-1">
          <div class="flag-btn-selected" role="button">
            <img
              v-if="langId === 'EN'"
              src="@assets/united-kingdom.png"
              alt="flag"
              class="flag"
            />
            <img
              v-else
              src="@assets/vietnam.png"
              alt="flag"
              class="flag"
            />
          </div>
          <q-menu
            auto-close
            transition-show="scale"
            transition-hide="scale"
          >
            <div class="column text-secondary profile-menu">
              <q-item
                clickable
                @click="changeLanguage(lang?.code)"
                class="row items-center justify-between q-px-sm select-lang"
                style="flex-wrap: nowrap"
                v-for="lang in languages"
                :key="lang?.code"
              >
                <div class="select-lang-flag">
                  <img
                    v-if="lang?.code === 'EN'"
                    src="@assets/united-kingdom.png"
                    alt="flag"
                    class="flag"
                  />
                  <img
                    v-else
                    src="@assets/vietnam.png"
                    alt="flag"
                    class="flag"
                  />
                </div>
                <span class="select-lang-label text-bold">
                  {{ lang?.name }}
                </span>
              </q-item>
            </div>
          </q-menu>
          <q-tooltip anchor="center right" self="center start" style="white-space: nowrap;">
            {{ $t('menu.language') }}
          </q-tooltip>
        </q-btn>
        <!-- Language Switch End -->

        <!-- Notifications Start -->
        <Notifications />
        <!-- Notifications End -->

        <!-- User -->
        <q-btn dense round flat class="avatar w40 h40">
          <span class="avatar-img round-circle">
            <img :src="avatar" alt="Avatar" @error="loadErrorImage" />
          </span>
          <span
            class="b-avatar-badge badge-success"
            style="font-size: calc(11.2px); bottom: 0px; right: 0px"
          ></span>
          <q-menu transition-show="scale" transition-hide="scale">
            <div class="column bg-layoutcolor text-secondary profile-menu">
              <q-item
                clickable
                @click="goToInfomation()"
                class="row items-center q-px-lg"
                style="flex-wrap: nowrap"
              >
                <q-icon name="account_circle" />
                <q-item-label class="q-pl-md menu-label">{{
                  $t('header.personal_info')
                }}</q-item-label>
              </q-item>
              <q-item
                clickable
                @click="logout"
                class="row items-center q-px-lg"
                style="flex-wrap: nowrap"
              >
                <q-icon name="exit_to_app" />
                <q-item-label class="q-pl-md menu-label">{{
                  $t('header.logout')
                }}</q-item-label>
              </q-item>
            </div>
          </q-menu>
        </q-btn>
        <!-- User -->
      </div>
      <!-- NAVBAR RIGHT END -->
    </q-toolbar>
  </q-header>
</template>
<script src="./header.js"></script>
<style src="./header.scss" scoped lang="scss"></style>

