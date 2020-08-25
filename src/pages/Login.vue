
<template>
  <div
    id="login"
  >
    <div
      id="firebaseui-auth-container"
      class="shadow-3 q-pa-md"
    />
  </div>
</template>

<style lang="sass">
#login
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
</style>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import '../services/fbapp'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

const ui = new firebaseui.auth.AuthUI(firebase.auth())

export default defineComponent({
  setup () {
    onMounted(() => {
      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: '/',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
      })
    })
  }
})
</script>
