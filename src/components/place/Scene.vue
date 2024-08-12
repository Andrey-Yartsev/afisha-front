<template>
  <div class="place">
    <div class="columns" v-if="place">
      <div class="column">
        <h3 class="title is-4">{{ place.name }}</h3>
        <div v-if="place.imagePath" class="place-image">
          <img :src="place.imagePath">
          <a href="#" class="delete" v-if="isAdmin"
             @click.prevent="deleteImage()">x</a>
        </div>
      </div>
      <div class="column right">
        <template v-if="isAdmin">
          <div class="spinner-small-inline" v-if="imageLoading">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
          </div>
          <span class="hiddenFileInput" v-else>
              <input ref="file" type="file" name="theFile" @change="handleFileUpload"/>
            </span>
        </template>
      </div>
    </div>
    <AfishaSearchBox v-if="place" :word="place.name" />
  </div>
</template>

<script>
import AfishaSearchBox from "../afisha/afishaSearch/SearchBox.vue";

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
    },
    imageLoading() {
      return this.$store.state.places.imageLoading;
    },
    isAdmin() {
      return this.$store.state.adminAuth.authorized;
    }
  },
  methods: {
    async handleFileUpload(e) {
      const file = e.target.files[0];
      await this.$store.dispatch('places/updateImage', {
        id: this.placeId,
        file
      });
      this.$refs.file.value = "";
    },
    async deleteImage() {
      await this.$store.dispatch('places/deleteImage', {
        id: this.placeId
      });
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
