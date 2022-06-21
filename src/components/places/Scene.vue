<template>
  <div>
    <router-link
        :to="'/afisha/search/' + place.name" v-for="place in places"
        :key="place.name">{{ place.name }},&nbsp;</router-link>
  </div>
</template>

<script>
export default {
  name: "PlacesScene",
  data() {
    return {}
  },
  computed: {
    places() {
      return this.$store.state.places.fetchResult;
    }
  },
  mounted() {
    this.$store.dispatch("places/fetch");
  }
};
</script>
