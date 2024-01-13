import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:locationID",
      name: "cityView",
      component: () => import("@/views/CityView.vue"),
      meta: {
        title: "CityView",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.query.cityName ? to.query.cityName : to.meta.title} | The Local Weather`;
  next();
});

export default router;
