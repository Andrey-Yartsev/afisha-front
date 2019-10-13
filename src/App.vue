<template>
  <div id="app" class="">

    <nav id="navbar" class="bd-navbar navbar has-shadow is-spaced">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png"
                 alt="Bulma: Free, open source, &amp; modern CSS framework based on Flexbox" width="112" height="28">
          </a>
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
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import 'styles';
</style>
