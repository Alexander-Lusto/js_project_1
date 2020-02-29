// 04 Активируем страницу при перемещении метки
'use strict';

(function () {
  var activateForm = function () {
    window.form.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.formElements.fieldsets.length; i++) {
      window.formElements.fieldsets[i].disabled = false;
    }
  };

  // получаем координаты главной метки для неактивной страницы
  window.getPinCoordsBeforeStart = function (elem) {
    var box = elem.getBoundingClientRect();
    var margin = window.map.getBoundingClientRect();

    var coordY = Math.round(box.top + pageYOffset + (box.height / 2));
    var coordX = Math.round(box.left - margin.left + pageXOffset + (box.width / 2));
    window.formElements.address.value = coordX + ' x, ' + coordY + ' y;';
  };
  window.getPinCoordsBeforeStart(window.mapElements.mainPin);

  // активируем страницу
  window.activatePage = function () {
    window.map.classList.remove('map--faded');
    activateForm();
    window.addPinsOnMap(window.serverData);
    window.mapElements.mainPin.removeEventListener('mouseup', window.activatePage);
  };
})();
