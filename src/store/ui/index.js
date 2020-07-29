//import state from './ui.state'
//import getters from './ui.getters'
//import mutations from './ui.mutations'
//import actions from './ui.actions'

export default {
	namespaced: true,
	
  state: {
		baseDimension: 0.125, // rem
		breakpoints: [420, 768, 900], // default amount is 2, max 3 (if unique layout for super wide screen is provided)
		contentPaddingDefault: 16, // 16px / 1rem
		contentWidth: {
			max: 1100,
			medium: 900,
			paragraph: 460,
		},
		curtainDisplayed: true,
		//darkMode: false,
		footerHeight: 0,
		navTopDisplayed: true,
		navTopHeight: 60,
		//navLeftDisplayed: true,
		//navLeftWidth: 160,
		//navRightDisplayed: true,
		preventBodyScrolling: false,

		zIndex: {
			appCurtain: 100000,
			modalHandler: 10000,
			navTop: 1000,
			//contactLink: 100,
			contentHandler: 10,
			//errorHandler: 1000000,
			//navLeft: 1000,
			//navRight: 10,
		},

		window: {
			width: null, // window.offsetWidth
			height: null // window.offsetHeight
		}
	},

  getters: {
		GET_BREAKPOINT: state => {
			const windowWidth = state.window.width
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
