<template>
  <div class="tags">
    <div class="column2" v-for="place in places" :key="place.name">
      <router-link
        class="link"
        :to="'/place/' + place.id"
        >
      {{ place.name }}
      </router-link>
<!--      <span class="icon" @click="gotoMap(place.name)">-->
<!--        <i class="fas fa-location-arrow" aria-hidden="true"></i>-->
<!--      </span>-->
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;

export default {
  name: "PlacesScene",
  data() {
    return {}
  },
  computed: {
    places() {
      const places = JSON.parse(JSON.stringify(this.$store.state.places.fetchResult));
      places.map(v => {
        if (v.name.length > 15) {
          v.name = v.name.substr(0, 15) + "...";
        }
        return v;
      });
      places.sort((a, b) => a.name.localeCompare(b.name)); // sort vy alphaabet
      return places;
    }
  },
  methods: {
    getLink(name) {
        return 'https://geocode-maps.yandex.ru/1.x/?apikey=ce86884f-162d-4f88-a1ba-4d394f00df5a&format=json&'+
            'geocode=Нижний Новгород, ' + name;
    },
    async gotoMap(name) {
      const r = await axios.get(this.getLink(name));
      console.log(r.data.response.GeoObjectCollection);
      let ll = r.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
      ll = ll.replace(/ /, '%2C');
      const location = 'https://yandex.ru/maps/47/nizhny-novgorod/?ll=' + ll + '&z=15';
      console.log(location);
      return;
      //console.log(location);
      window.location = location;
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
