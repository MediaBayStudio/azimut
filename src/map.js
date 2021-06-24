var mapBlock = document.getElementById('map');
if (mapBlock) {
  var targetsNum = mapBlock.getAttribute('data-targets'),
    target1Coords = {
      a: '59.959597',
      b: '30.406391'
    },
    target2Coods = {
      a: '59.961191',
      b: '30.401919'
    },
    centerCords = {
      a: '59.960225',
      b: '30.404312'
    },
    target1Data = { "type": "Feature", "id": 0, "geometry": { "type": "Point", "coordinates": [target1Coords.a, target1Coords.b] }, "properties": { "balloonContentHeader": "<p style=\"color:#0B4560;font-size:15px;\"><b>Отдел разработки ЗАО <q>Азимут-Альянс</q></b></p>", "balloonContentBody": "<p>г. Санкт‑Петербург, пр. Пискаревский, д. 2, корп. З, лит. А, пом. 727</p>", "hintContent": "<strong style=\"color:#0B4560;padding:5px;background:#fff\">Отдел разработки</strong>" } },
    target2Data = { "type": "Feature", "id": 1, "geometry": { "type": "Point", "coordinates": [target2Coods.a, target2Coods.b] }, "properties": { "balloonContentHeader": "<p style=\"color:#0B4560;font-size:15px;\"><b>Отдел технической поддержки ЗАО <q>Азимут-Альянс</q></b></p>", "balloonContentBody": "<p>г. Санкт‑Петербург, Свердловская наб., д. 44, лит. Ю, БЦ «Зима», оф. 303</p>", "hintContent": "<strong style=\"color:#0B4560;padding:5px;background:#fff\">Отдел технической поддержки</strong>" } },
    mapZoom = 15;

  function ymapsOnload() {
    ymaps.ready(function() {
      if (targetsNum == 1) {
        data = [target1Data];
        centerCords = target1Coords;
      } else {
        data = [target1Data, target2Data];
      }
      var myMap = new ymaps.Map('map', {
          center: [centerCords.a, centerCords.b],
          zoom: mapZoom,
          controls: ['zoomControl']
        }, {
          searchControlProvider: 'yandex#search',
          suppressMapOpenBlock: true
        }),
        objectManager = new ymaps.ObjectManager({
          clusterize: false,
          gridSize: 32,
          clusterDisableClickZoom: true
        });
      objectManager.objects.options.set('iconLayout', 'default#image');
      objectManager.objects.options.set('iconImageHref', 'http://azimut.boak.ru/wp-content/themes/azimut/img/placemark.svg');
      objectManager.objects.options.set('iconImageSize', [26, 40]);
      myMap.geoObjects.add(objectManager);
      objectManager.add(data);
      myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';
    });
  }
}