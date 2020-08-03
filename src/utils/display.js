export const onScreen = (element, fully = false) => {
	// Note: passed element must be provided by el.getBoundingClientRect()
	// If fully on screen:
	if (fully) {
		return element.top >= 0 && element.bottom <= (window.innerHeight || document.documentElement.clientHeight)
	} else { // If on screen at least by some parts:
		return element.top > -window.innerHeight && element.top < window.innerHeight
	}
}