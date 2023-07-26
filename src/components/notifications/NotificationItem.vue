<template>
  <q-item
    clickable
    v-ripple
    :class="`pb-0 ${seen === 'NEW' ? 'bg-primarya-100' : ''}`"
  >
    <q-item-section
      avatar
      class="flex flex-row items-start pr-50"
      style="min-width: 32px"
    >
      <q-btn
        flat
        rounded
        padding="8px"
        :class="`${seen === 'NEW' ? 'bg-primarya-500' : 'bg-primarya-100'}`"
      >
        <svg-icon
          :name="getIconName(type)"
          :size="getIconSize(type)"
          :style="getIconStyle(type)"
          :class="`${seen === 'NEW' ? 'text-white' : 'text-primarya-500'}`"
        />
      </q-btn>
    </q-item-section>
    <q-item-section>
      <div
        :class="[
          'label-md py-50',
          seen === 'NEW' ? 'text-primarya-500' : 'text-black-500'
        ]"
      >
        <strong style="font-size: 13px">
          {{ item.title }}
        </strong>
      </div>
      <div class="row w-100">
        <div v-html="content" class="body-sm w-100"></div>
        <div class="body-xs mt-50 w-100">
          <img src="~assets/clock_10.svg" class="mr-25" />{{ createdDate }}
        </div>
      </div>
      <q-separator class="bg-black-200 mt-50" />
    </q-item-section>
  </q-item>
</template>
<script>
import { defineComponent } from 'vue'
import SvgIcon from '../SvgIcon.vue'

export default defineComponent({
  name: 'NotificationItem',
  components: { SvgIcon },
  props: {
    item: Object
  },
  data() {
    return {
      id: this.item.id,
      type: this.item.icon_type,
      title: this.item.title,
      content: this.item.content,
      createdDate: this.item.createdDate,
      seen: this.item.statusActionNotification,
      icons: {
        RETAILER: {
          name: 'store_16',
          style: 'stroke',
          size: '16'
        },
        RETAILER_WAREHOUSE: {
          name: 'box',
          style: 'stroke',
          size: '18'
        },
        ORDER: {
          name: 'clipboard_list',
          style: 'fill',
          size: '18'
        },
        EVENT: {
          name: 'sale',
          style: 'stroke',
          size: '20'
        },
        NONE: {
          name: 'none',
          style: 'stroke',
          size: '20'
        }
      },
      iconItem: []
    }
  },
  methods: {
    getIconName: function (type) {
      return this.icons[type].name
    },
    getIconStyle: function (type) {
      return this.icons[type].style
    },
    getIconSize: function (type) {
      return this.icons[type].size
    }
  }
})
</script>
