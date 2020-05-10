import firebaseConfig from '@/api/firebase/firebaseConfig'

export default {
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
}

// Example:
// GETTER_NAME: (state, getters, rootState) => {}
// ...or as method-style access:
// GETTER_NAME: (state, getters, rootState) => (param) => {}
