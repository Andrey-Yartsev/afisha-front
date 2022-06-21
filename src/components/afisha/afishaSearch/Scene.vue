<template>
  <div>
    <div class="spinner" v-if="loading">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div class="columns">
      <div class="column events">
        <h3 class="title is-4">Поиск</h3>
        <div v-if="cards.length === 0" class="no-items">Ничего нет</div>
        <template v-else>
          <Card
              v-for="(v, i) in cards"
              :card="v"
              :key="i"
              :ref="'card' + i"
              @toggle="opened => closeExcepting(opened, i)"
              :showDay="true"
              :showUpdated="true"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "../Card";

export default {
  name: "AfishaScene",
  components: {
    Card
  },
  computed: {
    loading() {
      return this.$store.state.afisha.searchEventsLoading;
    },
    cards() {
      return [...this.$store.state.afisha.searchEventsResult];
    },
  },
  methods: {
    fetch() {
      this.$store.dispatch("afisha/searchEvents", this.$route.params.word);
    },
    closeExcepting(opened, i) {
      if (!opened) {
        return;
      }
      this.cards.forEach((v, n) => {
        if (i !== n) {
          this.$refs['card' + n][0].close();
        }
      });
    },
  },
  watch: {},
  created() {
    this.fetch();
  }
}
</script>
