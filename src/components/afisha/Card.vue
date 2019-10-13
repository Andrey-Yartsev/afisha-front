<template>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
    </div>

    <div class="content" v-html="card.text">
    </div>
  </div>
</template>

<script>

  export default {
    name: "AfishaCard",
    props: {
      card: Object
    }
  }
  </script>