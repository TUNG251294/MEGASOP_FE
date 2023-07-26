<template>
  <q-page class="q-pa-md">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 col-sm-12">
        <q-card>
          <q-card-section class="bg-primary text-white">
            Generate Information
          </q-card-section>
          <q-card-actions>
            <div class="row">
              <div class="col-4">Fullname:</div>
              <div class="col-8">Nguyen Van A</div>
            </div>
          </q-card-actions>
        </q-card>
        <q-card class="mt-3">
          <q-card-section class="bg-primary text-white">
            Authentication
          </q-card-section>
          <q-card-actions> </q-card-actions>
        </q-card>
      </div>
      <div class="col-md-2"></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyProfile",
  data() {
    return {};
  },
  methods: {},
});
</script>