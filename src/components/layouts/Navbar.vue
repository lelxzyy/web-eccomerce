<template>
  <header
    :class="[
      'fixed top-3 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-in-out',
      showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
    ]"
    class="w-[95%] max-w-4xl rounded-2xl border border-[#2B124C] bg-[#190019] shadow-lg backdrop-blur-xl"
  >
   <div class="relative flex items-center justify-between px-3 py-2">
  <!-- Logo -->
  <router-link
    to="/"
    class="z-10 flex items-center gap-2 rounded-full bg-[#FBE4D8] px-3 py-1.5 transition hover:scale-[1.02]"
  >
    <!-- Logo Image -->
    <img
      src="@/assets/logo.png"
      alt="Logo"
      class="h-8 w-8 object-contain"
    />

    <!-- Text -->
    <span class="text-[15px] font-bold text-[#190019]">
      Lelxzyy.shop
    </span>
  </router-link>

      <!-- Menu -->
      <nav
        class="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex"
      >
        <router-link
          to="/"
          class="text-[15px] font-semibold text-[#FBE4D8] transition hover:text-[#DFB6B2]"
          active-class="text-white"
        >
          Home
        </router-link>

        <router-link
          to="/product"
          class="text-[15px] font-semibold text-[#FBE4D8] transition hover:text-[#DFB6B2]"
          active-class="text-white"
        >
          Product
        </router-link>

        <router-link
          to="/contact"
          class="text-[15px] font-semibold text-[#FBE4D8] transition hover:text-[#DFB6B2]"
          active-class="text-white"
        >
          Contact
        </router-link>
      </nav>

      <!-- Right Side -->
      <div class="z-10 flex items-center gap-2">
        <!-- Cart -->
        <button
          @click="goToCart"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBE4D8] transition hover:bg-[#DFB6B2]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-[#190019]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m0 0h12m-12 0a2 2 0 104 0m8 0a2 2 0 104 0"
            />
          </svg>
        </button>

        <!-- Profile -->
        <button
          @click="goToProfile"
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#FBE4D8] transition hover:bg-[#DFB6B2]"
        >
          <!-- Foto -->
          <img
            v-if="user && user.photo"
            :src="`${API_URL}/storage/${user.photo}`"
            class="h-full w-full object-cover"
          />

          <!-- Initial -->
          <span
            v-else-if="user"
            class="text-sm font-bold text-[#190019]"
          >
            {{ user.name.charAt(0).toUpperCase() }}
          </span>

          <!-- Default -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-[#190019]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showNavbar: true,
      lastScrollY: 0,
      user: null,
      API_URL: "http://127.0.0.1:8000",
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll)

    // update navbar otomatis
    window.addEventListener(
      "user-updated",
      this.loadUser
    )

    this.loadUser()
  },

  beforeUnmount() {
    window.removeEventListener(
      "scroll",
      this.handleScroll
    )

    window.removeEventListener(
      "user-updated",
      this.loadUser
    )
  },

  methods: {
    loadUser() {
      const savedUser =
        localStorage.getItem("user")

      if (savedUser) {
        this.user = JSON.parse(savedUser)
      } else {
        this.user = null
      }
    },

    isLogin() {
      return !!localStorage.getItem(
        "token"
      )
    },

    goToProfile() {
      if (!this.isLogin()) {
        this.$router.push("/login")
      } else {
        this.loadUser()
        this.$router.push("/profile")
      }
    },

    goToCart() {
      if (!this.isLogin()) {
        this.$router.push("/login")
      } else {
        this.$router.push("/cart")
      }
    },

    handleScroll() {
      const currentScrollY =
        window.scrollY

      if (
        currentScrollY >
          this.lastScrollY &&
        currentScrollY > 80
      ) {
        this.showNavbar = false
      } else {
        this.showNavbar = true
      }

      this.lastScrollY = currentScrollY
    },
  },
}
</script>
