
<template>
  <button
    ref="button"
    class="chip"
    :style="border"
  >
    {{ tag.name }}
  </button>
</template>

<style lang="sass">
.chip
  border: none
  color: hsl(0, 0%, 60%)
  border-radius: 8px
  display: inline-block
  padding: 4px 8px
  cursor: pointer
  font-weight: bold

.body--dark .chip
  background: #404040
  color: white
</style>

<script lang="ts">
import { defineComponent, PropType, computed, watchEffect } from '@vue/composition-api'
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
          return { border: '1px solid', 'border-color': `${color} ${color} #1010a0b0 ${color}` }
        } else {
          return { border: '1px solid ' + color }
        }
      } else if (props.hover) {
        return { border: '1px solid #1010a0b0' }
      }
    })
    watchEffect(function () {
      if (props.hover) {
        // context.refs.button.focus()
      }
    })
    return { border }
  }
})
</script>
