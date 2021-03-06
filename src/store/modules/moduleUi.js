export default {
	namespaced: true,
	
  state: {
		baseDimension: 0.125, // rem
		breakpoints: [420, 768, 900], // Default amount is 2, max 3 (if unique layout for super wide screen is provided)
		contentPaddingDefault: 16, // = 16px = 1rem
		contentWidth: {
			max: 1100,
			medium: 900,
			paragraph: 460,
		},
		curtainDisplayed: true,
		footerHeight: 0, // To be calculated / updated
		galleryIntroSeen: false,
		navTopDisplayed: true,
		navTopHeight: 60,
		preventBodyScrolling: false,

		zIndex: {
			appCurtain: 100000,
			modalHandler: 10000,
			navTop: 1000,
			contentHandler: 10,
		},

		// This is for making getter 'GET_BREAKPOINT' reactive (updated in appHandler.vue)
		windowWidth: 0
	},

  getters: {
		GET_BREAKPOINT: state => {
			const windowWidth = state.windowWidth
			const breakpoints = state.breakpoints
			const classes = ['s', 'm', 'l', 'xl']
			let current = 'm'
	
			for (let i = 0; i < breakpoints.length; i++) {
				if (windowWidth < breakpoints[i]) {
					current = classes[i]
					break
				} else if (i === breakpoints.length - 1 && windowWidth >= breakpoints[i]) {
					current = classes[breakpoints.length]
				}
			}

			return {
				current: current,
				index: classes.indexOf(current),
				width: windowWidth
			}
		}
	},

	mutations: {},
	
  actions: {}
}
