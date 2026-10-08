import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "StepOne",
        component: () => import("../pages/StepOne.vue"),
        meta: { title: "Голосование — 1 этап" },
      },
      {
        path: "/step-two",
        name: "StepTwo",
        component: () => import("../pages/StepTwo.vue"),
        meta: { title: "Голосование — 2 этап" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  return true;
});

export default router;
