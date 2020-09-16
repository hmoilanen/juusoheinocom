// see: https://github.com/prescottprue/cypress-firebase

//import store from '@/store/index'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import { attachCustomCommands } from 'cypress-firebase'
//import firebaseConfig from '../../../src/api/firebase/firebaseConfig.js'

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

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })