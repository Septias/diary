
<template>
  <button
    class="chip"
    :style="border"
  >
    {{ tag.name }}
  </button>
</template>

<style lang="sass">
.chip
  border: 3px solid
  color: grey
  border-radius: 8px
  display: inline-block
  padding: 2px 4px
  cursor: pointer

.body--dark .chip
  background: #262626
  color: white
</style>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { TagType } from '../services/TagTypeService'

export default defineComponent({
  name: 'TagChip',
  props: {
    tag: {
      type: Object as PropType<TagType>,
      default: () => { return { name: 'defautl', color: 'red' } }
    },
    hover: Boolean,
    selected: Boolean
  },
  setup (props) {
    const border = computed(() => {
      const color = props.tag.color + 'b0'
      if (props.selected) {
        if (props.hover) {
          return { 'border-color': `${color} ${color} #1010a0b0 ${color}` }
        } else {
          return { 'border-color': color }
        }
      } else if (props.hover) {
        return { 'border-color': '#1010a0b0' }
      } else {
        return { border: '1px solid gray' }
      }
    })
    return { border }
  }
})
</script>
