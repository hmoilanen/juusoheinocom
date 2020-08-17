import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  // Scroll behaviour
  // See: https://router.vuejs.org/guide/advanced/scroll-behavior.html
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
	console.log(to);
	const inner = store.state.app.official.appName
	const separator = '|'
	const complement = to.meta && to.meta.title
		? to.meta.title
		: null
	
	if (complement) {
		document.title = `${complement} ${separator} ${inner}`
	} else {
		document.title = inner
	}
	next()
})

/* created() {
	const title = document.title
	console.log('title-contact', title);

	document.title = this.$route.meta.title
}, */

// GLOBAL ROUTE GUARDS
//router.beforeEach((to, from, next) => {})
//router.beforeResolve(async (to, from, next) => {})
//router.afterEach((to, from) => {})

export default router
