import { forSnakeCaseHyphens } from '@/utils/regex'

export const intoKebabCase = function(snakeCaseString) {
  const regex = forSnakeCaseHyphens

  let convert =  function(matches){
    return matches[1].toUpperCase()
  }

  let camelCaseString = snakeCaseString.replace(regex, convert)

  return camelCaseString
}

export const getFileName = function(sourceString) {
  return sourceString.split('\\').pop().split('/').pop()
}