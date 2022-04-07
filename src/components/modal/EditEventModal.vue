<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card modal-event">
      <header class="modal-card-head">
        <p class="modal-card-title">Редактировать событие</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control date-time">
            <input class="input" v-model="date" v-mask="'99.99'" />
            <input class="input" v-model="time" v-mask="'99:99'" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" v-model="image" />
          </div>
        </div>
        <quill-editor v-model="text" :options="quillOptions"/>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="save" :disabled="saving">Сохранить</button>
        <button class="button is-danger" @click="remove">Удалить</button>
        <button class="button" @click="close" :disabled="saving">Отмена</button>
      </footer>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "EditEventModal",
  data() {
    return {
      date: "",
      time: "",
      image: "",
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
          date: this.date,
          time: this.time,
          image: this.image,
          text: this.text
        }
      });
      this.close();
    },
    async remove() {
      await this.$store.dispatch("afisha/removeEvent", this.id);
      this.close();
    }
  },
  mounted() {
    const item = this.$store.state.afisha.fetchResult.find(v => v.id === this.id);
    const dt = moment(item.eventDt[0])
    this.date = dt.format('DD.MM');
    this.time = dt.format('HH.mm');
    if (item.images.length) {
      this.image = item.images[0];
    }
    this.text = item.text;
  }
}
</script>
