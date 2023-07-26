<template>
  <router-view />
</template>
<script>
import { defineComponent } from 'vue'
import { axiosInstance } from './boot/axios'

export default defineComponent({
  name: 'App'
})
</script>
