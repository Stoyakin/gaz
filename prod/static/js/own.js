"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  window.site = {};
  window.site.form = {
    init: function init() {
      var _th = this,
          form = document.querySelectorAll('form'),
          fieldPhone = document.querySelectorAll('.js-phone');

      for (var i = 0; i < fieldPhone.length; i++) {
        fieldPhone[i].mask('+7(999) 999-9999');
      }

      var _loop = function _loop(_i) {
        form[_i].submit(function () {
          if (!_th.checkForm(form[_i])) return false;
        });
      };

      for (var _i = 0; _i < form.length; _i++) {
        _loop(_i);
      }
    },
    checkForm: function checkForm(form) {
      var checkResult = true;
      form.find('.warning').removeClass('warning');
      form.find('input, textarea, select').each(function () {
        if ($(this).data('req')) {
          switch ($(this).data('type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }

              break;

            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

              if (!re.test($(this).val())) {
                $(this).addClass('warning');
                checkResult = false;
              }

              break;

            case 'checkbox_personal':
              if (!$(this).is(':checked')) {
                $(this).parents('.checkbox').addClass('warning');
                checkResult = false;
              }

              break;

            default:
              if ($.trim($(this).val()) === '') {
                $(this).addClass('warning');
                checkResult = false;
              }

              break;
          }
        }
      });
      return checkResult;
    }
  }.init();
  window.site.obj = {
    fadeOut: function fadeOut(selector, duration) {
      var element = document.querySelector(selector),
          op = 1;
      if (!element) return;
      var timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = 'none';
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration / 10 || 20);
    },
    fadeIn: function fadeIn(selector, duration) {
      var element = document.querySelector(selector),
          op = 0.1;
      if (!element) return;
      element.style.opacity = 0;
      element.style.display = 'block';
      var timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
        }

        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 10 || 20);
    },
    map: function map() {
      var $map = document.querySelector('.js-map'),
          coords = $map.data('coords').split(',');
      ymaps.ready(function () {
        var myMap = new ymaps.Map("yaMap", {
          center: [coords[0], coords[1]],
          zoom: $map.data('zoom') || 14,
          controls: ['largeMapDefaultSet']
        });
        myMap.controls.add('zoomControl', {
          size: 'small'
        });
        myMap.behaviors.disable('scrollZoom');
        var myPlacemark = new ymaps.Placemark(coords, {}, {
          iconLayout: 'default#image',
          iconImageHref: 'static/img/pin.png',
          iconImageSize: [50, 66]
        });
        myMap.geoObjects.add(myPlacemark);
      });
      return;
    },
    filter: function filter() {
      var allowed = true;
      $('.js-filter-btn').on('click', function () {
        var _t = $(this),
            data = _t.data('filter-nav'),
            parents = _t.parents('.action'),
            btn = parents.find('.action__filter-nav-btn'),
            filterSlide = parents.find('.swiper-slide[data-filter-type]'),
            carousel = parents.find('.action__filter-carousel');

        if (!_t.hasClass('action__filter-nav-btn--active') && allowed) {
          allowed = false;
          btn.removeClass('action__filter-nav-btn--active');

          _t.addClass('action__filter-nav-btn--active');

          parents.find('.swiper-slide[data-filter-type]').fadeOut(300);
          setTimeout(function () {
            if (data != 'all') {
              parents.find('.swiper-slide[data-filter-type="' + data + '"]').fadeIn(300);
            } else {
              filterSlide.fadeIn(300);
            }

            carousel[0].swiper.update();
            allowed = true;
          }, 300);
        }

        return false;
      });
    },
    burger: function burger() {
      var _th = this,
          $body = document.querySelector('body'),
          nav = document.querySelector('.nav');

      document.querySelector('.js-burger').addEventListener('click', function () {
        var _t = this;

        if (!_t.classList.contains('header__burger--active')) {
          _t.classList.add('header__burger--active');

          nav.classList.add('nav--show');
        } else {
          _t.classList.remove('header__burger--active');

          nav.classList.remove('nav--show');
        }

        return false;
      });
    },
    init: function init() {
      var $body = document.querySelector('body'),
          filterBtn = document.querySelectorAll('.js-filter-btn'),
          burger = document.querySelector('.js-burger');

      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $body.classList.add('ios');
      }

      if (filterBtn.length) this.filter();
      if (burger) this.burger();

      if (document.querySelector('.js-idealer-swiper')) {
        var idealerSlider = new Swiper('.js-idealer-swiper', {
          loop: true,
          speed: 750,
          slidesPerView: 6,
          spaceBetween: 28,
          mousewheel: false,
          grabCursor: false,
          keyboard: false,
          simulateTouch: false,
          allowSwipeToNext: false,
          allowSwipeToPrev: false,
          breakpoints: {
            767: {
              slidesPerView: 2
            },
            992: {
              slidesPerView: 4
            }
          }
        });
      }

      if (document.querySelector('.js-iann-swiper')) {
        var animInd = function animInd(time) {
          var timeout = time / 100;

          if (width < 101) {
            width++;
            indEl.style.width = width + '%';
            timer = setTimeout(function () {
              animInd(time);
            }, timeout);
          } else {
            indEl.style.width = '0%';
          }
        };

        var indEl = document.querySelector('.iann .swiper-ind-line span'),
            width = 0,
            timer;
        var iannSlider = new Swiper('.js-iann-swiper', {
          loop: true,
          speed: 750,
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheel: false,
          grabCursor: false,
          keyboard: false,
          simulateTouch: false,
          allowSwipeToNext: false,
          allowSwipeToPrev: false,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          navigation: {
            nextEl: '.iann .swiper-button-next',
            prevEl: '.iann .swiper-button-prev'
          },
          on: {
            init: function init() {//animInd(2000);
            },
            transitionStart: function transitionStart() {
              width = 0;
              indEl.style.width = '0%';
              clearTimeout(timer);
            },
            transitionEnd: function transitionEnd() {
              animInd(1625);
            }
          }
        });
      }

      var igallSlider = new Swiper('.js-igall-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 'auto',
        spaceBetween: 28,
        navigation: {
          nextEl: '.igall .swiper-button-next',
          prevEl: '.igall .swiper-button-prev'
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      });
      var irevSlider = new Swiper('.js-irev-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.irev .swiper-button-next',
          prevEl: '.irev .swiper-button-prev'
        }
      });
      var actionSlider = new Swiper('.js-action-swiper', {
        loop: false,
        speed: 750,
        slidesPerView: 3,
        spaceBetween: 28,
        navigation: {
          nextEl: '.action .swiper-button-next',
          prevEl: '.action .swiper-button-prev'
        },
        breakpoints: {
          992: {
            slidesPerView: 2
          },
          1240: {
            slidesPerView: 4
          }
        }
      });
      var selAutoFlag = true;
      $('.js-sel-auto').on('click', function () {
        var _t = $(this),
            parents = _t.parents('.isel'),
            btns = parents.find('.isel__list-item-btn'),
            dataSrc = _t.data('src-img'),
            dataHref = _t.data('href'),
            dataNav = _t.data('nav'),
            imgAuto = parents.find('.isel__auto-img'),
            hrefAuto = parents.find('.isel__auto-href');

        if (!_t.hasClass('isel__list-item-btn--active') && selAutoFlag) {
          selAutoFlag = false;
          btns.removeClass('isel__list-item-btn--active');

          _t.addClass('isel__list-item-btn--active');

          imgAuto.fadeOut(350);
          setTimeout(function () {
            imgAuto.attr('src', dataSrc).fadeIn(300);
            selAutoFlag = true;
          }, 300);
          hrefAuto.attr('href', dataHref);
        }

        return false;
      });

      if ($('.js-tippy').length) {
        new Tippy('.js-tippy', {
          position: 'bottom',
          animation: 'fade',
          arrow: true
        });
      }

      return this;
    }
  }.init();
});
//# sourceMappingURL=own.js.map
