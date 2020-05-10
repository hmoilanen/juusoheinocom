export default {
  SET_MODAL: (state, modal) => {
    // If no active modal is given, close modal handler
    // Expects: { active: 'activeModalName', data: 'modalData' },
    // where only modal.active is required
    if (!modal || modal.active === '') {
      state.showModal = false
      state.activeModal = ''
      state.modalData = null
    } else if (modal.active) {
      state.showModal = true
      state.activeModal = modal.active
      if (modal.data) {
        state.modalData = modal.data
      }
    } else {
      console.log('Provide AT LEAST modal.active');
    }
  }
}

// Example:
// MUTATION_NAME: (state, value) => {}
