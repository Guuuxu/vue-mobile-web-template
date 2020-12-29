const demo = [
  {
    path: '/home/pageOne',
    name: 'home.pageOne',
    component: () =>
      import(/* webpackChunkName: "pageOne" */ '@/views/PageOne'),
  },
  {
    path: '/home/pageTwo',
    name: 'home.pageTwo',
    component: () =>
      import(/* webpackChunkName: "pageTwo" */ '@/views/PageTwo'),
  },
  {
    path: '/home/pageThree',
    name: 'home.pageThree',
    component: () =>
      import(/* webpackChunkName: "pageThree" */ '@/views/PageThree'),
  },
  {
    path: '/home/pageFour',
    name: 'home.pageFour',
    component: () =>
      import(/* webpackChunkName: "pageFour" */ '@/views/PageFour'),
  },
];
export default demo;
