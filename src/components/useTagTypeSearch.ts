
import { computed, ref } from '@vue/composition-api'
import { useTagTypes, TagType } from '../services/TagTypeService'

export default function useTagTypeSearch (props, context) {
  const { tagTypes, createTag } = useTagTypes()
  const inputField = ref('')

  const shownTagTypes = computed(() => {
    return tagTypes.value.filter(tagType => props.selectedtagtypes.find((tag) => tag === tagType) || tagType.name.includes(inputField.value)
    ).slice(0, 5)
  })

  function handleChipClick (tagObj: TagType) {
    const location = props.selectedtagtypes.indexOf(tagObj)
    if (location !== -1) {
      const copy = [...props.selectedtagtypes]
      copy.splice(location, 1)
      context.emit('update:selectedtagtypes', copy)
    } else {
      context.emit('update:selectedtagtypes', [...props.selectedtagtypes, tagObj])
    }
  }

  function handleKeyDown (e: KeyboardEvent) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft' || e.code === 'Tab') {
      if (props.hoveredtagtype.name === 'default') {
        console.log(shownTagTypes.value[0])
        context.emit('update:hoveredtagtype', shownTagTypes.value[0])
      } else if (e.code === 'ArrowRight' || e.code === 'Tab') {
        context.emit('update:hoveredtagtype', shownTagTypes.value[(shownTagTypes.value.indexOf(props.hoveredtagtype) + 1) % shownTagTypes.value.length])
      } else if (e.code === 'ArrowLeft') {
        context.emit('update:hoveredtagtype', shownTagTypes.value[Math.abs((shownTagTypes.value.indexOf(props.hoveredtagtype) - 1) % shownTagTypes.value.length)])
      }
    }
    if (e.key === 'Enter') {
      if (props.hoveredtagtype !== undefined) {
        handleChipClick(props.hoveredtagtype)
      } else {
        if (inputField.value.length > 1) {
          createTag({ name: inputField.value })
        }
      }
    }
  }

  return { inputField, handleKeyDown, handleChipClick, tagTypes, shownTagTypes }
}
