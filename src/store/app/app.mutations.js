import Vue from 'vue'

export default {
  UPDATE_WINDOW: (state, updatedWindowObject) => {
    Vue.set(state, 'window', updatedWindowObject)
  },

  // POISTA TÄMÄ!
  SET_ERROR: (state, error) => {
    state.errors.push(error)
  },

  DELETE_ERROR: (state, error) => {
    let amount = state.errors.length

    for (let index = 0; index < amount; index++) {
      if (state.errors[index].id === error.id) {
        state.errors.splice(index, 1)
        break
      }
    }
  }
}

// Example:
// MUTATION_NAME: (state, value) => {}
