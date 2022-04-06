<template>
  <div id="app">
    <AllModals/>
    <nav id="navbar">
      <div class="container is-max-desktop">
        <router-link to="/" class="header-link">
          <span class="logo"></span>
          <span class="title is-1">nnhub.ru</span>
        </router-link>
        <template v-if="vkLoginLoading">
          <span class="login" v-if="user">
            <span>{{ user.displayName }}</span>
            <a href="#" @click.prevent="logout">logout</a>
          </span>
          <a href="#" class="login" v-else @click.prevent="vkLogin">VK login</a>
        </template>
      </div>
    </nav>
    <div class="container is-max-desktop">
      <div class="bd">
        <router-view/>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <a href="#" class="login" v-if="isAdmin" @click="logout">admin logout</a>
          <a href="#" class="login" v-else @click.prevent="showLogin">admin login</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import AllModals from "@/components/modal/AllModals";

export default {
  name: 'app',
  components: {
    AllModals
  },
  computed: {
    isAdmin() {
      return this.$store.state.adminAuth.authorized;
    },
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    showLogin() {
      this.$store.dispatch("modal/show", {name: "login"});
    },
    initAuth() {
      this.$store.dispatch("adminAuth/init");
      this.$store.dispatch("auth/init");
    },
    adminLogout() {
      this.$store.dispatch("adminAuth/logout");
    },
    vkLogin() {
      window.location = process.env.VUE_APP_API_URL + "/auth/vkontakte";
    },
    vkLoginLoading() {
      return this.$store.state.auth.authLoading;
    },
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  created() {
    this.initAuth();
  }
}
</script>

<style lang="scss">
@import 'styles';
</style>
