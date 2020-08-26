/* const parseFirebaseData = (snapshot, asArray) => {
  let parsed = asArray ? [] : {}

  snapshot.forEach(doc => {
    if (asArray) {
      parsed.push(doc.data())
    } else {
      parsed[doc.id] = doc.data()
    }
  })

  return parsed
}

export default {
  parseFirebaseData
} */