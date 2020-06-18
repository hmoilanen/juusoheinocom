export default {
  apptests: { //POISTUU!!
    a: 1,
    b: 2,
    d: 666,
    object: {},
    object2: { a: 1 },
    array: [],
    array2: ['a'],
    string: '',
    string2: 'a',
    number: 0,
    boolean: true,
    null: null
  },

  domain: 'https://juusoheino.com',
  //googleMapsAPIKey: 'AIzaSyCVrXF_Jh-nfPCeMYgYTkIPl3aP0o9HOyw', //-> TEE TÄSTÄ ENV_VAR JA KÄYTÄ index.html:SSÄ!!!
  //isLogged: true, //KUN SRRETTY POIS auth.state:STA
  isLoading: true,
  locale: 'en',

  externals: [
    { title: 'Github', icon: 'github', link: 'https://github.com/' }, //HUOM! PÄIVITÄ LINKKI KUN TILI LUOTU
    { title: 'LinkdIn', icon: 'linkedin', link: 'https://www.linkedin.com/in/heinojuuso/' },
    { title: 'Constlet', icon: 'constlet', link: 'https://constlet.com' }
  ],

  official: {
    appName: 'juusoheino.com',
    companyName: 'Juuso Heino',
    emailPrefix: 'mail',
    emailDomain: 'juusoheino',
    emailSuffix: 'com',
    //phone: '+358 44 123 4567',
    //address: 'Dummy Address 1',
    //latitude: 0, // for maps
    //longitude: 0,
  },
}
