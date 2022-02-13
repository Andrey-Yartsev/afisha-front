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
      <div class="header">
        <span class="date">
          {{ day }}{{ time || 'см. содержание' }}
          <span class="updated" v-if="showUpdated">{{ updated }}</span>
        </span>
        <div class="controls">
          <span class="hiddenFileInput">
            <input ref="file" type="file" name="theFile" @change="handleFileUpload" />
          </span>
          <a class="toggle" href="" @click.prevent="toggle">{{ opened ? "скрыть" : "показать" }}</a>
        </div>
      </div>
      <div class="body">
        <div class="image" v-if="card.images.length">
          <a :href="card.images[0]" target="_blank"><img :src="card.images[0]" /></a>
        </div>
        <div>
          <span v-html="text"></span>
          <span ref="text" style="display: none" v-html="card.text"></span>
        </div>
        <div class="userImages">
          <img :src="imagePath(v)" v-for="v in card.userImagePaths" :key="v._id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import request from "@/utils/request";

  const stripHtml = html => {
    const tmp = document.createElement("DIV");
    html = html.replace(/<br\s?\/?>/g, ' ');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  export default {
    name: "AfishaCard",
    props: {
      card: Object,
      showDay: {
        type: Boolean,
        default: false
      },
      showUpdated: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        opened: false,
        rText: ""
      };
    },
    computed: {
      text () {
        let text;
        text = this.rText || this.card.text;
        if (this.opened) {
          return text;
        } else {
          return stripHtml(text).substring(0, 150);
        }
      },
      moment() {
        return moment(this.card.eventDt[0]);
      },
      time() {
        const m = this.moment;
        if (m.format("H") === "0" && m.format("m") === "1") {
          return null;
        }
        if (m.format("H") === "0" && m.format("m") === "0") {
          return null;
        }
        return m.format("HH:mm");
      },
      day() {
        if (!this.showDay) {
          return null;
        }
        return this.moment.format("D.MM") + " — ";
      },
      updated() {
        return moment(this.card.dtUpdate).format("D.MM HH:mm");
      }
    },
    methods: {
      toggle () {
        this.opened = !this.opened;
        this.$emit("toggle", this.opened);
      },
      close () {
        this.opened = false;
      },
      async handleFileUpload(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        await request('events/images/' + this.card._id + '?access_token=otherpass', {
          method: "POST",
          body: formData
        });
        this.$refs.file.value = "";
      },
      imagePath(path) {
        return 'http://localhost:8001/api' + path;
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (!this.$refs.text) {
          return;
        }
        const links = this.$refs.text.getElementsByTagName("a");
        let replaced = false;
        for (let i = 0; i < links.length; i++) {
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
