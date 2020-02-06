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

    var coord_x = Math.round(box.top + pageYOffset + (box.height / 2));
    var coord_y = Math.round(box.left + pageXOffset + (box.width / 2));
    address.value = coord_x + " x, " + coord_y + " y;";
  }

  // получаем координаты элемента в контексте документа
  var getPinCoords = function(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset + map_elements.main_pin_height,
      left: box.left + pageXOffset + (box.width / 2)
    };
  }
  getPinCoordsBeforeStart(map_elements.main_pin);

  //activate page
  var activatePage = function(){
    map.classList.remove("map--faded");
    addPinsOnMap(announcements);
    activateForm(form, form_elements.fieldsets);
    var coord_x = Math.round(getPinCoords(map_elements.main_pin).left);
    var coord_y = Math.round(getPinCoords(map_elements.main_pin).top);
    address.value = coord_x + " x, " + coord_y + " y;";
    map_elements.main_pin.removeEventListener('mouseup', activatePage);
  }
  addListener(map_elements.main_pin, 'mouseup', activatePage);
})();
