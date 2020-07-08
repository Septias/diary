import { db } from './firebase'
import { ref, onMounted } from '@vue/composition-api'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot
type DocumentReference = firebase.firestore.DocumentReference
type Timestamp = firebase.firestore.Timestamp

interface Entry {
  ref: DocumentReference;
  body: string;
  time: Timestamp;
  today?: boolean;
}

export function useEntries () {
  const entries = ref([] as Entry[])
  onMounted(async () => {
    const querySnapshot = await db.collection('entries').get()

    querySnapshot.forEach((entry: QueryDocumentSnapshot) => {
      if (entry.exists) {
        entries.value.push({
          ref: entry.ref,
          ...entry.data() as {body: string; time: Timestamp}
        })
      }
    })
    if (entries.value.length === 0 || entries.value[0].time.toDate().setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0)) {
      const docRef = db.collection('entries').doc(new Date().toLocaleString().split(',')[0])
      entries.value.unshift({
        body: '',
        time: new firebase.firestore.Timestamp(Date.now() / 1000, 0),
        ref: docRef,
        today: true
      })
    }
  })

  function saveEntry (entry: Entry) {
    entry.ref.update({ body: entry.body }).catch(function () {
      const obj = { ...entry }
      delete obj.ref
      entry.ref.set(obj)
    })
  }
  return { entries, saveEntry }
}
