import router from "@/router/index";

export const navLinks = function() {
  let routes = router.options.routes;
  let filteredRoutes = [];

  routes.forEach(route => {
    if (route.meta && route.meta.navLink) {
      filteredRoutes.push({
        title: route.meta.navLinkTitle,
        to: route.name
      });
    }
  });

  return filteredRoutes;
};
