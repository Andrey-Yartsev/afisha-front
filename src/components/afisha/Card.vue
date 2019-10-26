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
        <span ref="text" style="display: none" v-html="card.text"></span>
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
        opened: false,
        rText: "",
      };
    },
    computed: {
      text() {
        let text;
        text = this.rText || this.card.text;
        if (this.opened) {
          return text;
        } else {
          return text.substring(0, 100);
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
    },
    mounted() {
      this.$nextTick(() => {
        const links = this.$refs.text.getElementsByTagName("a");
        let replaced = false;
        for (let i=0; i<links.length; i++) {
          let href = links[i].getAttribute("href");
          if (href.substring(0, 1) === "/") {
            links[i].setAttribute("href", "https://vk.com" + href);
            links[i].setAttribute("target", "_blank");
            replaced = true;
          }
        }
        if (replaced) {
          this.rText = this.$refs.text.innerHTML;
        }
      })
    }
  }
</script>
