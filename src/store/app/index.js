import firebaseConfig from '@/api/firebase/firebaseConfig'

export default {
	namespaced: true,
	
	state: {
		domain: 'https://juusoheino.com',
		isLoading: true,
		isLogged: false,
		locale: 'en',

		externals: [ //OLISIKO NÄMÄKIN FIKSU SIRTÄÄ KANTAAN? VAI MIHIN OLISI PARAS?
			{ title: 'Github', icon: 'github', link: 'https://github.com/' }, //HUOM! PÄIVITÄ LINKKI KUN TILI LUOTU
			{ title: 'LinkedIn', icon: 'linkedin', link: 'https://www.linkedin.com/in/heinojuuso/' },
			{ title: 'Constlet', icon: 'constlet', link: 'https://constlet.com' }
		],

		official: {
			appName: 'juusoheino.com',
			companyName: 'Juuso Heino',
			emailPrefix: 'mail',
			emailDomain: 'juusoheino',
			emailSuffix: 'com'
		}
	},
	
	getters: {
		GET_URL: state => {
			const appURL = process.env.NODE_ENV === 'production'
				? state.domain
				: `${window.location.protocol}//${window.location.host}`
			const storage = firebaseConfig.storageBucket
			const storageURL = `https://storage.googleapis.com/${storage}/`
			const imageURL = `${storageURL}images/`
			
			return {
				appURL: appURL,
				storageURL: storageURL,
				imageURL: imageURL
			}
		},
	
		GET_OFFICIAL: state => {
			// OTA MYÖHEMMIN KÄYTTÖÖN
			//if (!state.human, tms.) { return {} }
	
			let official = state.official
			let currentYear = new Date().getFullYear()
			let emailHost = official.emailDomain.toLowerCase().split(' ').join('')
			let info = {
				email: `${official.emailPrefix}@${emailHost}.${official.emailSuffix}`,
				watermark: `© ${currentYear} ${official.companyName}`,
				disclaimer: state.locale === 'en'
					? 'All rights reserved.'
					: 'Kaikki oikeudet pidätetään.',
				location: [{ // data structure googleMap component expects
					name: 'JH',
					position: {
						lat: official.latitude || 0,
						lng: official.longitude || 0
					}
				}]
			}
	
			Object.assign(info, official)
	
			return info
		}
	},
	
	mutations: {
		UPDATE_WINDOW: (state, updatedWindowObject) => {
			Vue.set(state, 'window', updatedWindowObject)
		}
	},

	actions: {
		UPDATE_WINDOW: ({ commit }, updatedWindowObject) => {
			commit('UPDATE_WINDOW', updatedWindowObject)
		}
	}
}
