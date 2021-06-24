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