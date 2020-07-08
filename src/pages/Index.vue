
<template>
  <div class="row justify-center">
    <q-icon
      :name="$q.dark.isActive ? 'brightness_5': 'brightness_3'"
      class="darkmode-toggle"
      @click="toggleDarkmode"
    />
    <div
      class="column q-px-md d-wrapper"
    >
      <h3
        class="text-weight-bold q-mb-lg"
        id="headline"
      >
        Tagebuch :)
      </h3>
      <Post
        v-for="entry in entries"
        :entry="entry"
        :key="entry.id"
        @saveEntry="saveEntry"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useEntries } from '../services/EntriesAPI'
import Post from '../components/Post'

export default defineComponent({
  name: 'Diary',
  components: {
    Post
  },
  setup (props, context) {
    function toggleDarkmode () {
      context.root.$q.dark.toggle()
    }
    const { entries, saveEntry } = useEntries()

    return { toggleDarkmode, entries, saveEntry }
  }
})
</script>

<style lang="sass" scoped>
.d-wrapper
  width: 60%
  min-width: 650px

#headline
  padding-bottom: 6px

.darkmode-toggle
  position: absolute
  right: 0px
  font-size: 1.5rem
  padding: 20px
  cursor: pointer

</style>
