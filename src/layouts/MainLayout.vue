<template>
  <q-layout view="lHh Lpr lfF">
    <FixedHeader />

    <Sidebar />

    <q-page-container class="bg-custom">
      <router-view />
      <!-- <app-footer /> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import FixedHeader from 'components/header/index'
import Sidebar from 'components/sidebar/index'

export default defineComponent({
  name: 'MainLayout',

  components: {
    FixedHeader,
    Sidebar
  },
  data () {
    return {
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
})
</script>
