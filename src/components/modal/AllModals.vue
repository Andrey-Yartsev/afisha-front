<template>
  <div>
    <ErrorModal v-if="error"/>
    <LoginModal v-if="$store.state.modal.login.show" />
  </div>
</template>

<script>
import ErrorModal from "./ErrorModal";
import LoginModal from "./LoginModal";

export default {
  name: "AllModals",
  components: {
    ErrorModal,
    LoginModal
  },
  computed: {
    error() {
      return this.$store.state.request.error;
    }
  }
}
</script>
