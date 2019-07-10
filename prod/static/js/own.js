"use strict";

function qs(query) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelector(query);
}

function qsAll(query) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return root.querySelectorAll(query);
}

function getParent(el, findParent) {
  while (el && el.parentNode) {
    el = el.parentNode;
    if (el.classList && el.classList.contains(findParent)) return el;
  }

  return false;
}

window.onload = function () {
  return qs('body').classList.add('page-loaded');
};

document.addEventListener("DOMContentLoaded", function (event) {
  window.gaz = {};
  window.gaz.form = {
    init: function init() {
      var _th = this,
          inputs = qsAll('.form__field-input, .form__field-textarea'),
          forms = qsAll('form'),
          digitsInput = qsAll('.js-digits');

      function emptyCheck(event) {
        event.target.value.trim() === '' ? event.target.classList.remove('not-empty') : event.target.classList.add('not-empty');
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;
          item.addEventListener('keyup', emptyCheck);
          item.addEventListener('blur', emptyCheck);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = forms[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var form = _step2.value;
          form.addEventListener('submit', function (e) {//return !_th.checkForm(form) && e.preventDefault()
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = digitsInput[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var digitInput = _step3.value;
          digitInput.addEventListener('keydown', function (e) {
            var validArr = [46, 8, 9, 27, 13, 110, 190];

            if (validArr.indexOf(e.keyCode) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
              return;
            }

            if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
              e.preventDefault();
            }
          });
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return this;
    },
    checkForm: function checkForm(form) {
      var checkResult = true;
      var warningElems = form.querySelectorAll('.error');

      if (warningElems.length) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = warningElems[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var warningElem = _step4.value;
            warningElem.classList.remove('error');
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = form.querySelectorAll('input, textarea, select')[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var elem = _step5.value;

          if (elem.getAttribute('data-req')) {
            switch (elem.getAttribute('data-type')) {
              case 'tel':
                var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

                if (!re.test(elem.value)) {
                  elem.parentNode.classList.add('error');
                  checkResult = false;
                }

                break;

              case 'email':
                var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

                if (!re.test(elem.value)) {
                  elem.parentNode.classList.add('error');
                  checkResult = false;
                }

                break;

              case 'file':
                if (elem.value.trim() === '') {
                  elem.parentNode.classList.add('error');
                  checkResult = false;
                }

                break;

              default:
                if (elem.value.trim() === '') {
                  elem.parentNode.classList.add('error');
                  checkResult = false;
                }

                break;
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = form.querySelectorAll('input[data-req^=agreement]')[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var item = _step6.value;

          if (!item.checked) {
            item.classList.add('error');
            checkResult = false;
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return checkResult;
    }
  }.init();
  window.gaz.obj = {
    slideDown: function slideDown(selector, duration) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!selector) return;
      var element;
      typeof selector === 'string' || selector instanceof String ? element = qs(selector) : element = selector;
      var display = getComputedStyle(element).display;
      element.style.removeProperty('display');
      if (display === 'none') display = 'block';
      element.style.display = display;
      var height = element.offsetHeight;
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
      setTimeout(function () {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-property');
        element.style.removeProperty('transition-duration');
      }, duration);
    },
    slideUp: function slideUp(selector, duration) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!selector) return;
      var element;
      typeof selector === 'string' || selector instanceof String ? element = qs(selector) : element = selector;
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
      setTimeout(function () {
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
    slideToggle: function slideToggle(selector, duration) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var element;
      typeof selector === 'string' || selector instanceof String ? element = qs(selector) : element = selector;
      var display = getComputedStyle(element).display;
      if (display === 'none') this.slideDown(element, duration, cb);else this.slideUp(element, duration, cb);
    },
    fadeOut: function fadeOut(selector, duration) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!selector) return;
      var element,
          op = 1;
      typeof selector === 'string' || selector instanceof String ? element = qs(selector) : element = selector;
      var timer = setInterval(function () {
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
    fadeIn: function fadeIn(selector, duration) {
      var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      if (!selector) return;
      var element,
          op = 0.1,
          typeBlock = 'block';
      typeof selector === 'string' || selector instanceof String ? element = qs(selector) : element = selector;
      element.style.opacity = 0;
      element.style.display = typeBlock;
      var timer = setInterval(function () {
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
      var allowed = true;
      $('.js-filter-btn').on('click', function () {
        var _t = $(this),
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

      qs('.js-burger').addEventListener('click', function () {
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
    actionSlider: function actionSlider() {
      var countStart = 3,
          point992 = 2,
          point1240 = 4;

      if (getParent(qs('.js-action-swiper'), 'action--inner')) {
        countStart = 2, point992 = 1, point1240 = 2;
      }

      var actionSlider = new Swiper('.js-action-swiper', {
        loop: false,
        speed: 750,
        slidesPerView: countStart,
        spaceBetween: 28,
        navigation: {
          nextEl: '.action .swiper-button-next',
          prevEl: '.action .swiper-button-prev'
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
      qsAll('.js-select').forEach(function (item) {
        new Choices(item, {
          placeholder: true,
          searchEnabled: false,
          itemSelectText: '',
          classNames: {
            containerOuter: 'choices choices--custom'
          }
        });
      });
    },
    igallSlider: function igallSlider() {
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
    },
    irevSlider: function irevSlider() {
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
    },
    idealerSlider: function idealerSlider() {
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
    },
    topSwiper: function topSwiper() {
      var topSlider = new Swiper('.js-top-swiper', {
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
          prevEl: '.section-top .swiper-button-prev'
        }
      });
    },
    iannSlider: function iannSlider() {
      var indEl = document.querySelector('.iann .swiper-ind-line span'),
          width = 0,
          timer;

      function animInd(time) {
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
      }

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
    },
    gallerySwiper: function gallerySwiper() {
      var galleryThumbs = new Swiper('.js-gallery-thumbs', {
        spaceBetween: 7,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        loopedSlides: 5,
        //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true
      });
      var galleryTop = new Swiper('.js-gallery-top', {
        spaceBetween: 7,
        loop: true,
        loopedSlides: 5,
        //looped slides should be the same
        navigation: {
          nextEl: '.gallery .swiper-button-next',
          prevEl: '.gallery .swiper-button-prev'
        },
        thumbs: {
          swiper: galleryThumbs
        }
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
          setTimeout(function () {
            imgAuto.attr('src', dataSrc).fadeIn(300);
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
      var pin = '/static/img/pin.png',
          coordsCenter = qs('.js-map').dataset.center.split(',');
      ymaps.ready(function () {
        function yaMapInit() {
          var myMap = new ymaps.Map("yaMap", {
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
              myMap.geoObjects.add(new ymaps.Placemark(currentElement.dataset.coords.split(','), {}, {
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
      var _self = this;

      qsAll('.js-department-toggle').forEach(function (item) {
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
        rangeInp.forEach(function (item) {
          var _th = item,
              _thPar = getParent(_th, 'range'),
              _thMax = parseInt(_th.dataset.max),
              _thMin = parseInt(_th.dataset.min),
              inpTo = qs('.range__digits--to', _thPar),
              inpFrom = qs('.range__digits--from', _thPar);

          var timeout = null;
          var slider = $(_th).ionRangeSlider({
            type: "double",
            min: _thMin,
            max: _thMax,
            keyboard: true,
            onChange: function onChange(data) {
              inpTo.value = data.to_pretty;
              inpFrom.value = data.from_pretty;
            }
          }).data("ionRangeSlider");
          inpFrom.addEventListener('input', function () {
            var validFrom = getValidFormMinAndMax(inpFrom.value, _thMin, _thMax),
                validTo = getValidFormMinAndMax(inpTo.value, _thMin, _thMax);
            console.log(validFrom);
            console.log(validTo);
            clearTimeout(timeout);
            timeout = setTimeout(function () {
              inpFrom.value = validFrom;
              slider.update({
                from: validFrom,
                to: validTo
              });
            }, 500);
          });
          inpTo.addEventListener('input', function () {
            var validFrom = getValidFormMinAndMax(inpFrom.value, _thMin, _thMax),
                validTo = getValidFormMinAndMax(inpTo.value, _thMin, _thMax);
            clearTimeout(timeout);
            console.log(validFrom);
            console.log(validTo);
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
      var _self = this;

      qsAll('.card__tabs-nav-button').forEach(function (item) {
        item.addEventListener('click', function (e) {
          var _th = this;

          if (!_th.classList.contains('card__tabs-nav-button--active')) {
            qs('.card__tabs-nav-button.card__tabs-nav-button--active').classList.remove('card__tabs-nav-button--active');

            _th.classList.add('card__tabs-nav-button--active');

            if (_th.dataset.tabsNav && _th.dataset.tabsNav != '' && qs('.card__tabs-item[data-tabs-item="' + _th.dataset.tabsNav + '"]', getParent(this, 'card__tabs'))) {
              _self.fadeOut(qs('.card__tabs-item[data-tabs-item]', getParent(_th, 'card__tabs')), 300, function () {
                _self.fadeIn(qs('.card__tabs-item[data-tabs-item="' + _th.dataset.tabsNav + '"]', getParent(_th, 'card__tabs')), 300);
              });
            }
          }

          e.preventDefault();
        });
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
      if (qs('.js-gallery-top') && qs('.js-gallery-thumbs')) this.gallerySwiper();
      if (qs('.js-sel-auto')) this.selAuto();
      if (qsAll('.js-tippy').length) this.mainTippy();
      if (qsAll('.js-select').length) this.choicesSelect();
      if (qsAll('.js-map').length) this.map();
      if (qsAll('.js-department-toggle').length) this.departmentToggle();
      if (qsAll('.js-range').length) this.range();
      if (qsAll('.js-tabs').length) this.tabs();
      return this;
    }
  }.init();
});
//# sourceMappingURL=own.js.map
