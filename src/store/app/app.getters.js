export default {
  GET_OFFICIAL: state => {
    let official = state.official
    let currentYear = new Date().getFullYear()
    let emailHost = official.appName.toLowerCase().split(' ').join('')
    let info = {
      email: `${official.emailPrefix}@${emailHost}.${official.emailSuffix}`,
      watermark: `© ${currentYear} ${official.companyName}`,
      location: [{ // data structure googleMap component expects
        name: 'OSB',
        position: {
          lat: official.latitude,
          lng: official.longitude
        }
      }]
    }

    Object.assign(info, official)

    return info
  },

  GET_BREAKPOINT: state => {
    const windowWidth = state.window.width
    const breakpoints = state.ui.breakpoints
    const classes = ['s', 'm', 'l', 'xl']
    let current = 'm'

    for (let i = 0; i <= breakpoints.length - 1; i++) {
      if (windowWidth < breakpoints[i]) {
        current = classes[i]
        break
      } else if (i === breakpoints.length - 1 && windowWidth >= breakpoints[i]) {
        current = classes[breakpoints.length]
      }
    }
    
    return current
  }
}

// Example:
// GETTER_NAME: (state, getters) => {}
// ...or as method-style access:
// GETTER_NAME: (state, getters) => (param) => {}
