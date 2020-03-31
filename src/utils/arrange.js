export const compareObjectsValues = function(key, order = 'asc') {
  return function (a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) { // in case property doesn't exist on either object
      return 0
    }

    const variableA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const variableB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]

    let comparison = 0
    if (variableA > variableB) {
      comparison = 1
    } else if (variableA < variableB) {
      comparison = -1
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    )
  }
}

export const sortArrayOfObjectsByKey = function(array, key) {
  let copyOfArray = array.slice() // to avoid mutating source data
  return copyOfArray.sort(compareObjectsValues(key))
}