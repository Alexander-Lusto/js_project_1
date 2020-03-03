// 00 Заносим все служебные функции, конастанты и объекты в свойства (или мотоды) объекта window, чтобы использовать глобально
'use strict';

(function () {
  window.ESC_KEYCODE = 27;

  window.map = document.querySelector('.map');
  window.mapElements = {
    area: window.map.querySelector('.map__pins'),
    mainPin: window.map.querySelector('.map__pin--main'),
    mainPinHeight: 80,
    pinHeight: 18,
  };

  window.form = document.querySelector('.notice__form');
  window.formElements = {
    
    fieldsets: window.form.querySelectorAll('fieldset'),
    address: window.form.querySelector('input[name="address"]'),
    price: window.form.querySelector('#price'),
    type: window.form.querySelector('#type'),
    checkin: window.form.querySelector('#timein'),
    checkout: window.form.querySelector('#timeout'),
    rooms: window.form.querySelector('#room_number'),
    guests: window.form.querySelector('#capacity'),
    guestsOptions: window.form.querySelectorAll('#capacity option'),
  };
})();
