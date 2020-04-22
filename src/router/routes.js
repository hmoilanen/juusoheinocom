//import store from '@/store/index'

export default [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home"),
    meta: {
      navLink: true,
      navLinkTitle: "Home",
      displayFooter: true
    }
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact"),
    meta: {
      navLink: true,
      navLinkTitle: "Contact",
      displayFooter: true
    }
  },
  {
    path: "/travels",
    name: "travels",
    component: () => import("@/views/Travels"),
    meta: {
      navLink: true,
      navLinkTitle: "Travels",
      displayFooter: true
    }
  },
  {
    path: '/404',
    name: 'error',
    component: () => import('@/views/Error'),
  },
  {
    path: '*',
    redirect: '/404'
  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  // Examples:

  // GENERIC ROUTES
  // { path: '/example-*', ... } // Will match anything starting with `/example-`

  // ROUTE
  /* {
    path: '/example',
    name: 'example',
    component: () => import('@/views/Example'),
    props: true,
    meta: {
      requiresAuth: true
    },
    beforeEnter: (to, from, next) => {}
  }, */

  // ROUTE WITH SUB / CHILD ROUTES
  /* {
    path: '/example',
    name: 'example',
    component: () => import('@/views/Example'),
    children: [
      {
        path: 'sub1',
        name: 'exampleFront',
        component: () => import(/* webpackChunkName: 'exampleSubs' * / '@/components/exampleSub1')
        // NOTE: generates a separate chunk (example.[hash].js) which is lazy-loaded when the route is visited
        // NOTE2: to make aforementioned work remove empty space between '*' and '/' (added for commenting out the whole block of code)
      },
      {
        path: 'sub2',
        name: 'exampleTab',
        component: () => import(/* webpackChunkName: 'exampleSubs' * / '@/components/exampleSub2')
        NOTE: to make aforementioned work remove empty space between '*' and '/'
      }
    ]
  } */

  // ...OR IF CHILD ROUTE IS USED AS ROUTE'S 'FRONT' COMPONENT INSTEAD OF PARENT
  /* {
    path: '/example/:id',
    // NOTE: no name for route if child is used as route front component
    component: () => import('@/views/Example'),
    children: [
      {
        path: '',
        name: 'exampleFront',
        component: () => import('@/components/exampleFront')
      },
      {
        path: 'tab',
        name: 'exampleTab',
        component: () => import('@/components/exampleTab')
      }
    ]
  } */
];
