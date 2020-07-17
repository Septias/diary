import { ref, onMounted } from '@vue/composition-api'
import { db } from './firebase'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

type DocumentReference = firebase.firestore.DocumentReference
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export class TagType {
  public ref: DocumentReference
  public name: string
  public color: string
  constructor (ref: DocumentReference, name: string, color: string) {
    this.ref = ref
    this.name = name
    this.color = color
  }

  setColor (color: string) {
    this.color = color
    this.ref.update({ color: color })
  }
}

const tagTypeConverter = {
  toFirestore: function (tagType: TagType) {
    return {
      name: tagType.name,
      color: tagType.color
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    return new TagType(snapshot.ref, data.name, data.color)
  }
}

const tagTypes = ref([] as TagType[])

function createTag ({ name }) {
  const tagType = new TagType(db.collection('tag-types').doc(name), name, '#000000')
  db.collection('tag-types').doc(name).withConverter(tagTypeConverter).set(tagType)
  tagTypes.value.push(tagType)
}

export function useTagTypes () {
  if (tagTypes.value.length === 0) {
    onMounted(() => {
      db.collection('tag-types').withConverter(tagTypeConverter).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          tagTypes.value.push(doc.data())
        })
      })
    })
  }
  return { tagTypes, createTag }
}
