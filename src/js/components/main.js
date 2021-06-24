//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include closestPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  let hidePreloader = function() {
    let preloader = id('preloader');
    preloader.classList.add('loaded');
    body.classList.remove('loading');
  };

  // Задаем обработчики событий 'load', 'resize', 'scroll'
  // Для объекта window (если массивы не пустые)
  windowFuncs.resize.push(setVh);
  windowFuncs.resize.push(checkPxScrollbar);
  windowFuncs.load.push(hidePreloader);

  // Делаем глобальный lazy, чтобы потом можно было обновлять его через lazy.refresh()
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  fakeScrollbar = id('fake-scrollbar');
  hdr = id('hdr');

  // Задаем смещение самолетку, если нет полосы прокрутки
  let indexAirplateRoute = q('.index-airplane-route');
  console.log(indexAirplateRoute);
  if (indexAirplateRoute) {
    let setIndexAirplaneRouteShift = function() {
      if (scrollBarPx === 0) {
        if (media(mediaQueries.xl)) {
          indexAirplateRoute.style.transform = 'translateX(14px) scale(1.25)';
        } else {
          indexAirplateRoute.style.transform = '';
        }
      } else {
        indexAirplateRoute.style.transform = '';
      }
    }
    windowFuncs.resize.push(setIndexAirplaneRouteShift);
  }

  // Инициализируем поддержку svg (в основном это надо для svg use в IE)
  svg4everybody();

  // Клики по ссылкам для показывания прелоадера
  let linkRegExp = /\#|tel|mailto/,
    checkLink = function(link) {
      return link && link.tagName === 'A' && link.href.search(linkRegExp) === -1 && !link.hasAttribute('target') && !link.hasAttribute('data-fancybox');
    };

  document.addEventListener('click', function() {
    let target = event.target,
      parentA = target.closest('a');

    if (checkLink(target) || checkLink(parentA)) {
      preloader.classList.remove('loaded');
      body.classList.add('loading');
    }
  });

  //includes
  //=include menu.js
  //=include popups.js
  //=include forms.js
  //=include telMask.js
  //=include sliders.js

  sticky(hdr);

  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        // Функции на ресайзе вызываем сразу
        if (eventType === 'resize') {
          windowFuncs.call(funcsArray);
        }
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

  let mapBlock = id('map');

  if (mapBlock) {
    let observer = new IntersectionObserver(function(entries, observer) {
      if (entries[0].isIntersecting) {
        let scriptSrc = 'https://api-maps.yandex.ru/2.1/?apikey=82596a7c-b060-47f9-9fb6-829f012a9f04&lang=ru_RU&onload=ymapsOnload',
          tag = document.createElement('script');
        tag.setAttribute('src', scriptSrc);
        body.appendChild(tag);
        observer.unobserve(mapBlock);
      }
    }, { threshold: 0.5 });
    observer.observe(mapBlock);
  }

});