<template>
  <div>
    <div class="columns date-container">
      <div class="column">
        <h2 class="title is-4" v-if="!isHome">{{ curMoment ? 'Афиша на ' + day : 'Афиша на сегодня' }}</h2>
      </div>
      <div class="column calend">
        <Datepicker
          v-if="!existsLoading"
          :lang="lang"
          v-model="date"
          :disabled-days="isDisabledDay"
          format="DD.MM.YYYY"
          @change="closeAll"
          @calendar-change="calendarChanged"
        />
      </div>
    </div>
    <div class="spinner" v-if="loading">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div class="columns" v-else>
      <div class="column events">
        <h3 class="title is-4" v-if="isHome">Афиша на сегодня</h3>
        <Card
          v-for="(v, i) in cards"
          :card="v"
          :key="i"
          :ref="'card' + i"
          @toggle="opened => closeExcepting(opened, i)"
          :showDay="!date"
        />
      </div>
      <div class="column events" v-if="isHome">
        <h3 class="title is-4">Последние изменения</h3>
        <Card
          v-for="(v, i) in lastUpdated"
          :card="v"
          :key="i"
          :ref="'card' + i"
          @toggle="opened => closeExcepting(opened, i)"
          :showDay="true"
          :showUpdated="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "./Card";
  import Datepicker from 'vue2-datepicker';
  import moment from 'moment';

  const orderCards = cards => {
    return cards.sort((a, b) => {
      if (a.eventDt[0] < b.eventDt[0]) {
        return -1;
      } else if (a.eventDt[0] > b.eventDt[0]) {
        return 1;
      } else {
        return 0;
      }
    });
  };

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
          formatLocale: {
            firstDayOfWeek: 1,
          },
          days: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
          months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
          pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
          placeholder: {
            date: 'Выбрать дату',
            dateRange: 'Select Date Range'
          }
        },
        curMonth: 0
      };
    },
    computed: {
      cards() {
        let r = [...this.$store.state.afisha.fetchResult];
        return orderCards(r);
      },
      lastUpdated() {
        return this.$store.state.afisha.fetchLastUpdatedResult;
      },
      existsLoading() {
        return this.$store.state.afisha.fetchExistsLoading;
      },
      existsSet() {
        return this.$store.state.afisha.fetchExistsResult;
      },
      curMoment() {
        if (!this.$route.params.dt) {
          return false;
        }
        return moment(this.$route.params.dt, 'DD.MM');
      },
      day() {
        if (!this.curMoment) {
          return null;
        }
        return this.curMoment.format("D.MM");
      },
      loading() {
        if (!this.$route.params.dt) {
          if (this.loadingLastUpdated) {
            return true;
          }
        }
        return this.$store.state.afisha.fetchLoading;
      },
      loadingLastUpdated() {
        return this.$store.state.afisha.fetchLastUpdatedLoading;
      },
      isHome() {
        return !this.$route.params.dt;
      }
    },
    methods: {
      fetch() {
        if (this.$route.params.dt) {
          this.$store.dispatch("afisha/fetch", this.$route.params.dt);
        } else {
          this.$store.dispatch("afisha/fetch", moment().format("DD.MM"));
        }
        this.$store.dispatch("afisha/fetchExists", this.curMonth);
      },
      fetchLastUpdated() {
        this.$store.dispatch("afisha/fetchLastUpdated");
      },
      isDisabledDay(date) {
        const day = moment(date).format("DD.MM");
        return !(this.existsSet.indexOf(day) !== -1);
      },
      calendarChanged(date) {
        console.log("CAL", date);
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
      closeAll() {
        this.cards.forEach((v, n) => {
          this.$refs['card' + n][0].close();
        });
      }
    },
    watch: {
      date(dt) {
        if (!dt) {
          this.$router.push("/");
          return;
        }
        const mo = moment(dt);
        const _dt = mo.format('DD.MM');
        this.curMonth = mo.format('M');
        if (this.$route.params.dt !== _dt) {
          this.$router.push("/afisha/" + _dt);
        }
      },
      $route() {
        this.fetch();
      }
    },
    created() {
      if (this.curMoment) {
        this.date = this.curMoment.toDate();
      }
      if (!this.$route.params.dt) {
        this.fetchLastUpdated();
      }
      this.curMonth = moment().format("M");
      this.fetch();
    }
  }
</script>
