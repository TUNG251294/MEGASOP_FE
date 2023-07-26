<template>
  <footer class="footer footer-static footer-light">
    <p class="clearfix mb-0">
      <span class="float-md-left d-block d-md-inline-block mt-25">
        COPYRIGHT © {{ new Date().getFullYear() }}
        <a class="ml-25" href="https://ipisaas.com/" target="_blank"
          >SaaS Land</a
        >
        <span class="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
    </p>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "app-footer",
});
</script>
