<template>
  <div
    class="shadow-3 rounded q-pa-md tag-editor row no-wrap"
    @keydown="handleKeyDown"
  >
    <div>
      <input
        id="search"
        type="text"
        class="q-mb-sm"
        v-model="inputField"
        @input="handleInput"
      >
      <TagChip
        class="tag-chip q-mr-sm"
        v-for="(tag, i) in shownTagTypes"
        :key="tag.name"
        :tag="tag"
        :hover="hoveredTagType == i"
        :tabindex="i"
        :selected="selectedTagTypes.find(_tag => _tag == tag)? true : false"
        @click.native="() => {handleChipClick(i)}"
      />
      <div />
    </div>

    <div
      id="colorPicker"
      :style="hoveredTagTypeObj? {background: hoveredTagTypeObj.color} : ''"
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

<script>
import { ref, defineComponent, watch, computed, PropType } from '@vue/composition-api'
import TagChip from './TagChip'
import useTagTypesSearch from './useTagTypeSearch'
import MarkData from './MarkData'

export default defineComponent({
  name: 'TagEditor',
  components: {
    TagChip
  },
  props: {
    showntagtype: Object,
    tagypes: Object
  },
  setup (props, context) {
    const popup = ref(true)
    const { inputField, handleInput, hoveredTagType, handleKeyDown, handleChipClick, selectedTagTypes, tagTypes, shownTagTypes } = useTagTypesSearch()
    const hex = ref('')
    const hoveredTagTypeObj = computed(() => shownTagTypes.value[hoveredTagType.value])
    watch(hoveredTagTypeObj, function () {
      if (hoveredTagTypeObj.value) {
        context.emit('update:showntagtype', hoveredTagTypeObj.value)
      }
    })
    watch(hex, () => {
      if (hoveredTagTypeObj.value) {
        hoveredTagTypeObj.value.setColor(hex.value)
      }
    })
    watch()
    return { popup, hex, inputField, handleInput, hoveredTagType, handleKeyDown, handleChipClick, selectedTagTypes, tagTypes, shownTagTypes, hoveredTagTypeObj }
  }
})
</script>
