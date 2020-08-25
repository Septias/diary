import { ref, onMounted } from '@vue/composition-api'
import './fbapp'
import firebase from 'firebase/app'
import 'firebase/firestore'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const db = firebase.firestore()

type DocumentReference = firebase.firestore.DocumentReference
type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot

export class TagType {
  public ref?: DocumentReference
  public name: string
  public color: string
  constructor (name: string, color: string, ref?: DocumentReference) {
    this.ref = ref
    this.name = name
    this.color = color
  }

  setColor (color: string) {
    this.color = color
    if (this.ref) {
      console.log(color)
      this.ref.update({ color: color })
    }
  }
}

export const defaultTag = new TagType('default', '#aaaaaa')

const tagTypeConverter = {
  toFirestore: function (tagType: TagType) {
    return {
      name: tagType.name,
      color: tagType.color
    }
  },
  fromFirestore: function (snapshot, options) {
    const data = snapshot.data(options)
    return new TagType(data.name, data.color, snapshot.ref)
  }
}

const tagTypes = ref([] as TagType[])

function createTag ({ name }) {
  const tagType = new TagType(name, '#000000', db.collection('tag-types').doc(name))
  db.collection('tag-types').doc(name).withConverter(tagTypeConverter).set(tagType)
  tagTypes.value.push(tagType)
}

export function useTagTypes () {
  if (tagTypes.value.length === 0) {
    onMounted(() => {
      db.collection('tag-types').withConverter(tagTypeConverter).get().then(function (querySnapshot: firebase.firestore.QuerySnapshot) {
        querySnapshot.forEach(function (doc) {
          tagTypes.value.push(doc.data() as TagType)
        })
      })
    })
  }
  return { tagTypes, createTag }
}
