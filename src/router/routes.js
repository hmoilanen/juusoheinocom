export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home'),
    meta: {
			title: 'Front',
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
			title: 'Contact me',
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
			title: 'Projects',
      navLink: true,
      navLinkTitle: 'Projects',
      navLinkTitleFi: 'Projektit',
      displayFooter: true
    },
    children: [
      {
        path: ':id',
        name: 'project',
        component: () => import('@/components/ProjectsProject'),
        meta: {
					title: 'Project',
          preventBodyScrolling: true
        }
      }
    ]
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/Gallery'),
    meta: {
			title: 'Gallery',
      navLink: true,
      navLinkTitle: 'Gallery',
      navLinkTitleFi: 'Galleria'
    }
  },
  {
    path: '/404',
    name: 'error',
		component: () => import('@/views/Error'),
		meta: {
			title: '404',
			displayFooter: true
		}
  },
  {
    path: '*',
    redirect: '/404'
  }
]
