<template>
  <div
    class="shadow-3 post text-body1 q-mb-md"
    :class="selected ? 'selected': 'not-selected'"
  >
    <h6 class="q-my-none">
      {{ entry.time.toDate().toLocaleDateString() }}
    </h6>
    <section
      v-if="entry.today"
      contenteditable="true"
      @focus="selected = true"
      @input="handleInput"
      @blur="selected = false"
      @click="handleClick"
      v-html="entry.body"
    />
    <section
      v-else
      v-html="entry.body"
    />
  </div>
</template>

<style lang="sass" scoped>
.selected
  padding: 18px 28px 28px
  margin: 0px 0px 10px 0px

.not-selected
  padding: 18px
  margin: 0px 10px 10px

.post
  transition: padding .3s, margin .3s

.body--dark .post
  background: #262626
</style>

<script lang="ts">
import outsideClick from '../directives/outsideClick'
import { defineComponent, ref } from '@vue/composition-api'
import { Tag } from './Tag'

export default defineComponent({
  name: 'Entry',
  directives: {
    outsideClick
  },
  props: {
    entry: {
      type: Object,
      required: true
    }
  },

  setup (props, context) {
    const selected = ref(false)
    function unselect () {
      selected.value = false
    }
    let timer: NodeJS.Timeout
    function handleClick () {
      const sel = window.getSelection()

      if (sel && sel.type !== 'Caret') {
        const tag = new Tag()
        tag.range = sel.getRangeAt(0)
        context.emit('createdTag', tag)
        tag.el.addEventListener('click', () => {
          context.emit('selectedTag', tag)
        })
      }
    }
    function handleInput (e) {
      if (e.target.innerText.length > 10) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          context.emit('saveEntry', { ...props.entry, body: e.target.innerText })
        }, 1500)
      }
    }

    return { selected, unselect, handleInput, handleClick }
  }
})
</script>
