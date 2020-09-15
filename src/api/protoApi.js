//import firebase from '@/api/firebase/firebaseInit'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import store from '@/store'

// Creating references, see: https://firebase.google.com/docs/storage/web/create-reference
//const firestore = firebase.firestore()
//const storageRef = firebase.storage().ref()

let firestore
let storageRef

setFirebase()

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase firestore methods:
// See: https://firebase.google.com/docs/firestore/quickstart

const getData = (collectionName, document, path, asArray) => {
  // Use to get certain collection or document.
  // If document is not provided, get all documents of collection.
  // Note: if path is given, data is stored instead of returning it!
  // Note: asArray works only if document is not given.
  // Todo: later, add possibility to make queries if needed: https://firebase.google.com/docs/firestore/query-data/queries
  return new Promise((resolve, reject) => {
    let target = firestore.collection(collectionName)

    if (document) { // Get certain document
      target = target.doc(document).get()
      .then(doc => {
        console.log('$api.getData - success')
        resolve(doc.data())
      })
      .catch(error => {
        console.error('$api.getData - error:', error)
        reject(error)
      })
    } else { // Get the whole collection
      target.get()
      .then(snapshot => {
        console.log('$api.getData - success')
        const parsed = parseFirebaseData(snapshot, asArray)

        if (typeof path === 'string') { // For accepting path also as falsy ('')
          let completePath = path === '' // For storing data to store's root
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

const setDocument = (collectionName, doc, dataObject, merge = true) => {
  // Use to create or override documents for certain collection.
  // If doc is given, add document to collection with that id,
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
      if (docRef) { // If new document with random id
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
  // See: https://firebase.google.com/docs/database/web/read-and-write
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
  // See: https://firebase.google.com/docs/firestore/manage-data/add-data
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
// See: https://firebase.google.com/docs/storage/web/start

const uploadToStorage = (dataURL, path) => {
  // Use to upload images' encoded data to storage.
  // Note: creates also related folder structure if it doesn't exist yet!
  // Note: path is provided as '/folder/subfolder/...'
  // See: https://firebase.google.com/docs/storage/web/upload-files
  return new Promise((resolve, reject) => {
    // Create a reference to the path of the file, eg. 'images/image.jpg'
    const ref = storageRef.child(path)

    // Upload the data_url encoded string
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
  // Note: path is provided as '/folder/subfolder/...'
	// See: https://firebase.google.com/docs/storage/web/list-files
	// Todo: enhance so it's possible to get only certain data of directory
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
  // Note: path is provided as '/folder/subfolder/...'
  // See: https://firebase.google.com/docs/storage/web/delete-files
  const ref = storageRef.child(path) // eg. 'images/image.jpg'

  ref.delete()
  .then(() => console.log('$api.deleteFromStorage - success'))
	.catch(error => console.log('$api.deleteFromStorage - error', error))
}

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase config / auth methods:
// See: https://firebase.google.com/docs/auth/web/start

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => resolve('logged in'))
    .catch(error => {
      console.log('$api.login - error', error)
      reject(error)
    })
  })
}

const logout = () => {
  firebase.auth().signOut()
}

// Set Firebase and initiate the app with it + relevant data
async function setFirebase() {
	if (!firestore) {
		//const firebaseConfigURL = 'http://localhost:3001/api/firebaseConfig' // TUDU: VAIHDAA TÄMÄ KUN HEROKUSSA
		const firebaseConfigURL = 'https://pure-falls-91716.herokuapp.com/api/firebaseConfig'
		const response = await fetch(firebaseConfigURL)
		const body = await response.json()
		const firebaseApp = await firebase.initializeApp(body)

		firestore = firebaseApp.firestore()
		storageRef = firebaseApp.storage().ref()
	}

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('SET_STATE', { data: true, path: 'app.isLogged' })
    } else {
      store.dispatch('SET_STATE', { data: false, path: 'app.isLogged' })
    }
	})
	
	await Promise.all([
		getData('home', null, 'content'),
		getData('contact', null, 'content'),
		getData('projects', null, 'content'),
		getData('gallery', null, 'content'),
		getData('components', null, 'content'),
		getData('meta', null, 'content')
	])

	store.dispatch('SET_STATE', { data: false, path: 'app.isLoading' })
}

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase data parser:

function parseFirebaseData(snapshot, asArray) {
  let parsed = asArray ? [] : {}

  snapshot.forEach(doc => {
    if (asArray) {
      parsed.push(doc.data())
    } else {
      parsed[doc.id] = doc.data()
    }
  })

  return parsed
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
  logout
}