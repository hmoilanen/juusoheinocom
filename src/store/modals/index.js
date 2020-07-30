export default {
  namespaced: true,

	state: {
		showModal: false,
		activeModal: '',
		modalData: null
	},

	getters: {},

	actions: {
		SET_MODAL: ({ commit }, modal) => {
			commit('SET_MODAL', modal)
		}
	},

	mutations: {
		SET_MODAL: (state, modal) => {
			// If no active modal is given, close modal handler.
			// Expects: { active: 'activeModalName', data: 'modalData' },
			// where only modal.active is required.
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
}
