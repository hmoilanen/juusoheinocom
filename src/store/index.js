import Vue from 'vue'
import Vuex from 'vuex'

// modules
import api from './api'
import app from './app'
import auth from './auth'
import content from './content'
import modals from './modals'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    api,
    app,
    auth,
    content,
    modals
  },

  // Generic store functions

  actions: {
    SET_STATE: ({ commit }, payload) => {
      commit('SET_STATE', payload)
    }
  },

  mutations: {
    SET_STATE: (state, { data, path }) => {
      // Note: expects path as string of dot notation (e.g. 'a.b.c.d')
      let target = path.split('.') // Convert path string into array
      let key = target[target.length - 1] // Get key for corresponding object in entities.entityList to be updated
  
      // Create data path dynamically with bracket notation
      let stateToUpdate = state
  
      while (target.length > 1) {
        stateToUpdate = stateToUpdate[target.shift()]
      }
      
      // TODOS:
      // Add functionality for handling / updating arrays
      // Add functionality for handling / updating objects
  
      Vue.set(stateToUpdate, key, data)
    }
  }
})
