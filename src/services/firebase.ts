import { firebase } from '@firebase/app'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDZlw8dT8toA9JTzJ7xmNUhoFWh945zdRE',
  authDomain: 'diary-280709.firebaseapp.com',
  databaseURL: 'https://diary-280709.firebaseio.com',
  projectId: 'diary-280709',
  storageBucket: 'diary-280709.appspot.com',
  messagingSenderId: '517311205048',
  appId: '1:517311205048:web:8041e2b42c3b86b4ee6e4d'
}

const app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
