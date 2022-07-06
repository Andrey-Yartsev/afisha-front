<template>
  <div class="modal is-active error-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Ошибка</p>
        <button class="delete" aria-label="close" @click.prevent="close"></button>
      </header>
      <div class="modal-card-body">
        {{ error.message || error }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ErrorModal",
    computed: {
      error() {
        return this.$store.state.request.error;
      }
    },
    methods: {
      close() {
        this.$store.dispatch("request/setError", null);
      }
    }
  }
</script>
