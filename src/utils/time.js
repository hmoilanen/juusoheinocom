export const genericTimeStamp = function() {
  // Use to create generic timestamp not only in JavaSript but with any language (eg. PHP)
  // Must-have requirements:
  // Stores a complete date and time, providing all the raw information we need to create any other format.
  // Can be used as the input for creating and converting dates — eg. must be compatible with the timestamp argument to JavaScript’s new Date constructor.
  // Always uses the same, fixed timezone, to provide a frame of reference for comparison.
  // Nice-to-have requirements:
  // Format is natively sortable without additional conversion (ie. if used as a filename, would create a chronological sort-order).
  // Has no internal whitespace.
  // Provides at least some level of human-readability.
  // Gives at least some ‘free’ information (ie. values such as the year or the hour being easily obtained by string parsing, without having to create and parse new date objects every time).
  // Converting back to 'basic' format: const rfcDate = new Date(genericTimeStamp())
  const dateobj = new Date()

  dateobj.setTime(dateobj.getTime() + (dateobj.getTimezoneOffset() * 60000))
  
  const datetime = {
    date: [
      dateobj.getFullYear(),    
      dateobj.getMonth() + 1,    
      dateobj.getDate()
    ],
    time: [
      dateobj.getHours(),        
      dateobj.getMinutes(),        
      dateobj.getSeconds()
    ]
  } 
  
  for (let key in datetime) {
    if (!datetime.hasOwnProperty(key)) { continue }  
    
    for(var i in datetime[key]) {
      if (!datetime[key].hasOwnProperty(i)) { continue }
          
      let n = datetime[key][i]
      datetime[key][i] = (n < 10 ? '0' : '') + n 
    }
  }
  
  return datetime.date.join('-') + 'T' + datetime.time.join(':') + 'Z'
}

export const timeSinceAsString = (dateIsoFormat) => {
  // Use to convert timestamp to string of 'x time passed'.
  // Calculate seconds first, then try to round up further.
  const sinceSeconds = Math.floor((new Date().getTime() - new Date(dateIsoFormat).getTime()) / 1000, 0)
  const sinceMinutes = Math.floor(sinceSeconds / 60)
  const sinceHours = Math.floor(sinceSeconds / 3600)
  const sinceDays = Math.floor(sinceSeconds / 86400)
  const sinceWeeks = Math.floor(sinceSeconds / 604800)
  const sinceMonths = Math.floor(sinceSeconds / 2629800)
  const sinceYears = Math.floor(sinceSeconds / 31557600)
  let timeSince

  // Check which ones of the above exist and return the relevant one in plural if needed.
  if (sinceYears) { timeSince = `${sinceYears}y` }
  else if (sinceMonths) { timeSince = `${sinceMonths}m` }
  else if (sinceWeeks) { timeSince = `${sinceWeeks}w` }
  else if (sinceDays) { timeSince = `${sinceDays}d` }
  else if (sinceHours) { timeSince = `${sinceHours}h` }
  else if (sinceMinutes) { timeSince = `${sinceMinutes}min` }
  else { timeSince = `now` }

  return timeSince
}
