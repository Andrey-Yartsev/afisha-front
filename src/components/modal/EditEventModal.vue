<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card modal-event-edit">
      <header class="modal-card-head">
        <p class="modal-card-title">Редактировать событие</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
<!--        <div class="field">-->
<!--          <div class="control">-->
<!--            <input class="input">-->
<!--          </div>-->
<!--        </div>-->
        <quill-editor v-model="text" :options="quillOptions"/>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save" :disabled="saving">Сохранить</button>
        <button class="button" @click="close" :disabled="saving">Отмена</button>
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
    id() {
      return this.$store.state.modal.editEvent.data.id;
    },
    saving() {
      return this.$store.state.afisha._updateEventLoading;
    },
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
      this.$store.dispatch("modal/hide", "editEvent");
    },
    async save() {
      await this.$store.dispatch("afisha/updateEvent", {
        id: this.id,
        data: {
          text: this.text
        }
      });
      this.close();
    }
  },
  mounted() {
    const item = this.$store.state.afisha.fetchResult.find(v => v.id === this.id);
    this.text = item.text;
  }
}
</script>
