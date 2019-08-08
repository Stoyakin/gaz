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

window.onload = () => {
  if (window.scrollY > 0) document.body.classList.add('scrolled')
  qs('body').classList.add('page-loaded');
}

window.addEventListener('scroll', () => document.body.classList.add('scrolled'));

document.addEventListener("DOMContentLoaded", function (event) {

  window.gaz = {};

  window.gaz.form = ({

    init: function () {

      const _th = this,
        inputs = qsAll('.form__field-input, .form__field-textarea'),
        forms = qsAll('form'),
        digitsInput = qsAll('.js-digits');

      const picker = new Pikaday({
        field: qs('.js-datepicker'),
        firstDay: 1,
        format: 'Do MMMM YYYY',
        toString(date, format) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return `${day}.${month}.${year}`;
        },
        i18n: {
          previousMonth : 'Предыдущий месяц',
          nextMonth     : 'Следующий месяц',
          months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
          weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
          weekdaysShort : ['Вск','Пон','Вт','Ср','Чт','Пт','Суб']
        }
      });

      function emptyCheck(event) {
        event.target.value.trim() === '' ?
          event.target.classList.remove('not-empty') :
          event.target.classList.add('not-empty')
      }

      for (let item of inputs) {
        item.addEventListener('keyup', emptyCheck)
        item.addEventListener('blur', emptyCheck)
      }

      for (let form of forms) {
        form.addEventListener('submit', (e) => {
          return !_th.checkForm(form) && e.preventDefault()
        })
      }

      for (let digitInput of digitsInput) {
        digitInput.addEventListener('keydown', (e) => {
          let validArr = [46, 8, 9, 27, 13, 110, 190]
          if (validArr.indexOf(e.keyCode) !== -1 ||
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
          }
          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault()
          }
        });
      }

      return this
    },

    checkForm: function (form, overSelector) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.error');
      const parentElem = overSelector && overSelector != undefined ? overSelector + ' ' : '';

      if (warningElems.length) {
        for (let warningElem of warningElems) {
          warningElem.classList.remove('error')
        }
      }

      //for (let elem of form.querySelectorAll('input', 'textarea', 'select')) {
      for (let elem of form.querySelectorAll(parentElem+'input ,' + parentElem + 'textarea ,' + parentElem + 'select')) {
        if (elem.getAttribute('data-req')) {
          switch (elem.getAttribute('data-type')) {
            case 'tel':
              var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'email':
              var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
              if (!re.test(elem.value)) {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'file':
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
            case 'select':
              if (elem.value.trim() === '' || elem.value.trim() === '0') {
                getParent(elem, 'choices').classList.add('error')
                checkResult = false
              }
              break;
            case 'radio':
              let countCheckedRadio = 0;
              qsAll(' [type="radio"][name="' + elem.dataset.nameRadio + '"]').forEach((item)=> { if (item.checked) countCheckedRadio+=1 });
              if (countCheckedRadio === 0) {
                checkResult = false
                qsAll(' [type="radio"][name="' + elem.dataset.nameRadio + '"]').forEach((item)=> item.parentNode.classList.add('error'));
              }
              break;
            default:
              if (elem.value.trim() === '') {
                elem.parentNode.classList.add('error')
                checkResult = false
              }
              break;
          }
        }
      }

      for (let item of form.querySelectorAll('input[data-req^=agreement]')) {
        if (!item.checked) {
          item.classList.add('error')
          checkResult = false
        }
      }

      return checkResult
    }

  }).init()

  window.gaz.obj = {

    slideDown: function slideDown(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      element.style.removeProperty('display');
      if (display === 'none') display = 'block';
      element.style.display = display;
      let height = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      element.offsetHeight;
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.style.height = height + 'px';
      element.style.removeProperty('padding-top');
      element.style.removeProperty('padding-bottom');
      element.style.removeProperty('margin-top');
      element.style.removeProperty('margin-bottom');
      setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideUp: function slideUp(selector, duration, cb = null) {
      if (!selector)
        return;
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.height = element.offsetHeight + 'px';
      element.style.transitionProperty = 'height, margin, padding';
      element.style.transitionDuration = duration + 'ms';
      element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = 0;
      element.style.paddingTop = 0;
      element.style.paddingBottom = 0;
      element.style.marginTop = 0;
      element.style.marginBottom = 0;
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('padding-top');
        element.style.removeProperty('padding-bottom');
        element.style.removeProperty('margin-top');
        element.style.removeProperty('margin-bottom');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },

    slideToggle: function slideToggle(selector, duration, cb = null) {
      let element;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let display = getComputedStyle(element).display;
      if (display === 'none') this.slideDown(element, duration, cb)
      else this.slideUp(element, duration, cb)
    },

    fadeOut: function fadeOut(selector, duration, cb = null) {
      if (!selector) return;
      let element,
        op = 1;
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      let timer = setInterval(function () {
        if (op <= 0.1) {
          clearInterval(timer);
          element.style.display = 'none';
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
      }, duration / 50 || 20);
    },

    fadeIn: function fadeIn(selector, duration, cb = null) {
      if (!selector)
        return;
      let element,
        op = 0.1,
        typeBlock = 'block';
      (typeof selector === 'string' || selector instanceof String) ? element = qs(selector): element = selector;
      element.style.opacity = 0;
      element.style.display = typeBlock;
      let timer = setInterval(function () {
        if (op >= 1) {
          clearInterval(timer);
          if (cb) cb();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
      }, duration / 50 || 20);
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
      qs('.js-burger').addEventListener('click', function () {
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
          prevEl: '.action .swiper-button-prev'
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: point992,
          },
          1240: {
            slidesPerView: point1240,
          }
        }
      });

    },

    igallSlider: function igallSlider() {

      let igallSlider = new Swiper('.js-igall-swiper', {
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

    },

    irevSlider: function irevSlider() {
      let indEl = document.querySelector('.js-irev-swiper .swiper-ind-line span'),
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

      let irevSlider = new Swiper('.js-irev-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 1,
        spaceBetween: 0,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.irev .swiper-button-next',
          prevEl: '.irev .swiper-button-prev',
        },
        on: {
          transitionStart: function () {
            if (this.$el[0].previousElementSibling && qs('.swiper-slide-active', this.$el[0]).dataset.date && qs('.swiper-slide-active', this.$el[0]).dataset.date != '') {
              this.$el[0].previousElementSibling.innerHTML = qs('.swiper-slide-active', this.$el[0]).dataset.date;
            }
            width = 0;
            indEl.style.width = '0%'
            clearTimeout(timer);
          },
          transitionEnd: function () {
            animInd(6000);
          },
          slideChange: function() {
            const index = this.realIndex + 1;
            const nextIndex = index + 1 > this.slides.length - this.loopedSlides * 2 ? 1 : index + 1;
            qs('.js-irev-swiper .swiper-ind-number--prev').textContent = (`0${index}`).slice(-2);
            qs('.js-irev-swiper .swiper-ind-number--next').textContent = (`0${nextIndex}`).slice(-2);
          }
        },
        breakpoints: {
          479: {
            autoHeight: true,
          }
        }
      });

    },

    idealerSlider: function idealerSlider() {

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
        navigation: {
          nextEl: '.js-idealer-swiper .swiper-button-next',
          prevEl: '.js-idealer-swiper .swiper-button-prev',
        },
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

    topSwiper: function topSwiper() {

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
        //   delay: 2,
        //   disableOnInteraction: false,
        // },
        navigation: {
          nextEl: '.section-top .swiper-button-next',
          prevEl: '.section-top .swiper-button-prev',
        },
        on: {
          slideChange: function() {
            qs('.js-top-swiper .swiper-count-item').textContent = (`0${this.realIndex + 1}`).slice(-2);
          },
        },
      });

    },

    iannSlider: function iannSlider() {
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
          delay: 6000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.iann .swiper-button-next',
          prevEl: '.iann .swiper-button-prev',
        },
        on: {
          init: function () {
            //animInd(2);
          },
          transitionStart: function () {
            width = 0;
            indEl.style.width = '0%'
            clearTimeout(timer);
          },
          transitionEnd: function () {
            animInd(6000);
          },
          slideChange: function() {
            const index = this.realIndex + 1;
            const nextIndex = index + 1 > this.slides.length - this.loopedSlides * 2 ? 1 : index + 1;
            qs('.js-iann-swiper .swiper-count-item').textContent = (`0${index}`).slice(-2);
            qs('.js-iann-swiper .swiper-ind-number--prev').textContent = (`0${index}`).slice(-2);
            qs('.js-iann-swiper .swiper-ind-number--next').textContent = (`0${nextIndex}`).slice(-2);
          }
        }
      });

    },

    gallerySwiper: function gallerySwiper() {

      var galleryThumbs = new Swiper('.js-gallery-thumbs', {
        spaceBetween: 7,
        slidesPerView: 4,
        // loop: true,
        freeMode: true,
        // loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
          479: {
            slidesPerView: 3,
          }
        }
      });

      var galleryTop = new Swiper('.js-gallery-top', {
        spaceBetween: 7,
        // loop: true,
        // loopedSlides: 5,
        navigation: {
          nextEl: '.gallery .swiper-button-next',
          prevEl: '.gallery .swiper-button-prev',
        },
        thumbs: {
          swiper: galleryThumbs,
        },
      });

    },

    galleryMinSwiper: function galleryMinSwiper() {

      const galleryMinSwiper = new Swiper('.js-gallery-min-swiper', {
        spaceBetween: 7,
        loop: false,
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.gallery-min .swiper-button-next',
          prevEl: '.gallery-min .swiper-button-prev',
        },
      });

    },

    historySwiper: function historySwiper() {

      let historySwiper = new Swiper('.js-history-swiper', {
        loop: true,
        speed: 750,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.history .swiper-button-next',
          prevEl: '.history .swiper-button-prev',
        },
        on: {
          slideChange: function() {
            qs('.js-history-swiper .swiper-count-item').textContent = (`0${this.realIndex + 1}`).slice(-2);
          },
        },
      });

    },

    selAuto: function selAuto() {

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

    mainTippy: function mainTippy() {

      new Tippy('.js-tippy', {
        position: 'bottom',
        animation: 'fade',
        arrow: true
      });

    },

    map: function map() {

      const pin = '/static/img/pin.png',
        coordsCenter = qs('.js-map').dataset.center.split(',');

      ymaps.ready(function () {

        function yaMapInit() {
          const myMap = new ymaps.Map("yaMap", {
            center: [coordsCenter[0], coordsCenter[1]],
            zoom: 11,
            controls: [],
            behaviors: ["drag"]
          });

          myMap.controls.add('zoomControl', {
            size: 'small',
            float: 'right',
            position: {
              top: '198px',
              right: '20px'
            }
          });

          if (window.dataMap != undefined) {
            $.each(window.dataMap, function (index, currentElement) {
              myMap.geoObjects.add(new ymaps.Placemark((currentElement).split(','), {}, {
                iconLayout: 'default#image',
                iconImageHref: pin,
                iconImageSize: [23, 31]
              }));
            });
          }

        }

        yaMapInit();

      });
    },

    departmentToggle: function departmentToggle() {

      const _self = this;

      qsAll('.js-department-toggle').forEach((item) => {
        item.addEventListener('click', function (e) {
          this.classList.toggle('active');
          _self.slideToggle(this.nextElementSibling, 300);
          e.preventDefault();
        });
      });

    },

    range: function range() {

      function getValidFormMinAndMax(value, min, max) {
        if (value >= min && value <= max) {
          return value;
        }
        return value <= min ? min : max;
      }

      const rangeInp = qsAll('.js-range');

      if (rangeInp.length) {
        rangeInp.forEach((item)=> {
          let _th = item,
            _thPar = getParent(_th, 'range'),
            _thMax = parseInt(_th.dataset.max),
            _thMin = parseInt(_th.dataset.min),
            inpTo = qs('.range__digits--to', _thPar),
            inpFrom = qs('.range__digits--from', _thPar);

          let timeout = null;

          let slider = $(_th).ionRangeSlider({
            type: "double",
            min: _thMin,
            max: _thMax,
            keyboard: true,
            onChange: function (data) {
              inpTo.value = data.to_pretty
              inpFrom.value = data.from_pretty
            },
          }).data("ionRangeSlider");

          inpFrom.addEventListener('input', ()=> {
            let validFrom = getValidFormMinAndMax(inpFrom.value, _thMin, _thMax),
              validTo = getValidFormMinAndMax(inpTo.value, _thMin, _thMax);
            console.log(validFrom)
            console.log(validTo)
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              inpFrom.value = validFrom;
              slider.update({
                from: validFrom,
                to: validTo
              });
            }, 500);
          });

          inpTo.addEventListener('input', ()=> {
            let validFrom = getValidFormMinAndMax(inpFrom.value, _thMin, _thMax),
              validTo = getValidFormMinAndMax(inpTo.value, _thMin, _thMax);
            clearTimeout(timeout);
            console.log(validFrom)
            console.log(validTo)
            timeout = setTimeout(function () {
              inpTo.value = validTo;
              slider.update({
                from: validFrom,
                to: validTo
              });
            }, 500);
          });

        });

      }

    },

    rangeSingle: function rangeSingle() {

      const rangeOne = qsAll('.js-range-single');

      if (rangeOne.length) {
        rangeOne.forEach((item)=> {
          let _th = item,
            _thPar = getParent(_th, 'range'),
            _thMax = _th.dataset.max ? parseInt(_th.dataset.max) : 100,
            _thMin = _th.dataset.min ? parseInt(_th.dataset.min) : 0,
            _thDataValue = _th.dataset.value ? JSON.parse(_th.dataset.value) : [],
            _thSteps = _th.dataset.step ? parseInt(_th.dataset.step) : 1,
            _thPostfix = _th.dataset.postfix ? _th.dataset.postfix : '';

          if ( _th.dataset.value ) {
            _thMax = JSON.parse(_th.dataset.value).indexOf(12);
            _thMin = JSON.parse(_th.dataset.value).indexOf(72);
          }

          let singleSlider = $(_th).ionRangeSlider({
            type: "single",
            min: _thMin,
            max: _thMax,
            grid: true,
            values: _thDataValue,
            step: _thSteps,
            postfix: _thPostfix,
            onChange: function (data) {
              console.log(data.from_pretty)
              console.log(data.from_value)
            },
          }).data("ionRangeSlider");
        });

      }

    },

    tabs: function tabs() {

      const _self = this;

      qsAll('.card__tabs-nav-button').forEach((item)=> {
        item.addEventListener('click', function (e) {
          let _th = this;
          if (!_th.classList.contains('card__tabs-nav-button--active')) {
            qs('.card__tabs-nav-button.card__tabs-nav-button--active').classList.remove('card__tabs-nav-button--active');
            _th.classList.add('card__tabs-nav-button--active');
            if (_th.dataset.tabsNav && _th.dataset.tabsNav != '' && qs('.card__tabs-item[data-tabs-item="'+_th.dataset.tabsNav+'"]', getParent(this, 'card__tabs'))) {
              let tabsItem = qs('.card__tabs-item--active[data-tabs-item]', getParent(_th, 'card__tabs'));
              let tabsNext = qs('.card__tabs-item[data-tabs-item="'+_th.dataset.tabsNav+'"]', getParent(this, 'card__tabs'));
              _self.fadeOut(tabsItem, 300, function () {
                tabsItem.classList.remove('card__tabs-item--active');
                _self.fadeIn(tabsNext, 300, function () {
                  tabsNext.classList.add('card__tabs-item--active');
                });
              });
            }
          }
          e.preventDefault();
        });
      });

    },

    servicesCompareToggle: function servicesCompareToggle() {

      const _self = this;

      qsAll('.js-compare').forEach((item)=> {
        item.addEventListener('click', function (e) {
          let parents = getParent(this, 'filials__items');
          this.classList.toggle('active');
          qsAll('.filials__item-services-wrap', parents).forEach((item)=> _self.slideToggle(item, 300));
          e.preventDefault();
        });
      });

    },

    mainLightgallery: function mainLightgallery() {

      const lg = qsAll('.js-lightgallery');

      lg.forEach((item)=> {
        lightGallery(item, {
          selector: 'a[href]',
          download: false,
          hideBarsDelay: 10000
        });
      });

    },

    choicesSelect: function choicesSelect() {

      window.choicesArray = [];

      qsAll('.js-select').forEach((item, index) => {
        item.setAttribute('data-id', index);
        choicesArray[index] = new Choices(item, {
          searchEnabled: false,
          itemSelectText: '',
          classNames: {
            containerOuter: 'choices choices--custom'
          }
        });
      });

    },

    insurance: function insurance() {

      const _self = this;

      let insuranceSwiper = new Swiper('.js-insurance-swiper', {
        loop: false,
        speed: 750,
        slidesPerView: 4,
        spaceBetween: 28,
        mousewheel: false,
        grabCursor: false,
        keyboard: false,
        simulateTouch: false,
        allowSwipeToNext: false,
        allowSwipeToPrev: false,
        allowTouchMove: false,
        breakpoints: {
          640: {
            slidesPerView: 1,
            autoHeight: true,
          },
          768: {
            slidesPerView: 2,
            autoHeight: true,
            spaceBetween: 10,
          },
          992: {
            slidesPerView: 2,
            autoHeight: true,
          },
          1240: {
            slidesPerView: 3,
            autoHeight: true,
          }
        }
      });

      const carModel = qs('.js-car-model'),
        carCost = qs('.js-car-cost'),
        imgAuto = qs('.insurance__auto-img');

      if (window.carsDataArr && carModel && carCost) {

        qs('.js-car-brand').addEventListener('change', function (event) {

          let newOPtionsModelHtml = '',
            carModelId = carModel.dataset.id;

          let idOption = parseInt(event.target.value);

          window.carsDataArr.forEach((item)=> {
            if (idOption === item.brandId) {
              let _seflBrandId = item.brandId;
              newOPtionsModelHtml = '<option placeholder value="0">Модель</option>';
              item.brandModel.forEach((model, index)=> {
                newOPtionsModelHtml += '<option value="' + model.idModel + '">'+model.nameModel+'</option>';
              });
              window.choicesArray[carModelId].destroy();
              carModel.innerHTML = newOPtionsModelHtml;
            }
          });
          window.choicesArray[carModelId].presetChoices = [];
          window.choicesArray[carModelId].init();

        });

        carModel.addEventListener('change', function (event) {

          let newOPtionsPriceHtml = '',
            carCostId = carCost.dataset.id;

          let valueOption = parseInt(event.target.value);

          window.carsDataArr.forEach((item)=> {
            if (item.brandId === parseInt(qs('.js-car-brand').value)) {
              item.brandModel.forEach((itemModel)=> {
                if (itemModel.idModel === valueOption) {
                  imgAuto.setAttribute('src', itemModel.coverModel);
                  newOPtionsPriceHtml = '<option placeholder value="0">Стоимость комплектации</option>';
                  itemModel.priceModel.forEach((price)=> {
                    newOPtionsPriceHtml += '<option value="' + price.value + '">'+price.text+'</option>';
                  });
                }
              })
              window.choicesArray[carCostId].destroy();
              carCost.innerHTML = newOPtionsPriceHtml;
            }
          })
          window.choicesArray[carCostId].presetChoices = [];
          window.choicesArray[carCostId].init();
        });

      }

      qsAll('.js-next-step').forEach((item)=> {
        item.addEventListener('click', function(e) {
          const headOver = getParent(this, 'insurance');
          if (window.gaz.form.checkForm(qs('form', headOver), '.insurance__step--active')) {

            console.log(this);
            console.log(getParent(this, 'insurance__step--info'));

            if (getParent(this, 'insurance__step--info')) {
              qs('.insurance__step--char').classList.add('insurance__step--active');
            }

            if (getParent(this, 'insurance__step--char')) {
              qs('.insurance__step--data').classList.add('insurance__step--active');
            }

            if (getParent(this, 'insurance__step--data')) {
              qs('.insurance__step--calc').classList.add('insurance__step--active');
            }

            console.log('норм все');
            insuranceSwiper.slideNext(750);
          } else {
            console.log('бага');
          }
          e.preventDefault();
        });
      });

    },

    calc: function calc() {

      const _self = this;

      if (qsAll('.js-calc .calc__tabs-nav-btn').length) {
        qsAll('.js-calc .calc__tabs-nav-btn').forEach((item)=> {
          item.addEventListener('click', function (e) {
            let _th = this;
            if (!_th.classList.contains('.calc__tabs-nav-btn--active')) {
              qs('.calc__tabs-nav-btn.calc__tabs-nav-btn--active').classList.remove('calc__tabs-nav-btn--active');
              _th.classList.add('calc__tabs-nav-btn--active');
              if (_th.dataset.tabsNav && _th.dataset.tabsNav != '' && qs('.calc__tabs-item[data-tabs-item="' + _th.dataset.tabsNav + '"]', getParent(this, 'calc'))) {
                let tabsItem = qs('.calc__tabs-item.calc__tabs-item--active[data-tabs-item]', getParent(this, 'calc'));
                let tabsNext = qs('.calc__tabs-item[data-tabs-item="' + _th.dataset.tabsNav + '"]', getParent(this, 'calc'));
                _self.fadeOut(tabsItem, 300, function () {
                  tabsItem.classList.remove('calc__tabs-item--active');
                  _self.fadeIn(tabsNext, 300, function () {
                    tabsNext.classList.add('calc__tabs-item--active');
                  });
                });
              }
            }
            e.preventDefault();
          });
        });
      }

      const selectModel = qs('.js-calc-car-model'),
        selectCost = qs('.js-calc-car-cost'),
        programmInput = qs('.js-calc-car-programm'),
        priceInput = qs('.js-calc-car-price'),
        carImg = qs('.calc__car-img');

      if (window.calcCarsDataArr && selectModel && selectCost) {
        selectModel.addEventListener('change', function (event) {
          let newOPtionsModelHtml = '',
            selectCostlId = selectCost.dataset.id,
            valueOption = parseInt(event.target.value);
          window.calcCarsDataArr.forEach((item)=> {
            if (valueOption === item.idModel) {
              newOPtionsModelHtml = '<option placeholder value="0">Модель</option>';
              item.equipments.forEach((model)=> {
                newOPtionsModelHtml += '<option value="' + model.idEquipment + '">'+model.nameModel+'</option>';
              });
              window.choicesArray[selectCostlId].destroy();
              selectCost.innerHTML = newOPtionsModelHtml;
            }
          });
          window.choicesArray[selectCostlId].presetChoices = [];
          window.choicesArray[selectCostlId].init();
        });

      }

      selectCost.addEventListener('change', function (event) {
        let valueOption = parseInt(event.target.value);
        window.calcCarsDataArr.forEach((item)=> {
          if (item.idModel === parseInt(qs('.js-calc-car-model').value)) {
            item.equipments.forEach((itemEquipment)=> {
              if (itemEquipment.idEquipment === valueOption) {
                programmInput.value = itemEquipment.programm;
                programmInput.classList.add('not-empty');
                priceInput.value = itemEquipment.priceModel;
                carImg.setAttribute('src', itemEquipment.coverModel)
              }
            });
          }
        })
      });

    },

    init: function init() {

      if (qsAll('.js-filter-btn').length) this.filter();

      if (qsAll('.js-lightgallery').length) this.mainLightgallery();

      if (qs('.js-action-swiper')) this.actionSlider();

      if (qs('.js-burger')) this.burger();

      if (qs('.js-iann-swiper')) this.iannSlider();

      if (qs('.js-idealer-swiper')) this.idealerSlider();

      if (qs('.js-igall-swiper')) this.igallSlider();

      if (qs('.js-irev-swiper')) this.irevSlider();

      if (qs('.js-top-swiper')) this.topSwiper();

      if (qs('.js-history-swiper')) this.historySwiper();

      if (qs('.js-gallery-top') && qs('.js-gallery-thumbs')) this.gallerySwiper();

      if (qs('.js-gallery-min-swiper')) this.galleryMinSwiper();

      if (qs('.js-sel-auto')) this.selAuto();

      if (qsAll('.js-tippy').length) this.mainTippy();

      if (qsAll('.js-select').length) this.choicesSelect();

      if (qsAll('.js-map').length) this.map();

      if (qsAll('.js-department-toggle').length) this.departmentToggle();

      if (qsAll('.js-range').length) this.range();

      if (qsAll('.js-range-single').length) this.rangeSingle();

      if (qsAll('.js-tabs').length) this.tabs();

      if (qsAll('.js-compare').length) this.servicesCompareToggle();

      if (qs('.js-insurance-swiper')) this.insurance();

      if (qs('.js-calc')) this.calc();

      if ($('.js-mfp').length) {
        $('.js-mfp').magnificPopup({
          type: 'inline',
          midClick: true,
          callbacks: {
            open: function () {}
          }
        });
      }

      $('.js-close-popup').on('click', function () {
        $.magnificPopup.close();
        return false;
      });

      return this;

    }

  }.init();

});
