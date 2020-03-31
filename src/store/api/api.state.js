export default {
  //serverURL: 'https://espotapi.appspot.com',
  appURL: process.env.NODE_ENV === 'production'
    ? 'https://google.com'
    : `${window.location.protocol}//${window.location.host}`,
  //avatars: '',
  //bg: '',
  //content: '',
  //icons: ''
}
