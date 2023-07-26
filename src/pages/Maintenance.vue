<template>
  <div class="row mx-n1 h-100">
    <div class="col-12 col-md-2"></div>
    <div class="col-12 col-md-8">
      <div class="flex flex-column items-center justify-center h-100">
        <h2 class="text-weight-bolder">Under Maintenance! ⚙️</h2>
        <div class="mt-75 mb-4 text-center">
          Sorry for the inconvenience but we're performing some maintenance at the moment
        </div>
        <q-btn color="primary" label="Back to home" to="/" no-caps unelevated />
        <q-btn color="primary" label="Is MEGASOP Dev/QC ?" flat no-caps @click="prompt = true" />
        <img src="@assets/maintenance.svg" />
      </div>
    </div>
    <div class="col-12 col-md-2"></div>
  </div>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Security Code</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="security_code" autofocus />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Access" @click="access()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { LocalStorage, SessionStorage } from 'quasar'

export default {
  name: 'Maintenane',
  data () {
    return {
      prompt: false,
      security_code: ''
    }
  },
  methods: {
    access() {
      if (this.security_code == '4jo3ikvn7tgm') {
        SessionStorage.set('is_mgs_s', 1)
        this.$router.push('/')
      }
    }
  }
}
</script>
<style scoped lang="scss">
html, body {
  height: 100%
}
</style>