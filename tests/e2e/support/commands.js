// see: https://github.com/prescottprue/cypress-firebase

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDuiTEVFZMrhxX7Z_oo71xDc2cjKNqo8xI",
  authDomain: "juusoheinocom.firebaseapp.com",
  databaseURL: "https://juusoheinocom.firebaseio.com",
  projectId: "juusoheinocom",
  storageBucket: "juusoheinocom.appspot.com",
  messagingSenderId: "829965520185",
  appId: "1:829965520185:web:9f232931cacf36df192ce8",
  measurementId: "G-ES0TRDVRKY"
}

//const fbConfig = firebaseConfig

/* const fbConfig = async function() {
	const backendURL = store.state.app.backendDomain
	//const firebaseConfig = await fetch(`${backendURL}/api/firebaseConfig`)
	const firebaseConfig = await fetch('https://pure-falls-91716.herokuapp.com/api/firebaseConfig')
	const response = firebaseConfig.json()
	
	console.log('response', responses);
	return response
} */

//firebase.initializeApp(fbConfig)
firebase.initializeApp(firebaseConfig)

attachCustomCommands({ Cypress, cy, firebase })