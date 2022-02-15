<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Вход</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label class="label">Пароль</label>
          <div class="control">
            <input class="input" type="text" placeholder="Пароль" v-model="password" @keyup.enter="login">
          </div>
        </div>
        <div class="notification is-danger" v-if="error">
          {{ error }}
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="login">Войти</button>
        <button class="button" @click="close">Отмена</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginModal",
  data() {
    return {
      password: "",
      error: ""
    };
  },
  methods: {
    close() {
      this.$store.dispatch("modal/hide", "login");
    },
    login() {
      this.$store.dispatch("auth/login", { password: this.password }).then(() => {
        this.close();
      }).catch(error => {
        this.error = error;
      });
    }
  }
}
</script>
