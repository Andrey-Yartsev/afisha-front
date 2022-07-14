<template>
  <div>
    <div class="column">
      <h3 class="title is-4">Поиск {{ word }}</h3>
    </div>
    <SearchBox :word="word" />
  </div>
</template>

<script>
import SearchBox from "./SearchBox";

export default {
  name: "AfishaScene",
  components: {
    SearchBox
  },
  computed: {
    loading() {
      return this.$store.state.afisha.searchEventsLoading;
    },
    cards() {
      return this.$store.state.afisha.searchEventsResult || [];
    },
    word() {
      return this.$route.params.word;
    }
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
