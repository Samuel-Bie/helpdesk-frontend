import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/Home.vue";
import LoginPage from "../pages/Login.vue";

import TicketPage from "../pages/Ticket.vue";
import TicketDetails from "../pages/TicketDetails.vue";

import TicketIndex from "../pages/Ticket/Index.vue";

import useUserStore from "../store/user";

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/tickets",
    beforeEnter: (to, from, next) => {
      // Install the user store
      const userStore = useUserStore();
      // Redirect if user is not authenticated
      if (userStore.userIsAuth === false) {
        return next("/login");
      }
      // Allow route entry if user is authenticated
      return next();
    },
    children: [
      {
        path: "/tickets",
        component: TicketIndex,
        beforeEnter: (to, from, next) => {
          // Install the user store
          const userStore = useUserStore();
          // Redirect if user is not authenticated
          if (userStore.userIsAuth === false) {
            return next("/login");
          }
          // Allow route entry if user is authenticated
          return next();
        },
      },

      {
        path: "/ticket/create",
        component: TicketPage,
        beforeEnter: (to, from, next) => {
          // Install the user store
          const userStore = useUserStore();
          // Redirect if user is not authenticated
          if (userStore.userIsAuth === false) {
            return next("/login");
          }
          // Allow route entry if user is authenticated
          return next();
        },
      },
      {
        path: "/ticket/:id",
        component: TicketDetails,
        beforeEnter: (to, from, next) => {
          // Install the user store
          const userStore = useUserStore();
          // Redirect if user is not authenticated
          if (userStore.userIsAuth === false) {
            return next("/login");
          }
          // Allow route entry if user is authenticated
          return next();
        },
      },

      {
        path: "/ticket/create",
        component: TicketPage,
        beforeEnter: (to, from, next) => {
          // Install the user store
          const userStore = useUserStore();
          // Redirect if user is not authenticated
          if (userStore.userIsAuth === false) {
            return next("/login");
          }
          // Allow route entry if user is authenticated
          return next();
        },
      },
    ],
  },

  {
    path: "/login",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      // Install the user store
      const userStore = useUserStore();
      // Redirect if user is authenticated
      if (userStore.userIsAuth === true) {
        return next("/");
      }
      // Allow route entry if user is not authenticated
      return next();
    },
  },
];

const router = createRouter({
  scrollBehavior: function () {
    return { x: 0, y: 0 };
  },
  history: createWebHistory(),
  routes,
});

export default router;
