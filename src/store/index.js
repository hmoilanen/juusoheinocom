import Vue from 'vue'
import Vuex from 'vuex'
// modules
import app from './app'
import base from './base' // TARVIIKO TÄSSÄ ROJEKTISSA? / POISTUU!
import content from './content'
import modals from './modals' // TARVIIKO TÄSSÄ ROJEKTISSA? / POISTUU!
import ui from './ui'
// utils
import { dataType } from '@/utils/data'

Vue.use(Vuex)

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	
  modules: {
    app,
    base,
    content,
    modals,
    ui,
  },

  state: {},
	getters: {},
	
  // HUOM! PITÄSIKÖ TEHDÄ ERIKSEEN 'GET_STATE',
    //...JOHON VOI ANTAA POLUN SAMALLA TAVALLA KUIN 'SET_STATE':EN (STRING TAI REFERENSSI)

  actions: {
    SET_STATE: ({ commit }, payload) => {
      commit('SET_STATE', payload)
    }
  },

  mutations: {
    SET_STATE: (state, { data, path, property, update }) => {
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
    }
  }
})

if (window.Cypress) {
  window.__store__ = store
}

export default store