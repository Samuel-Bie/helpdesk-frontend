import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/Home.vue";
import LoginPage from "@/pages/Login.vue";

import TicketPage from "@/pages/Ticket.vue";
import TicketDetails from "@/pages/TicketDetails.vue";

import TicketIndex from "@/pages/Ticket/Index.vue";
import TicketCreate from "@/pages/Ticket/Create.vue";
import TicketShow from "@/pages/Ticket/Show.vue";

import useUserStore from "@/store/user";

const routes = [
  {
    path: "/",
    component: HomePage,
    redirect: "/tickets",

    meta: {
      middleware: "auth",
    },

    children: [
      {
        path: "/tickets",
        name:'tickets.index',
        component: TicketIndex,
        meta: {
          middleware: "auth",
        },

      },

      {
        path: "/tickets/create",
        name:'tickets.create',
        component: TicketCreate,
        meta: {
          middleware: "auth",
        },

      },
      {
        path: "/tickets/:id",
        name:'tickets.show',
        component: TicketShow,
        meta: {
          middleware: "auth",
        },
        props: true
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

router.beforeEach((to, from, next) => {
  if (to.meta?.middleware) {
    if (to.meta?.middleware === "auth") {
      // Install the user store
      const userStore = useUserStore();
      // Redirect if user is not authenticated
      if (userStore.userIsAuth === false) {
        return next("/login");
      }
      // Allow route entry if user is authenticated
      return next();
    } else return next();
  } else return next();
});

export default router;
