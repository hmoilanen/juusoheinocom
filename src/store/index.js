import Vue from 'vue'
import Vuex from 'vuex'

// modules
import app from './app'
import auth from './auth' // TARVIIKO TÄSSÄ ROJEKTISSA?
import base from './base'
import content from './content' // TARVIIKO TÄSSÄ ROJEKTISSA?
import modals from './modals' // TARVIIKO TÄSSÄ ROJEKTISSA?
import ui from './ui'

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

  // Generic store functions:

  actions: {
    SET_STATE: ({ commit }, payload) => {
      commit('SET_STATE', payload)
    }
  },

  mutations: {
    SET_STATE: (state, { data, path }) => {
      // Note: expects path as string of dot notation (e.g. 'a.b.c.d')
      let target = path.split('.') // convert path string into array
      let key = target[target.length - 1] // get key for corresponding data
      let stateToUpdate = state

      // create data path dynamically with bracket notation
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
