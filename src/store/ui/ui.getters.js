export default {
  GET_BREAKPOINTS: state => {
    const windowWidth = state.window.width
    const breakpoints = state.breakpoints
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
// GETTER_NAME: (state, getters, rootState) => {}
// ...or as method-style access:
// GETTER_NAME: (state, getters, rootState) => (param) => {}
