import { forSnakeCaseHyphens } from '@/utils/regex'

const upperCaseFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const intoKebabCase = function(snakeCaseString) {
  const regex = forSnakeCaseHyphens;
  let convert =  function(matches) {
    return matches[1].toUpperCase()
  };
  let camelCaseString = snakeCaseString.replace(regex, convert);

  return camelCaseString;
}

const camelToKebab = function(camelCaseString) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const getFileName = function(sourceString) {
  return sourceString.split('\\').pop().split('/').pop();
}

const randomString = function(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export {
	upperCaseFirstLetter,
	intoKebabCase,
	camelToKebab,
	getFileName,
	randomString
}