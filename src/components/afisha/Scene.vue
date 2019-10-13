<template>
  <div>
    <Datepicker :lang="lang" v-model="date" />
    <Card v-for="(v, i) in cards" :card="v" :key="i" />
  </div>
</template>

<script>
  import Card from "./Card";
  import Datepicker from 'vue2-datepicker';
import moment from 'moment';

  export default {
    name: "AfishaScene",
    components: {
      Card,
      Datepicker
    },
    data() {
      return {
        date: '',
        lang: {
          days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: ['Jan', 'Feb' , 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: 'Select Date',
            dateRange: 'Select Date Range'
          }
        }
      };
    },
    computed: {
      fetch() {
        if (this.$route.params.dt) {
          this.$store.dispatch("afisha/fetch", this.$route.params.dt);
        } else {
          this.$store.dispatch("afisha/fetch");
        }
      },
      cards() {
        return this.$store.state.afisha.fetchResult;
      }
    },
    watch: {
      date(dt) {
        const _dt = moment(dt).format('DD.MM');
        this.$router.push("/afisha/" + _dt);
      },
      $route() {
        this.fetch();
      }
    },
    created() {
      this.fetch();
    }
  }
</script>