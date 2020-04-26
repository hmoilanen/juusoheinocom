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