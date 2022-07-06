<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card modal-event">
      <header class="modal-card-head">
        <p class="modal-card-title">Добавить событие</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control date-time">
            <input class="input" v-model="date" v-mask="'99.99'"/>
            <input class="input" v-model="time" v-mask="'99:99'"/>
          </div>
        </div>
        <div class="field">
          <label class="label">Ссылка на изображение</label>
          <div class="control">
            <input class="input" v-model="image"/>
          </div>
        </div>
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
import moment from "moment";

function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}

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
      const create = async () => {
        await this.$store.dispatch("afisha/createEvent", {
          data: {
            date: this.date,
            time: this.time,
            image: this.image,
            text: this.text
          }
        });
        this.$store.commit("afisha/refresh");
        this.close();
      }
      if (!this.image) {
        await create();
        return;
      }
      checkIfImageExists(this.image, async exists => {
        if (!exists) {
          this.$store.dispatch("request/setError", {
            message: "Изображение не существует или имеет ошибку"
          });
        } else {
          await create();
        }
      });

    }
  },
  mounted() {
    this.date = moment().format('DD.MM');
    this.time = '10:00';
  }
}
</script>
