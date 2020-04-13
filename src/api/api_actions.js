import firebase from '@/api/firebase/firebaseInit';
import store from '@/store';
import dataParser from './parsers/data_parser';

const firestore = firebase.firestore()
const storageRef = firebase.storage().ref();
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

const getData = (collectionName, query, path, asArray) => {
  return new Promise((resolve, reject) => {
    let data = firestore.collection(collectionName)

    if (query.document) { // for getting the certain document
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      // TODO!: PITÄISIKÖ TÄSSÄKIN OLLA MAHDOLLISUUS ETTÄ TALLENTAA SUORAAN STOREEN JOS PATHIA EI ANNETTU?!?!?!?!
      data = data.doc(query.document).get()
        .then(doc => {
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

// add content to collection with random id
const addData = (collection, dataObject) => {
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection);
    database.add(dataObject)
    .then((docID) => {
      //console.log("Document successfully written!");
      resolve(docID);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      reject(error);
    });
  });
}

// add content to collection with preset id
// or overwrite (if merge = false)
const setData = (collection, doc, dataObject, merge) => {
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection);
    database.doc(doc).set(dataObject, { merge: merge })
    .then(() => {
      //console.log("Document successfully written!");
      resolve();
    })
    .catch((error) => {
      console.error("Error setting document: ", error);
      reject(error);
    });
  });
}

const updateData = (collection, doc, dataObject) => {
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection);
    database.doc(doc).update(dataObject)
    .then(() => {
      // console.log("Document successfully updated!");
      resolve();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      reject(error);
    });
  });
}

const removeDataField = (collection, doc, field) => {
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection);
   
    database.doc(doc).update({ [field]: firebase.firebase_.firestore.FieldValue.delete() })
    .then(() => {
      // console.log("Document successfully updated!");
      resolve();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      reject(error);
    });
  });
}

const removeArrayField = (collection, doc, array, id) => {
  return new Promise((resolve, reject) => {
    const database = firestore.collection(collection);
   
    database.doc(doc).update({ [array]: firebase.firebase_.firestore.FieldValue.arrayRemove(id) })
    .then(() => {
      // console.log("Document successfully updated!");
      resolve();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      reject(error);
    });
  });
}

const uploadDataToStorage = (dataURL, path) => {
  return new Promise((resolve, reject) => {
    const ref = storageRef.child(path);

    ref.putString(dataURL, 'data_url')
    .then((snapshot) => {
      resolve('success');
    })
    .catch((err) => {
      reject(err);
    });
  })
}

const getFilesFromStorage = path => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(path);
    let files = []

    storageRef.listAll().then(result => {
      result.items.forEach(imageRef => {
        files.push(imageRef.fullPath)
      });
      resolve(files)
    }).catch(error => {
      reject(error)
    });
  });
}

const deleteFileFromStorage = filePath => {
  const desertRef = storageRef.child(filePath); // e.g. images/test.png

  desertRef.delete().then(function() {
    // File deleted successfully
  }).catch(function(error) {
    // Uh-oh, an error occurred!
  });
}

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
    });
  })
}

const logout = () => {
  firebase.auth().signOut()
}

const isLogged = () => {
  return store.state.auth.email
}

const isAdmin = () => {
  return store.state.auth.email && store.state.auth.admin
}

function setFirebaseAuth() {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const userdata = await getData('users', { document: user.uid })
      store.dispatch('SET_STATE', { data: userdata, path: 'auth' })
      getDefer('logging').resolve()
    } else {
      store.dispatch('SET_STATE', { data: {}, path: 'auth' })
    }
  })
}

function addDefer(name) {
  let defer = () => {
    let res, rej
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    })
    promise.resolve = res;
    promise.reject = rej;
  
    return promise;
  }
  defers[name] = defer()
}

function getDefer(name) {
  return defers[name] || { resolve: () => {}, reject: () => {} }
}

export default {
  getData,
  addData,
  setData,
  updateData,
  uploadDataToStorage,
  getFilesFromStorage,
  deleteFileFromStorage,
  login,
  logout,
  isLogged,
  isAdmin,
  addDefer,
  getDefer,
  removeDataField,
  removeArrayField
}