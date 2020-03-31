export default {
  UPDATE_WINDOW: ({ commit }, updatedWindowObject) => {
    commit('UPDATE_WINDOW', updatedWindowObject)
  },

  // POISTA TÄMÄ!
  SET_ERROR: ({ commit }, error) => {
    commit('SET_ERROR', error)
  },

  DELETE_ERROR: ({ commit }, error) => {
    commit('DELETE_ERROR', error)
  }
}

// Example:
// ACTION_NAME: ({ commit, dispatch, state, rootState, getters }, payload) => {}
