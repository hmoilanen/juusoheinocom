// see: https://github.com/prescottprue/cypress-firebase

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'

const firebaseConfig = Cypress.env('FIREBASE_CONFIG')

firebase.initializeApp(firebaseConfig)

attachCustomCommands({ Cypress, cy, firebase })