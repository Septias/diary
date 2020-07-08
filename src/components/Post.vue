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
      ref="textBox"
      @click="selected = true"
      @input="handleInput"
      @blur="selected = false"
      @select="handleSelect"
      v-html="entry.body"
    />
    <section
      v-else
      v-html="entry.body"
    />
  </div>
</template>

<script lang="ts">
import outsideClick from '../directives/outsideClick'
import { defineComponent, ref, onMounted } from '@vue/composition-api'
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
    let timer = null
    function handleSelect () {
      console.log('selected')
    }
    onMounted(() => {
      console.log(context.refs.textBox.addEventListener('select'))
    })
    function handleInput (e) {
      if (e.target.innerText.length > 10) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          context.emit('saveEntry', { ...props.entry, body: e.target.innerText })
        }, 300)
      }
    }

    return { selected, unselect, handleInput, handleSelect }
  }
})
</script>

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
