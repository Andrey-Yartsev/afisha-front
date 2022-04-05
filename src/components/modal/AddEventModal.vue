<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Новое событие</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="text"></textarea>
          </div>
        </div>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Добавить</button>
        <button class="button" @click="close">Отмена</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditEventModal",
  data() {
    return {
      text: "",
      error: ""
    };
  },
  methods: {
    close() {
      this.$store.dispatch("modal/hide", "editEvent");
    }
  },
  mounted() {
    const id = this.$store.state.modal.editEvent.data.id;
    const item = this.$store.state.afisha.fetchResult.find(v => v.id === id);
    this.text = item.text;
  }
}
</script>
