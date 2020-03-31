// To be added:
// -get random number
// -set default min and max values
// -optionally input min and max values as attributes
// -MUITA?

// Random integer between two values
export const randomIntegerFromInterval = function (min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}