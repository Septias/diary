
<template>
  <div class="row justify-center">
    <q-icon
      :name="$q.dark.isActive ? 'brightness_5': 'brightness_3'"
      class="darkmode-toggle"
      @click="toggleDarkmode"
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
      <div class="row no-wrap">
        <div>
          <div class="column q-mr-sm">
            <Post
              v-for="entry in entries"
              :entry="entry"
              :key="entry.id"
              class="outside-click-exclude"
              @saveEntry="saveEntry"
              @selectedTag="(tag) => activeTag = tag"
              @createdTag="(tag) => activeTag = tag"
            />
          </div>
        </div>
        <div>
          <TagEditor
            id="tageEditor"
            v-if="activeTag"
            :tag="activeTag"
            v-outsideClick="{exclude: ['outside-click-exclude'], handler: outSideClickHandler}"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from '@vue/composition-api'
import Post from '../components/Post'
import TagEditor from '../components/TagEditor'
import { useDiary } from '../services/Diary'

export default defineComponent({
  name: 'Diary',
  components: {
    Post,
    TagEditor
  },
  setup (context) {
    function toggleDarkmode () {
      context.root.$q.dark.toggle()
    }
    const activeTag = ref(null)
    const { entries, fetchEntries, saveEntry } = useDiary()
    onMounted(() => { fetchEntries() })
    function outSideClickHandler () {
      activeTag.value = null
    }
    return { toggleDarkmode, entries, saveEntry, activeTag, outSideClickHandler }
  }
})
</script>

<style lang="sass" scoped>

#headline
  padding-bottom: 6px

.darkmode-toggle
  position: absolute
  right: 0px
  font-size: 1.5rem
  padding: 20px
  cursor: pointer

</style>
