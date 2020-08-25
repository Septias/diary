<template>
  <div
    class="shadow-3 rounded-borders q-pa-md tag-editor"
  >
    <input
      id="search"
      type="text"
      v-model="inputField"
      @keydown="handleKeyDown"
      tabindex="1"
    >
    <TagChip
      class="q-mr-sm"
      v-for="(tag, i) in shownTagTypes"
      :key="tag.name"
      :tag="tag"
      :hover="hoveredtagtype == tag"
      :tabindex="i + 2"
      :selected="selectedtagtypes.find(_tag => _tag == tag)? true : false"
      @keydown.native="handleKeyDown"
      @click.native="() => {handleChipClick(tag)}"
    />
    <div />
  </div>
</template>

<style lang="sass" scoped>

.body--dark .tag-editor
  background: #262626

.tag-editor
  background: white

#search
  border: none
  border-bottom: 2px solid hsl(0, 0%, 60%)
  width: 100%
  min-width: 150px
  margin-bottom: 10px
  font-size: 1.1rem

.body--dark #search
  background: #262626
  color: white
</style>

<script lang="ts">
import { ref, defineComponent, PropType } from '@vue/composition-api'
import TagChip from './TagChip'
import useTagTypesSearch from './useTagTypeSearch'
import { TagType, defaultTag } from '../services/TagTypeService'

export default defineComponent({
  name: 'TagEditor',
  components: {
    TagChip
  },
  props: {
    hoveredtagtype: {
      type: Object as unknown as PropType<TagType>,
      default: () => defaultTag
    },
    selectedtagtypes: {
      type: Array as unknown as PropType<TagType[]>,
      default: () => []
    }
  },
  setup (props, context) {
    const popup = ref(true)
    const { inputField, handleKeyDown, handleChipClick, tagTypes, shownTagTypes } = useTagTypesSearch(props, context)
    const hex = ref('')

    return { popup, hex, inputField, handleKeyDown, handleChipClick, tagTypes, shownTagTypes }
  }
})
</script>
