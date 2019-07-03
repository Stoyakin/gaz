"use strict";

function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }
  return false;
}

window.onload = () => qs('body').classList.add('page-loaded');

document.addEventListener("DOMContentLoaded", function (event) {
  window.site = {};

  window.site.obj = {

    fadeOut: function fadeOut(selector, duration) {
      let element = document.querySelector(selector),
        op = 1;
      if (!element)
        return;
      let timer = setInterval(function () {
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
      let element = document.querySelector(selector),
        op = 0.1;
      if (!element)
        return;
      element.style.opacity = 0;
      element.style.display = 'block';
      let timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 10 || 20);
    },

    map: function map() {
      let $map = document.querySelector('.js-map'),
        coords = $map.data('coords').split(',');
      ymaps.ready(function () {
        let myMap = new ymaps.Map("yaMap", {
          center: [coords[0], coords[1]],
          zoom: $map.data('zoom') || 14,
          controls: ['largeMapDefaultSet']
        });
        myMap.controls.add('zoomControl', {
          size: 'small'
        });
        myMap.behaviors.disable('scrollZoom');
        let myPlacemark = new ymaps.Placemark(coords, {}, {
          iconLayout: 'default#image',
          iconImageHref: 'static/img/pin.png',
          iconImageSize: [50, 66]
        });
        myMap.geoObjects.add(myPlacemark);
      });
      return;
    },

    filter: function filter() {
      let allowed = true;

      $('.js-filter-btn').on('click', function () {
        let _t = $(this),
          data = _t.data('filter-nav'),
          parents = _t.parents('.action'),
          btn = parents.find('.action__filter-nav-btn'),
          filterSlide = parents.find('.swiper-slide[data-filter-type]'),
          carousel = parents.find('.js-action-swiper');

        if (!_t.hasClass('action__filter-nav-btn--active') && allowed) {
          allowed = false;
          btn.removeClass('action__filter-nav-btn--active');
          _t.addClass('action__filter-nav-btn--active');
          parents.find('.swiper-slide[data-filter-type]').fadeOut(300);
          setTimeout(() => {
            if (data != 'all') {
              parents.find('.swiper-slide[data-filter-type="' + data + '"]').fadeIn(300);
            } else {
              filterSlide.fadeIn(300);
            }
            carousel[0].swiper.update();
            allowed = true;
          }, 300)
        }

        return false;
      });
    },

    burger: function burger() {
      let _th = this,
        $body = document.querySelector('body'),
        nav = document.querySelector('.nav');
      document.querySelector('.js-burger').addEventListener('click', function () {
        let _t = this;
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

    actionSlider: function actionSlider() {

      let countStart = 3,
        point992 = 2,
        point1240 = 4;

      if (getParent(qs('.js-action-swiper'), 'action--inner')) {
        countStart = 2,
        point992 = 1,
        point1240 = 2;
      }

      let actionSlider = new Swiper('.js-action-swiper', {
        loop: false,
        speed: 750,
        slidesPerView: countStart,
        spaceBetween: 28,
        navigation: {
          nextEl: '.action .swiper-button-next',
          prevEl: '.action .swiper-button-prev',
        },
        breakpoints: {
          992: {
            slidesPerView: point992
          },
          1240: {
            slidesPerView: point1240
          }
        }
      });
    },

    choicesSelect: function choicesSelect() {

      qsAll('.js-select').forEach((item) => {
        new Choices(item, {
          placeholder: true,
          searchEnabled: false,
          itemSelectText: '',
          classNames: {
            containerOuter: 'choices choices--custom',
          }
        });
      });

    },

    igallSlider: function () {
      let igallSlider = new Swiper('.js-igall-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 'auto',
        spaceBetween: 28,
        navigation: {
          nextEl: '.igall .swiper-button-next',
          prevEl: '.igall .swiper-button-prev',
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 0
        },
      });
    },

    irevSlider: function () {
      let irevSlider = new Swiper('.js-irev-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.irev .swiper-button-next',
          prevEl: '.irev .swiper-button-prev',
        }
      });
    },

    idealerSlider: function () {
      let idealerSlider = new Swiper('.js-idealer-swiper', {
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
    },

    topSwiper: function () {

      let topSlider = new Swiper('.js-top-swiper', {
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
        // autoplay: {
        //   delay: 2000,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: '.section-top .swiper-button-next',
          prevEl: '.section-top .swiper-button-prev',
        }
      });
    },

    iannSlider: function () {
      let indEl = document.querySelector('.iann .swiper-ind-line span'),
        width = 0,
        timer;

      function animInd(time) {
        let timeout = time / 100;
        if (width < 101) {
          width++;
          indEl.style.width = width + '%'
          timer = setTimeout(() => {
            animInd(time);
          }, timeout);
        } else {
          indEl.style.width = '0%'
        }
      }

      let iannSlider = new Swiper('.js-iann-swiper', {
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
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.iann .swiper-button-next',
          prevEl: '.iann .swiper-button-prev',
        },
        on: {
          init: function () {
            //animInd(2000);
          },
          transitionStart: function () {
            width = 0;
            indEl.style.width = '0%'
            clearTimeout(timer);
          },
          transitionEnd: function () {
            animInd(1625);
          }
        }
      });
    },

    selAuto: function () {
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
          setTimeout(() => {
            imgAuto
              .attr('src', dataSrc)
              .fadeIn(300);
            selAutoFlag = true;
          }, 300);
          hrefAuto.attr('href', dataHref);
        }
        return false;
      });

    },

    mainTippy: function () {

      new Tippy('.js-tippy', {
        position: 'bottom',
        animation: 'fade',
        arrow: true
      });

    },

    init: function init() {

      if (qsAll('.js-filter-btn').length) this.filter();

      if (qs('.js-action-swiper')) this.actionSlider();

      if (qs('.js-burger')) this.burger();

      if (qs('.js-iann-swiper')) this.iannSlider();

      if (qs('.js-idealer-swiper')) this.idealerSlider();

      if (qs('.js-igall-swiper')) this.igallSlider();

      if (qs('.js-irev-swiper')) this.irevSlider();

      if (qs('.js-top-swiper')) this.topSwiper();

      if (qs('.js-sel-auto')) this.selAuto();

      if (qsAll('.js-tippy').length) this.mainTippy();

      if (qsAll('.js-select').length) this.choicesSelect();

      return this;
    }

  }.init();

});

