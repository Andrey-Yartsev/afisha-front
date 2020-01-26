<template>
  <div>
    <ErrorModal v-if="error" />
  </div>
</template>

<script>
  import ErrorModal from "./ErrorModal";

  export default {
    name: "AllModals",
    components: {
      ErrorModal
    },
    computed: {
      error() {
        this.$store.state.request.error
      }
    }
  }
</script>