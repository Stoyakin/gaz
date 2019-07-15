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

  window.gaz = {};

  window.gaz.form = ({

    init: function () {

      const _th = this,
        inputs = qsAll('.form__field-input, .form__field-textarea'),
        forms = qsAll('form'),
        digitsInput = qsAll('.js-digits');

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
          //return !_th.checkForm(form) && e.preventDefault()
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

    checkForm: function (form) {
      let checkResult = true;
      const warningElems = form.querySelectorAll('.error');

      if (warningElems.length) {
        for (let warningElem of warningElems) {
          warningElem.classList.remove('error')
        }
      }

      for (let elem of form.querySelectorAll('input, textarea, select')) {
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

    igallSlider: function igallSlider() {
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

    irevSlider: function irevSlider() {
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
        }
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
          delay: 2,
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
            animInd(1625);
          }
        }
      });
    },

    gallerySwiper: function gallerySwiper() {

      var galleryThumbs = new Swiper('.js-gallery-thumbs', {
        spaceBetween: 7,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      var galleryTop = new Swiper('.js-gallery-top', {
        spaceBetween: 7,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
          nextEl: '.gallery .swiper-button-next',
          prevEl: '.gallery .swiper-button-prev',
        },
        thumbs: {
          swiper: galleryThumbs,
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

          if (qsAll('.js-filials .filials__item').length) {
            $.each(qsAll('.js-filials .filials__item'), function (index, currentElement) {
              myMap.geoObjects.add(new ymaps.Placemark((currentElement.dataset.coords).split(','), {}, {
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

      var rangeInp = qsAll('.js-range');

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
      /*
      var $rangeOne = $(".js-range-one");
      if ($rangeOne.length) {
        $rangeOne.each(function () {
          var _th = $(this),
            _thMax = parseInt(_th.data('max')),
            _thMin = parseInt(_th.data('min')),
            inpFrom = _th.parents('.range').find('.range__input--from');

          var singleSlider = _th.ionRangeSlider({
            type: "single",
            min: _thMin,
            max: _thMax,
            keyboard: true
          }).data("ionRangeSlider");

          _th.on("change", function () {
            var $this = $(this),
              from = $this.data("from");
            inpFrom.val(from);
          });
          var timeout = null;
          inpFrom.on('change input', function () {
            var valid_value = getValidFormMinAndMax(inpFrom.val(), _thMin, _thMax);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              inpFrom.val(valid_value);
              singleSlider.update({
                from: valid_value
              });
            }, 500);
          })

        });
      }
      */
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
              _self.fadeOut( qs('.card__tabs-item[data-tabs-item]', getParent(_th, 'card__tabs')), 300, function () {
                _self.fadeIn(qs('.card__tabs-item[data-tabs-item="'+_th.dataset.tabsNav+'"]', getParent(_th, 'card__tabs')), 300);
              });
            }
          }
          e.preventDefault();
        });
      });

    },

    graph: function () {
      AmCharts.makeChart("chartdiv",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY",
					"depth3D": 2,
					"backgroundColor": "#EFF7FF",
					"borderColor": "#EFF7FF",
					"color": "#1D1F20",
					"fontFamily": "",
					"fontSize": 16,
					"handDrawScatter": 1,
					"theme": "default",
					"categoryAxis": {
						"minPeriod": "YYYY",
						"parseDates": true,
						"gridAlpha": 0,
						"gridColor": "#D5DAE1",
						"gridCount": 2
					},
					"chartCursor": {
						"enabled": true,
						"animationDuration": 0,
						"categoryBalloonDateFormat": "YYYY",
						"color": "#1D1F20",
						"cursorColor": "#E8EDF4"
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonColor": "#006AF6",
							"balloonText": "Цена авто: [[value]] млн. руб.",
							"bullet": "square",
							"color": "#FFFFFF",
							"fillAlphas": 0.53,
							"fillColors": "#E4F1FE",
							"id": "AmGraph-1",
							"lineColor": "#006AF6",
							"lineThickness": 4,
							"negativeFillAlphas": 0,
							"title": "Цена авто",
							"valueField": "column-1"
						},
						{
							"balloonColor": "#006AF6",
							"balloonText": "Цена ТО: [[value]] тыс. руб.",
							"bullet": "square",
							"bulletBorderAlpha": 1,
							"bulletBorderThickness": 0,
							"bulletColor": "#1D1F20",
							"color": "#FFFFFF",
							"fillAlphas": 0.52,
							"fillColors": "#E5F1FE",
							"id": "AmGraph-2",
							"lineColor": "#1D1F20",
							"lineThickness": 3,
							"title": "Цена ТО",
							"valueField": "column-2"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"autoGridCount": false,
							"axisColor": "#D5DAE1",
							"axisThickness": 2,
							"gridAlpha": 0,
							"gridCount": 0,
							"gridThickness": 0,
							"tickLength": 0,
							"title": "Цена авто",
							"titleBold": false,
							"titleColor": "#1D1F20",
							"titleFontSize": 16,
							"titleRotation": 1
						}
					],
					"allLabels": [],
					"balloon": {
						"color": "#FFFFFF",
						"fadeOutDuration": 0,
						"fillColor": "#006AF6",
						"fontSize": 14,
						"pointerOrientation": "up",
						"shadowAlpha": 0,
						"verticalPadding": 7
					},
          "legend": {
            "enabled": true,
            "position": "right",
            "valueText": ""
          },
					"titles": [
						{
							"bold": false,
							"color": "undefined",
							"id": "Title-1",
							"size": 0,
							"text": ""
						}
					],
					"dataProvider": [
						{
							"date": "2012",
							"column-1": "0.8",
							"column-2": "2"
						},
						{
							"date": "2013",
							"column-1": "1.1",
							"column-2": "3"
						},
						{
							"date": "2014",
							"column-1": "1.2",
							"column-2": "3.5"
						},
						{
							"date": "2015",
							"column-1": "1.3",
							"column-2": "5"
						},
						{
							"date": "2016",
							"column-1": "1.5",
							"column-2": "4"
						},
						{
							"date": "2017",
							"column-1": "1.4",
							"column-2": "6"
						},
						{
							"date": "2018",
							"column-1": "1.7",
							"column-2": "7"
						},
						{
							"date": "2019",
							"column-1": "2.1",
							"column-2": "8.5"
						}
					]
				}
			);
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

      if (qs('.js-gallery-top') && qs('.js-gallery-thumbs')) this.gallerySwiper();

      if (qs('.js-sel-auto')) this.selAuto();

      if (qsAll('.js-tippy').length) this.mainTippy();

      if (qsAll('.js-select').length) this.choicesSelect();

      if (qsAll('.js-map').length) this.map();

      if (qsAll('.js-department-toggle').length) this.departmentToggle();

      if (qsAll('.js-range').length) this.range();

      if (qsAll('.js-tabs').length) this.tabs();

      if (qsAll('.js-graph').length) this.graph();

      return this;
    }

  }.init();

});

