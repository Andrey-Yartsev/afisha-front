<template>
  <div>
    <ErrorModal v-if="error"/>
    <LoginModal v-if="$store.state.modal.login.show" />
    <EditEventModal v-if="$store.state.modal.editEvent.show" />
  </div>
</template>

<script>
import ErrorModal from "./ErrorModal";
import LoginModal from "./LoginModal";
import EditEventModal from "./EditEventModal";

export default {
  name: "AllModals",
  components: {
    ErrorModal,
    LoginModal,
    EditEventModal
  },
  computed: {
    error() {
      return this.$store.state.request.error;
    }
  }
}
</script>
