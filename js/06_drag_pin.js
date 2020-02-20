//05 Drag AND Drop
'use strict';
(function(){
  var map = document.querySelector('.map');
  var main_pin = map.querySelector('.map__pin--main');
  var main_pin_width = 65;

  // получаем координаты элемента в контексте документа
  window.getPinCoords = function() {
    var box = map_elements["main_pin"].getBoundingClientRect();
    var margin = map.getBoundingClientRect();
    var coords_y = Math.round(box.top + pageYOffset + map_elements["main_pin_height"]);
    var coords_x = Math.round(box.left - margin.left + pageXOffset + (box.width / 2));
    form_elements["address"].value = coords_x + ' x, ' + coords_y + " y;"
  }

  main_pin.addEventListener('mousedown', function(evt){
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    }

    var onMouseMove = function (evtMove) {
      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      }

      if((main_pin.offsetLeft - shift.x) > 0 + main_pin_width/2  && (main_pin.offsetLeft - shift.x) < 1200 - main_pin_width/2){
        main_pin.style.left = (main_pin.offsetLeft - shift.x) + 'px';
      }

      if((main_pin.offsetTop - shift.y) < 630 && (main_pin.offsetTop - shift.y) > 130){
        main_pin.style.top = (main_pin.offsetTop - shift.y) + 'px';
      }

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      }
      getPinCoords();
    }

    var onMouseUp = function (evt) {
      main_pin.removeEventListener('mousedown', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
