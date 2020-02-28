'use strict';
// 00 global variables and functions
(function () {
  window.ESC_KEYCODE = 27;
  window.map = document.querySelector('.map');
  window.map_elements = {
    area: map.querySelector('.map__pins'),
    main_pin: map.querySelector('.map__pin--main'),
    main_pin_height: 80,
    pin_height: 18,
  }

  window.form = document.querySelector('.notice__form');
  window.form_elements = {
    fieldsets: form.querySelectorAll('fieldset'),
    address: form.querySelector('input[name="address"]'),
    price: form.querySelector('#price'),
    type: form.querySelector('#type'),
    checkin: form.querySelector('#timein'),
    checkout: form.querySelector('#timeout'),
    rooms: form.querySelector('#room_number'),
    guests: form.querySelector('#capacity'),
    guests_options: form.querySelectorAll('#capacity option'),
  };

  // функция которая перемешивает элементы массива
  window.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //функция которая возвращает случайное число из диапазона
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  //функция которая вешает слушатель событий
  window.addListener = function(element, event_type, call_back){
    element.addEventListener(event_type, call_back);
  }

  //функция которая закрывает попап

})();
