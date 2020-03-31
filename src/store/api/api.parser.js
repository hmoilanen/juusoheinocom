const parser = dataObject => {
  if (!dataObject || typeof dataObject === 'undefined') {
    return null
  } else if (dataObject instanceof Array && dataObject.length === 0) {
    return null
  }

  // const parsedDataObject = { ... }

  // return parsedDataObject
}

export default {
  parser
}
