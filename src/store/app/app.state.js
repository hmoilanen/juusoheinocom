export default {
  //isLoading: true,
  //bigDataLoaded: false,
  //localization: 'en', // 'en' / 'fi'
  window: {
    width: null,
    height: null
    //offsetY: null // TARVIIKO OLLENKAAN?! (<base-bg>:n parallax tökki vähän storen kautta tuotaessa)
  },
  ui: {
    preventBodyScrolling: false,
    breakpoints: [420, 768], // default 2, max 3 (if unique layout for super wide screen is provided)
    darkMode: false,
    navTopHeight: 70,
    //navTopDisplayed: true,
    navLeftWidth: 250,
    navLeftDisplayed: false,
    contentMaxWidth: 600,
    contentPadding: 16, // 16px = 1rem
    baseDimension: 0.125, // (rem)
    zIndex: {
      //appLoader: 10000000, // = 'starting screen'
      errorHandler: 1000000,
      modalHandler: 100000,
      contentHandler: 10000,
      //navLeft: 1000,
      navTop: 100,
      //navRight: 10,
    }
  },
  styleSet: { // for project related styling of base components (0 = default)
    baseButton: 0,
    baseDivider: 0,
    baseDropdown: 0,
    baseInput: 0,
    baseLink: 0,
    baseLoader: 0,
    baseSelect: 0,
    baseText: 0,
    baseTextarea: 0,
    baseTitle: 0,
  },
  
  // HUOM! PITÄISIKÖ MIXINIEN SIZE CATEGORIESE MYÖS TUODA KOOTUSTI TÄNNE

  externalApps: [
    //{ title: 'Discord', icon: 'discord', link: '' },
    //{ title: 'Facebook', icon: 'facebook', link: '' },
    //{ title: 'Instagram', icon: 'instagram', link: '' },
    //{ title: 'Mixer', icon: 'mixer', link: '' },
    //{ title: 'Twitch', icon: 'twitch', link: '' },
    //{ title: 'Twitter', icon: 'twitter', link: '' },
    //{ title: 'Youtube', icon: 'youtube', link: '' },
    //{ title: 'LinkedIn', icon: 'linkedin', link: '' }
  ],
  official: {
    appName: 'AppName',
    companyName: 'CompanyName',
    emailPrefix: 'info',
    emailSuffix: 'com',
    phone: '+358 13 666 420',
    address: 'Dummy Address 1',
    latitude: 0, // for maps
    longitude: 0,
    //tosUpdated: '',
    //ppUpdated: '',
    //cpUpdated: '',
    //apUpdated: '',
    //tos: ``,
    //pp: ``,
    //cp: ``,
    //ap: ``
  },
  errors: [
    //{ type: 404, id: 1, text: '404 - page not found' }
  ]
}
