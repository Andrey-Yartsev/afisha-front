<template>
  <div id="app">
    <AllModals />

    <nav id="navbar">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <h2 class="title is-1">nnhub.ru</h2>
          </router-link>
        </div>
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
