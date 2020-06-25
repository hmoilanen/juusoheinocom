export const copyToClipboard = function(id) {
  // Copy text content of html input or textarea element to clipboard (works only with those).
  // Easy way to customize is to add additional input element with attribute type="hidden"
  // and use some other element for display.
  // Note: There is a js-package for easy copying to clipboard (clipboard.js) -> check for more flexibility.

  let toCopyFrom = document.getElementById(id)
  let hidden = false

  if (toCopyFrom.getAttribute('type') === 'hidden') {
    toCopyFrom.setAttribute('type', 'text')
    hidden = true
  }

  toCopyFrom.select()
  document.execCommand('copy')

  if (hidden) { toCopyFrom.setAttribute('type', 'hidden') }
}

export const scrollToTop = function() {
  // For scrolling window back to top position.

  let scrollDuration = 500
  let cosParameter = window.scrollY / 2
  let scrollCount = 0
  let oldTimestamp = performance.now()

  function step(newTimestamp) {
    scrollCount +=
      Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
    if (scrollCount >= Math.PI) window.scrollTo(0, 0)
    if (window.scrollY === 0) return
    window.scrollTo(
      0,
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    )
    oldTimestamp = newTimestamp
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)

  /*
  See: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery

  Explanations:
  - pi is the length/end point of the cosinus intervall (see above)
  - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
    (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  - newTimestamp - oldTimestamp equals the duration

    a * cos (bx + c) + d                      | c translates along the x axis = 0
  = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
  = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
  = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
  = cosParameter + cosParameter * (cos scrollCount * x)
  */
}