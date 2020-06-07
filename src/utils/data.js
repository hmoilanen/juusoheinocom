export const dataType = function(data) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return 'object'
  } else if (Array.isArray(data)) {
    return 'array'
  } else if (Object.prototype.toString.call(data) === '[object Function]') {
    return 'function'
  } else if (typeof data === 'boolean') {
    return typeof data
  } else if (!data && data !== '' && data !== 0) { // null / undefined / NaN
    return data
  } else {
    return typeof data
  }
}

export const dynamicDataStructure = function(baseObject, keys, value) {
  // Create dynamic data structure inside of object from array of keys.
  // If value is given, remove the last key for later.
  let lastKey = value ? keys.pop() : false
  
  // Create the object structure using empty objects where neccessary.
  for (let i = 0; i < keys.length; i++) {
    baseObject = baseObject[keys[i]] = baseObject[keys[i]] || {}
  }

  // If value is given, set it.
  if (lastKey) {
    baseObject = baseObject[lastKey] = value
  }

  return baseObject
}