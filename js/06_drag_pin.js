// 05 Реализуем перемещение метки по карте с помощью мыши
'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinWidth = 65;

  // получаем координаты элемента в контексте документа
  window.getPinCoords = function () {
    var box = window.mapElements['mainPin'].getBoundingClientRect();
    var margin = map.getBoundingClientRect();
    var coordsY = Math.round(box.top + pageYOffset + window.mapElements['mainPinHeight']);
    var coordsX = Math.round(box.left - margin.left + pageXOffset + (box.width / 2));
    window.formElements['address'].value = coordsX + ' x, ' + coordsY + ' y;';
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      if ((mainPin.offsetLeft - shift.x) > 0 + mainPinWidth / 2 && (mainPin.offsetLeft - shift.x) < 1200 - mainPinWidth / 2) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if ((mainPin.offsetTop - shift.y) < 630 && (mainPin.offsetTop - shift.y) > 130) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };
      window.getPinCoords();
    };

    var onMouseUp = function () {
      mainPin.removeEventListener('mousedown', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
