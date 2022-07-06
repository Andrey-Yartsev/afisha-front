<template>
  <div>
    <ErrorModal v-if="error"/>
    <ConfirmModal v-if="$store.state.modal.confirm.show" />
    <LoginModal v-if="$store.state.modal.login.show" />
    <AddEventModal v-if="$store.state.modal.addEvent.show" />
    <EditEventModal v-if="$store.state.modal.editEvent.show" />
  </div>
</template>

<script>
import ErrorModal from "./ErrorModal";
import ConfirmModal from "./ConfirmModal";
import LoginModal from "./LoginModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";

export default {
  name: "AllModals",
  components: {
    ErrorModal,
    ConfirmModal,
    LoginModal,
    AddEventModal,
    EditEventModal
  },
  computed: {
    error() {
      return this.$store.state.request.error;
    }
  }
}
</script>
