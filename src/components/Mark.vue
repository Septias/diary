
<template>
  <mark :style="{background: tagData.shownTagType.color + 'a0'}">
    {{ content }}
  </mark>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import MarkData from './MarkData'
export default defineComponent({
  name: 'Mark',
  props: {
    tagData: Object as PropType<MarkData>,
    content: String
  }
})
</script>
