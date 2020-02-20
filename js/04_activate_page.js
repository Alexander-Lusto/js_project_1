//04 activate page
'use strict';
(function(){
  var activateForm = function(){
    form.classList.remove('notice__form--disabled');
    for(var i = 0; i < form_elements.fieldsets.length; i++){
      form_elements.fieldsets[i].disabled = false;
    }
  }

  // получаем координаты главной метки для неактивной страницы
  var getPinCoordsBeforeStart = function(elem) {
    var box = elem.getBoundingClientRect();
    var margin = map.getBoundingClientRect();

    var coord_y = Math.round(box.top + pageYOffset + (box.height / 2));
    var coord_x = Math.round(box.left - margin.left + pageXOffset + (box.width / 2));
    form_elements.address.value = coord_x + " x, " + coord_y + " y;";
  }
  getPinCoordsBeforeStart(map_elements.main_pin);

  //activate page
  var activatePage = function(){
    map.classList.remove("map--faded");
    addPinsOnMap(server_data);
    activateForm(form, form_elements.fieldsets);
    map_elements.main_pin.removeEventListener('mouseup', activatePage);
  }
  addListener(map_elements.main_pin, 'mouseup', activatePage);
})();
