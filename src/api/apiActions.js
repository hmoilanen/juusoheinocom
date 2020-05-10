import firebase from '@/api/firebase/firebaseInit'
import store from '@/store'
import apiParser from './apiParser'

const firestore = firebase.firestore()
const storageRef = firebase.storage().ref()
// https://firebase.google.com/docs/storage/web/create-reference

let defers = {} //TARVIIKO TÄSSÄ PROJEKTISSA OLLENKAAN?

setFirebaseAuth()

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase firestore methods:

const getData = (collectionName, document, path, asArray) => {
  // Use to get certain collection or document.
  // Note: if path is given, data is stored instead of returning it.
  // Note: asArray works only if document is not given.
  // Todo: later, add possibility to make queries if needed: https://firebase.google.com/docs/firestore/query-data/queries
  return new Promise((resolve, reject) => {
    let target = firestore.collection(collectionName)

    if (document) { // get certain document
      target = target.doc(document).get()
      .then(doc => {
        console.log('$api.getData - success')
        resolve(doc.data())
      })
      .catch(error => {
        console.error('$api.getData - error:', error)
        reject(error)
      })
    } else { // get the whole collection
      target.get()
      .then(snapshot => {
        console.log('$api.getData - success')
        const parsed = apiParser.parseFirebaseData(snapshot, asArray)

        if (typeof path === 'string') { // for accepting path also as falsy ('')
          let completePath = path === '' // for storing data to store's root
            ? collectionName
            : path + '.' + collectionName

          store.dispatch('SET_STATE', { data: parsed, path: completePath })
          resolve()
        }          
        resolve(parsed)
      })
      .catch(error => {
        console.error('$api.getData - error:', error)
        reject(error)
      })
    }
  })
}

const setDocument = (collectionName, doc, dataObject, merge) => {
  // Use to create or override documents for certain collection.
  // If doc is given, add document for collection with that id,
  // else, add document for collection with random id.
  // Note: if doc already exists, override it's data.
  // Note: dataObject is always required as object (can also be empty).
  // Note: merge works only if doc is given (if true, merge document's existing data with new).
  return new Promise((resolve, reject) => {
    const collection = firestore.collection(collectionName)
    let setDocument

    if (doc) {
      setDocument = collection.doc(doc).set(dataObject, { merge: merge })
    } else {
      setDocument = collection.add(dataObject)
    }

    setDocument.then((docRef) => {
      console.log('$api.setDocument - success')
      if (docRef) { // if new document with random id
        resolve(docRef)
      } else {
        resolve()
      }
    })
    .catch(error => {
      console.error('$api.setDocument - error:', error)
      reject(error)
    })
  })
}

const updateData = (collectionName, doc, dataObject) => {
  // Use to update data of certain document of certain collection.
  // Note: data can be updated only on first level of parent's scope,
  // and the possible deeper existing data structure is overwritten!
  // Note: dataObject is always required as object (can also be empty).
  // https://firebase.google.com/docs/database/web/read-and-write
  return new Promise((resolve, reject) => {
    const collection = firestore.collection(collectionName)

    collection.doc(doc).update(dataObject)
    .then(() => {
      console.log('$api.updateData - success')
      resolve()
    })
    .catch(error => {
      console.log('$api.updateData - error:', error)
      reject(error)
    })
  })
}

const deleteData = (collectionName, doc, field) => {
  // Use to delete certain (whole) data field from certain document.
  return new Promise((resolve, reject) => {
    const collection = firestore.collection(collectionName)

    collection.doc(doc).update({ [field]: firebase.firebase_.firestore.FieldValue.delete() })
    .then(() => {
      console.log('$api.deleteData - success')
      resolve()
    })
    .catch(error => {
      console.log('$api.deleteData - error', error)
      reject(error)
    })
  })
}

const updateArray = (collection, doc, array, id, remove) => {
  // Use to update certain array of certain document.
  // Note: data can also be removed from array (if remove = true).
  // Note: updating array is an atomic action!
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection)
    let updateArray = firebase.firebase_.firestore.FieldValue
   
    if (remove) {
      updateArray = updateArray.arrayRemove(id)
    } else {
      updateArray = updateArray.arrayUnion(id)
    }

    database.doc(doc).update({ [array]: updateArray })
    .then(() => {
      console.log('$api.updateArray - success')
      resolve()
    })
    .catch(error => {
      console.log('$api.updateArray - error', error)
      reject(error)
    })
  })
}

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase storage methods:
// https://firebase.google.com/docs/storage/web/start

const uploadToStorage = (dataURL, path) => {
  // Use to upload images' encoded data to storage.
  // Note: creates also related folder structure if it doesn't exist yet!
  // https://firebase.google.com/docs/storage/web/upload-files
  return new Promise((resolve, reject) => {
    // create a reference to the path of the file, eg. 'images/image.jpg'
    const ref = storageRef.child(path)

    // upload the encoded string
    ref.putString(dataURL, 'data_url')
    .then(snapshot => {
      console.log('$api.uploadToStorage - success')
      resolve(snapshot)
    })
    .catch(error => {
      console.log('$api.uploadToStorage - error', error)
      reject(error)
    })
  })
}

const getFromStorage = path => {
  // Use to fetch all data from certain directory of storage.
  // https://firebase.google.com/docs/storage/web/list-files
  return new Promise((resolve, reject) => {
    // Create a reference to the path of a file, eg. 'images/'
    const ref = storageRef.child(path)
    let files = []

    // Fetch all results from a directory
    ref.listAll()
    .then(result => {
      // Note: for large lists, it'd be better to use .list()
      // Todo: update method later if neccessary!
      console.log('$api.getFromStorage - success')
      result.items.forEach(imageRef => {
        files.push(imageRef.fullPath)
      })
      resolve(files)
    }).catch(error => {
      console.log('$api.getFromStorage - error', error)
      reject(error)
    })
  })
}

const deleteFromStorage = path => {
  // Use to delete single file from certain location.
  // Note: can't be used to delete whole folders.
  // Note: if deleted file makes folder empty, the folder is deleted simultaneously!
  // https://firebase.google.com/docs/storage/web/delete-files
  const ref = storageRef.child(path) // eg. 'images/image.jpg'

  ref.delete()
  .then(() => {
    console.log('$api.deleteFromStorage - success')
  }).catch(error => {
    console.log('$api.deleteFromStorage - error', error)
  })
}

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase auth methods:

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    addDefer('logging')
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async () => {
      await getDefer('logging')
      resolve('logged in')
    })
    .catch(error => {
      console.log('$api.login - error', error)
      reject(error)
    })
  })
}

const logout = () => {
  firebase.auth().signOut()
}

const isLogged = () => {
  return store.state.auth.isLogged
}

function setFirebaseAuth() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      store.dispatch('SET_STATE', { data: true, path: 'auth.isLogged' })
      getDefer('logging').resolve()
    } else {
      store.dispatch('SET_STATE', { data: false, path: 'auth.isLogged' })
    }
  })
}

//TARVIIKO OLLENKAAN TÄSSÄ KONTEKSTISSA???
function addDefer(name) {
  let defer = () => {
    let res, rej
    let promise = new Promise((resolve, reject) => {
      res = resolve
      rej = reject
    })
    promise.resolve = res
    promise.reject = rej
  
    return promise
  }
  defers[name] = defer()
}

//TARVIIKO OLLENKAAN TÄSSÄ KONTEKSTISSA???
function getDefer(name) {
  return defers[name] || { resolve: () => {}, reject: () => {} }
}

export default {
  getData,
  setDocument,
  updateData,
  deleteData,
  updateArray,
  uploadToStorage,
  getFromStorage,
  deleteFromStorage,
  login,
  logout,
  isLogged,
  addDefer,
  getDefer
}