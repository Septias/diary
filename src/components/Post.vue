<template>
  <div
    class="shadow-3 post text-body1 q-mb-md OCE-post"
    :class="selected ? 'selected': 'not-selected'"
  >
    <h6
      class="q-my-none"
    >
      {{ entry.time.toDate().toLocaleDateString() }}
    </h6>

    <q-editor
      id="oc-post"
      v-if="entry.today"
      v-outsideClick="{exclude: ['OCE-post'], handler: unselect}"
      v-model="entry.body"
      :toolbar="[['bold','italic','underline']]"
      @focus="selected = true"
      @input="handleInput"
      @click="handleClick"
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
import Mark from './Mark'
import MarkData from './MarkData'
import Vue from 'vue'

const MarkClass = Vue.extend(Mark)

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
    function handleClick () {
      const sel = window.getSelection()
      if (sel && sel.type === 'Range') {
        const range = sel.getRangeAt(0)
        const elem = document.createElement('div')
        range.surroundContents(elem)
        const tagData: MarkData = {
          shownTagType: undefined,
          tagTypes: []
        }
        const tag = new MarkClass({
          propsData: {
            tagData,
            content: elem.innerText
          }
        })
        tag.$mount(elem)
        tagData.el = tag.$el
        context.emit('createdTag', tagData)
        tag.$el.addEventListener('click', () => {
          context.emit('selectedTag', tagData)
        })
      }
    }
    let timer: NodeJS.Timeout
    function handleInput () {
      if (props.entry.body.length > 10) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          context.emit('saveEntry', { ...props.entry, body: props.entry.body })
        }, 1500)
      }
    }

    return { selected, unselect, handleInput, handleClick }
  }
})
</script>
