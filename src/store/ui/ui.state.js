 export default {
  baseDimension: 0.125, // rem
  breakpoints: [420, 768, 900], // default amount is 2, max 3 (if unique layout for super wide screen is provided)
  contentPaddingDefault: 16, // 16px / 1rem
  contentWidth: {
    max: 1100,
    medium: 900,
    paragraph: 460,
  },
  curtainDisplayed: true,
  //darkMode: false,
  footerHeight: 0,
  navTopDisplayed: true,
  navTopHeight: 60,
  //navLeftDisplayed: true,
  //navLeftWidth: 160,
  //navRightDisplayed: true,
  preventBodyScrolling: false,

  zIndex: {
    appCurtain: 100000,
    modalHandler: 10000,
    navTop: 1000,
    //contactLink: 100,
    contentHandler: 10,
    //errorHandler: 1000000,
    //navLeft: 1000,
    //navRight: 10,
  },

  window: { // SIIRRÄ MYÖHEMMIN ui.state:EN JOS TUNTUU SILTÄ!
    width: null, // window.offsetWidth
    height: null // window.offsetHeight
  }
}
