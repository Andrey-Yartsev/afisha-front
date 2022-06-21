<template>
  <div id="map" style="width: 100%; height: 200px">
    <a :href="link" target="_blank">Карта</a>
    {{ word }}
  </div>
</template>
<script>
export default {
  name: "MapLink",
  props: {
    word: {
      type: String,
      requierd: true
    }
  },
  computed: {
    link() {
      return 'https://geocode-maps.yandex.ru/1.x/?apikey=ce86884f-162d-4f88-a1ba-4d394f00df5a&format=json&'+
          'geocode=Нижний Новгород, ' + this.word;
    }
  },
  async mounted() {

    //const result = await fetch(this.link);
    //        const ll = response.GeoObjectCollection.featureMember[0].GeoObject.Poin.pos
    //https://yandex.ru/maps/47/nizhny-novgorod/?ll=43.633285%2C56.338298&z=15

    // https://geocode-maps.yandex.ru/1.x
    //         ? geocode=<string>
    //       & apikey=<string>
    //       & [sco=<string>]
    //       & [kind=<string>]
    //         & [rspn=<boolean>]
    //           & [ll=<number>, <number>]
    //             & [spn=<number>, <number>]
    //               & [bbox=<number>,<number>~<number>,<number>]
    //                 & [format=<string>]
    //                   & [results=<integer>]
    //                     & [skip=<integer>]
    //                       & [lang=<string>]
    //                         & [callback=<string>]
    // console.log(document.getElementById('map'));
    // global.ymaps.ready(init);
    // function init(){
    //   new window.Map("map", {
    //     // Координаты центра карты.
    //     // Порядок по умолчанию: «широта, долгота».
    //     // Чтобы не определять координаты центра карты вручную,
    //     // воспользуйтесь инструментом Определение координат.
    //     center: [55.76, 37.64],
    //     // Уровень масштабирования. Допустимые значения:
    //     // от 0 (весь мир) до 19.
    //     zoom: 7
    //   });
    // }
  }
};
</script>
<style>

</style>
