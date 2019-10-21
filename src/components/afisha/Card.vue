<template>
  <div class="item">
      <!--
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
      </div>
      -->
      <div class="content" :class="{ opened }">
        <span v-if="opened"><a href="" @click.prevent="toggle">скрыть</a><br></span>
        <span v-html="text"></span>
        &nbsp;<a href="" @click.prevent="toggle" v-if="!opened">показать</a>
      </div>
    </div>
</template>

<script>

  export default {
    name: "AfishaCard",
    props: {
      card: Object
    },
    data() {
      return {
        opened: false
      };
    },
    computed: {
      text() {
        if (this.opened) {
          return this.card.text;
        } else {
          return this.card.text.substring(0, 100);
        }
      }
    },
    methods: {
      toggle() {
        this.opened = !this.opened;
        this.$emit("toggle", this.opened);
      },
      close() {
        this.opened = false;
      }
    }
  }
</script>
