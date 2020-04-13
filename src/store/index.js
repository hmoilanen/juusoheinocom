import Vue from 'vue'
import Vuex from 'vuex'
// modules
import app from './app'
import auth from './auth'
import base from './base'
import content from './content'
import modals from './modals' // TARVIIKO TÄSSÄ ROJEKTISSA?
import ui from './ui'
// utils
import { dataType } from '@/utils/data'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    auth,
    base,
    content,
    modals,
    ui,
  },

  state: {},

  actions: {
    SET_STATE: ({ commit }, payload) => {
      commit('SET_STATE', payload)
    },
    /* SET_STATE_C: ({ commit }, payload) => {
      commit('SET_STATE_C', payload)
    },
    UPDATE_STATE: ({ commit }, payload) => {
      commit('UPDATE_STATE', payload)
    },
    SETTAA_STATE: ({ commit }, payload) => {
      commit('SETTAA_STATE', payload)
    } */
  },

  mutations: {
    SET_STATE: (state, {data, path, property, update}) => {
      if (data === undefined) return

      let stateToSet = path
      let key = property
      let updatedData = data

      if (typeof path === 'string') { // if path given as string notation instead of reference
        let hasProperty = property ? 0 : 1
        let pathAsStrings = path.length > 0 // for { path: '' } (= store.state)
        ? path.split('.')
        : []
        
        stateToSet = state
        
        // build an actual reference
        while (pathAsStrings.length > hasProperty) {
          // create data structure if not existing yet (works only if path is string)
          if (!stateToSet.hasOwnProperty(pathAsStrings[0])) {
            if (update) {
              console.log(`SET_STATE: reference not found`)
              return
            } else {
              Vue.set(stateToSet, pathAsStrings[0], {})
            }
          }
          
          stateToSet = stateToSet[pathAsStrings.shift()]
        }

        if (!property) {
          key = pathAsStrings[0] // set key with last item left in array
        }
      } else if (!path || !property) { // if missing parameters        
        console.log(`SET_STATE: provide missing parameters (data: ${data}, path: ${path}, property: ${property})`)
        return
      }

      if (update) {
        let toBeUpdated = path[property]
        let type = dataType(data)
        let match = type === dataType(toBeUpdated)
        
        // update only if data types match
        if (match && (toBeUpdated !== null || toBeUpdated !== undefined)) {
          if (type === 'object') {
            updatedData = Object.assign({}, toBeUpdated, data)
          } else if (type === 'array') {
            updatedData = toBeUpdated.concat(data)
          }
        } else if (!path.hasOwnProperty(property)) {
          console.log(`SET_STATE: no state to update`)
          return
        } else if (!match) {
          console.log(`SET_STATE: provide matching data types to update`)
          return
        }
      }

      Vue.set(stateToSet, key, updatedData)
    },

    // // // // // // // // // // // // // // // // // // // // // // // // 
    // // // // // // // // // // // // // // // // // // // // // // // // 
    //MUUTA TÄMÄ NIIN, ETTÄ POLUN VOI ANTAA JOKO STRINGINÄ ETTÄ VIITTEENÄ
    //NÄIN VOI TALLENTAA MITÄ DATAA TAHANSA (OBJEKTIT JA ARRAYT)
    //AINOA ONGELMA ON ARRAYT! -> PITÄÄ TEHDÄ OMA TOIMINNALLISUUS PELKÄSTÄÄN ARRAYTA VARTEN
    //-> TEE LOPUKSI DYNAAMISET METODIT (METODIN NIMI ANNETAAN MUUTTUJALLA)
    //--> ...MUTTA AINAKIN ALKUUN RIITTÄÄ PELKKÄ PUSH!

    /* SET_STATE: (state, { data, path }) => {
      if (data === undefined) return

      // Note: expects path as string of dot notation (e.g. 'a.b.c.d')
      let target = path.split('.') // convert path string into array
      let key = target[target.length - 1] // get key for corresponding data
      let stateToUpdate = state

      // create data path dynamically with bracket notation
      while (target.length > 1) {
        stateToUpdate = stateToUpdate[target.shift()]
      }
  
      Vue.set(stateToUpdate, key, data)
    }, */

    /* SET_STATE_C: (state, { data, path, property }) => {
      let stateToSet = path
      let key = property
      
      if (data && typeof path === 'string') { // if path given as string notation instead of reference
        let hasProperty = property ? 0 : 1
        let pathAsStrings = path.length > 0 // for { path: '' } (= store.state)
          ? path.split('.')
          : []

        stateToSet = state

        while (pathAsStrings.length > hasProperty) {
          // create data structure if not existing yet
          if (!(pathAsStrings[0] in stateToSet)) {
            Vue.set(stateToSet, pathAsStrings[0], {})
          }

          stateToSet = stateToSet[pathAsStrings.shift()]
        }

        if (!property) {
          key = pathAsStrings[0] // set key with last item left in array
        }
      } else if (!path || !property) { // if no missing parameters
        console.log(`SET_STATE: provide missing parameters (data: ${data}, path: ${path}, property: ${property})`)
        return
      }

      Vue.set(stateToSet, key, data)
    }, */

    /* UPDATE_STATE: (state, {data, path, property}) => {
      // 1. checks if path is provided as a reference of string and handles it accordingly
      // 2. checks if to be updated state exists
      // 3. checks if data type matches with path's reference (strict)
      // 4. updates the state in neccessary way based on data type

      if (data === undefined) return

      console.log('property', property);
      let stateToUpdate = path
      let key = property

      // 1.
      if (typeof path === 'string') { // if path given as string notation instead of reference
        let hasProperty = property ? 0 : 1
        let pathAsStrings = path.length > 0 // for { path: '' } (= store.state)
          ? path.split('.')
          : []

        stateToUpdate = state

        while (pathAsStrings.length > hasProperty) {  
          stateToUpdate = stateToUpdate[pathAsStrings.shift()]
        }

        if (!property) {
          key = pathAsStrings[0] // set key with last item left in array
        }
      } else if (!path || !property) { // if no missing parameters        
        console.log(`UPDATE_STATE: provide missing parameters (data: ${data}, path: ${path}, property: ${property})`)
        return
      }

      let toBeUpdated = path[property]
      let type = dataType(data)
      let match = type === dataType(toBeUpdated)
      let updatedData
      
      // 2. & 3.
      if (match && (toBeUpdated !== null || toBeUpdated !== undefined)) {
        // 4.
        if (type === 'object') {
          updatedData = Object.assign({}, toBeUpdated, data)
        } else if (type === 'array') {
          updatedData = toBeUpdated.concat(data)
        } else {
          updatedData = data
        }
      } else if (!path.hasOwnProperty(property)) {
        console.log(`UPDATE_STATE: no state to update`)
        return
      } else if (!match) {
        console.log(`UPDATE_STATE: provide matching data types`)
        return
      }

      Vue.set(stateToUpdate, key, updatedData)
    }, */

    /* SETTAA_STATE: (state, {data, path, property, update}) => {
      if (data === undefined) return

      let stateToSet = path
      let key = property
      let updatedData = data

      if (typeof path === 'string') { // if path given as string notation instead of reference
        let hasProperty = property ? 0 : 1
        let pathAsStrings = path.length > 0 // for { path: '' } (= store.state)
        ? path.split('.')
        : []
        
        stateToSet = state
        
        // build an actual reference
        while (pathAsStrings.length > hasProperty) {
          // create data structure if not existing yet
          console.log('!stateToSet.hasOwnProperty(pathAsStrings[0])', !stateToSet.hasOwnProperty(pathAsStrings[0]));
          

          if (!stateToSet.hasOwnProperty(pathAsStrings[0])) {
            if (update) {
              console.log(`SET_STATE: reference not found`)
              return
            } else {
              Vue.set(stateToSet, pathAsStrings[0], {})
            }
          }
          
          stateToSet = stateToSet[pathAsStrings.shift()]
        }

        if (!property) {
          key = pathAsStrings[0] // set key with last item left in array
        }
      } else if (!path || !property) { // if missing parameters        
        console.log(`SET_STATE: provide missing parameters (data: ${data}, path: ${path}, property: ${property})`)
        return
      }

      if (update) {
        let toBeUpdated = path[property]
        let type = dataType(data)
        let match = type === dataType(toBeUpdated)
        
        // update only if data types match
        if (match && (toBeUpdated !== null || toBeUpdated !== undefined)) {
          if (type === 'object') {
            updatedData = Object.assign({}, toBeUpdated, data)
          } else if (type === 'array') {
            updatedData = toBeUpdated.concat(data)
          }
        } else if (!path.hasOwnProperty(property)) {
          console.log(`SET_STATE: no state to update`)
          return
        } else if (!match) {
          console.log(`SET_STATE: provide matching data types to update`)
          return
        }
      }

      Vue.set(stateToSet, key, updatedData)
    }, */

    // TODO!: TÄMÄ POISTUU!!!!!!!!
    // TODO!: TÄMÄ POISTUU!!!!!!!!
    // TODO!: TÄMÄ POISTUU!!!!!!!!
    SET_STATE_OBJECT: (state, { data, object, value }) => {
      Vue.set(object, data, value)
    }
  }
})
