<template>
  <div>
    <h3 class="title is-4">{{ place.name }}</h3>
    <AfishaSearchBox v-if="place" :word="place.name" />
  </div>
</template>

<script>
import AfishaSearchBox from "../afisha/afishaSearch/SearchBox";

export default {
  name: "PlacesScene",
  components: {
    AfishaSearchBox
  },
  data() {
    return {}
  },
  computed: {
    places() {
      return this.$store.state.places.fetchResult;
    },
    placeId() {
      return parseInt(this.$route.params.id);
    },
    place() {
      if (!this.places) {
        return null;
      }
      return this.places.find(place => {
        return this.placeId === place.id;
      });
    }
  },
  methods: {
    getPlace() {

    }
  },
  mounted() {
    this.$store.dispatch("places/fetch");
  }
};
</script>

<style lang="scss">
.column2 {
  background: #ccc;
  padding: 10px;
  border-radius: 10px;
  width: 220px;
  margin-right: 10px;
  margin-bottom: 10px;
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  span {
    color: #555;
  }
  .btn {
  }
}
</style>
