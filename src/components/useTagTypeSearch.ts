
import { computed, ref } from '@vue/composition-api'
import { useTagTypes, TagType } from '../services/TagTypeService'

export default function useTagTypeSearch () {
  const { tagTypes, createTag } = useTagTypes()
  const selectedTagTypes = ref([] as TagType[])
  const inputField = ref('')
  const hoveredTagType = ref(null as unknown as number | undefined)

  const shownTagTypes = computed(() => {
    return tagTypes.value.filter(tagType => selectedTagTypes.value.find((tag) => tag === tagType) || tagType.name.includes(inputField.value)).slice(0, 5)
  })

  function getTagObj (id: number): TagType {
    return shownTagTypes.value[id]
  }
  function handleChipClick (i: number) {
    const tagObj = getTagObj(i)
    if (selectedTagTypes.value.find(tag => tag === tagObj)) {
      selectedTagTypes.value.splice(selectedTagTypes.value.indexOf(tagObj), 1)
      if (hoveredTagType.value === i) {
        hoveredTagType.value = undefined
      }
    } else {
      selectedTagTypes.value.push(tagObj)
    }
  }

  function handleKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'Tab') {
      if (hoveredTagType.value === undefined) {
        hoveredTagType.value = 0
      } else if (e.code === 'ArrowRight') {
        hoveredTagType.value = (hoveredTagType.value + 1) % shownTagTypes.value.length
      } else if (e.code === 'ArrowLeft') {
        hoveredTagType.value = Math.abs((hoveredTagType.value - 1) % shownTagTypes.value.length)
      } else if (e.code === 'Tab') {
        hoveredTagType.value = (hoveredTagType.value + 1) % shownTagTypes.value.length
      }
    }
    if (e.key === 'Enter') {
      if (hoveredTagType.value !== undefined) {
        handleChipClick(hoveredTagType.value)
      } else {
        if (inputField.value.length > 1) {
          createTag({ name: inputField.value })
        }
      }
    }
  }
  function handleInput () {
    hoveredTagType.value = undefined
  }

  return { inputField, handleInput, hoveredTagType, handleKeyDown, handleChipClick, selectedTagTypes, tagTypes, shownTagTypes }
}
