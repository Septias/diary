<template>
  <div
    class="shadow-3 rounded q-pa-md tag-editor row no-wrap"
  >
    <div>
      <input
        id="search"
        type="text"
        class="q-mb-sm"
        v-model="inputField"
        @keydown="handleKeyDown"
      >
      <TagChip
        class="tag-chip q-mr-sm"
        v-for="(tag, i) in shownTagTypes"
        :key="tag.name"
        :tag="tag"
        :hover="hoveredtagtype == tag"
        :tabindex="i"
        :selected="selectedtagtypes.find(_tag => _tag == tag)? true : false"
        @click.native="() => {handleChipClick(tag)}"
      />
      <div />
    </div>

    <div
      id="colorPicker"
      :style="hoveredtagtype? {background: hoveredtagtype.color} : ''"
    >
      <q-popup-edit
        v-model="popup"
      >
        <q-color
          class="OCE-tagEditor"
          v-model="hex"
          no-header
          no-footer
          default-view="palette"
        />
      </q-popup-edit>
    </div>
  </div>
</template>

<style lang="sass" scoped>

.body--dark .tag-editor
  background: #262626

#colorPicker
  min-width: 20px
  height: 20px
  margin-left: 7px
  border-radius: 3px
  float: right
  border: 1px solid gray

#search
  border: none
  border-bottom: 1px solid gray

.body--dark #search
  background: #262626
  color: white
</style>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from '@vue/composition-api'
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
    watch(hex, () => {
      if (props.hoveredtagtype) {
        props.hoveredtagtype.setColor(hex.value)
      }
    })
    return { popup, hex, inputField, handleKeyDown, handleChipClick, tagTypes, shownTagTypes }
  }
})
</script>
