<template>
  <div
    id="tag-search"
    class="shadow-3 rounded q-pa-md"
  >
    <TagTypeSearch />
  </div>
</template>

<style lang="sass" scoped>

.body--dark #tag-search
  background: #262626
</style>

<script>
import { ref } from '@vue/composition-api'
import { Tag } from './Tag'
import TagTypeSearch from './TagTypeSearch'

export default {
  name: 'TagEditor',
  props: {
    tag: Tag
  },
  components: {
    TagTypeSearch
  },
  setup () {
    const options = ['love', 'nice', 'happy']
    const selected = ref(null)
    return { options, selected }
  }
}
</script>
