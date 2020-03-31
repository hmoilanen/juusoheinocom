export const timeSinceAsString = (dateIsoFormat) => {
  // calculate seconds first, then try and round up further
  const sinceSeconds = Math.floor((new Date().getTime() - new Date(dateIsoFormat).getTime()) / 1000, 0)
  const sinceMinutes = Math.floor(sinceSeconds / 60)
  const sinceHours = Math.floor(sinceSeconds / 3600)
  const sinceDays = Math.floor(sinceSeconds / 86400)
  const sinceWeeks = Math.floor(sinceSeconds / 604800)
  const sinceMonths = Math.floor(sinceSeconds / 2629800)
  const sinceYears = Math.floor(sinceSeconds / 31557600)

  // check which ones of the above exist and return the relevant one in pluar if need be
  let timeSince
  if (sinceYears) {
    timeSince = `${sinceYears}y`
  } else if (sinceMonths) {
    timeSince = `${sinceMonths}m`
  } else if (sinceWeeks) {
    timeSince = `${sinceWeeks}w`
  } else if (sinceDays) {
    timeSince = `${sinceDays}d`
  } else if (sinceHours) {
    timeSince = `${sinceHours}h`
  } else if (sinceMinutes) {
    timeSince = `${sinceMinutes}min`
  } else {
    timeSince = `now`
  }

  return timeSince
}
