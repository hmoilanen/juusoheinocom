import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
//import store from '@/store/index'
//import axios from 'axios'

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  // Scroll behaviour
  // See: https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// GLOBAL ROUTE GUARDS
//router.beforeEach((to, from, next) => {})
//router.beforeResolve(async (to, from, next) => {})
//router.afterEach((to, from) => {})

export default router;
