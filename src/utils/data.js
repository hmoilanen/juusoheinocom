export const dataType = function(data) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return 'object'
  } else if (Array.isArray(data)) {
    return 'array'
  } else if (Object.prototype.toString.call(data) === '[object Function]') {
    return 'function'
  } else if (typeof data === 'boolean') {
    return 'boolean'
  } else if (!data && data !== '' && data !== 0) {
    return data
  } else {
    return typeof data
  }
}