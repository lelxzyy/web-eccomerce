import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },

    {
      path: "/product",
      name: "product",
      component: () => import("@/views/ProductView.vue"),
    },

    {
      path: "/product/:id",
      name: "product-detail",
      component: () => import("@/views/ProductDetailView.vue"),
    },

    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
    },

    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },

    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
    },

    {
      path: "/payment-success",
      name: "PaymentSuccess",
      component: () => import("@/views/PaymentSuccess.vue"),
    },
{
  path: "/profile",
  name: "profile",
  component: () => import("@/views/ProfileView.vue"),
},
    // 🔥 LOGIN
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },

    // 🔥 REGISTER
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
})

export default router
