// 02 Add pins to the map
'use strict';
(function(){
  window.addPinsOnMap = function(array){
    var template = document.querySelector('template').content.querySelector('.map__pin') ;
      for(var i = 0; i < array.length; i++){
      var template_item = template.cloneNode(true);
      var template_item_img = template_item.querySelector('img');

      template_item.style = 'left: ' + array[i].location['x'] + 'px; ' + 'bottom: '  + array[i].location['y'] + 'px;';
      template_item_img.src = array[i].author['avatar'];
      template_item_img.title = array[i].offer['title'];

      (function(pin){
        template_item.addEventListener('click', function(){
          deletePreviousAnnouncements();
          createCard(pin);
        });
      })(array[i]);

      map_elements.area.appendChild(template_item);
    }
  }
})();
