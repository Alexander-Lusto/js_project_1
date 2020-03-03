// 05 Валидация формы
'use strict';

(function () {
  


  // получаем координаты главной метки для неактивной страницы
  var getPinCoordsBeforeStart = function (elem) {
    var box = elem.getBoundingClientRect();
    var margin = window.pageElements.map.getBoundingClientRect();

    var coordY = Math.round(box.top + pageYOffset + (box.height / 2));
    var coordX = Math.round(box.left - margin.left + pageXOffset + (box.width / 2));
    window.pageElements.formElements.address.value = coordX + ' x, ' + coordY + ' y;';
  };
  getPinCoordsBeforeStart(window.pageElements.mapElements.mainPin);

  // price and type connection
  var connectPriceAndType = function () {
    switch (window.pageElements.formElements.type.value) {
      case 'bungalo':
        window.pageElements.formElements.price.min = 0;
        window.pageElements.formElements.price.placeholder = 0;
        break;

      case 'flat':
        window.pageElements.formElements.price.min = 1000;
        window.pageElements.formElements.price.placeholder = 1000;
        break;

      case 'house':
        window.pageElements.formElements.price.min = 5000;
        window.pageElements.formElements.price.placeholder = 5000;
        break;

      case 'palace':
        window.pageElements.formElements.price.min = 10000;
        window.pageElements.formElements.price.placeholder = 10000;
        break;
    }
  };
  window.utils.addListener(window.pageElements.formElements.type, 'change', connectPriceAndType);

  // checkin and checkout connection
  var connectTime = function (time1, time2) {
    time2.value = time1.value;
  };
  window.utils.addListener(window.pageElements.formElements.checkin, 'change', () => connectTime(window.pageElements.formElements.checkin, window.pageElements.formElements.checkout));
  window.utils.addListener(window.pageElements.formElements.checkout, 'change', () => connectTime(window.pageElements.formElements.checkout, window.pageElements.formElements.checkin));

  // rooms and guests connection
  var connectRoomsAndGuests = function () {
    for (var i = 0; i < window.pageElements.formElements.guestsOptions.length; i++) {
      window.pageElements.formElements.guestsOptions[i].disabled = true;
    }
    switch (window.pageElements.formElements.rooms.value) {
      case '1':// 1 комната
        window.pageElements.formElements.guestsOptions[2].disabled = false;
        window.pageElements.formElements.guests.value = 1;
        break;
      case '2': // 2 комнаты
        window.pageElements.formElements.guestsOptions[1].disabled = false;
        window.pageElements.formElements.guestsOptions[2].disabled = false;
        window.pageElements.formElements.guests.value = 2;
        break;
      case '3': // 3 комнаты
        window.pageElements.formElements.guestsOptions[0].disabled = false;
        window.pageElements.formElements.guestsOptions[1].disabled = false;
        window.pageElements.formElements.guestsOptions[2].disabled = false;
        window.pageElements.formElements.guests.value = 3;
        break;
      case '100': // 100 комнат
        window.pageElements.formElements.guestsOptions[3].disabled = false;
        window.pageElements.formElements.guests.value = 0;
        break;
    }
  };
  window.utils.addListener(window.pageElements.formElements.rooms, 'change', connectRoomsAndGuests);

  // form validation on submit
  window.pageElements.form.addEventListener('invalid', function (evt) {
    evt.target.classList.add('invalid');
  }, true);

  window.pageElements.form.addEventListener('change', function (evt) {
    evt.target.classList.remove('invalid');
  }, true);

  var resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function () {
    window.deactivatePage();
    getPinCoordsBeforeStart(window.pageElements.mapElements.mainPin);
    window.pageElements.mapElements.mainPin.addEventListener('mouseup', window.activatePage);
  });
})();
