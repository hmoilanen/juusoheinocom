// targets '-' and the first character after it
export const forSnakeCaseHyphens = /(\-\w)/g

// validates given email string (matches 99.99% of emails used today)
// see: https://www.regular-expressions.info/email.html
//export const forEmailValidation = \A[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z