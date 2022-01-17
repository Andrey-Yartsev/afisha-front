<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        {{ error }}
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</template>

<script>
  export default {
    name: "ErrorModal",
    computed: {
      error() {
        return this.$store.state.request.error;
      }
    }
  }
</script>
