
<template>
  <div>
    <input
      id="search"
      type="text"
      class="q-mb-sm"
    >
    <div />
  </div>
</template>

<style lang="sass" scoped>
#search
  border: none
  border-bottom: 1px solid gray

.body--dark #search
  background: #262626
  border-bottom: 1px solid green
  color: white
</style>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'SearchableInput',
  props: {
    tagTypes: {
      type: Array,
      default: () => [{ name: 'love', color: 'red' }, { name: 'happy', color: 'gold' }]
    }
  }
})
</script>
