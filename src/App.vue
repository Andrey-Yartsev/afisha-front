<template>
  <div id="app">
    <AllModals />

    <nav id="navbar">
      <div class="container">
        <router-link to="/" class="header-link">
          <span class="logo"></span>
          <span class="title is-1">nnhub.ru</span>
        </router-link>
      </div>
    </nav>

    <div class="container">
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
    }
  }
</script>

<style lang="scss">
  @import 'styles';
</style>
