//polyfills
;(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
;(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));
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
  ;
  (function() {
    let mobileMenu = function(_) {
        let setMenuStyles = function(trf, trs) {
            let args = [trf, trs],
              props = ['transform', 'transition'],
              values = ['translate3d(' + trf + ', 0px, 0px)', 'transform ' + trs];
  
            for (let i = args.length - 1; i >= 0; i--) {
              if (args[i] !== 0) {
                if (args[i] === '') {
                  args[i] = '';
                } else {
                  args[i] = values[i];
                }
                menuCnt.style[props[i]] = args[i];
              }
            }
          },
          checkForString = function(variable) {
            return variable.constructor === String ? q(variable) : variable;
          },
          openMenu = function() {
            if (!opened) {
              menu.classList.add('active');
              openBtn.classList.add('active');
              menuCnt.scrollTop = 0;
  
              if (!fade) {
                setMenuStyles('0px', '.5s');
                menuWidth = menuCnt.offsetWidth;
              }
              if (!allowPageScroll) {
                pageScroll(true);
              }
            }
          },
          closeMenu = function(e, forSwipe) {
            if (opened) {
              let target = e && e.target;
              // Если меню открыто и произошел свайп или нет события (закрыто вызовом функции close()) или есть евент и его св-ва
              if (forSwipe || !e || (e.type === 'keyup' && e.keyCode === 27 || target === menu || target === closeBtn)) {
                menu.classList.remove('active');
                openBtn.classList.remove('active');
  
                if (!fade) {
                  setMenuStyles(initialTransformX, '.5s');
                }
              }
            }
          },
          swipeStart = function(e) {
            if (allowSwipe) {
              let evt = e.touches[0] || window.e.touches[0];
  
              isSwipe = isScroll = false;
              posInitX = posX1 = evt.clientX;
              posInitY = posY1 = evt.clientY;
              swipeStartTime = Date.now();
  
              menuCnt.addEventListener('touchend', swipeEnd);
              menuCnt.addEventListener('touchmove', swipeAction);
              setMenuStyles(0, '');
            }
          },
          swipeAction = function(e) {
            if (allowSwipe) {
              let evt = e.touches[0] || window.e.touches[0],
                style = menuCnt.style.transform,
                transform = +style.match(trfRegExp)[0];
  
              posX2 = posX1 - evt.clientX;
              posX1 = evt.clientX;
  
              posY2 = posY1 - evt.clientY;
              posY1 = evt.clientY;
  
              // Если еще не определено свайп или скролл (двигаемся в бок или вверх/вниз)
              if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2),
                  posX = Math.abs(posX2);
  
                if (posY > 7 || posX2 === 0) {
                  isScroll = true;
                } else if (posY < 7) {
                  isSwipe = true;
                }
              }
  
              if (isSwipe) {
                // Если двигаемся влево или вправо при уже открытом меню, фиксируем позицию
                if ((toLeft && posInitX > posX1) || (toRight && posInitX < posX1)) {
                  setMenuStyles('0px', 0);
                  return;
                }
                setMenuStyles(transform - posX2 + 'px', 0);
              }
            }
          },
          swipeEnd = function(e) {
            posFinal = posInitX - posX1;
  
            let absPosFinal = Math.abs(posFinal);
  
            swipeEndTime = Date.now();
  
            if (absPosFinal > 1 && isSwipe) {
              if (toLeft && posFinal < 0 || toRight && posFinal > 0) {
                if (absPosFinal >= menuWidth * swipeThreshold || swipeEndTime - swipeStartTime < 300) {
                  closeMenu(e, true);
                } else {
                  opened = false;
                  openMenu(e, true);
                }
              }
              allowSwipe = false;
            }
  
            menu.removeEventListener('touchend', swipeEnd);
            menu.removeEventListener('touchmove', swipeAction);
  
          },
          transitionEnd = function(e) {
            if (fade) {
              if (e.propertyName === 'opacity') {
                transitionEndEvents();
              }
            } else {
              if (e.propertyName === 'transform') {
                transitionEndEvents();
              }
            }
            allowSwipe = true;
          },
          transitionEndEvents = function() {
            if (opened) {
              opened = false;
              openBtn.addEventListener('click', openMenu);
              closeBtn.removeEventListener('click', closeMenu);
              if (!allowPageScroll) {
                pageScroll(false);
              }
            } else {
              opened = true;
              openBtn.removeEventListener('click', openMenu);
              closeBtn.addEventListener('click', closeMenu);
            }
          },
          init = function() {
            menu = checkForString(_.menu);
            menuCnt = checkForString(_.menuCnt);
            openBtn = checkForString(_.openBtn);
            closeBtn = checkForString(_.closeBtn);
            allowPageScroll = options.allowPageScroll;
            toRight = options.toRight;
            toLeft = options.toLeft;
            initialTransformX = toLeft ? '100%' : toRight ? '-100%' : 0;
            fade = options.fade;
  
            setListeners('add');
  
            if (fade) {
              toRight = toLeft = false;
            } else {
              setMenuStyles(initialTransformX, 0);
              menu.addEventListener('touchstart', swipeStart);
            }
          },
          setListeners = function(action) {
            openBtn[action + 'EventListener']('click', openMenu);
            menu[action + 'EventListener']('click', closeMenu);
            menu[action + 'EventListener']('transitionend', transitionEnd);
            document[action + 'EventListener']('keyup', closeMenu);
          },
          destroy = function() {
            if (opened) {
              closeMenu();
            }
  
            if (fade) {
              toRight = toLeft = false;
            } else {
              setMenuStyles('', '');
              menu.removeEventListener('touchstart', swipeStart);
            }
  
            setListeners('remove');
            menu = null;
            menuCnt = null;
            openBtn = null;
            closeBtn = null;
          },
          applyMediaParams = function() {
            // console.log('applyMediaParams');
            if (targetMediaQuery) {
              // console.log('set ' + targetMediaQuery + ' params');
              for (let option in responsive[targetMediaQuery]) {
                options[option] = responsive[targetMediaQuery][option];
              }
              currentMediaQuery = targetMediaQuery;
            } else { // set initial params
              for (let option in initialOptions) {
                options[option] = initialOptions[option];
              }
              currentMediaQuery = null;
            }
            if (menu) {
              destroy();
              init();
            }
          },
          checkMedia = function() {
            if (responsive) {
              targetMediaQuery = null;
              for (let mediaQuery in responsive) {
                if (media(mediaQuery)) {
                  targetMediaQuery = mediaQuery;
                }
              }
              if (targetMediaQuery !== currentMediaQuery) {
                applyMediaParams();
              }
            }
            if (!menu) {
              init();
            }
          },
          options = JSON.parse(JSON.stringify(_)),
          initialOptions = JSON.parse(JSON.stringify(_)),
          responsive = _.responsive,
          targetMediaQuery = null,
          currentMediaQuery = null,
          menu,
          menuCnt,
          openBtn,
          closeBtn,
          swipeStartTime,
          swipeEndTime,
          allowPageScroll,
          swipeThreshold = 0.5,
          toRight,
          toLeft,
          initialTransformX,
          fade,
          startPageY = pageYOffset,
          trfRegExp = /([-0-9.]+(?=px))/,
          isSwipe = false,
          isScroll = false,
          allowSwipe = false,
          opened = false,
          posX1 = 0,
          posX2 = 0,
          posY1 = 0,
          posY2 = 0,
          posInitX = 0,
          posInitY = 0,
          posFinal = 0,
          menuWidth = 0;
  
        if (_.menu) {
          // Элементы не изменяются через responsive
          checkMedia();
  
          windowFuncs.resize.push(checkMedia);
  
          // Если разрешена прокрутка, то закрываем при прокрутке
          // if (allowPageScroll) {
          //   windowFuncs.scroll.push(closeMenu);
          // }
  
          return {
            options: options,
            menu: menu,
            menuCnt: menuCnt,
            openBtn: openBtn,
            closeBtn: closeBtn,
            open: openMenu,
            close: closeMenu,
            destroy: destroy
          };
        }
      },
      burger = id('hdr-burger');
  
  
    menu = mobileMenu({
      menu: q('.menu'),
      menuCnt: q('.menu__cnt'),
      openBtn: burger,
      closeBtn: burger,
      toRight: true,
      fade: false,
      allowPageScroll: false
    });
  })();
  (function() {
    let productsBlock = id('products');
  
    if (productsBlock) {
      productPopup = new Popup('#product-popup', {
        closeButtons: '.product-popup__close'
      });
  
  
      let installationLink = q('.product-popup__link', productPopup),
        currentLink,
        currentLinkIndex,
        prevLink,
        nextLink,
        productsLinks,
        productPopupCnt = q('.product-popup__cnt', productPopup),
        productPopupNav = q('.product-popup__nav', productPopup),
        productPopupTitle = q('.product-popup__title', productPopup),
        productPopupText = q('.product-popup__text', productPopup),
        productPopupPrev = productPopupNav.children[0],
        productPopupNext = productPopupNav.children[1],
        openProductPopup = function() {
          let hash = location.hash;
          if (hash !== '' && hash.search(/#[0-9]+/) !== -1) {
            if (!productPopup.classList.contains('active')) {
              productPopup.openPopup();
            }
            productPopup.scrollTop = 0;
            productPopup.classList.add('loading');
            productPopupPrev.blur();
            productPopupNext.blur();
  
            if (!productsLinks) {
              productsLinks = qa('.product__link', productsBlock, true);
            }
            currentLink = q('[href="' + hash + '"]', productsBlock);
            currentLinkIndex = productsLinks.indexOf(currentLink);
  
            prevLink = currentLinkIndex === 0 ? 0 : prevLink = productsLinks[currentLinkIndex - 1];
            nextLink = currentLinkIndex === productsLinks.length - 1 ? 0 : productsLinks[currentLinkIndex + 1];
  
            if (prevLink) {
              productPopupPrev.href = prevLink.href;
              productPopupPrev.title = prevLink.textContent;
              productPopupPrev.classList.remove('disabled');
            } else {
              productPopupPrev.classList.add('disabled');
            }
  
            if (nextLink) {
              productPopupNext.href = nextLink.href;
              productPopupNext.title = nextLink.textContent;
              productPopupNext.classList.remove('disabled');
            } else {
              productPopupNext.classList.add('disabled');
            }
  
            let xhr = new XMLHttpRequest(),
              data = 'action=get_post_by_id&post_id=' + hash.slice(1);
  
            xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
  
            xhr.addEventListener('readystatechange', function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                let post = xhr.response;
                if (post) {
                  post = JSON.parse(post);
  
                  productPopup.classList.remove('loading');
  
                  let postCnt = post.post_content;
  
                  if (!postCnt) {
                    postCnt = 'Страница находится в разработке';
                    installationLink.setAttribute('hidden', '');
                  } else {
                    installationLink.removeAttribute('hidden');
                  }
  
                  productPopupTitle.innerHTML = post.post_title;
                  productPopupText.innerHTML = postCnt;
                  // setTimeout(function() {
                  //   productPopupCnt.style.maxHeight = productPopupCnt.scrollHeight + 'px';
                  // }, 500);
                }
              }
            });
          }
        };
  
      installationLink.addEventListener('click', function() {
        productPopup.closePopup();
      });
  
      productsBlock.addEventListener('click', function(e) {
        let target = e.target;
  
        if (target.tagName === 'A') {
          e.preventDefault();
          history.pushState(0, 0, target.href);
          openProductPopup();
        }
      });
  
      productPopupNav.addEventListener('click', function(e) {
        let target = e.target;
  
        if (target.tagName === 'A') {
          e.preventDefault();
          history.pushState(0, 0, target.href);
          openProductPopup();
        }
      });
  
      productPopup.addEventListener('popupbeforeclose', function() {
        history.replaceState(0, 0, window.location.pathname);
      });
  
      windowFuncs.load.push(openProductPopup);
    }
  
    // thanksPopup = new Popup('.thanks-popup', {
    //   closeButtons: '.thanks-popup__close'
    // });
  
    // thanksPopup.addEventListener('popupbeforeopen', function() {
    //   clearTimeout(thanksPopupTimer);
    // });
  
    // Закрытие всех попапов вместе с закрытием окна спасибо
    // thanksPopup.addEventListener('popupbeforeclose', function() {
    //   let otherPopups = [callbackPopup, orderPopup];
  
    //   for (let i = 0; i < otherPopups.length; i++) {
    //     if (otherPopups[i].classList.contains('active')) {
    //       otherPopups[i].closePopup();
    //     }
    //   }
    // });
  })()
  ;
  (function() {
    let $callbackForm = id('callback-form');
  
    let formValidator = function(params) {
      let $form = params.form,
        $formBtn = params.formBtn,
        $uploadFilesBlock = params.uploadFilesBlock,
        errorsClass = 'invalid',
        $filesInput = params.filesInput,
        // Правила проверки форм, аналогично jquery.validate
        rules = {
          name: {
            required: true
          },
          tel: {
            required: true,
            pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
            or: 'email'
          },
          email: {
            required: true,
            pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
            or: 'tel'
          },
          msg: {
            required: true,
            pattern: /[^\<\>\[\]%\&'`]+$/
          },
          policy: {
            required: true
          }
        },
        messages = {
          tel: {
            required: 'Введите ваш телефон или E-mail',
            pattern: 'Укажите верный телефон'
          },
          name: {
            required: 'Введите ваше имя',
          },
          email: {
            required: 'Введите ваш E-mail или телефон',
            pattern: 'Введите верный E-mail'
          },
          msg: {
            required: 'Введите ваше сообщение',
            pattern: 'Введены недопустимые символы'
          },
          policy: {
            required: 'Согласитель с политикой обработки персональных данных'
          }
        },
        /*
          Функция получения значения полей у текущей формы.
          Ищет только те элементы формы, именя которых указаны в rules.
          Возвращает объект: 
          {название-поля: значение-поля}
          Например:
          {'user-email': 'mail@mail.ru'}
        */
        getFormData = function($form) {
          let formElements = $form.elements,
            values = {};
  
          for (let rule in rules) {
            let formElement = formElements[rule];
  
            if (formElement) {
              values[rule] = formElement.value;
            }
          }
  
          return values;
        },
        /*
          Функция проверки правильности заполнения формы.
        */
        validationForm = function(event) {
          let errors = {},
            thisForm = $form,
            values = getFormData(thisForm);
  
          for (let elementName in values) {
            let rule = rules[elementName],
              $formElement = thisForm[elementName],
              elementValue = values[elementName],
              or = rule.or,
              $orFormElement = thisForm[or];
  
            if (rule) {
              if ($formElement.hasAttribute('required') || rule.required === true) {
                let elementType = $formElement.type,
                  pattern = rule.pattern;
  
                // Если элемент не чекнут или пустой
                if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
                  elementValue === '') {
  
                  if (or && $orFormElement) {
                    if ($orFormElement.value === '') {
                      errors[elementName] = messages[elementName].required;
                      continue;
                    }
                  } else {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                }
  
                // Если текстовый элемент, у которого есть щаблон для заполнения
                if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
                  if (elementValue !== '' && pattern.test(elementValue) === false) {
                    errors[elementName] = messages[elementName].pattern;
                    continue;
                  }
                }
  
                hideError($formElement);
              }
            }
          }
  
          if (Object.keys(errors).length == 0) {
            thisForm.removeEventListener('change', validationForm);
            thisForm.removeEventListener('input', validationForm);
            $form.validatie = true;
          } else {
            thisForm.addEventListener('change', validationForm);
            thisForm.addEventListener('input', validationForm);
            showErrors(thisForm, errors);
            $form.validatie = false;
          }
  
        },
        showErrors = function($form, errors) {
          let $formElements = $form.elements;
  
          for (let elementName in errors) {
            let errorText = errors[elementName],
              $errorElement = '<label class="' + errorsClass + '">' + errorText + '</label>',
              $formElement = $formElements[elementName],
              $nextElement = $formElement.nextElementSibling;
  
            if ($nextElement && $nextElement.classList.contains(errorsClass)) {
              if ($nextElement.textContent !== errorText) {
                $nextElement.textContent = errorText;
              }
              continue;
            } else {
              $formElement.insertAdjacentHTML('afterend', $errorElement);
            }
  
            $formElement.classList.add(errorsClass);
          }
  
        },
        hideError = function($formElement) {
          let $nextElement = $formElement.nextElementSibling;
          $formElement.classList.remove(errorsClass);
          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            $nextElement.parentElement.removeChild($nextElement);
          }
        },
        submitHandler = function(event) {
          let $form = q('#' + event.detail.id + '>form'),
            eventType = event.type;
  
          if (eventType === 'wpcf7mailsent') {
            let $formElements = $form.elements;
  
            for (let i = 0; i < $formElements.length; i++) {
              hideError($formElements[i]);
              $formElements[i].classList.remove('filled');
            }
  
            $form.reset();
            if ($uploadFilesBlock) {
              $uploadFilesBlock.innerHTML = '';
            }
            // if ($form === $quizForm) {
            //   id('quiz').resetQuiz();
            // }
            console.log('отправлено');
            setTimeout(function() {
              $form.classList.remove('sent');
            }, 5000);
          }
          /* else if (eventType === 'wpcf7mailfailed') {
                  console.log('отправка не удалась');
                }*/
  
          $form.classList.remove('loading');
  
          // thanksPopup.openPopup();
          // thanksPopupTimer = setTimeout(function() {
          //   thanksPopup.closePopup();
          // }, 3000);
  
  
        },
        toggleInputsClass = function() {
          let $input = event.target,
            type = $input.type,
            files = $input.files,
            classList = $input.classList,
            value = $input.value;
  
          if (type === 'text' || $input.tagName === 'TEXTAREA') {
            if (value === '') {
              classList.remove('filled');
            } else {
              classList.add('filled');
            }
          } else if (type === 'file') {
            // $input.filesArray = [];
  
            let uploadedFiles = '';
            for (let i = 0, len = files.length; i < len; i++) {
              // $input.filesArray[i] = files[i];
              uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
            }
            $uploadFilesBlock.innerHTML = uploadedFiles;
          }
        };
  
      $form.setAttribute('novalidate', '');
      $form.validatie = false;
      $formBtn.addEventListener('click', function() {
        validationForm();
        if ($form.validatie === false) {
          event.preventDefault();
        } else {
          $form.classList.add('loading');
        }
      });
      if (!document.wpcf7mailsent) {
        document.addEventListener('wpcf7mailsent', submitHandler);
        document.wpcf7mailsent = true;
      }
      $form.addEventListener('input', toggleInputsClass);
    };
  
  
    if ($callbackForm) {
      // let $contactsFormBtn = q('button', $contactsForm);
        // $uploadFilesBlock = id('uploadedfiles'),
        // $filesInput = id('files-input');
  
      formValidator({
        form: $callbackForm,
        formBtn: q('button', $callbackForm)
      });
    }
  
  })();
  ;(function() {
    let setCursorPosition = function(pos, inputElement) {
      inputElement.focus();
      if (inputElement.setSelectionRange) {
        inputElement.setSelectionRange(pos, pos);
      } else if (inputElement.createTextRange) {
        let range = inputElement.createTextRange();
  
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
  
    mask = function() {
      let pattern = '+7(___)___-__-__',
        i = 0,
        def = pattern.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
  
      if (def.length >= val.length) {
        val = def;
      }
  
      this.value = pattern.replace(/./g, function(match) {
        return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
      });
  
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
          this.classList.remove('filled');
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    };
  
    let input = qa('[name=tel]');
  
    for (let i = 0; i < input.length; i++) {
      input[i].addEventListener('input', mask);
      input[i].addEventListener('focus', mask);
      input[i].addEventListener('blur', mask);
    }
  
  })();
  ;
  (function() {
    let arrowImg = browser.isSafari ? '<img src="' + templateDirectory + '/img/corner-arrow.png" alt="" class="arrow__img">' : '<svg class="arrow__svg" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5.23529L1 9" stroke="currentColor"/></svg>',
      nextArrow = '<button type="button" class="arrow"></button>',
      prevArrow = '<button type="button" class="arrow"></button>',
      dot = '<button type="button" class="dot"></button>',
  
      createArrow = function(className, inside) {
        className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;
  
        return '<button type="button" class="arrow arrow__' + className + '">' + inside + '</button>';
      },
  
      // Функции slick для сокращения записи
      // Чем больше слайдеров, тем актуальнее эти функции
      hasSlickClass = function($el) {
        return $el.hasClass('slick-slider');
      },
      unslick = function($el) {
        $el.slick('unslick');
      },
  
      // Слайдер фото о компании
      aboutGallery = id('about-gallery'),
      aboutGallerySelector = '.about-gallery__img',
      aboutGallerySlides = qa(aboutGallerySelector, aboutGallery),
  
      // Слайдер парнеров
      partnersSlider = id('partners-slider'),
      partnersSelector = '.partners-slider__slide',
      partnersSlides = qa(partnersSelector, partnersSlider),
  
      // Слайдер документов
      docsSlider = id('docs'),
      docsSlides = qa('.doc', docsSlider),
  
      // Слайдер в инфраструктуре
      infrastructureSlider = id('infrastructure-slider'),
      infrastructureSelector = '.infrastructure__img-wrap',
      infrastructureSlides = qa(infrastructureSelector, infrastructureSlider);
  
    if (docsSlider) {
      let $docsSlider = $(docsSlider),
        buildDocsSlider = function() {
          console.log('build');
          // если ширина экрана больше 578px и слайдов меньше 3, то слайдера не будет
          if (media(mediaQueries.s) && docsSlides.length < 3) {
            if (hasSlickClass($docsSlider)) {
              unslick($docsSlider);
            }
          } else {
            if (hasSlickClass($docsSlider)) {
              // слайдер уже создан
              return;
            }
            if (docsSlides.length > 3) {
              $docsSlider.slick({
                appendArrows: $('.docs-sect__nav'),
                prevArrow: createArrow('docs-sect__prev', arrowImg),
                nextArrow: createArrow('docs-sect__next', arrowImg),
                infinite: false,
                mobileFirst: true,
                responsive: [{
                  breakpoint: 575.98,
                  settings: {
                    slidesToShow: 2
                  }
                }]
              });
            }
          }
        }
      windowFuncs.resize.push(buildDocsSlider);
    }
  
  
    if (aboutGallery) {
      let $aboutGallery = $(aboutGallery),
        buildAboutGallerySlider = function() {
          if (hasSlickClass($aboutGallery)) {
            // слайдер уже создан
            return;
          }
          if (aboutGallerySlides.length && aboutGallerySlides.length > 2) {
            $aboutGallery.slick({
              appendArrows: $('.about-gallery__nav'),
              prevArrow: createArrow('about-gallery__prev', arrowImg),
              nextArrow: createArrow('about-gallery__next', arrowImg),
              slide: aboutGallerySelector,
              swipeThreshold: 8,
              infinite: false
            });
          }
        };
  
      windowFuncs.resize.push(buildAboutGallerySlider);
    }
  
    if (partnersSlider) {
      let $partnersSlider = $(partnersSlider),
        buildPartnersSlider = function() {
          if (hasSlickClass($partnersSlider)) {
            // слайдер уже создан
            return;
          }
          if (partnersSlides.length && partnersSlides.length > 2) {
            $partnersSlider.slick({
              arrows: false,
              appendDots: $('.partners-slider__nav'),
              dots: true,
              dotsClass: 'partners-slider__dots dots',
              customPaging: function() {
                return dot;
              },
              slide: partnersSelector,
              swipeThreshold: 8,
              slidesToShow: 2,
              infinite: false,
              mobileFirst: true,
              responsive: [{
                breakpoint: 575.98,
                settings: {
                  slidesToShow: 3
                }
              }, {
                breakpoint: 767.98,
                settings: {
                  slidesToShow: 4,
                  dots: false,
                  arrows: true,
                  appendArrows: $('.partners-slider__nav'),
                  prevArrow: createArrow('partners-slider__prev', arrowImg),
                  nextArrow: createArrow('partners-slider__next', arrowImg)
                }
              }]
            });
          }
        };
  
      windowFuncs.resize.push(buildPartnersSlider);
    }
  
    if (infrastructureSlider) {
      let $infrastructureSlider = $(infrastructureSlider),
        buildInfrastructureSlider = function() {
          if (media(mediaQueries.m)) {
            if (hasSlickClass($infrastructureSlider)) {
              unslick($infrastructureSlider);
            }
          } else {
            if (hasSlickClass($infrastructureSlider)) {
              // слайдер уже создан
              return;
            }
            if (infrastructureSlides.length && infrastructureSlides.length > 1) {
              $infrastructureSlider.slick({
                appendArrows: $('.infrastructure-slider__nav'),
                prevArrow: createArrow('infrastructure__prev', arrowImg),
                nextArrow: createArrow('infrastructure__next', arrowImg),
                slide: infrastructureSelector,
                swipeThreshold: 8,
                infinite: false
              });
            }
          }
        };
  
      if ($.fn.fancybox) {
        $('[data-fancybox="images"]').fancybox({
          beforeClose: function(e, instance, slide) {
            if (infrastructureSlider.classList.contains('slick-slider')) {
              $infrastructureSlider.slick('slickGoTo', e.currIndex);
            }
          },
          buttons: [
            'share',
            'zoom',
            'fullScreen',
            'close'
          ]
        });
      }
  
      windowFuncs.resize.push(buildInfrastructureSlider);
    }
  
    // настройки grab курсора на всех слайдерах
    $('.slick-list.draggable').on('mousedown', function() {
      $(this).addClass('grabbing');
    });
  
    $('.slick-list.draggable').on('beforeChange', function() {
      $(this).removeClass('grabbing');
    });
  
    $(document).on('mouseup', function() {
      $('.slick-list.draggable').removeClass('grabbing');
    });
  
  
  })();

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