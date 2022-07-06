<template>
  <div class="modal is-active error-modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <div class="modal-card-body">
        {{ message }}
      </div>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="ok">OK</button>
        <button class="button" @click="close">Отмена</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorModal",
  props: {
    onOk: null
  },
  computed: {
    message() {
      return this.$store.state.modal.confirm.data.message;
    }
  },
  methods: {
    ok() {
      const onOk = this.$store.state.modal.confirm.data.onOk;
      if (onOk) {
        onOk();
      }
    },
    close() {
      this.$store.dispatch("modal/hide", "confirm");
    }
  }
}
</script>

