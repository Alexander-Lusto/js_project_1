'use strict';
(function () {
  var ESC_KEYCODE = 27;

  window.utils = {
    shuffleArray: function (array) { // функция которая перемешивает элементы массива
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },

    getRandomInt: function (min, max) { // функция которая возвращает случайное число из диапазона
      return Math.floor(Math.random() * (max - min)) + min;
    },

    addListener: function (element, eventType, callBack) { // функция которая вешает слушатель событий
      element.addEventListener(eventType, callBack);
    },

    isEscKeycode: function (evt) { // функция которая  проверяет нажата ли клавиша esc
      return evt.keyCode === ESC_KEYCODE;
    }
  }
})();
