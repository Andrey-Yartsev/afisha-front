<template>
  <div>
    <div class="columns date-container">
      <div class="column col-title">
        <h2 class="title is-5" v-if="!isHome">{{ curMoment ? 'Афиша на ' + day : 'Афиша на сегодня' }}</h2>
      </div>
      <button class="button" @click="addEvent">Добавить событие</button>
      <div class="column calend">
        <Datepicker
            v-if="!existsLoading"
            :lang="lang"
            v-model="date"
            :disabled-date="isDisabledDate"
            format="DD.MM.YYYY"
            @change="closeAll"
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
        <div v-if="cards.length === 0" class="no-items">Нет событий</div>
        <template v-else>
          <Card
              v-for="(v, i) in cards"
              :card="v"
              :key="v._id"
              :ref="'card' + v._id"
              @toggle="opened => closeExcepting(opened, i)"
              :showDay="!date"
              :editable="true"
          />
        </template>
      </div>
      <div class="column events" v-if="isHome">
        <h3 class="title is-4">Последние изменения</h3>
        <div v-if="lastUpdated.length === 0" class="no-items">Ничего нет</div>
        <template v-else>
          <Card
              v-for="(v, i) in lastUpdated"
              :card="v"
              :key="i"
              :ref="'card' + i"
              @toggle="opened => closeExcepting(opened, i)"
              :showDay="true"
              :showUpdated="true"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "./Card.vue";
  import Datepicker from 'vue-datepicker-next';
  import moment from 'moment';
  import BrowserStore from 'store';

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
      },
      isAdmin() {
        return this.$store.state.adminAuth.authorized;
      },
      user() {
        return this.$store.state.auth.user;
      },
      refresh() {
        return this.$store.state.afisha.refresh;
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
      isDisabledDate(date) {
        const day = moment(date).format("DD.MM");
        return !(this.existsSet.indexOf(day) !== -1);
      },
      closeExcepting(opened, i) {
        if (!opened) {
          return;
        }
        this.cards.forEach((v, n) => {
          if (i !== n && this.$refs['card' + n]) {
            this.$refs['card' + n][0].close();
          }
        });
      },
      closeAll() {
        this.cards.forEach((v, n) => {
          this.$refs['card' + n][0].close();
        });
      },
      addEvent() {
        if (!this.user) {
          this.$store.commit("modal/show", {
            name: "confirm",
            data: {
              message: "Войти через ВК",
              onOk: () => {
                BrowserStore.set('openAddBoxAfterLogin', true);
                window.location = import.meta.env.VUE_APP_API_URL + "/auth/vkontakte";
              }
            }
          });
        } else {
          // BrowserStore.remove('openAddBoxAfterLogin');
          this._addEvent();
        }
      },
      _addEvent() {
        this.$store.dispatch("modal/show", {
          name: "addEvent"
        });
      },
      init() {
        if (this.curMoment) {
          this.date = this.curMoment.toDate();
        }
        if (!this.$route.params.dt) {
          this.fetchLastUpdated();
        }
        this.curMonth = moment().format("M");
        this.fetch();
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
      },
      refresh() {
        console.log('refresh');
        this.init();
      }
    },
    mounted() {
      if (BrowserStore.get('openAddBoxAfterLogin')) {
        setTimeout(() => {
          BrowserStore.remove('openAddBoxAfterLogin');
        }, 5000);
        this._addEvent();
      }
    },
    created() {
      this.init();
    }
  }
</script>
