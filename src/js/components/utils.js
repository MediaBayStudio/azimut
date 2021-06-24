// IE10
if (!window.devicePixelRatio) {
  window.devicePixelRatio = (function() {
    var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    if (window.devicePixelRatio !== undefined && !isFirefox) {
      return window.devicePixelRatio;
    } else if (window.matchMedia) {
      var mediaQuery = function(v, ov) {
        return "(-webkit-min-device-pixel-ratio: " + v + ")," +
          "(min--moz-device-pixel-ratio: " + v + ")," +
          "(-o-min-device-pixel-ratio: " + ov + ")," +
          "(min-resolution: " + v + "dppx)"
      };
      if (window.matchMedia(mediaQuery('1.5', '3/2')).matches)
        return 1.5;
      if (window.matchMedia(mediaQuery('2', '2/1')).matches)
        return 2;
      if (window.matchMedia(mediaQuery('0.75', '3/4')).matches)
        return 0.7;
    }
    return 1;
  })();
}

var
  body = document.body,
  // Определяем есть ли прокрутка на страницы, для смещения траектории самолета
  checkPxScrollbar = function() {
    var div = document.createElement('div');
    div.style.cssText = 'overflow-y:scroll;width:50px;height:50px';

    body.appendChild(div);

    var scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();
    scrollBarPx = scrollWidth;
  },
  scrollBarPx = checkPxScrollbar(),
  // Размреы экранов для медиазапросов
  mediaQueries = {
    's': '(min-width:575.98px)',
    'm': '(min-width:767.98px)',
    'lg': '(min-width:1023.98px)',
    'xl': '(min-width:1439.98px)'
  },
  // Определяем бразуер пользователя
  browser = {
    // Opera 8.0+
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    // Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',
    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    // Internet Explorer 6-11
    isIE: /*@cc_on!@*/ false || !!document.documentMode,
    // Edge 20+
    isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isYandex: !!window.yandex,
    isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
  },
  /*
Объединение слушателей для window на события 'load', 'resize', 'scroll'
Все слушатели на окно следует задавать через него, например:
  window.resize.push(functionName)
Все ф-ии, добавленные в [] window.resize, будут заданы одним слушателем
*/
  windowFuncs = {
    load: [],
    resize: [],
    scroll: [],
    call: function(event) {
      let funcs = windowFuncs[event.type] || event;
      for (let i = 0, len = funcs.length; i < len; i++) {
        // console.log(funcs[i].name);
        funcs[i]();
      }
    }
  },

  mask, // ф-я маски телефонов в поля ввода (в файле telMask.js)
  lazy,
  menu,
  hdr,
  overlay,
  routePopup,
  // thanksPopup,
  // thanksPopupTimer,
  // templateDirectory = body.dataset.templateDirectory,
  // siteUrl = body.dataset.siteUrl,
  templateDirectory = body.getAttribute('data-template-directory'),
  siteUrl = body.getAttribute('data-page-url'),
  fakeScrollbar,
  // Сокращение записи querySelector
  q = function(selector, element) {
    element = element || body;
    return element.querySelector(selector);
  },
  // Сокращение записи querySelectorAll + перевод в массив
  qa = function(selectors, element, toArray) {
    element = element || body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // Сокращение записи getElementById
  id = function(selector) {
    return document.getElementById(selector);
  },
  // Фикс 100% высоты экрана для моб. браузеров
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  // Сокращение записи window.matchMedia('query').matches
  media = function(media) {
    return window.matchMedia(media).matches;
  },
  // Кроссбраузерный кастомный эвент
  dispatchEvent = function(element, eventName) {
    if (!browser.isIE && typeof window.CustomEvent === "function") {
      let evt = new CustomEvent(eventName);
      element.dispatchEvent(evt);
    }
  },
  // Функция запрета/разрешения прокрутки страницы
  pageScroll = function(disallow) {
    fakeScrollbar.classList.toggle('active', disallow);
    body.classList.toggle('no-scroll', disallow);
    body.style.paddingRight = disallow ? fakeScrollbar.offsetWidth - fakeScrollbar.clientWidth + 'px' : '';
  },
  // Липкий элемент средствами js
  sticky = function($el, fixThresholdDir, className) {
    $el = typeof $el === 'string' ? q($el) : $el;
    className = className || 'fixed';
    fixThresholdDir = fixThresholdDir || 'bottom';

    let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
      $elClone = $el.cloneNode(true),
      $elParent = $el.parentElement,
      fixElement = function() {
        if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
          $elParent.appendChild($elParent.replaceChild($elClone, $el));
          $el.classList.add(className);

          window.removeEventListener('scroll', fixElement);
          window.addEventListener('scroll', unfixElement);
        }
      },
      unfixElement = function() {
        if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
          $elParent.replaceChild($el, $elClone);
          $el.classList.remove(className);

          window.removeEventListener('scroll', unfixElement);
          window.addEventListener('scroll', fixElement);
        }
      };

    $elClone.classList.add('clone');
    fixElement();
    window.addEventListener('scroll', fixElement);
  },
  // Функция табов-переключателей с accessibillity
  // initTabs = function($btnsBlock, $textBlock) {
  //   if ($btnsBlock || $textBlock) {
  //     let tabsContents = $textBlock.constructor === Array ? $textBlock : $textBlock.children,
  //       tabs = $btnsBlock.children,
  //       tabFocus = 0,
  //       changeTabs = function(event) {
  //         let target = event.target;

  //         if (target.tagName === 'BUTTON') {
  //           let parent = target.parentNode,
  //             grandparent = parent.parentNode,
  //             tabContent = q('#' + target.getAttribute('aria-controls'), grandparent.parentNode);

  //           // Убираем выделение с кнопок
  //           qa('[aria-selected="true"]', parent, true)
  //             .forEach(function(el) {
  //               el.setAttribute('aria-selected', false);
  //               el.classList.remove('is-active');
  //             });

  //           // Скрываем все тексты
  //           qa('[role="tabpanel"]', grandparent, true)
  //             .forEach(function(el) {
  //               el.setAttribute('aria-hidden', true);
  //               el.classList.remove('is-active');
  //             });

  //           // Делаем активной текущую кнопку-таб
  //           target.setAttribute('aria-selected', true);
  //           target.classList.add('is-active');

  //           // Показываем контент переключателя
  //           tabContent.removeAttribute('aria-hidden');
  //           tabContent.classList.add('is-active');

  //           // Устанавливаем фокус
  //           for (let i = tabs.length - 1; i >= 0; i--) {
  //             if (tabs[i] === target) {
  //               tabFocus = i;
  //               break;
  //             }
  //           }
  //         }
  //       }

  //     $btnsBlock.addEventListener('click', changeTabs);
  //     $btnsBlock.addEventListener('keydown', function(event) {
  //       // Двигаемся вправо
  //       if (event.keyCode === 39 || event.keyCode === 37) {
  //         tabs[tabFocus].setAttribute('tabindex', -1);
  //         if (event.keyCode === 39) {
  //           tabFocus++;
  //           // Если дошли до конца, то начинаем сначала
  //           if (tabFocus >= tabs.length) {
  //             tabFocus = 0;
  //           }
  //           // Двигаемся влево
  //         } else if (event.keyCode === 37) {
  //           tabFocus--;
  //           // Если дошли до конца, то начинаем сначала
  //           if (tabFocus < 0) {
  //             tabFocus = tabs.length - 1;
  //           }
  //         }

  //         tabs[tabFocus].setAttribute('tabindex', 0);
  //         tabs[tabFocus].focus();
  //       }
  //     });
  //   }

  // },
  // Прокрутка до элемента при помощи requestAnimationFrame
  scrollToTarget = function(event, target) {
    event.preventDefault();

    target = target || this.dataset.scrollTarget;

    if (target.constructor === String) {
      target = q(target);
    }

    if (!target) {
      console.warn('Scroll target not found');
      return;
    }

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };