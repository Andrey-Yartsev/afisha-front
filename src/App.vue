<template>
  <div id="app" class="">
    <nav id="navbar">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            AFISHA NN
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
  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import 'styles';
</style>
