import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "../views/DashboardView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MachinesView from "../views/MachinesView.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { storeToRefs } from "pinia";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
      meta: { auth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { auth: false },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { auth: false },
    },
    {
      path: "/Machines",
      name: "machines",
      component: MachinesView,
      meta: { auth: true },
    },
    {
      path: "/alarms",
      name: "alarms",
      meta: { auth: true },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AlarmsView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  if (to.meta.auth && !isAuthenticated.value) {
    next("/login");
  } else if (!to.meta.auth && isAuthenticated.value) {
    next("/");
  } else {
    next();
  }
});

export default router;
