import router from '@/router/index';
import store from '@/store/index';
import { upperCaseFirstLetter } from '@/utils/strings';

export const navLinks = function() {
  let routes = router.options.routes;
  let filteredRoutes = [];

  routes.forEach(route => {    
    if (route.meta && route.meta.navLink) {
      //let locale = App.locale()
      let locale = store.state.app.locale;
      
      filteredRoutes.push({
        title: locale !== 'en'
          ? route.meta['navLinkTitle' + upperCaseFirstLetter(locale)]
          : route.meta.navLinkTitle,
        path: route.path,
        name: route.name
      });
    };
  });

  return filteredRoutes;
};
