//import store from '@/store/index'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
      navLink: true,
      navLinkTitle: 'Home',
      navLinkTitleFi: 'Etusivu',
      displayFooter: true
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact'),
    meta: {
      navLink: true,
      navLinkTitle: 'Contact',
      navLinkTitleFi: 'Ota yhteyttä',
      displayFooter: true
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/Projects'),
    meta: {
      navLink: true,
      navLinkTitle: 'Projects',
      navLinkTitleFi: 'Projektit',
      displayFooter: true
    },
    children: [
      {
        path: ':id',
        name: 'project',
        component: () => import('@/components/projectsProject'),
        /* meta: {
          preventBodyScrolling: true
        } */
      }
    ]
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/Gallery'),
    meta: {
      navLink: true,
      navLinkTitle: 'Gallery',
      navLinkTitleFi: 'Galleria'
    }
  },
  {
    path: '/testing',
    name: 'testing',
    component: () => import('@/views/Testing'),
    meta: {
      navLinkTitle: 'Testing',
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
        // NOTE2: to make aforementioned work remove empty space between '*' and '/' (added for commenting out the whole block of code to work)
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
