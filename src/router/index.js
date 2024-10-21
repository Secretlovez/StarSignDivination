import { createRouter, createWebHashHistory } from 'vue-router';

export const baseRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/home/index'),
  },
];
export const errorRoutes = [
  {
    path: '/:catchAll(.*)',
    name: 'errorRouter',
    redirect: '/404',
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: baseRoutes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});

export const resetRouter = () => {
  const currentRouter = router.getRoutes();
  currentRouter.forEach((item) => {
    if (item.path && item.name && baseRoutes.findIndex((val) => val.path === item.path) === -1) {
      router.removeRoute(item.name);
    }
  });
};

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
