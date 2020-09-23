
<template>
  <div class="row justify-center">
    <q-icon
      :name="$q.dark.isActive ? 'brightness_5': 'brightness_3'"
      class="darkmode-toggle"
      @click="toggleDarkMode"
    />
    <div
      class="column q-px-md"
    >
      <h3
        class="text-weight-bold q-mb-lg"
        id="headline"
      >
        Tagebuch :)
      </h3>

      <div class="column q-mr-sm">
        <Post
          v-for="entry in entries"
          :entry="entry"
          :key="entry.id"
          class="OCE-tagEditor"
          @saveEntry="saveEntry"
          @selectedTag="(tag) => activeTag = tag"
          @createdTag="(tag) => activeTag = tag"
        />
      </div>

      <TagEditor
        id="oc-tagEditor"
        class="OCE-post"
        :style="style"
        v-if="activeTag"
        :hoveredtagtype.sync="activeTag.shownTagType"
        :selectedtagtypes.sync="activeTag.tagTypes"
        v-outsideClick="{exclude: ['OCE-tagEditor'], handler: outSideClickHandler}"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>

#oc-tagEditor
  position: absolute
  z-index: 1
  max-width: 300px

#headline
  padding-bottom: 6px

.darkmode-toggle
  position: absolute
  right: 0px
  font-size: 1.5rem
  padding: 20px
  cursor: pointer

</style>

<script>
import { defineComponent, ref, onMounted, computed } from '@vue/composition-api'
import Post from '../components/Post'
import TagEditor from '../components/TagEditor'
import { useDiary } from '../services/Diary'
import useDarkMode from '../components/useDarkMode'

export default defineComponent({
  name: 'Diary',
  components: {
    Post,
    TagEditor
  },
  setup () {
    const { toggleDarkMode } = useDarkMode()
    const activeTag = ref(null)
    const { entries, fetchEntries, saveEntry } = useDiary()
    onMounted(() => { fetchEntries() })
    function outSideClickHandler () {
      activeTag.value = null
    }
    const style = computed(() => {
      if (activeTag.value) {
        const rect = activeTag.value.el.getBoundingClientRect()
        return { left: Math.round(rect.x) + 'px', top: Math.round(rect.y) + 20 + 'px' }
      }
    })
    return { toggleDarkMode, entries, saveEntry, activeTag, outSideClickHandler, style }
  }
})
</script>
