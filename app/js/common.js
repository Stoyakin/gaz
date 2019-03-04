"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  window.site = {};
  window.site.form = {
    init: function init() {
      let _th = this,
        form = document.querySelectorAll('form'),
        fieldPhone = document.querySelectorAll('.js-phone');
      for (let i = 0; i < fieldPhone.length; i++) {
        fieldPhone[i].mask('+7(999) 999-9999');
      }
      for (let i = 0; i < form.length; i++) {
        form[i].submit(function () {
          if (!_th.checkForm(form[i])) return false;
        });
      }
    },
    checkForm: function checkForm(form) {
      let checkResult = true;
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
      let element = document.querySelector(selector),
        op = 1;
      if(!element)
        return;
      let timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration/10 || 20);
    },

    fadeIn: function fadeIn(selector, duration) {
      let element = document.querySelector(selector),
        op = 0.1;
      if(!element)
        return;
      element.style.opacity = 0;
      element.style.display = 'block';
      let timer = setInterval(function () {
          if (op >= 1){
              clearInterval(timer);
          }
          element.style.opacity = op;
          element.style.filter = 'alpha(opacity=' + op * 100 + ")";
          op += op * 0.1;
      }, duration/10 || 20);
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

    tabs: function tabs() {
      /*
      let _this = this,
        tabsBtn = document.querySelectorAll('.js-tabs-btn'),
        tabsItem = document.querySelectorAll('.action__tabs-list-item');

      for (let i = 0; i < tabsBtn.length; i++) {
        tabsBtn[i].addEventListener('click', function () {
          let btnData = tabsBtn[i].dataset.nav;
          if (tabsItem.length) {
            for (let n = 0; n < tabsItem.length; n++) {
              let tabsData = tabsItem[n].dataset.tabs;
              if (btnData == tabsData) {
                let selector = '.'+tabsItem[n].className+'[data-tabs="0'+n+'"]';
                tabsItem.forEach((item)=> {
                  item.classList.remove('action__tabs-list-item--active');
                });
                _this.fadeIn(selector, 500);
                //console.log(tabsItem[n]);
                //console.log(selector);
              }
            }
          }
        });
      }
      */
      var allowed = true;

      $('.js-tabs-btn').on('click', function () {
        var _t = $(this),
          _tData = _t.data('nav'),
          _tPar = _t.parents('.action'),
          tabs = _tPar.find('.action__tabs-list-item'),
          btn = _tPar.find('.action__tabs-nav-btn');

        if (!_t.hasClass('action__tabs-nav-btn--active') && allowed) {
          allowed = false;
          btn.removeClass('action__tabs-nav-btn--active');
          _t.addClass('action__tabs-nav-btn--active');
          tabs.fadeOut(200);
          setTimeout(function () {
            tabs.removeClass('action__tabs-list-item--active');
            _tPar.find('.action__tabs-list-item[data-tabs="' + _tData + '"]').fadeIn(200, function () {
              var _th = $(this);
              _th.find('.js-action-swiper')[0].swiper.update();
              _th.find('.js-action-swiper')[0].swiper.navigation.update();
              setTimeout(function () {
                _th.addClass('action__tabs-list-item--active');
                allowed = true;
              }, 400);
            }).css('display', 'block');
          }, 200);
        }

        return false;
      });
    },

    burger: function burger() {
      let _th = this,
        $body = document.querySelector('body');
      document.querySelector('.js-burger').addEventListener('click', function() {
        let _t = this;
        if (!_t.classList.contains('header__burger--active')) {
          _t.classList.add('header__burger--active');
          _th.fadeIn('.nav');
          $body.classList.add('open-menu');
        } else {
          _t.classList.remove('header__burger--active');
          _th.fadeOut('.nav');
          $body.classList.remove('open-menu');
        }
        return false;
      });
    },

    init: function init() {
      let $body = document.querySelector('body'),
        tabsBtn = document.querySelectorAll('.js-tabs-btn');

      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $body.classList.add('ios');
      }

      if (tabsBtn.length) this.tabs();

      if (document.querySelector('.js-idealer-swiper')) {
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
      }

      if (document.querySelector('.js-iann-swiper')) {
        let indEl = document.querySelector('.iann .swiper-ind-line span');
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
          // autoplay: {
          //   delay: 7000,
          // },
          navigation: {
            nextEl: '.iann .swiper-button-next',
            prevEl: '.iann .swiper-button-prev',
          }
        });
      }

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

      let actionSlider = new Swiper('.js-action-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 3,
        spaceBetween: 28,
        navigation: {
          nextEl: '.action .swiper-button-next',
          prevEl: '.action .swiper-button-prev',
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

      $('.js-sel-auto').on('click', function() {
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

      if ($('.js-tippy').length) {
        new Tippy('.js-tippy', {
          position: 'bottom',
          animation: 'fade',
          arrow: true
        })
      }

      return this;
    }

  }.init();

});
