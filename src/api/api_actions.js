import firebase from '@/api/firebase/firebaseInit'
import store from '@/store'
import dataParser from './parsers/data_parser'

const firestore = firebase.firestore()
const storageRef = firebase.storage().ref()

let defers = {}

setFirebaseAuth()

/* const getData = (collection, query, storePath, objectName, asObject) => {
  //const queryObject = query;

  return new Promise(resolve => {
    let database = firestore.collection(collection);

    if (query.document) {
      database = database.doc(query.document)
      database.get().then(doc => {
        resolve(doc.data())
      })
    } else {
      console.log('elssi');
      console.log('elssi-database', database);
      
      database.get().then(querySnapshot => {
        console.log('elssi-querySnapshot', querySnapshot);
        console.log('elssi-objectName', objectName);
        console.log('elssi-asObject', asObject);
        const parsed = dataParser.parseData(querySnapshot, objectName, asObject);
        //const parsed = dataParser.parseData(querySnapshot, 'aaa', asObject);
        const PARSED2 = dataParser.parseFirebaseData(querySnapshot, 'test2');
        console.log('elssi-parsed', parsed);
        console.log('elssi-PARSED2', PARSED2);

        if (storePath) {
          store.dispatch('SET_STATE', { data: parsed, path: storePath })
          resolve();
        }
        resolve(parsed);
      });
    }
  });
} */

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase firestore methods:

// TÄTÄ PITÄÄ VIELÄ VÄHÄN KATSOA! -> AINAKIN ALKUOSAA if(query.document) !
const getData = (collectionName, query, path, asArray) => {
  return new Promise((resolve, reject) => {
    let data = firestore.collection(collectionName)

    if (query.document) { // for getting the certain document
      console.log('query', query);
      
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      data = data.doc(query.document).get()
        .then(doc => {
          console.log('doc', doc.data());
          
          resolve(doc.data())
        })
        .catch(err => { // TODO!: TÄMÄ VIELÄ TESTAAMATTA!
          reject(err)
        })
    } else { // for getting the whole collection
      data.get()
        .then(snapshot => {
          const parsed = dataParser.parseFirebaseData(snapshot, asArray)

          // if path is given, only store the parsed data instead of returning it
          if (typeof path === 'string') { // for accepting path also as falsy ('')
            let completePath = path === '' // for storing data to store root
              ? collectionName
              : path + '.' + collectionName

            store.dispatch('SET_STATE', { data: parsed, path: completePath })
            resolve()
          }          

          resolve(parsed)
        })
        .catch(err => { // TODO!: TÄMÄ VIELÄ TESTAAMATTA!
          reject(err)
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
      if (docRef) { // if new document with random id
        console.log('$api.setDocument - success: document set with id ' + docRef.id)
        resolve(docRef)
      } else {
        console.log('$api.setDocument - success')
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
    .catch((error) => {
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
    .catch((error) => {
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
    .catch((error) => {
      console.log('$api.updateArray - error', error)
      reject(error)
    })
  })
}

// // // // // // // // // // // // // // // // // // // // // // // // 
// Firebase storage methods:

const uploadToStorage = (dataURL, path) => {
  // https://firebase.google.com/docs/storage/web/upload-files
  return new Promise((resolve, reject) => {
    // create a reference to the path of the file, eg. images/image.jpg
    const ref = storageRef.child(path)

    // upload encoded string to storage
    ref.putString(dataURL, 'data_url')
    .then((snapshot) => {
      resolve('uploaded data to storage successfully')
    })
    .catch((err) => {
      reject(err)
    })
  })
}

// EI AINAKAAN VIELÄ KÄYTÖSSÄ!
const getFromStorage = path => {
  return new Promise((resolve, reject) => {
    // create a reference to the file
    const storageRef = firebase.storage().ref(path)
    let files = []

    // fetch all results for a directory
    // Note: for large lists, use .list()
    storageRef.listAll()
    .then(result => {
      result.items.forEach(imageRef => {
        files.push(imageRef.fullPath)
      })
      resolve(files)
    }).catch(error => {
      reject(error)
    })
  })
}

// EI AINAKAAN VIELÄ KÄYTÖSSÄ!
const deleteFromStorage = filePath => {
  const desertRef = storageRef.child(filePath); // eg. images/image.png

  desertRef.delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    // Uh-oh, an error occurred!
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
    .catch((error) => {
      reject(error)
      console.log(error.code,  error.message)
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