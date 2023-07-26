<template>
  <q-breadcrumbs class="d-sm-flex d-none text-dark breadcrumbs">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" color="secondary" padding="none" />
    </template>
    <q-breadcrumbs-el icon="home" />
    <q-breadcrumbs-el v-for="(breadcrumb, idx) in breadcrumbList" :key="idx" :label="breadcrumb?.label" :to="breadcrumb?.to" />
  </q-breadcrumbs>
</template>
<script src="./breadcrumb.js"></script>
<style src="./breadcrumb.scss" scoped lang="scss"></style>

