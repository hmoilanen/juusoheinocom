export const randomIntegerFromInterval = function (min, max) {
	// Random integer between two values (min and max are included)
  return Math.floor(Math.random() * (max - min + 1) + min)
}