export default {
  baseDimension: 0.125, // rem
  breakpoints: [420, 768], // default 2, max 3 (if unique layout for super wide screen is provided)
  contentMaxWidth: 1200,
  contentMinPadding: 16, // 16px / 1rem
  //curtainDisplayed: true,
  //darkMode: false,
  //navTopDisplayed: true,
  navTopHeight: 70,
  //navLeftDisplayed: true,
  //navLeftWidth: 250,
  //navRightDisplayed: true,
  preventBodyScrolling: false,

  zIndex: {
    appCurtain: 10000000,
    errorHandler: 1000000,
    modalHandler: 100000,
    contentHandler: 10000,
    navLeft: 1000,
    navTop: 100,
    //navRight: 10,
  }
}
