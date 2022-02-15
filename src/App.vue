<template>
  <div id="app">
    <AllModals />

    <nav id="navbar">
      <div class="container is-max-desktop">
        <router-link to="/" class="header-link">
          <span class="logo"></span>
          <span class="title is-1">nnhub.ru</span>
        </router-link>
        <a href="#" class="login" v-if="isAdmin" @click="logout">logout</a>
        <a href="#" class="login" @click.prevent="showLogin" v-else>login</a>
      </div>
    </nav>

    <div class="container is-max-desktop">
      <div class="bd">
        <router-view/>
      </div>
    </div>
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
        return this.$store.state.auth.authorized;
      }
    },
    methods: {
      showLogin() {
        this.$store.dispatch("modal/show", { name: "login" });
      },
      initAuth() {
        this.$store.dispatch("auth/init");
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
