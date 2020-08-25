import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/moduleApp'
import content from './modules/moduleContent'
import modals from './modules/moduleModals'
import ui from './modules/moduleUi'
import { dataType } from '@/utils/data'

Vue.use(Vuex)

const store = new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	
  modules: {
    app,
    content,
    modals,
    ui,
  },

	state: {},
	
	getters: {},

  actions: {
    SET_STATE: ({ commit }, payload) => {
      commit('SET_STATE', payload)
    }
  },

  mutations: {
    SET_STATE: (state, { data, path, property, update }) => {
			// Generic mutation method to set data to any state of any module

      if (data === undefined) return

      let stateToSet = path
      let key = property
      let updatedData = data

      if (typeof path === 'string') { // If path given as string notation instead of reference
        let hasProperty = property ? 0 : 1
        let pathAsStrings = path.length > 0 // For { path: '' } = store.state
          ? path.split('.')
          : []
        
        stateToSet = state
        
        // Build an actual reference
        while (pathAsStrings.length > hasProperty) {
          // Create data structure if not existing yet (works only if path is string)
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
          key = pathAsStrings[0] // Set key with last item left in array
        }
      } else if (!path || !property) { // If missing parameters        
        console.log(`SET_STATE: provide missing parameters (data: ${data}, path: ${path}, property: ${property})`)
        return
      }

      if (update) {
        let toBeUpdated = path[property]
        let type = dataType(data)
        let match = type === dataType(toBeUpdated)
        
        // Update only if data types match
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

// For Cypress testing with store involved
if (window.Cypress) {
  window.__store__ = store
}

export default store