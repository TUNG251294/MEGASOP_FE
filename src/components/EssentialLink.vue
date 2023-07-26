<template>
  <q-item clickable v-ripple :to="link" class="active essentialItem">
    <q-item-section v-if="icon" avatar>
      <svg-icon :name="icon" :size="size" :fill="icon_fill"  />
    </q-item-section>

    <q-item-section v-if="!miniState">
      <q-item-label class="size13">{{ title }}</q-item-label>
    </q-item-section>
    <q-tooltip
      v-if="miniState"
      anchor="center right"
      self="center left"
      :offset="[10, 10]"
    >
      {{ title }}
    </q-tooltip>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'
import SvgIcon from 'components/SvgIcon.vue'

export default defineComponent({
  name: 'EssentialLink',
  components: {
    SvgIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    icon_fill: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: 'sm'
    },

    miniState: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
.essentialItem {
  &:deep(.q-item__section--avatar) {
    min-width: unset;
  }
}
</style>
