<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card modal-event">
      <header class="modal-card-head">
        <p class="modal-card-title">Новое событие</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <quill-editor v-model="text" :options="quillOptions"/>
          </div>
        </div>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="create">Добавить</button>
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
  computed: {
    quillOptions() {
      return {
        modules: {
          toolbar: [['bold'], [/*'link', 'image'*/]]
        }
      };
    }
  },
  methods: {
    close() {
      this.$store.dispatch("modal/hide", "addEvent");
    },
    async create() {
      await this.$store.dispatch("afisha/createEvent", {
        data: {
          text: this.text
        }
      });
      this.close();
    }
  }
}
</script>
