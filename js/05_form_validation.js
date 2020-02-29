// 05 Валидация формы
'use strict';

(function () {
  var connectPriceAndType = function () {
    switch (window.formElements.type.value) {
      case 'bungalo':
        window.formElements.price.min = 0;
        window.formElements.price.placeholder = 0;
        break;

      case 'flat':
        window.formElements.price.min = 1000;
        window.formElements.price.placeholder = 1000;
        break;

      case 'house':
        window.formElements.price.min = 5000;
        window.formElements.price.placeholder = 5000;
        break;

      case 'palace':
        window.formElements.price.min = 10000;
        window.formElements.price.placeholder = 10000;
        break;
    }
  };
  window.addListener(window.formElements.type, 'change', connectPriceAndType);

  // checkin and checkout connection
  var connectTime = function (time1, time2) {
    time2.value = time1.value;
  };
  window.addListener(window.formElements.checkin, 'change', () => connectTime(window.formElements.checkin, window.formElements.checkout));
  window.addListener(window.formElements.checkout, 'change', () => connectTime(window.formElements.checkout, window.formElements.checkin));

  // rooms and guests connection
  var connectRoomsAndGuests = function () {
    for (var i = 0; i < window.formElements.guestsOptions.length; i++) {
      window.formElements.guestsOptions[i].disabled = true;
    }
    switch (window.formElements.rooms.value) {
      case '1':// 1 комната
        window.formElements.guestsOptions[2].disabled = false;
        window.formElements.guests.value = 1;
        break;
      case '2': // 2 комнаты
        window.formElements.guestsOptions[1].disabled = false;
        window.formElements.guestsOptions[2].disabled = false;
        window.formElements.guests.value = 2;
        break;
      case '3': // 3 комнаты
        window.formElements.guestsOptions[0].disabled = false;
        window.formElements.guestsOptions[1].disabled = false;
        window.formElements.guestsOptions[2].disabled = false;
        window.formElements.guests.value = 3;
        break;
      case '100': // 100 комнат
        window.formElements.guestsOptions[3].disabled = false;
        window.formElements.guests.value = 0;
        break;
    }
  };
  window.addListener(window.formElements.rooms, 'change', connectRoomsAndGuests);

  // form validation on submit
  window.form.addEventListener('invalid', function (evt) {
    evt.target.classList.add('invalid');
  }, true);

  window.form.addEventListener('change', function (evt) {
    evt.target.classList.remove('invalid');
  }, true);

  var resetButton = document.querySelector('.form__reset');
  resetButton.addEventListener('click', function () {
    window.deactivatePage();
    window.getPinCoordsBeforeStart(window.mapElements.mainPin);
    window.mapElements.mainPin.addEventListener('mouseup', window.activatePage);
  });
})();
