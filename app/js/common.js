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
      $('.imodels__tabs-nav-btn').on('click', function () {
        var _t = $(this),
          _tData = _t.data('tabs-nav'),
          _tPar = _t.parents('.js-tabs'),
          tabs = _tPar.find('.imodels__tabs-item'),
          btn = _tPar.find('.imodels__tabs-nav-btn');
        if (!_t.hasClass('imodels__tabs-nav-btn--active')) {
          btn.removeClass('imodels__tabs-nav-btn--active');
          _t.addClass('imodels__tabs-nav-btn--active');
          tabs.fadeOut(350);
          setTimeout(function () {
            tabs.removeClass('imodels__tabs-nav-btn--active');
            _tPar.find('.imodels__tabs-item[data-tabs-item="' + _tData + '"]').fadeIn(350);
          }, 350);
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
        yaMap = document.querySelector('.js-map') || false,
        tabs = document.querySelector('.js-tabs') || false,
        burger = document.querySelector('.js-burger') || false;

      if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        $body.classList.add('ios');
      }

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
          allowSwipeToPrev: false
        });
      }

      if (document.querySelector('.js-iann-swiper')) {

        // function changeWidth(selector, duration) {
        //   let element = document.querySelector(selector),
        //     duration = duration,
        //     from = 0,
        //     to = 100;
        //     timeStart = new Date().getTime();
        //   if (element) {
        //     let timer = setInterval(function() {
        //       var timePassed = new Date().getTime() - timeStart;
        //       var progress = timePassed / duration;
        //       if (progress > 1) {
        //           progress = 1;
        //       }
        //       if (progress == 1) {
        //           clearInterval(timer);
        //       }
        //     }, 10);
        //   }
        // }


        var idealerSlider = new Swiper('.js-iann-swiper', {
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
          navigation: {
            nextEl: '.iann .swiper-button-next',
            prevEl: '.iann .swiper-button-prev',
          },
          on: {
            slideChange: function () {
              //changeWidth('.iann .swiper-ind-line span', 7000);
            }
          }
        });

        var igallSlider = new Swiper('.js-igall-swiper', {
          loop: true,
          speed: 750,
          slidesPerView: 'auto',
          spaceBetween: 28,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        });
      }

      return this;
    }

  }.init();

});
