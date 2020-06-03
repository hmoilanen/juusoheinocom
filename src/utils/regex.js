// Targets '-' and the first character after it
export const forSnakeCaseHyphens = /(\-\w)/g;

export const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isImage = /[\/.](gif|jpg|jpeg|tiff|png|svg)$/i;