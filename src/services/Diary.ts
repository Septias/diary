import firebase from 'firebase/app'
import 'firebase/firestore'
import { ref } from '@vue/composition-api'
import 'firebase/auth'
import './fbapp'

const db = firebase.firestore()

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference
type Timestamp = firebase.firestore.Timestamp

interface Entry {
  ref: DocumentReference;
  body: string;
  time: Timestamp;
  today?: boolean;
}

const entries = ref([] as Entry[])

firebase.auth().onAuthStateChanged(function (user: any) {
  if (user) {
    db.collection('users').doc(user.uid).get().then(function (doc: any) {
      if (doc.exists) {
        entries.value = doc.data().entries
      } else {
        console.error('No Entries for user ', user.uid)
      }
    })
  } else {
    console.log('no User')
    entries.value = []
  }
})

async function fetchEntries () {
  const querySnapshot = await db.collection('entries').orderBy('time', 'desc').get()
  entries.value = []
  querySnapshot.forEach((entry: QueryDocumentSnapshot) => {
    if (entry.exists) {
      entries.value.push({
        ref: entry.ref,
        ...entry.data() as {body: string; time: Timestamp}
      })
    }
  })
  if (entries.value.length !== 0) {
    if (entries.value[0].time.toDate().setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
      entries.value[0].today = true
    } else {
      const docRef = db.collection('entries').doc(new Date().toLocaleString().split(',')[0])
      entries.value.unshift({
        body: '',
        time: new firebase.firestore.Timestamp(Date.now() / 1000, 0),
        ref: docRef,
        today: true
      })
    }
  } else {
    throw new Error('No entries found')
  }
}

function saveEntry (entry: Entry) {
  entry.ref.update({ body: entry.body }).catch(function () {
    entry.ref.set({ body: entry.body, time: entry.time })
  })
}

export function useDiary () {
  return { entries, fetchEntries, saveEntry }
}
