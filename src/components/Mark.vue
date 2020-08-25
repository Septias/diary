
<template>
  <mark
    class="mark"
    :style="{background: background}"
  >{{ content }}</mark>
</template>

<style lang="sass" scoped>
.mark
  cursor: pointer
  color: black

.body--dark .mark
  color: white
</style>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import MarkData from './MarkData'
export default defineComponent({
  name: 'Mark',
  props: {
    tagData: {
      type: Object as unknown as PropType<MarkData>,
      default: () => { return { shownTagType: undefined } }
    },
    content: String
  },
  setup (props) {
    const background = computed(() => {
      if (props.tagData) {
        if (!props.tagData.shownTagType) return 'none'
        return props.tagData.shownTagType.color + 'a0'
      }
    })
    return { background }
  }
})
</script>
