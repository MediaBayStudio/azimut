var targetsNum,target1Coords,target2Coods,centerCords,target1Data,target2Data,mapZoom,mapBlock=document.getElementById("map");function ymapsOnload(){ymaps.ready(function(){1==targetsNum?(data=[target1Data],centerCords=target1Coords):data=[target1Data,target2Data];var t=new ymaps.Map("map",{center:[centerCords.a,centerCords.b],zoom:mapZoom,controls:["zoomControl"]},{searchControlProvider:"yandex#search",suppressMapOpenBlock:!0}),e=new ymaps.ObjectManager({clusterize:!1,gridSize:32,clusterDisableClickZoom:!0});e.objects.options.set("iconLayout","default#image"),e.objects.options.set("iconImageHref","http://azimut.boak.ru/wp-content/themes/azimut/img/placemark.svg"),e.objects.options.set("iconImageSize",[26,40]),t.geoObjects.add(e),e.add(data),t.panes.get("ground").getElement().style.filter="grayscale(100%)"})}mapBlock&&(targetsNum=mapBlock.getAttribute("data-targets"),target2Coods={a:"59.961191",b:"30.401919"},centerCords={a:"59.960225",b:"30.404312"},target1Data={type:"Feature",id:0,geometry:{type:"Point",coordinates:[(target1Coords={a:"59.959597",b:"30.406391"}).a,target1Coords.b]},properties:{balloonContentHeader:'<p style="color:#0B4560;font-size:15px;"><b>Отдел разработки ЗАО <q>Азимут-Альянс</q></b></p>',balloonContentBody:"<p>г. Санкт‑Петербург, пр. Пискаревский, д. 2, корп. З, лит. А, пом. 727</p>",hintContent:'<strong style="color:#0B4560;padding:5px;background:#fff">Отдел разработки</strong>'}},target2Data={type:"Feature",id:1,geometry:{type:"Point",coordinates:[target2Coods.a,target2Coods.b]},properties:{balloonContentHeader:'<p style="color:#0B4560;font-size:15px;"><b>Отдел технической поддержки ЗАО <q>Азимут-Альянс</q></b></p>',balloonContentBody:"<p>г. Санкт‑Петербург, Свердловская наб., д. 44, лит. Ю, БЦ «Зима», оф. 303</p>",hintContent:'<strong style="color:#0B4560;padding:5px;background:#fff">Отдел технической поддержки</strong>'}},mapZoom=15);