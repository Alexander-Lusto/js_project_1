// 04 Активируем страницу при перемещении метки
'use strict';

(function () {
  var activateForm = function () {
    window.pageElements.form.classList.remove('notice__form--disabled');
    for (var i = 0; i < window.pageElements.formElements.fieldsets.length; i++) {
      window.pageElements.formElements.fieldsets[i].disabled = false;
    }
  };

  window.activatePage = function () {
    window.pageElements.map.classList.remove('map--faded');
    activateForm();
    window.addPinsOnMap(window.serverData);
    window.pageElements.mapElements.mainPin.removeEventListener('mouseup', window.activatePage);
  };
})();
